// const { User } = require("../models/User");

exports.create = async (req, res) => {
  try {
    const { securityName, value } = req.body;

    // Basic input validation
    if (!['Stocks', 'Bonds', 'Mutual Funds'].includes(securityName)) return res.status(400).json({ message: "Invalid Security Name" });
    if (!value || value <= 0) return res.status(400).json({ message: "Invalid Value" });

    if (!securityName, !value) {
        return res
        .status(400)
        .json({ success: false, error: "please provide details!" });
    }
    
    sendResponse("security create api", res)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { securityId, securityName, value } = req.body;

  if (!securityId || !securityName || !value) {
    return res
      .status(400)
      .json({ success: false, error: "please provide valid details!" });
  }

  try {
    sendResponse("security update api", res)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  const { security_id } = req.body;

  if (!security_id) {
    return res
      .status(400)
      .json({ success: false, error: "please security id!" });
  }

  try {
    sendResponse("security delete api", res)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const sendResponse = (response, res) => {
  return res.status(200).json({ success: true, response });
};
