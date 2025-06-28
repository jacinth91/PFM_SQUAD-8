const express = require("express");
const router = express.Router();
const { create, update, deleteOrder } = require("../controllers/security");

router.post("/create", create);
router.post("/update", update);
router.post("/delete", deleteOrder);

module.exports = router;
