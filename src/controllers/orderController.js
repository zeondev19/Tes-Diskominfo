const Order = require("../models/orderModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json({ message: "Order List", data: orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving orders", error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const newOrder = await Order.create(products);
    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.getById(req.params.id);
    if (order) {
      res.json({ message: "Order Detail", data: order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving order", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.delete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};
