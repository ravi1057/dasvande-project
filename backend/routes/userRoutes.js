const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");

router.post("/add", userController.addUser);

router.get("/", authMiddleware.authenticateUser, userController.getAllUsers);

router.get("/:userId", userController.getUserById);

router.put("/:userId", userController.updateUserStatus);


router.delete(
  "/:userId",
  authMiddleware.authenticateUser,
  roleMiddleware.checkRole("admin"),
  userController.deleteUser
);

module.exports = router;
