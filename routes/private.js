const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/private");
//const { protect } = require("../middleware/auth");

router.get("/", getPrivateData);

module.exports = router;
