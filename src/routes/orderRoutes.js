const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/orders", orderController.getAllOrders);
router.post("/orders", orderController.createOrder);
router.get("/orders/:id", orderController.getOrderById);
router.delete("/orders/:id", orderController.deleteOrder);

module.exports = router;
