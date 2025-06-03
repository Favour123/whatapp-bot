// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const cron = require('node-cron');

// // Initialize the WhatsApp client
// const client = new Client({
//     authStrategy: new LocalAuth()
// });

// // Birthday data - Add your contacts with their phone numbers and birth dates
// const birthdayContacts = [
//     {
//         name: "Iyunade",
//         phone: "2349151459299@c.us", // Format: countrycode + number + @c.us (234 + 9151459299)
//         birthDate: { month: 6, day: 30 } // June 30th
//     },
//     // Add more contacts here
//     // To get someone's WhatsApp ID, you can use: contact.id._serialized
// ];

// // Generate QR code for WhatsApp Web authentication
// client.on('qr', (qr) => {
//     console.log('Scan this QR code with your WhatsApp:');
//     qrcode.generate(qr, { small: true });
    
//     // For server deployment: log the QR code data
//     console.log('QR Code data (use online QR generator if needed):', qr);
// });

// // Client ready event
// client.on('ready', () => {
//     console.log('WhatsApp Bot is ready!');
//     console.log('Birthday messages scheduled for June!');
// });

// // Function to send birthday message
// async function sendBirthdayMessage(contact) {
//     try {
//         const message = `🎉 Happy Birthday to you, ${contact.name}! 🎂\n\nWishing you a wonderful day filled with joy and celebration! 🎈`;
        
//         await client.sendMessage(contact.phone, message);
//         console.log(`Birthday message sent to ${contact.name} (${contact.phone})`);
//     } catch (error) {
//         console.error(`Failed to send message to ${contact.name}:`, error);
//     }
// }

// // Function to send daily birthday messages throughout June
// function sendDailyJuneBirthdayMessages() {
//     const today = new Date();
//     const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
//     const currentDay = today.getDate();
    
//     // Only send messages in June (month 6) and for days 1-30
//     if (currentMonth === 6 && currentDay >= 1 && currentDay <= 30) {
//         console.log(`Sending daily birthday messages for June ${currentDay}...`);
        
//         birthdayContacts.forEach(contact => {
//             // Send message every day in June regardless of actual birth date
//             sendBirthdayMessage(contact);
//         });
//     } else if (currentMonth === 6 && currentDay > 30) {
//         console.log('June birthday messages completed for the month.');
//     } else {
//         console.log('Not June - no birthday messages to send.');
//     }
// }

// // Schedule daily birthday messages to run every day at 9:00 AM throughout June
// cron.schedule('0 9 * 6 *', () => {
//     console.log('Running daily June birthday messages at 9:00 AM...');
//     sendDailyJuneBirthdayMessages();
// });

// // Optional: Manual command to test daily birthday messages
// client.on('message', async (message) => {
//     if (message.body === '!testbirthday' && message.from.endsWith('@c.us')) {
//         // Send test birthday message to the sender
//         const testMessage = "🎉 Happy Birthday to you! 🎂\n\nThis is a test birthday message! 🎈";
//         await client.sendMessage(message.from, testMessage);
//     }
    
//     // Command to manually trigger daily birthday messages
//     if (message.body === '!senddaily' && message.from.endsWith('@c.us')) {
//         console.log('Manual trigger for daily birthday messages...');
//         sendDailyJuneBirthdayMessages();
//         await client.sendMessage(message.from, 'Daily birthday messages sent!');
//     }
    
//     // Command to get your own WhatsApp ID (useful for adding contacts)
//     if (message.body === '!myid') {
//         await client.sendMessage(message.from, `Your WhatsApp ID is: ${message.from}`);
//     }
// });

// // Error handling
// client.on('auth_failure', (msg) => {
//     console.error('Authentication failed:', msg);
// });

// client.on('disconnected', (reason) => {
//     console.log('WhatsApp disconnected:', reason);
// });

// // Start the client
// client.initialize();

// // Graceful shutdown
// process.on('SIGINT', async () => {
//     console.log('\nShutting down WhatsApp bot...');
//     await client.destroy();
//     process.exit(0);
// });

// console.log('Starting WhatsApp Birthday Bot...');
// console.log('This bot will send daily birthday messages throughout June!');
// console.log('Schedule: Every day at 9:00 AM from June 1st to June 30th');
// console.log('Make sure to:');
// console.log('1. Add your contacts to the birthdayContacts array');
// console.log('2. Scan the QR code with your WhatsApp');
// console.log('3. Keep this script running throughout June to send daily messages');

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const http = require('http');

// Create a simple HTTP server for Render
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <h1>WhatsApp Birthday Bot</h1>
        <p>Status: ${client.info ? 'Connected ✅' : 'Connecting... ⏳'}</p>
        <p>Bot is running and will send birthday messages in June!</p>
        <p>Last check: ${new Date().toLocaleString()}</p>
    `);
});

// Start server on Render's port or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Health check server running on port ${PORT}`);
});

// Initialize the WhatsApp client with network-friendly settings
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
        ],
        timeout: 60000 // 60 seconds timeout
    }
});

// Birthday data - Add your contacts with their phone numbers and birth dates
const birthdayContacts = [
    {
        name: "Iyunade",
        phone: "2349151459299@c.us", // Format: countrycode + number + @c.us (234 + 9151459299)
        birthDate: { month: 6, day: 30 } // June 30th
    },
    // Add more contacts here
    // To get someone's WhatsApp ID, you can use: contact.id._serialized
];

// Generate QR code for WhatsApp Web authentication
client.on('qr', (qr) => {
    console.log('Scan this QR code with your WhatsApp:');
    qrcode.generate(qr, { small: true });
    
    // For server deployment: log the QR code data
    console.log('QR Code data (use online QR generator if needed):', qr);
});

// Client ready event
client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
    console.log('Birthday messages scheduled for June!');
});

// Function to send birthday message
async function sendBirthdayMessage(contact) {
    try {
        const message = `🎉 Happy Birthday to you, ${contact.name}! 🎂\n\nWishing you a wonderful day filled with joy and celebration! 🎈`;
        
        await client.sendMessage(contact.phone, message);
        console.log(`Birthday message sent to ${contact.name} (${contact.phone})`);
    } catch (error) {
        console.error(`Failed to send message to ${contact.name}:`, error);
    }
}

// Function to send daily birthday messages throughout June
function sendDailyJuneBirthdayMessages() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
    const currentDay = today.getDate();
    
    // Only send messages in June (month 6) and for days 1-30
    if (currentMonth === 6 && currentDay >= 1 && currentDay <= 30) {
        console.log(`Sending daily birthday messages for June ${currentDay}...`);
        
        birthdayContacts.forEach(contact => {
            // Send message every day in June regardless of actual birth date
            sendBirthdayMessage(contact);
        });
    } else if (currentMonth === 6 && currentDay > 30) {
        console.log('June birthday messages completed for the month.');
    } else {
        console.log('Not June - no birthday messages to send.');
    }
}

// Schedule daily birthday messages to run every day at 9:00 AM throughout June
cron.schedule('0 9 * 6 *', () => {
    console.log('Running daily June birthday messages at 9:00 AM...');
    sendDailyJuneBirthdayMessages();
});

// Optional: Manual command to test daily birthday messages
client.on('message', async (message) => {
    if (message.body === '!testbirthday' && message.from.endsWith('@c.us')) {
        // Send test birthday message to the sender
        const testMessage = "🎉 Happy Birthday to you! 🎂\n\nThis is a test birthday message! 🎈";
        await client.sendMessage(message.from, testMessage);
    }
    
    // Command to manually trigger daily birthday messages
    if (message.body === '!senddaily' && message.from.endsWith('@c.us')) {
        console.log('Manual trigger for daily birthday messages...');
        sendDailyJuneBirthdayMessages();
        await client.sendMessage(message.from, 'Daily birthday messages sent!');
    }
    
    // Command to get your own WhatsApp ID (useful for adding contacts)
    if (message.body === '!myid') {
        await client.sendMessage(message.from, `Your WhatsApp ID is: ${message.from}`);
    }
});

// Error handling
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
    console.log('Please delete .wwebjs_auth folder and restart the bot');
});

client.on('disconnected', (reason) => {
    console.log('WhatsApp disconnected:', reason);
    console.log('Bot will attempt to reconnect...');
});

// Add loading event
client.on('loading_screen', (percent, message) => {
    console.log('Loading...', percent, message);
});

// Add authenticated event
client.on('authenticated', () => {
    console.log('Authentication successful!');
});

// Add timeout for QR code generation
setTimeout(() => {
    if (!client.info) {
        console.log('If no QR code appeared, try deleting .wwebjs_auth folder and restart');
    }
}, 30000); // 30 seconds timeout

// Start the client
client.initialize();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down WhatsApp bot...');
    await client.destroy();
    process.exit(0);
});

console.log('Starting WhatsApp Birthday Bot...');
console.log('This bot will send daily birthday messages throughout June!');
console.log('Schedule: Every day at 9:00 AM from June 1st to June 30th');
console.log('Make sure to:');
console.log('1. Add your contacts to the birthdayContacts array');
console.log('2. Scan the QR code with your WhatsApp');
console.log('3. Keep this script running throughout June to send daily messages');