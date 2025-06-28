const express = require("express");
const router = express.Router();
const { create } = require("../controllers/account");

router.post("/create", create);

module.exports = router;
