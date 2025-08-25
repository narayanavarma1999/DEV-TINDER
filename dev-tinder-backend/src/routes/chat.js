const express = require("express");
const { Chat } = require("../models/chat.model");
const { userAuth } = require("../middlewares/user.auth");

const chatRouter = express.Router();

chatRouter.get("/:targetUserId", userAuth, async (req, res) => {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    try {
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
        }).populate({
            path: "messages.senderId",
            select: "_id firstName lastName",
        });

        if (!chat) {
            // If no chat exists, create a new one
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            });
            await chat.save();
        }

        res.json({ chat });
    } catch (error) {
        console.log(`error while fetching chat: ${error.message}`);
        res.status(500).json({ message: "Server error while fetching chat" });
    }
});

module.exports = chatRouter;
