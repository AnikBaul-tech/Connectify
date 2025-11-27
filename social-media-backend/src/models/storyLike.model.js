const mongoose = require("mongoose");

const storyLikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'story',
        required: true
    }
}, {
    timestamps: true
})


const storyLikeModel = mongoose.model("storyLike",storyLikeSchema);

module.exports = storyLikeModel ; 