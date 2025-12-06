# Discord Ticket Bot

## Overview
A complete Discord bot built with discord.js v14 featuring a ticket system with category selection.

## Project Structure
```
bot/
├── index.js                 # Main bot entry point
├── config.js                # Configuration settings
├── ticketCounter.json       # Persistent ticket numbering
├── commands/
│   └── ticketpanel.js       # /ticketpanel slash command
├── handlers/
│   ├── categorySelect.js    # Handle category dropdown selection
│   └── closeTicket.js       # Handle close ticket button
└── utils/
    └── ticketUtils.js       # Ticket counter utilities
```

## Features
- `/ticketpanel` slash command sends embed with category dropdown
- Customizable ticket categories (Support, Reports, Questions)
- Auto-creates private ticket channels
- Auto-incrementing ticket numbers (ticket-support-001 format)
- Channels visible only to ticket creator and staff role
- Close Ticket button with 5-second deletion delay

## Required Environment Variables
- `DISCORD_TOKEN` - Bot token from Discord Developer Portal
- `CLIENT_ID` - Application client ID
- `GUILD_ID` - Server ID for guild-specific commands (optional)
- `STAFF_ROLE_ID` - Role ID for staff members
- `SUPPORT_CATEGORY_ID` - Category channel ID for support tickets
- `REPORTS_CATEGORY_ID` - Category channel ID for report tickets
- `QUESTIONS_CATEGORY_ID` - Category channel ID for question tickets

## Running the Bot
```bash
node bot/index.js
```

## Adding New Categories
Edit `bot/config.js` and add to the `categories` array:
```js
{ label: 'NewCategory', value: 'newcategory', description: 'Description', emoji: '📌' }
```
Also add the corresponding category channel ID in `categoryChannels`.

## Recent Changes
- Initial implementation of ticket system
- Created slash command /ticketpanel
- Added category selection dropdown
- Implemented private ticket channels
- Added ticket counter persistence
- Added close ticket functionality
