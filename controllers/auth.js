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

const sendToken = (user, statusCode, res) => {
  const token = user.getSignToken();
  user.password = null;
  return res.status(statusCode).json({ success: true, token, user });
};
