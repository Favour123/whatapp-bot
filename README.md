# WhatsApp Birthday Bot 🎉

A Node.js WhatsApp bot that automatically sends birthday messages throughout the month of June. Perfect for celebrating special occasions with your contacts!

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commands](#commands)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🎂 **Automated Birthday Messages** - Sends daily birthday messages throughout June
- ⏰ **Scheduled Messaging** - Automatically sends messages at 9:00 AM daily
- 🔄 **Auto-reconnection** - Handles WhatsApp disconnections gracefully
- 🌐 **Web Dashboard** - Simple health check endpoint for deployment monitoring
- 📱 **Manual Commands** - Test and trigger messages manually
- 🆔 **Contact ID Helper** - Get WhatsApp IDs for adding new contacts
- ☁️ **Cloud Ready** - Configured for deployment on platforms like Render

## 🔧 Prerequisites

Before running this bot, make sure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** package manager
- **WhatsApp account** with WhatsApp Web access
- **Chrome/Chromium** browser dependencies (automatically handled)

## 🚀 Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repository-url>
   cd whatsapp-birthday-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your contacts** (see [Configuration](#configuration) section)

4. **Run the bot**
   ```bash
   npm start
   ```

## ⚙️ Configuration

### Adding Birthday Contacts

Edit the `birthdayContacts` array in `index.js`:

```javascript
const birthdayContacts = [
    {
        name: "ade",
        phone: "234915148@c.us", // Format: countrycode + number + @c.us
        birthDate: { month: 6, day: 30 } // June 30th
    },
    {
        name: "John Doe",
        phone: "1234567890@c.us", // Add country code (e.g., 1 for US)
        birthDate: { month: 6, day: 15 } // June 15th
    }
    // Add more contacts here...
];
```

### Phone Number Format

WhatsApp phone numbers must follow this format:
- **Format**: `[country_code][phone_number]@c.us`
- **Example**: For Nigerian number 09151459299, use `2349151459@c.us`
- **US Example**: For US number (555) 123-4567, use `155512367@c.us`

### Getting Contact WhatsApp IDs

Use the `!myid` command to get someone's WhatsApp ID:
1. Ask them to send `!myid` to your bot
2. The bot will reply with their WhatsApp ID
3. Add this ID to your `birthdayContacts` array

## 📱 Usage

### First Time Setup

1. **Start the bot**
   ```bash
   npm start
   ```

2. **Scan QR Code**
   - A QR code will appear in your terminal
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices > Link a Device
   - Scan the QR code

3. **Wait for Connection**
   - Look for "WhatsApp Bot is ready!" message
   - The bot is now connected and scheduled

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## 🎯 Commands

The bot responds to these manual commands:

| Command | Description | Usage |
|---------|-------------|-------|
| `!testbirthday` | Send a test birthday message to yourself | Send this message to the bot |
| `!senddaily` | Manually trigger daily birthday messages | Send this message to the bot |
| `!myid` | Get your WhatsApp ID for contact setup | Send this message to the bot |

### Example Usage

```
You: !testbirthday
Bot: 🎉 Happy Birthday to you! 🎂
     This is a test birthday message! 🎈

You: !myid
Bot: Your WhatsApp ID is: 1234567890@c.us
```

## 🚀 Deployment

### Local Deployment

```bash
npm start
```

### Cloud Deployment (Render/Heroku)

The bot includes a health check server for cloud platforms:

1. **Environment Variables** (if needed)
   ```
   PORT=3000  # Automatically set by most platforms
   ```

2. **Deploy to Render**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - The bot will be accessible at your Render URL

3. **Health Check Endpoint**
   - Visit your deployed URL to see bot status
   - Shows connection status and last check time

### Important Deployment Notes

- **QR Code Scanning**: You'll need to scan the QR code after each deployment
- **Persistent Session**: The bot saves WhatsApp session data in `.wwebjs_auth` folder
- **Keep Running**: For cloud platforms, make sure your service doesn't sleep

## 📁 Project Structure

```
whatsapp-birthday-bot/
├── index.js              # Main bot application
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lock file
├── .wwebjs_auth/         # WhatsApp session data (auto-generated)
├── .gitignore           # Git ignore file
└── README.md            # This documentation
```

## 🔄 How It Works

### Automatic Scheduling

The bot uses `node-cron` to schedule messages:
```javascript
// Runs every day at 9:00 AM throughout June
cron.schedule('0 9 * 6 *', () => {
    sendDailyJuneBirthdayMessages();
});
```

### Message Flow

1. **Daily Check**: At 9:00 AM, bot checks if it's June
2. **Send Messages**: If it's June 1-30, sends birthday messages to all contacts
3. **Logging**: Logs all activities to console
4. **Error Handling**: Continues running even if individual messages fail

### Birthday Message Template

```
🎉 Happy Birthday to you, [Name]! 🎂

Wishing you a wonderful day filled with joy and celebration! 🎈
```

## 🔧 Troubleshooting

### Common Issues

**QR Code not appearing:**
```bash
# Delete auth folder and restart
rm -rf .wwebjs_auth
npm start
```

**Bot not sending messages:**
- Check if it's June (messages only send in June)
- Verify contact phone numbers are in correct format
- Check console for error messages

**Authentication failed:**
```bash
# Clear authentication and restart
rm -rf .wwebjs_auth
npm start
```

**Deployment issues:**
- Ensure your cloud platform supports headless Chrome
- Check if PORT environment variable is set correctly
- Monitor logs for Puppeteer errors

### Debug Tips

1. **Check Bot Status**
   - Visit your health check URL (if deployed)
   - Look for "WhatsApp Bot is ready!" in logs

2. **Test Commands**
   - Use `!testbirthday` to verify bot is responding
   - Use `!myid` to confirm message receiving works

3. **Manual Trigger**
   - Use `!senddaily` to test message sending without waiting

### Log Messages

The bot provides detailed logging:
```
Starting WhatsApp Birthday Bot...
Authentication successful!
WhatsApp Bot is ready!
Birthday messages scheduled for June!
Running daily June birthday messages at 9:00 AM...
Birthday message sent to Iyunade (2349151459299@c.us)
```

## 📦 Dependencies

### Production Dependencies

- **whatsapp-web.js** (^1.30.0) - WhatsApp Web API client
- **qrcode-terminal** (^0.12.0) - QR code generation for terminal
- **node-cron** (^4.1.0) - Task scheduling

### Development Dependencies

- **nodemon** (^3.1.10) - Auto-restart during development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Test thoroughly
5. Commit changes (`git commit -m 'Add new feature'`)
6. Push to branch (`git push origin feature/new-feature`)
7. Create Pull Request

### Development Guidelines

- Follow existing code style
- Add console logging for new features
- Test with `!testbirthday` command
- Update README for new features

## 🔒 Security & Privacy

- **Local Storage**: WhatsApp session stored locally in `.wwebjs_auth`
- **No Data Collection**: Bot doesn't store or transmit personal data
- **Contact Privacy**: Phone numbers only used for sending messages
- **Open Source**: All code is visible and auditable

## 📋 Customization Ideas

### Message Templates
- Customize birthday messages in `sendBirthdayMessage()` function
- Add personalized messages per contact
- Include images or stickers

### Scheduling Options
- Change timing: Modify cron schedule `'0 9 * 6 *'`
- Different months: Change month number in schedule
- Multiple times: Add more cron schedules

### Additional Features
- Add different message types
- Include weather information
- Send follow-up messages
- Add group messaging

## 📞 Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review console logs for error messages
3. Test with manual commands (`!testbirthday`)
4. Clear auth folder and restart if needed

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **whatsapp-web.js** - Amazing WhatsApp Web API
- **node-cron** - Reliable task scheduling
- **qrcode-terminal** - Terminal QR code generation

---

**Happy Birthday Bot** - Spreading joy one message at a time! 🎉