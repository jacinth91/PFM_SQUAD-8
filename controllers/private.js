exports.getPrivateData = async (req, res, next) => {
    res.status(200).json({
      sucess: true,
      message: "you got private data",
    });
  };
  