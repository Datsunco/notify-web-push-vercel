const express = require('express');
const cors = require('cors');
const webpush = require('web-push');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

const corsOptions = {
    origin: ['http://localhost:5173', 'https://slejyzamatchem.netlify.app'],  // Укажите URL вашего клиента
    methods: 'GET,POST',  // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization']  // Разрешенные заголовки
};


// Настройка body-parser для обработки JSON
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Установка VAPID ключей для аутентификации
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

// Маршрут для получения push subscription и отправки уведомления
app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    // Создаем уведомление
    const payload = JSON.stringify({
        message: 'Check website',
        body: '.envv notify today',
        icon: 'pwa-512x512.png',
        badge: 'pwa-192x192.png'
    });

    // Отправляем уведомление
    webpush.sendNotification(subscription, payload)
        .then(() => { res.status(200).json({ message: 'Уведомление отправлено!' }); console.log('done', subscription) })
        .catch(err => {
            console.error('Ошибка при отправке уведомления:', err);
            res.sendStatus(500);
        });
});

app.post('/sendpush', (req, res) => {
    const subscription = req.body;
    console.log(subscription)
    

    // Создаем уведомление
    const payload = JSON.stringify({
        message: 'Check website',
        body: '.envv notify today',
        icon: 'pwa-512x512.png',
        badge: 'pwa-192x192.png'
    });

    // Отправляем уведомление
    webpush.sendNotification(subscription, payload)
        .then(() => { res.status(200).json({ message: 'Уведомление отправлено!' })})
        .catch(err => {
            console.error('Ошибка при отправке уведомления:', err);
            res.sendStatus(500);
        });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
