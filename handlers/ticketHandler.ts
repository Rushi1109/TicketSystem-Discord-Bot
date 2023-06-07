import { Message, User } from "discord.js";
import { Ticket } from "../models/ticket";

export class TicketHandler{
    private ticket: Ticket[];

    constructor(){
        this.ticket = []
    }

    public handleMessage(message: Message): void{
            let user = message.author;

            let title:Promise<string> = userInput(message, user, `Enter the title for ticket Panel`)
    }
}

async function userInput(msg: Message, user: User, cstmMsg: string):Promise<string>{
    // Filter for collectiong message from same user
    msg.channel.send(cstmMsg);
    let filter = (msg) => !msg.author.bot && msg.author == user;
    let rtnString: string = "";

    let collector = msg.channel.createMessageCollector({filter: filter, max:1, time: 15000});

    await collector.on('collect', m => {
        rtnString = String(m);
    });

    collector.on('end', collected => {
        if(collected.size == 0){
            msg.channel.send(`Couldn't get message from user try again!`);
        }
    });

    return rtnString;
}