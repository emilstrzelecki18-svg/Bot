import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import config from '../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ticketpanel')
    .setDescription('Send the ticket panel with category selection'),

  async execute(interaction) {
    const panelConfig = config.embeds.ticketPanel;
    
    const embed = new EmbedBuilder()
      .setColor(panelConfig.color)
      .setTitle(panelConfig.title)
      .setDescription(panelConfig.description)
      .addFields(
        { name: 'Categories', value: config.categories.map(c => `${c.emoji} **${c.label}** - ${c.description}`).join('\n') }
      )
      .setFooter({ text: panelConfig.footer })
      .setTimestamp();

    if (panelConfig.thumbnail) {
      embed.setThumbnail(panelConfig.thumbnail);
    }
    if (panelConfig.image) {
      embed.setImage(panelConfig.image);
    }

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('ticket_category_select')
      .setPlaceholder(config.selectMenu.placeholder)
      .addOptions(
        config.categories.map(category => ({
          label: category.label,
          value: category.value,
          description: category.description,
          emoji: category.emoji
        }))
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
