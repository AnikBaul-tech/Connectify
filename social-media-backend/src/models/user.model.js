const mongoose = require("mongoose");
const accountName = require("../middlewares/randomAccountNameGenrate")

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  age: Number,
  contactNumber: String,
  profile: {
    accountName: {
      type: String,
    },
    bio: {
      type: String,
      default: "",
    },
    profileAvatar: String,
  },
  account: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: Date,
  },
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
},
    {
        timestamps: true
    }
);

userSchema.pre("save",accountName);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
