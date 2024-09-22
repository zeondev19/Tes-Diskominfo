const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

// Import routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Use routes
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
