const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to authenticate users
exports.authenticateUser = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
       return  res.status(401).json("user is not authorized");
      }
      console.log(decoded);
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401).json("user is unatuhtorized or token is the mssing");
    }
  }
};
