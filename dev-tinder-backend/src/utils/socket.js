const { Server } = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat.model");

const getSecureRoomId = (secret) => {
    return crypto.createHash("sha256").update(secret).digest("hex")
}


const initializeSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    }
    )

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join', ({ userId, targetUserId, userName }) => {
            const room = [userId, targetUserId].sort().join('_')
            console.log(`Client ${userName} ${socket.id} joined room: ${room}`);
            console.log(`roomId===>>>connection  ---emit>${room}`)
            socket.join(room);
        });

        socket.on('sendmessage', async (data) => {
            const { id, firstName, userId, targetUserId, sender, text, time, isMe } = data
            console.log(`in send message emit call`)
            const room = [userId, targetUserId].sort().join('_')

            console.log(`roomId===>>>send message emit --->${room}`)
            try {
                let chat = await Chat.findOne({
                    participants: { $all: [userId, targetUserId] },
                });

                if (!chat) {
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: [],
                    });
                }

                chat.messages.push({
                    senderId: userId,
                    text,
                });

                await chat.save();
                io.to(room).emit("messageReceived", { firstName, text })
            } catch (error) {
                console.error(`Error while creating chat:${error.message}`)
            }
        })


        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });

    });

    io.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
    });

    return io;
}

module.exports = { initializeSocket };