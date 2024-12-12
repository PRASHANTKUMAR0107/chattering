import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res) => {
    try {
        const{ message }= req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants :{$all: [senderId,receiverId]}, 
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId,receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //socket to be implemented

        // await conversation.save();
        // await newMessage.save();

        // runs in parallel so it is faster
        await Promise.all([conversation.save(),newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in sendMessage controller:" , error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}

export const getMessage = async(req,res) => {
    try {
        const senderId = req.user._id;
        const {id : userToChatId} = req.params;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages");

        if(!conversation){
            res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("error in getMessage controller:" , error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}