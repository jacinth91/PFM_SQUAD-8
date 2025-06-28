const express = require("express");
const router = express.Router();
//const { buyShares } = require("../controllers/transaction");
const { protect } = require("../middleware/auth");

//router.post("/buy",protect, buyShares);

module.exports = router;
