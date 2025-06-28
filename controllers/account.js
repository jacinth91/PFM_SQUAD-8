const { AccountDetail } = require('../models/AccountDetail');

exports.create = async (req, res) => {
  try {
    const newAccount = new AccountDetail({
        idUserLoginDetail: '665b83c4e78b6dd832a1e12f',
        credit: 5000,
        debit: 0,
        createdBy: '665b83c4e78b6dd832a1e12f'
    });

    await newAccount.save();
    
    sendResponse("accounts profile added!", res)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const sendResponse = (response, res) => {
  return res.status(200).json({ success: true, response });
};
