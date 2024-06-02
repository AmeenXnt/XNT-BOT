const { Baileys, delay } = require('@whiskeysockets/baileys');
const express = require('express');
const app = express();

const baileys = new Baileys();

app.post('/pair', async (req, res) => {
const phoneNumber = req.body.phoneNumber;
const pairingCode = Math.floor(Math.random() * 10000000);
const qrCode = await baileys.generateQRCode(phoneNumber, pairingCode);
res.json({ pairingCode, qrCode });
});

baileys.on('message', async (message) => {
if (message.body === 'ping') {
baileys.sendMessage('Pong!');
}
});

baileys.start();
