# Discord Bot Design Guidelines

## Project Overview
This is a Discord bot application with no web frontend. All user interaction occurs within Discord's native UI using embeds, buttons, and select menus.

## Discord UI Design Approach

**Embed Design**
- Use Discord's native embed structure for all messages
- Primary embed color: #5865F2 (Discord Blurple) for system messages
- Success embeds: #57F287 (Green)
- Error embeds: #ED4245 (Red)
- Information embeds: #5865F2 (Blue)

**Typography Hierarchy**
- Embed titles: Bold, clear category names
- Descriptions: Concise, action-oriented language
- Field names: Short labels (e.g., "Category:", "Ticket Number:")
- Field values: Dynamic data in regular weight

**Component Organization**

Ticket Panel Embed:
- Title: "🎫 Support Ticket System"
- Description: Clear instructions for category selection
- Select menu below embed with distinct category options

Ticket Channel Embed:
- Title format: "Ticket: [Category Name]"
- Include ticket number prominently
- Add creation timestamp
- Close button clearly labeled "🔒 Close Ticket"

**Interaction Patterns**
- Select menu: Single-select with 3+ categories (Support, Reports, Questions)
- Buttons: Emoji + text labels for clarity
- Response messages: Ephemeral for confirmation/errors
- Channel names: Lowercase, hyphenated format (ticket-support-001)

**Permission Structure**
- Ticket channels: Private by default
- Visible to: Ticket creator + staff role only
- Staff role ID: Placeholder `YOUR_STAFF_ROLE_ID` in code

**Data Management**
- Auto-increment ticket numbers per category
- Store in ticketCounter.json with category-based counters
- Channel naming: ticket-{category}-{paddedNumber}

**User Feedback**
- Immediate ephemeral confirmation when category selected
- Clear success message with channel mention
- 5-second warning before ticket closure
- All actions provide visible feedback

## Design Principles
- **Clarity**: Every interaction has clear purpose and outcome
- **Consistency**: Unified embed formatting across all bot messages
- **Accessibility**: Emoji indicators supplement text labels
- **Efficiency**: Minimal clicks to complete ticket workflow