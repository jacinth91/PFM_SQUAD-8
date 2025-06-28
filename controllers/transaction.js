const mongoose = require("mongoose");
const { AccountDetail } = require("../models/AccountDetail");
const { Product } = require("../models/Product");
const logger = require("../utils/logger");

exports.buyShares = async (req, res) => {
  let user = req.user;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, shares } = req.body;

    const user = await AccountDetail.findById(user._id).session(session);
    
    const product = await Product.findById(productId).session(session);
    if (!product || product.quantity < shares) {
        throw new Error("Not enough shares available");
    }
    if (!user || (user.balance < shares*product.sharePrice)) {
      throw new Error("Insufficient balance or user not found");
    }

    user.balance -= cost*product.pricePerShare;
    await user.save({ session });

    product.availableShares -= shares;
    await Product.save({ session });

   //commit transaction
    await session.commitTransaction();
    session.endSession();

    logger.info(`booked for user ${user._id}: ${shares} shares from ${productId}`);
    res.status(200).json({ success: true, message: "Trade booked successfully" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    logger.error("Trade booking failed", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
