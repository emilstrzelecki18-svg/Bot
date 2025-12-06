const TICKETS_CATEGORY = '1446647362981462197';

export default {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  staffRoleId: process.env.STAFF_ROLE_ID || 'YOUR_STAFF_ROLE_ID',
  
  categories: [
    { label: 'Support', value: 'support', description: 'General support inquiries', emoji: '🛠️' },
    { label: 'Reports', value: 'reports', description: 'Report issues or players', emoji: '📋' },
    { label: 'Questions', value: 'questions', description: 'Ask questions', emoji: '❓' }
  ],
  
  categoryChannels: {
    support: TICKETS_CATEGORY,
    reports: TICKETS_CATEGORY,
    questions: TICKETS_CATEGORY
  },

  embeds: {
    ticketPanel: {
      color: 0x5865F2,
      title: 'Support Ticket System',
      description: 'Need help? Create a ticket by selecting a category below.\n\nOur team will assist you as soon as possible.',
      footer: 'Select a category to open a ticket',
      thumbnail: null,
      image: null
    },
    
    ticketCreated: {
      color: 0x57F287,
      description: 'Hello {user}, thank you for creating a ticket!\n\nPlease describe your issue and a staff member will assist you shortly.',
      footer: 'Click the button below to close this ticket',
      thumbnail: null,
      image: null
    },
    
    ticketConfirm: {
      color: 0x57F287
    },
    
    ticketClose: {
      color: 0xFEE75C,
      title: 'Ticket Closing',
      description: 'This ticket will be closed in **5 seconds**...'
    },
    
    error: {
      color: 0xED4245,
      title: 'Error',
      description: 'Failed to create ticket channel. Please make sure the bot has proper permissions and the category IDs are configured correctly.'
    }
  },

  buttons: {
    close: {
      label: 'Close Ticket',
      emoji: '🔒'
    }
  },

  selectMenu: {
    placeholder: 'Select a ticket category...'
  }
};
