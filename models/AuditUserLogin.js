// models/AuditUserLogin.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const auditUserLoginSchema = new Schema(
  {
    idUserLoginDetail: {
      type: Schema.Types.ObjectId,
      ref: "UserLoginDetail", // Foreign key reference
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    loginStatus: {
      type: String,
      enum: ["SUCCESS", "FAILURE", "LOGGED_OUT"],
      required: true,
    },
    loginDateTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    logoutDateTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    collection: "audit_user_login",
  }
);

// Optional: add index for sessionId
auditUserLoginSchema.index({ sessionId: 1 });

const AuditUserLogin = model("AuditUserLogin", auditUserLoginSchema);
export default AuditUserLogin;
