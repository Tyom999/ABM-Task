const io = require("socket.io");
const Chat = require("../models/Chat");

const socketService = {
    init(server) {
        this.io = io(server);
        this.startListening()
    },

    startListening() {
        const activeUsers = new Set();


        this.io.on("connection", socket => {
            socket.on("disconnect", () => {
                activeUsers.delete(socket.userId);
                socket.emit('message', 'A user has left the chat');
            });
            socket.on('sendMessage', async (data) => {
                socket.emit('eventClient', { data: 'Hello Client' });
                socket.broadcast.emit('message', 'A user has joined the chat');
                socket.emit('msgEmit', {data: data});
                let chatFind = await Chat.findOne({$and: [{userId: data.userId}, {clientId: data.clientId}]})
                    .catch(err => {
                        console.log(err);
                    });
                if (chatFind === null) {
                    let chat = new Chat({
                        userId: data.userId,
                        clientId: data.clientId,
                        message: [{
                            messages: data.messages,
                            fromId: data.fromId,
                            sendId: data.sendId,
                            data: new Date()
                        }]
                    });
                    chat.save()
                } else {
                    try {
                        let chatUpdate = await Chat.updateOne(
                            {
                                $and: [{userId: data.userId}, {clientId: data.clientId}]
                            },
                            {
                            $push: {
                                message: {
                                    messages: data.messages,
                                    fromId: data.fromId,
                                    sendId: data.sendId,
                                    data: new Date()
                                }
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
            socket.on('getAll', async (data) => {
                try {
                    let ChatGetAll = await Chat.findOne({$and: [{userId: data.userId}, {clientId: data.clientId}]});
                    console.log(ChatGetAll, 'ChatGetAll')
                } catch (e) {
                    console.log(e)
                }
            })
        });
    }
};








module.exports = socketService;
