const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("All fields are required");
  }
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    if(!user?.enabled){
      return res.status(401).json("please contact admin");
    }
    res.status(200).json({ accessToken, username: user?.username, email: user?.email, role: user?.role});
  } else {
    return res.status(401).json("email or password is not valid");
  }
};

exports.forgotPassword = async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    if(!username || !newPassword) {
      return res.status(400).json({message:'All fields are required'})
    }
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedpassword;
    user.save();
    // const token = crypto.randomBytes(20).toString("hex");

  //  / user.resetPasswordToken = token;
    // user.resetPasswordExpires = Date.now() + 3600000;
    // await user.save();

    return res.status(200).json({message: "Password updated succesfully", status: 200})
    } catch (error) {
    console.error("Forgot password error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
