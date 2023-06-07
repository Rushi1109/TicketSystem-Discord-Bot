import dotenv from 'dotenv';
import { Client, Message, GatewayIntentBits, PermissionFlagsBits } from "discord.js";
import { TicketHandler } from "../handlers/ticketHandler";


dotenv.config({path: '../config.env'});

// Created a discord client
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]});
const ticketHandler = new TicketHandler();

client.on('ready', () => {
    console.log(`Bot is ready. Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', (message: Message) => {
    console.log(message.content);
    if (message.author.bot || !message.content.startsWith(String(process.env.PREFIX))) return;
    
    if(message.content.startsWith('!create-ticket')){
        ticketHandler.handleMessage(message);
    }
});

client.login(process.env.BOT_TOKEN);