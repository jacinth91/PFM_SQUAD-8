const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const logger = require("../utils/logger"); 

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    logger.warn("Unauthorized access attempt - No token provided");
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      logger.warn(`User not found for token ID: ${decoded.id}`);
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user;
    logger.info(`Authorized access by user ${user.email || user.id}`);
    next();
  } catch (error) {
    logger.error("JWT verification failed", error);
    return res.status(500).json({
      success: false,
      error: "Not authorized",
    });
  }
};
