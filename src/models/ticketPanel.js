"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ticketPanelSchema = new mongoose_1.default.Schema({
    messageId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
var ticketPanel = mongoose_1.default.model('ticketPanel', ticketPanelSchema);
exports.default = ticketPanel;
