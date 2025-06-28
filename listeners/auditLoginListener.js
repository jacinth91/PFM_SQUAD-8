// listeners/auditLoginListener.js
const auditUserEvents = require("../events/auditUserEvents");
const AuditUserLogin = require("../models/AuditUserLogin");
const { Queue, Worker } = require("bullmq");
const IORedis = require("ioredis");
const redisUrl = process.env.REDIS_URL || undefined;
const redisPassword = process.env.REDIS_PASSWORD || undefined;
const connection = redisUrl
  ? new IORedis(redisUrl, {
      maxRetriesPerRequest: null,
      username: "default",
      password: redisPassword,
    })
  : new IORedis({ maxRetriesPerRequest: null });

// Create a BullMQ queue for audit logs
const auditLogQueue = new Queue("audit-log-queue", { connection });

// Generic handler for user login events
function handleUserLoginEvent(eventType, data) {
  let jobData = { sessionId: data.sessionId };
  let jobName = eventType;
  if (eventType === "user:login") {
    jobData = {
      ...jobData,
      idUserLoginDetail: data.idUserLoginDetail,
      loginStatus: "SUCCESS",
      loginDateTime: data.loginDateTime || new Date(),
    };
  } else if (eventType === "user:login:failure") {
    jobData = {
      ...jobData,
      idUserLoginDetail: data.idUserLoginDetail,
      loginStatus: "FAILURE",
      loginDateTime: data.loginDateTime || new Date(),
      error: data.error,
    };
  } else if (eventType === "user:logout") {
    jobData = {
      ...jobData,
      logoutDateTime: new Date(),
      loginStatus: "LOGGED_OUT",
    };
  }
  auditLogQueue
    .add(jobName, jobData)
    .then(() => {
      console.log(`[Producer] ✅ ${eventType} job queued`, jobData);
    })
    .catch((err) => {
      console.error(`[Producer] ❌ Failed to queue ${eventType} job:`, err);
    });
}

auditUserEvents.on("user:login", (data) => {
  if (!data.idUserLoginDetail || !data.sessionId) {
    console.error(
      "❌ Missing idUserLoginDetail or sessionId in login event data"
    );
    return;
  }
  handleUserLoginEvent("user:login", data);
});

auditUserEvents.on("user:login:failure", (data) => {
  if (!data.idUserLoginDetail || !data.sessionId) {
    console.error(
      "❌ Missing idUserLoginDetail or sessionId in login failure event data"
    );
    return;
  }
  handleUserLoginEvent("user:login:failure", data);
});

auditUserEvents.on("user:logout", (data) => {
  if (!data.sessionId) {
    console.error("❌ Missing sessionId in logout event data");
    return;
  }
  handleUserLoginEvent("user:logout", data);
});

// Worker: Process jobs and write to DB
const auditLogWorker = new Worker(
  "audit-log-queue",
  async (job) => {
    console.log(`[Worker] Processing job: ${job.name}`, job.data);
    if (job.name === "user:login" || job.name === "user:login:failure") {
      const {
        idUserLoginDetail,
        sessionId,
        loginStatus,
        loginDateTime,
        error,
      } = job.data;
      try {
        const audit = new AuditUserLogin({
          idUserLoginDetail,
          sessionId,
          loginStatus,
          loginDateTime,
          error,
        });
        await audit.save();
        console.log(`[Worker] ✅ Audit log saved for ${job.name}`);
      } catch (err) {
        console.error(
          `[Worker] ❌ Failed to save audit log for ${job.name}:`,
          err
        );
      }
    } else if (job.name === "user:logout") {
      const { sessionId, logoutDateTime, loginStatus } = job.data;
      try {
        const updated = await AuditUserLogin.findOneAndUpdate(
          { sessionId },
          { logoutDateTime, loginStatus },
          { new: true }
        );
        if (updated) {
          console.log("[Worker] ✅ Logout audit updated in DB");
        } else {
          console.warn(
            "[Worker] ⚠️ No login record found for sessionId during logout"
          );
        }
      } catch (err) {
        console.error("[Worker] ❌ Failed to update logout audit:", err);
      }
    }
  },
  { connection }
);
