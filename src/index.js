"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var discord_js_1 = require("discord.js");
var ticketPanel_1 = require("./ticketPanel/ticketPanel");
dotenv_1.config({ path: '../config.env' });
// Created a discord client
var client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.MessageContent, discord_js_1.GatewayIntentBits.GuildMessages] });
client.on('ready', function () {
    var _a;
    console.log("Bot is ready. Logged in as ".concat((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag));
});
client.on('messageCreate', function (message) {
    console.log(message.content);
    if (message.author.bot || !message.content.startsWith(String(process.env.PREFIX)))
        return;
    if (message.content.startsWith('!create-ticket')) {
        (0, ticketPanel_1.createTicket)(message);
    }
});
client.login(process.env.BOT_TOKEN);
