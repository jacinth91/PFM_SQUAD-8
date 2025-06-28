const express = require("express");
const router = express.Router();
const { funds, orders, orderById } = require("../controllers/order");

router.post("/funds", funds);
router.post("/orders", orders);
router.post("/orderById", orderById);

module.exports = router;
