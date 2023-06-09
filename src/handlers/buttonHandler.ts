import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Client, Colors, EmbedBuilder, Interaction, PermissionFlagsBits, TextChannel } from "discord.js";
import ticketPanel from "../models/ticketPanel";

export async function handleButton(interaction: Interaction, client: Client) {
    if (interaction.isButton()) {
        if (interaction.customId == 'ticketOpen') {
            const messageId:String = interaction.message?.id;
            // console.log(channelId);
            const data = await ticketPanel.findOne({ messageId: String(messageId) });
            // console.log(data);

            const categoryID = data?.categoryId;
            // console.log(categoryID);

            let channelName = `ticket-${interaction.user.id}`;
            let chn = interaction.guild?.channels.cache.find(ch => (ch.name == channelName && ch.parent?.id == categoryID));

            if (chn?.name == channelName) {
                return interaction.reply({
                    content: `You Already have one ticket running at <#${chn.id}>`,
                    ephemeral: true,
                });
            }

            await interaction.guild?.channels.create({
                name: `ticket-${interaction.user.id}`,
                parent: categoryID,
                type: ChannelType.GuildText,
                topic: `ticket of ${interaction.user.tag}`,
                permissionOverwrites: [
                    {
                        id: String(interaction.guildId),
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: String(interaction.user.id),
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: String(client.user?.id),
                        allow: [PermissionFlagsBits.Administrator, PermissionFlagsBits.ManageChannels]
                    }
                ]
            })
                .then(async (ch: TextChannel) => {
                    const embed:EmbedBuilder = new EmbedBuilder()
                        .setTitle(`Ticket of ${interaction.user.username}`)
                        .setDescription(`Kindly wait for any admin to reply\nPlease do not spam or you'll get timed out.`)
                        .setColor(Colors.Blurple);

                    const row = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('Accept')
                                .setLabel(`Accept`)
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId('Reject')
                                .setLabel(`Reject`)
                                .setStyle(ButtonStyle.Danger),
                        );

                    await ch.send({ embeds: [embed], components: [row] })
                        .catch((e) => console.log(e));

                    return interaction.reply({
                        content: `Your ticket is created <#${ch.id}>`,
                        ephemeral: true,
                    })
                })
                .catch((e) => console.log(e));
        }
    }
}