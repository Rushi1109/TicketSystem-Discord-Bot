import mongoose from "mongoose";

const ticketPanelSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
    },
    categoryId:{
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const ticketPanel = mongoose.model('ticketPanel', ticketPanelSchema);

export default ticketPanel;