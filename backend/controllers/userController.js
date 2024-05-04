const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  const { username, email, password, enabled } = req.body;
  console.log("The request body is the", req.body);

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fiedls are required" });
    }
    // Check if user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists that name" });
    }
    //hashed the password
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword, "====>hashedpassword");
    const user = await User.create({
      username,
      email,
      password: hashedpassword,
      enabled: enabled || false,
    });
    if (user) {
      res.status(201).json("user registered succesfully");
    } else {
      res.status(400).json("user data us not valid");
    }
    res.json({ message: "Add  the User" });
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ message: "Internal server error", error: error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findById(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { enabled } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { enabled },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User status updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(username);
    console.log(deletedUser, "====>deletedUser");

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
