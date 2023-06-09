import { Message, TextChannel, CollectorFilter, ChannelType, ButtonBuilder, ButtonStyle, Colors } from 'discord.js';

export async function createTicket(message: Message): Promise<void> {
    const filter: CollectorFilter<any> = (m) => m.author.id === message.author.id;

    const collectedData: {
        title?: string;
        description?: string;
        channelID?: string;
        categoryID?: string;
    } = {};

    // Prompt the user for the title
    message.channel.send('Please enter the title of the ticket:');
    const collectedTitle = await message.channel.awaitMessages({
        filter: filter,
        max: 1,
        time: 60000,
        errors: ['time'],
    });
    collectedData.title = collectedTitle.first()?.content;

    // Prompt the user for the description
    message.channel.send('Please enter the description of the ticket:');
    const collectedDescription = await message.channel.awaitMessages({
        filter: filter,
        max: 1,
        time: 60000,
        errors: ['time'],
    });
    collectedData.description = collectedDescription.first()?.content;

    // Prompt the user for the channel ID
    message.channel.send('Please enter the channel ID where the ticket should be created:');
    const collectedChannelID = await message.channel.awaitMessages({
        filter:filter,
        max: 1,
        time: 60000,
        errors: ['time'],
    });
    collectedData.channelID = collectedChannelID.first()?.content;

    // Check if the channel ID is a valid text channel
    const channel = message.guild?.channels.cache.get(String(collectedData.channelID));
    if (!(channel instanceof TextChannel)) {
        message.channel.send('Invalid channel ID! Please provide a valid text channel ID.');
        return;
    }

    // Prompt the user for the category ID
    message.channel.send('Please enter the category ID where the ticket should be created:');
    const collectedCategoryID = await message.channel.awaitMessages({
        filter: filter,
        max: 1,
        time: 60000,
        errors: ['time'],
    });
    collectedData.categoryID = collectedCategoryID.first()?.content;

    // Check if the category ID is valid
    const category = message.guild?.channels.cache.get(String(collectedData.categoryID));
    if (!category || category.type !== ChannelType.GuildCategory) {
        message.channel.send('Invalid category ID! Please provide a valid category ID.');
        return;
    }

    const panelMessage = await channel.send({
        embeds: [{
            title: 'Ticket Panel',
            description: `**${collectedData.title}**\n${collectedData.description}`,
            color: Colors.Blurple, 
        }],
        components: [{
            type: 1,
            components: [
                new ButtonBuilder()
                    .setCustomId('ticketOpen')
                    .setLabel('create-ticket')
                    .setStyle(ButtonStyle.Success)
            ],
        }],
    })
    .catch((error) => {
        console.error('Error creating ticket panel:', error);
    });
    // Send a confirmation message
    message.channel.send('Ticket Panel created!');
}
