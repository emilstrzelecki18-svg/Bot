import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } from 'discord.js';
import config from '../config.js';
import { incrementTicketCounter, formatTicketNumber } from '../utils/ticketUtils.js';

export default {
  customId: 'ticket_category_select',

  async execute(interaction) {
    const category = interaction.values[0];
    const categoryInfo = config.categories.find(c => c.value === category);
    const ticketNumber = incrementTicketCounter(category);
    const formattedNumber = formatTicketNumber(ticketNumber);
    const channelName = `ticket-${category}-${formattedNumber}`;

    const categoryChannelId = config.categoryChannels[category];

    try {
      const ticketChannel = await interaction.guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: categoryChannelId,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionFlagsBits.ViewChannel]
          },
          {
            id: interaction.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory
            ]
          },
          {
            id: config.staffRoleId,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.ManageChannels
            ]
          }
        ]
      });

      const createdConfig = config.embeds.ticketCreated;
      const description = createdConfig.description.replace('{user}', interaction.user.toString());

      const ticketEmbed = new EmbedBuilder()
        .setColor(createdConfig.color)
        .setTitle(`Ticket: ${categoryInfo.label}`)
        .setDescription(description)
        .addFields(
          { name: 'Category', value: `${categoryInfo.emoji} ${categoryInfo.label}`, inline: true },
          { name: 'Ticket Number', value: `#${formattedNumber}`, inline: true },
          { name: 'Created By', value: `${interaction.user}`, inline: true }
        )
        .setFooter({ text: createdConfig.footer })
        .setTimestamp();

      if (createdConfig.thumbnail) {
        ticketEmbed.setThumbnail(createdConfig.thumbnail);
      }
      if (createdConfig.image) {
        ticketEmbed.setImage(createdConfig.image);
      }

      const closeButton = new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel(config.buttons.close.label)
        .setStyle(ButtonStyle.Danger)
        .setEmoji(config.buttons.close.emoji);

      const row = new ActionRowBuilder().addComponents(closeButton);

      await ticketChannel.send({
        content: `${interaction.user} | <@&${config.staffRoleId}>`,
        embeds: [ticketEmbed],
        components: [row]
      });

      const confirmEmbed = new EmbedBuilder()
        .setColor(config.embeds.ticketConfirm.color)
        .setDescription(`Your ticket has been created: ${ticketChannel}`)
        .setFooter({ text: `Ticket #${formattedNumber}` });

      await interaction.reply({
        embeds: [confirmEmbed],
        flags: 64
      });

    } catch (error) {
      console.error('Error creating ticket channel:', error);

      const errorConfig = config.embeds.error;
      const errorEmbed = new EmbedBuilder()
        .setColor(errorConfig.color)
        .setTitle(errorConfig.title)
        .setDescription(errorConfig.description);

      await interaction.reply({
        embeds: [errorEmbed],
        flags: 64
      });
    }
  }
};
