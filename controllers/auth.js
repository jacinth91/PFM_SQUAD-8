const { User } = require("../models/User");
const auditEmitter = require("../events/auditEvents");
const logger = require("../utils/logger");
const { AccountDetail } = require("../models/AccountDetail");

exports.register = async (req, res) => {
  try {
    logger.info("registerring user into database...");
    let { FIRST_NAME, LAST_NAME, EMAIL_ADDRESS, password } = req.body;
    let user;
    user = await User.create({
      FIRST_NAME,
      LAST_NAME,
      EMAIL_ADDRESS,
      password,
    });

    // Add user information in account details
    const userId = user._id;
    const newAccount = new AccountDetail({
      idUserLoginDetail: userId,
      credit: 5000,
      debit: 0,
      createdBy: userId,
    });

    await newAccount.save();

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    logger.error("registration failed", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  logger.info("login user into database...");
  try {
    const { EMAIL_ADDRESS, password } = req.body;

    const newAccount = new AccountDetail({
      idUserLoginDetail: "665b83c4e78b6dd832a1e12f",
      credit: 5000,
      debit: 0,
      createdBy: "665b83c4e78b6dd832a1e12f",
    });

    await newAccount.save();

    if (!EMAIL_ADDRESS || !password) {
      logger.error("registration failed", "please provide email and password");
      return res
        .status(400)
        .json({ success: false, error: "please provide email and password" });
    }
    const user = await User.findOne({ EMAIL_ADDRESS }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "invalid credentials" });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, error: "invalid credentials" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    logger.error("registration failed", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignToken();
  user.password = null;
  return res.status(statusCode).json({ success: true, token, user });
};
