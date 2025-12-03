const userModel = require("../models/user.model");
const storageService = require("../services/storage.services");
const { v4: uuid } = require("uuid");

async function getUser(req, res) {
  return res.json({
    user: req.user,
    authentication: true,
  });
}

async function editAccountDetails(req, res) {
  const user = req.user;
  const bio = String(req.body.bio || "").trim();

  if (bio.length > 5000)
    return res.json({
      message: "Too long bio",
    });
  const profileAvatarUpload = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );
  const updatedAccount = await userModel.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        "profile.bio": bio,
        "profile.profileAvatar": profileAvatarUpload.url,
      },
    },
    { new: true }
  ).exec();
  res
    .status(201)
    .json({
      message: "Account Updated successfully",
      account: user,
    });
  console.log(updatedAccount);
}

module.exports = {
  getUser,
  editAccountDetails,
};
