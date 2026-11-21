const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "accessToken"]
}));

const db = require("./models");
const errorHandler = require("./middlewares/errorHandler");

// Routers
const userRoutes = require("./routes/Users");
app.use("/api/auth", userRoutes);

/*const dashboardRoutes = require("./routes/Dashboard");
app.use("/dashboard", dashboardRoutes);*/

const productsRoutes = require("./routes/Products");
app.use("/api/products", productsRoutes);

const categoriesRoutes = require("./routes/Categories");
app.use("/api/categories", categoriesRoutes);

const ordersRoutes = require("./routes/Orders");
app.use("/api/orders", ordersRoutes);

const orderItemsRoutes = require("./routes/OrderItems");
app.use("/api/order-items", orderItemsRoutes);

const rawMaterialRoutes = require("./routes/RawMaterial");
app.use("/api/raw-materials", rawMaterialRoutes);

const vendorsRoutes = require("./routes/Vendors");
app.use("/api/vendors", vendorsRoutes);

const ExpensesRoutes = require("./routes/Expenses");
app.use("/api/expenses", ExpensesRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});


// serve React build
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.use(errorHandler); 

db.sequelize.sync().then(() => {
  app.listen(3000,() => {
    console.log("Server running on port 3000");
  });
});

