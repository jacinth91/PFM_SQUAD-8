const { User } = require("../models/User");
const auditEmitter = require("../events/auditEvents");

exports.register = async (req, res) => {
  try {
    let { FIRST_NAME, LAST_NAME, EMAIL_ADDRESS, password } = req.body;
    let user;
    user = await User.create({
      FIRST_NAME,
      LAST_NAME,
      EMAIL_ADDRESS,
      password,
    });
    auditEmitter.emit("user:register", {
      idUserLoginDetail: user?._id,
      sessionId: "N/A", // or null
    });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
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
