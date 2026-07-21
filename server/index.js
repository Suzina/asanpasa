const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "accessToken"]
}));

const db = require("./models");

// Routers

const userRoutes = require("./routes/Users");
app.use("/auth", userRoutes);

const dashboardRoutes = require("./routes/Dashboard");
app.use("/dashboard", dashboardRoutes);

const categoriesRoutes = require("./routes/Categories");
app.use("/categories", categoriesRoutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});