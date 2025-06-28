const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var options = { discriminatorKey: "type" };

/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       required:
 *         - EMAIL_ADDRESS
 *         - password
 *         - FIRST_NAME
 *         - LAST_NAME
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *           example: 507f1f77bcf86cd799439011
 *         EMAIL_ADDRESS:
 *           type: string
 *           format: email
 *           description: User's email address (must be unique)
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           description: User's hashed password (minimum 6 characters)
 *           example: $2a$10$hashedpasswordstring
 *         FIRST_NAME:
 *           type: string
 *           description: User's first name
 *           example: John
 *         LAST_NAME:
 *           type: string
 *           description: User's last name
 *           example: Doe
 *         CREATED_ON:
 *           type: string
 *           format: date-time
 *           description: Date when the user was created
 *           example: 2023-01-01T00:00:00.000Z
 *         CREATED_BY:
 *           type: string
 *           description: User who created this record
 *           example: system
 *         MODIFIED_ON:
 *           type: string
 *           format: date-time
 *           description: Date when the user was last modified
 *           example: 2023-01-01T00:00:00.000Z
 *         MODIFIED_BY:
 *           type: string
 *           description: User who last modified this record
 *           example: john.doe@example.com
 */

const UserSchema = new mongoose.Schema(
  {
    EMAIL_ADDRESS: {
      type: String,
      required: [true, "please provide an email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "please add a password"],
      minlength: 6,
      select: false,
    },
    FIRST_NAME: {
      type: String,
      required: [true, "please provide a first name"],
    },
    LAST_NAME: {
      type: String,
      required: [true, "please provide a last name"],
    },
    CREATED_ON: { type: Date, default: Date.now },
    CREATED_BY: {
      type: String,
    },
    MODIFIED_ON: {
      type: Date,
    },
    MODIFIED_BY: {
      type: String,
    }
  },
  options
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
