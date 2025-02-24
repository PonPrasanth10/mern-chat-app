import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers =await User.find({ _id: {$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.log("Error in geiUsersForSidebar controller "+error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getMessages = async(req,res) => {

    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;
    
        const messages = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId}
            ]
        })
    
        res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in getmessage controller "+error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessage = async(req,res) => {
    
    
    try {
        
        const {text,image} = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl=uploadResponse.secure_url
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        })
        
        await newMessage.save()
        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in send message controller "+error.message)
        res.status(500).json({message:"Internal server error"})
    }


}
export const deleteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;

        // Check if messageId exists
        if (!messageId) {
            throw new Error("Message ID is missing");
        }

        // Attempt to delete the message
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        // Check if message was actually found and deleted
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        // Emit event to notify clients
        io.emit("messageDeleted", messageId);

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Error deleting message:", error); // Print full error stack
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



