// import mongoose from "mongoose"
// const messageSchema=new mongoose.Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true
//     },
//     message:[{

//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Message",
//         required:true
//     }
// ]
// },{
//     timestamps:true
// })
// const MessageModal=mongoose.model("Message",messageSchema)
// export default MessageModal

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: [
        {
            type: String,
            ref: "Message",
            required: true
        }
    ]
}, {
    timestamps: true
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
