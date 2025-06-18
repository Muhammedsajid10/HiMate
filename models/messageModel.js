
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: { // rename here
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {  // single string, not array
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const MessageModel = mongoose.model("Message", messageSchema);
module.exports = MessageModel;
