const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const storageService = require("../services/storage.services");
const { v4: uuid } = require("uuid");

// POST api/post/
async function createPost(req, res) {
  console.log(req.body);

  if (!req.body && !req.file) {
    res.status(400).json({
      error: "Nothing Provided",
    });
  }

  //   console.log(postMediaUploadResult);
  // user:- , media.content = url , media.contentType = "video" , media.caption =

  if (req.body.contentType === "text") {
    const textPost = String(req.body.content || "").trim();
    if (!textPost)
      return res.status(400).json({ error: "Text cannot be empty" });
    if (textPost.length > 5000)
      return res.status(400).json({ error: "Text too long" });

    const post = await postModel.create({
      user: req.user._id,
      media: {
        content: textPost,
        contentType: "text",
        caption: req.body.caption.trim() || "",
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  } else {
    const postMediaUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const post = await postModel.create({
      user: req.user._id,
      media: {
        content: postMediaUploadResult.url,
        contentType: req.body.contentType,
        caption: req.body.caption.trim() || "",
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  }
}

// GET api/post
async function getPosts(req,res){
  const posts = await postModel.find({}).populate({ path: "user", select: "profile.accountName followings followers" });
  res.status(200).json({
    message:"Posts fetched succesfully",
    posts,
  })
}

module.exports = {
  createPost,
  getPosts
};
