// events/auditUserEvents.js
const EventEmitter = require("events");
const auditUserEvents = new EventEmitter();

module.exports = auditUserEvents;

// setTimeout(() => {
//   const auditUserEvents = require("./events/auditUserEvents");
//   console.log("[Test] Emitting user:login event");
//   auditUserEvents.emit("user:login", {
//     idUserLoginDetail: "60f8c0c2c2a1a45678abcdef",
//     sessionId: "test-session-id-1234",
//     loginDateTime: new Date(),
//   });
//   console.log("[Test] Emitting user:login:failure event");
//   auditUserEvents.emit("user:login:failure", {
//     idUserLoginDetail: "60f8c0c2c2a1a45678abcdef",
//     sessionId: "test-session-id-1234",
//     loginDateTime: new Date(),
//   });
//   console.log("[Test] Emitting user:logout event");
//   auditUserEvents.emit("user:logout", {
//     sessionId: "test-session-id-1234",
//   });
// }, 2000);
