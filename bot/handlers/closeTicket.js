import { EmbedBuilder } from 'discord.js';
import config from '../config.js';

export default {
  customId: 'close_ticket',

  async execute(interaction) {
    const closeConfig = config.embeds.ticketClose;
    
    const closeEmbed = new EmbedBuilder()
      .setColor(closeConfig.color)
      .setTitle(closeConfig.title)
      .setDescription(closeConfig.description)
      .setFooter({ text: `Closed by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [closeEmbed] });

    setTimeout(async () => {
      try {
        await interaction.channel.delete();
      } catch (error) {
        console.error('Error deleting ticket channel:', error);
      }
    }, 5000);
  }
};
