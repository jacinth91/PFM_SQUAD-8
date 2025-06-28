// const { User } = require("../models/User");

exports.funds = async (req, res) => {
  try {
    const { fundName, transactionType, quantity } = req.body;

    // Basic input validation
    if (!fundName) return res.status(400).json({ message: "Fund Name is required" });
    if (!['Buy', 'Sell'].includes(transactionType)) return res.status(400).json({ message: "Invalid Transaction Type" });
    if (!quantity || quantity <= 0) return res.status(400).json({ message: "Invalid Quantity" });

    if (!fundName, !transactionType, !quantity) {
        return res
        .status(400)
        .json({ success: false, error: "please provide valid order id!" });
    }
    
    sendResponse("funds api", res)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.orders = async (req, res, next) => {
  const { EMAIL_ADDRESS, password } = req.body;

  if (!EMAIL_ADDRESS || !password) {
    return res
      .status(400)
      .json({ success: false, error: "please provide email and password" });
  }

  try {
    sendResponse("orders api", res)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.orderById = async (req, res, next) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res
      .status(400)
      .json({ success: false, error: "please provide valid order id!" });
  }

  try {
    sendResponse("order by id api", res)
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
