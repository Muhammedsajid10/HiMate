const chatModel = require("../models/chatModel");
const MessageModel = require("../models/messageModel");


//post message//
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
            senderId: senderId,
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
                        messages: [saveMessage._id]
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
                message: `${senderId ? "Sender Id" : !receiverId ? "Reciever Id " : "Messages"} is required.`,
            });
        }

        const chat = await chatModel.findOne({
            members: {
                $all: [senderId, receiverId],
                $size: 2
            }
            // }).populate("messages")
        }).populate({
            path: "messages",
            populate: {
                path: "senderId",   // populate senderId to get user info
                select: "_id name"  // optionally get the user's name or other fields
            }
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "No Conversation found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Conversation found",
            data: chat.messages
        })
    } catch (error) {
        console.log("err", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



// DELETE: Delete a message

exports.DeleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { senderId, receiverId } = req.query;

        if (!messageId || !senderId || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing"
            });
        }

        // Delete the message from messages collection
        const deletedMsg = await MessageModel.findByIdAndDelete(messageId);

        if (!deletedMsg) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        // Remove from chat messages array
        await chatModel.findOneAndUpdate(
            { members: { $all: [senderId, receiverId] } },
            { $pull: { messages: messageId } }
        );

        return res.status(200).json({
            success: true,
            message: "Message deleted successfully",
            deletedId: messageId
        });
    } catch (error) {
        console.log("DeleteMessage error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
