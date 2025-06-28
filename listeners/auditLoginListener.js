// listeners/auditLoginListener.js
import auditEmitter from "../events/auditEvents.js";
import AuditUserLogin from "../models/AuditUserLogin.js";

auditEmitter.on("user:login", async (data) => {
  try {
    const audit = new AuditUserLogin({
      idUserLoginDetail: data.idUserLoginDetail,
      sessionId: data.sessionId,
      loginStatus: "SUCCESS",
      loginDateTime: new Date(),
    });

    await audit.save();
    console.log("✅ Login audit logged");
  } catch (err) {
    console.error("❌ Failed to log login audit:", err);
  }
});

auditEmitter.on("user:logout", async (data) => {
  try {
    await AuditUserLogin.findOneAndUpdate(
      { sessionId: data.sessionId },
      { logoutDateTime: new Date(), loginStatus: "LOGGED_OUT" },
      { new: true }
    );
    console.log("✅ Logout audit updated");
  } catch (err) {
    console.error("❌ Failed to log logout audit:", err);
  }
});

auditEmitter.on("user:login:failure", async (data) => {
  try {
    const audit = new AuditUserLogin({
      idUserLoginDetail: data.idUserLoginDetail,
      sessionId: data.sessionId,
      loginStatus: "FAILURE",
      loginDateTime: new Date(),
    });

    await audit.save();
    console.log("✅ Login failure audit logged");
  } catch (err) {
    console.error("❌ Failed to log login failure audit:", err);
  }
});
