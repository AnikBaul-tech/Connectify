const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    }
}, {
    timestamps: true
})


const saveModel = mongoose.model("save",saveSchema);

module.exports = saveModel ; 