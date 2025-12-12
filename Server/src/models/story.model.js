const mongoose = require("mongoose");

const storyMediaSchema = new mongoose.Schema(
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

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  media: { type: storyMediaSchema, required: true },
  likeCount: {
    type: Number,
    default: 0,
  }
},
{
    timestamps: true
});

storySchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 }   
);

const storyModel = mongoose.model("story", storySchema);

module.exports = storyModel;