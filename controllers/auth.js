const { User } = require("../models/User");

exports.register = async (req, res) => {
  try {
    let { FIRST_NAME, LAST_NAME, EMAIL_ADDRESS, password } = req.body;
    let user;
        user = await User.create({
          FIRST_NAME,
          LAST_NAME,
          EMAIL_ADDRESS,
          password
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

exports.login = async (req, res, next) => {
  const { EMAIL_ADDRESS, password } = req.body;

  if (!EMAIL_ADDRESS || !password) {
    return res
      .status(400)
      .json({ success: false, error: "please provide email and password" });
  }

  try {
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
