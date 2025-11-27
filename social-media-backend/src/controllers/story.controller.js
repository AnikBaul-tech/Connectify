const storyModel = require("../models/story.model");
const storageService = require("../services/storage.services");
const { v4: uuid } = require("uuid");

async function createStory(req, res) {
  if (!req.body && !req.file) {
    res.status(400).json({
      error: "Nothing Provided",
    });
  }

  if (req.body.contentType === "text") {
    const textStory = String(req.body.content || "").trim();
    if (!textStory)
      return res.status(400).json({ error: "Text cannot be empty" });
    if (textStory.length > 5000)
      return res.status(400).json({ error: "Text too long" });

    const story = await storyModel.create({
      user: req.user._id,
      media: {
        content: textStory,
        contentType: "text",
        caption: req.body.caption.trim() || "",
      },
    });

    res.status(201).json({
      message: "Story created successfully",
      story: story,
    });
  } else {
    const storyMediaUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const story = await storyModel.create({
      user: req.user._id,
      media: {
        content: storyMediaUploadResult.url,
        contentType: req.body.contentType,
        caption: req.body.caption.trim() || "",
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      story: story,
    });
  }
}

async function getStory(req, res) {
  const stories = await storyModel
    .find({})
    .populate({ path: "user", select: "profile.accountName" });
  res.status(200).json({
    message: "Stories fetched succesfully",
    stories,
  });
}
module.exports = {
  createStory,
  getStory,
};
