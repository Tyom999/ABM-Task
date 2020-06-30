const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        clientId: Schema.Types.ObjectId,

        message: [{
            messages: String,
            fromId: Schema.Types.ObjectId,
            sendId: Schema.Types.ObjectId,
            data: Date
        }
        ]
    }
);

let Chat = mongoose.model("theChat", chatSchema);

module.exports = Chat;

