const express = require("express");
const router = express.Router();
const { create, get } = require("../controllers/account");

router.post("/create", create);
router.post("/get", get);

module.exports = router;
