import dotenv from 'dotenv';
import { Client, Message, GatewayIntentBits, Interaction } from "discord.js";
import { createTicket } from "./ticketPanel/ticketPanel";
import { handleButton } from "./handlers/buttonHandler";


dotenv.config({path: '../config.env'});

// Created a discord client
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]});

client.on('ready', () => {
    console.log(`Bot is ready. Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', (message: Message) => {
    console.log(message.content);
    if (message.author.bot || !message.content.startsWith(String(process.env.PREFIX))) return;
    
    if(message.content.startsWith('!create-ticket')){
        createTicket(message);
    }
});

client.on('interactionCreate', (interaction: Interaction) => {
    if(interaction.isButton()){
        handleButton(interaction);
    }
});

client.login(process.env.BOT_TOKEN);