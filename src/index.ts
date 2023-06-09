import dotenv from 'dotenv';
import { Client, Message, GatewayIntentBits, Interaction } from "discord.js";
import { createTicket } from "./ticketPanel/ticketPanel";
import { handleButton } from "./handlers/buttonHandler";
import { connectDB } from "./config/db";

dotenv.config({path: '../config.env'});

// Created a discord client
const client:Client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]});
connectDB();

client.on('ready', () => {
    console.log(`Bot is ready. Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', (message: Message) => {
    // Logging msgs for debugging purpose
    // console.log(message.content);                

    if (message.author.bot || !message.content.startsWith(String(process.env.PREFIX))) return;
    
    if(message.content.startsWith('!create-ticket')){
        createTicket(message);
    }
});

client.on('interactionCreate', (interaction: Interaction) => {
    if(interaction.isButton()){
        handleButton(interaction, client);
    }
});

client.login(process.env.BOT_TOKEN);