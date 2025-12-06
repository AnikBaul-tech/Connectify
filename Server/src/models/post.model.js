const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    content: { type: String }, // url or text
    contentType: {
      type: String,
      enum: ["image", "video", "text"],
      required: true,
    },
    caption: { type: String },
  },
  { _id: false }
);
// user:- , media.content = url , media.contentType = "video" , media.caption = 
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    media: { type: MediaSchema, required: true },
    likeCount: {
      type: Number,
      default: 0,
    },
    saveCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
