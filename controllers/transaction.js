const mongoose = require("mongoose");
const { AccountDetail } = require("../models/AccountDetail");
const { Product } = require("../models/Product");
const logger = require("../utils/logger");

exports.buyShares = async (req, res) => {
  let userOne = req.user;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, shares } = req.body;

    console.log(userOne);
    const user = await AccountDetail.findOne({ idUserLoginDetail: userOne._id }).session(session);
    const product = await Product.findById(productId).session(session);
    if (!product || product.quantity < shares) {
        throw new Error("Not enough shares available");
    }
    if (!user || (user.runningBalance > shares*product.sharePrice)) {
      throw new Error("Insufficient balance or user not found");
    }

    user.runningBalance -= shares*product.pricePerShare;
    await user.save({ session });

    product.availableShares -= shares;
    await product.save({ session });

   //commit transaction
    await session.commitTransaction();
    session.endSession();

    logger.info(`bought for user ${user._id}: ${shares} shares from ${productId}`);
    res.status(200).json({ success: true, message: "Trade booked successfully" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    logger.error("Trade booking failed", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
