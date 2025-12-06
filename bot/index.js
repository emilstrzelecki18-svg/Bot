import { Client, GatewayIntentBits, Collection, REST, Routes, Events } from 'discord.js';
import config from './config.js';

import ticketpanelCommand from './commands/ticketpanel.js';
import categorySelectHandler from './handlers/categorySelect.js';
import closeTicketHandler from './handlers/closeTicket.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection();
client.commands.set(ticketpanelCommand.data.name, ticketpanelCommand);

const handlers = new Collection();
handlers.set(categorySelectHandler.customId, categorySelectHandler);
handlers.set(closeTicketHandler.customId, closeTicketHandler);

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(config.token);
  const commands = [ticketpanelCommand.data.toJSON()];

  try {
    console.log('Started refreshing application (/) commands.');

    if (config.guildId) {
      await rest.put(
        Routes.applicationGuildCommands(config.clientId, config.guildId),
        { body: commands }
      );
      console.log(`Successfully registered commands for guild ${config.guildId}`);
    } else {
      await rest.put(
        Routes.applicationCommands(config.clientId),
        { body: commands }
      );
      console.log('Successfully registered global commands.');
    }
  } catch (error) {
    if (error.code === 50001) {
      console.error('Missing Access error when registering commands.');
      console.log('Please ensure your bot is invited with the applications.commands scope.');
      console.log(`Invite URL: https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=8&scope=bot%20applications.commands`);
    } else {
      console.error('Error registering commands:', error);
    }
  }
}

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  await registerCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      const errorMessage = { content: 'There was an error executing this command!', ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    }
  }

  if (interaction.isStringSelectMenu()) {
    const handler = handlers.get(interaction.customId);
    if (!handler) return;

    try {
      await handler.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error processing your selection!', ephemeral: true });
    }
  }

  if (interaction.isButton()) {
    const handler = handlers.get(interaction.customId);
    if (!handler) return;

    try {
      await handler.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error processing this action!', ephemeral: true });
    }
  }
});

if (!config.token) {
  console.error('Error: DISCORD_TOKEN environment variable is not set!');
  console.log('Please set the following environment variables:');
  console.log('  - DISCORD_TOKEN: Your Discord bot token');
  console.log('  - CLIENT_ID: Your Discord application client ID');
  console.log('  - GUILD_ID: Your Discord server ID (optional, for guild-specific commands)');
  console.log('  - STAFF_ROLE_ID: The role ID for staff members');
  console.log('  - SUPPORT_CATEGORY_ID: The category ID for support tickets');
  console.log('  - REPORTS_CATEGORY_ID: The category ID for report tickets');
  console.log('  - QUESTIONS_CATEGORY_ID: The category ID for question tickets');
  process.exit(1);
}

client.login(config.token);
