const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountDetailSchema = new Schema({
  idUserLoginDetail: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  credit: {
    type: Number,
    default: 0
  },
  debit: {
    type: Number,
    default: 0
  },
  runningBalance: {
    type: Number,
    default: 10000
  },
  idOrderDetail: {
    type: Schema.Types.ObjectId,
    ref: 'OrderDetail',
    required: false
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserLoginDetail',
  }
});

const AccountDetail = mongoose.model("Account_Detail", AccountDetailSchema);

module.exports = { AccountDetail };