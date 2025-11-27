const express = require("express");
const storyController = require("../controllers/story.controller");
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
  storyController.createStory
);

router.get("/",authMiddleware.authUserMiddleware,storyController.getStory)


module.exports = router;