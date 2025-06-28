// models/AuditAction.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const auditActionSchema = new Schema(
  {
    idUserLoginDetail: {
      type: Schema.Types.ObjectId,
      ref: "UserLoginDetail",
      required: true,
    },
    userAction: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDateTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    collection: "audit_action",
  }
);

const AuditAction = model("AuditAction", auditActionSchema);
module.exports = AuditAction;
