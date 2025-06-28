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

exports.get = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
        logger.error('Validation failed', "Invalid user id!");
        return res
        .status(400)
        .json({ success: false, error: "Invalid user id!" });
    }

    const accountDetails = await AccountDetail.find({ idUserLoginDetail: userId })
        .populate('idUserLoginDetail', 'EMAIL_ADDRESS FIRST_NAME LAST_NAME')
        .populate('createdBy', 'EMAIL_ADDRESS')
        .populate('idOrderDetail');

    if (!accountDetails || accountDetails.length === 0) {
      return res.status(404).json({ success: false, message: 'No account details found for this user' });
    }

    res.status(200).json({ success: true, data: accountDetails });

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
