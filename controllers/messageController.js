// import chatModel from "../models/chatModel";
// import MessageModal from "../models/messageModel";

// export const CreateMessage=async(req,res)=>{
//     try {
//         const {senderId, receiverId, message}=req.body
//         if(!senderId || !receicerId || !message){
//             return res.status(400).json({
//                 success:false,
//                 message:`${senderId ? "Sender Id": !receiverId ? "Receiver Id": "Message"} is required.`,
//             });
//         }
//         const newMessage=new MessageModal({
//             userId:senderId, 
//             message
//         })
//         const savemessage= await newMessage.save()
//         let chat=await chatModel.findOne({
//             members:{
//                 $all:[senderId, receiverId],
//                 $size: 2
//             }
//         })
//         if (chat){
//             chat=await chatModel.findByIdAndUpdate(chat._id,{
//                 $push:{
//                     message:savemessage._id
//                 }
//             },{new:true})
//         }else{
//             chat =new chatModel({
//                 members:[senderId, receiverId],
//                 messages:[savemessage._id]
//             })
//             await chat.save()
//         }
//         return res.status(200).json({
//             success:true,
//             message:"Message sent successfully",
//             data:{
//                 newMessage: savemessage,
//                 chat:chat,
//             },
//         })
//     } catch (error) {
//         console.log("error")
//         res.status(500).json({
//             success:false,
//             message:"Internal server error"
//         })
//     }
// }




const chatModel = require("../models/chatModel");
const MessageModel = require("../models/messageModel");


//post message
exports.CreateMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;
        
        if (!senderId || !receiverId || !message) {
            return res.status(400).json({
                success: false,
                message: `${senderId ? "Receiver Id" : "Sender Id"} is required.`,
            });
        }

        const newMessage = new MessageModel({
            userId: senderId, 
            message
        });

        const saveMessage = await newMessage.save();

        let chat = await chatModel.findOne({
            members: {
                $all: [senderId, receiverId],
                $size: 2
            }
        });

        if (chat) {
            chat = await chatModel.findByIdAndUpdate(
                chat._id, 
                {
                $push: {
                    messages:[saveMessage._id]
                }
            }, { new: true });
        } else {
            chat = new chatModel({
                members: [senderId, receiverId],
                messages: [saveMessage._id]
            });
            await chat.save();
        }

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: {
                newMessage: saveMessage,
                chat: chat,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


//get message
exports.GetMessage = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        if (!senderId || !receiverId) { 
            return res.status(400).json({
                success: false,
                message: `${senderId ? "Sender Id" : !receiverId ? "Reciever Id ": "Messages"} is required.`,
            });
        }

        const chat = await chatModel.findOne({
            members: {
                $all: [senderId, receiverId],
                $size: 2
            }
        }).populate("messages")

        if(!chat){
            return res.status(404).json({
                success:false,
                message:"No Conversation found"
            })
        }
        return res.status(200).json({ 
            success:true,   
            message:"Conversation found",
            data:chat.messages
        })
    } catch (error) {
        console.log("err",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        }) 
    }
}

