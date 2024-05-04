const express = require("express");
const app = express();
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors())
app.use("/users", userRoutes);

app.use("/auth", authRoutes);

module.exports = app;
