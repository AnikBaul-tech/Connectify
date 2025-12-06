const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", authMiddleware.authUserMiddleware, userController.getUser);

router.post(
  "/edit/account",
  authMiddleware.authUserMiddleware,
  upload.single("media"),
  userController.editAccountDetails
);

module.exports = router;
