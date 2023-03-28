const express = require("express");
const { default: mongoose } = require("mongoose");
const router = require("./routers");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// App Initial
const app = express();

// DB INIT
mongoose.connect(process.env.DB_URL, { dbName: "order_eshop" });
mongoose.connection.on("open", () => {
  console.log("The database running successfully ...");
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/orders", router);

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
