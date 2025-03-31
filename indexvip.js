const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function runBot() {
    try {
        const cookies = fs.readFileSync('cookie.txt', 'utf-8').trim().split('\n');
        const emails = fs.readFileSync('email.txt', 'utf-8').trim().split('\n');
        
        if (cookies.length !== emails.length) {
            console.log('Jumlah cookies dan email tidak cocok!');
            return;
        }

        for (let i = 0; i < cookies.length; i++) {
            console.log(`Processing for email: ${emails[i]}`);
            await fetchQuests(cookies[i]);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function fetchQuests(cookie) {
    try {
        const response = await axios.get('https://www.magicnewton.com/portal/api/userQuests', {
            headers: {
                'Cookie': cookie,
                'User-Agent': 'Mozilla/5.0'
            }
        });
        
        if (response.data) {
            console.log('Quests:', response.data);
        } else {
            console.log('No quests found.');
        }
    } catch (error) {
        console.error('Failed to fetch quests:', error.message);
    }
}

runBot();
