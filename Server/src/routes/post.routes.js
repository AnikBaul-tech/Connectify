const express = require("express");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authMiddleware.authUserMiddleware,
  upload.single("media"),
  postController.createPost
);

router.get("/", authMiddleware.authUserMiddleware, postController.getPosts);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  postController.likePost
);
module.exports = router;
