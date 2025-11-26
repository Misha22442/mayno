const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /contact - відправка форми звернення на email
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Валідація
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Всі поля обов\'язкові' });
        }

        // Налаштування транспорту для Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // App Password від Gmail
            }
        });

        // Лист для адміністратора
        const mailToAdmin = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // На вашу пошту
            subject: `[Форма звернення] ${subject}`,
            html: `
                <h2>Нове звернення з сайту</h2>
                <p><strong>Ім'я:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Тема:</strong> ${subject}</p>
                <p><strong>Повідомлення:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><em>Відправлено з Army Inventory App</em></p>
            `
        };

        // Лист-підтвердження для користувача
        const mailToUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Ваше звернення отримано - Army Inventory',
            html: `
                <h2>Дякуємо за звернення!</h2>
                <p>Шановний(а) ${name},</p>
                <p>Ми отримали ваше повідомлення і відповімо найближчим часом.</p>
                <hr>
                <p><strong>Ваше звернення:</strong></p>
                <p><strong>Тема:</strong> ${subject}</p>
                <p><strong>Повідомлення:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p>З повагою,<br>Команда Army Inventory</p>
            `
        };

        // Відправляємо обидва листи
        await transporter.sendMail(mailToAdmin);
        await transporter.sendMail(mailToUser);

        res.json({ success: true, message: 'Повідомлення успішно відправлено!' });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Помилка відправки повідомлення. Спробуйте пізніше.' });
    }
});

module.exports = router;
