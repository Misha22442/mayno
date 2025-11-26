const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js'); // Додано розширення для надійності

// -----------------------------------------------------------
// 1. ГОЛОВНІ МАРШРУТИ (LOGIN та REGISTER)
// -----------------------------------------------------------

// Роут для логіну (ВХІД)
if (authController && typeof authController.login === 'function') {
    router.post('/login', authController.login);
} else {
    console.error('[authRoutes] authController.login is not a function — registering fallback 501 route');
    router.post('/login', (req, res) => res.status(501).json({ message: 'Auth login not available on server' }));
}

// ⭐ ДОДАНО: Роут для реєстрації (ЗАРЕЄСТРУВАТИСЯ)
if (authController && typeof authController.register === 'function') {
    router.post('/register', authController.register);
} else {
    console.error('[authRoutes] authController.register is not a function — registering fallback 501 route');
    router.post('/register', (req, res) => res.status(501).json({ message: 'Auth register not available on server' }));
}

// -----------------------------------------------------------
// 2. ДОПОМІЖНІ / ТЕСТОВІ МАРШРУТИ
// -----------------------------------------------------------

// Тестовий роут для створення користувача (DEV only)
if (typeof authController.createTestUser === 'function') {
    router.post('/create-test-user', authController.createTestUser);
} else {
    console.warn('[authRoutes] createTestUser handler is missing — registering fallback 501 route');
    router.post('/create-test-user', (req, res) => res.status(501).json({ message: 'Not implemented' }));
}

// DEV-only: return list of users (no passwords) to help debugging DB contents
if (process.env.NODE_ENV !== 'production') {
    if (typeof authController.debugListUsers === 'function') {
        router.get('/debug/users', authController.debugListUsers);
    } else {
        router.get('/debug/users', async (req, res) => {
            try {
                // Використовуємо явний шлях, оскільки це не контролер
                const User = require('../models/User.js'); 
                const users = await User.find({}, { password: 0, __v: 0 }).lean();
                return res.json({ count: users.length, users });
            } catch (err) {
                console.error('[authRoutes] /debug/users error:', err);
                return res.status(500).json({ error: 'Server error' });
            }
        });
    }
}

module.exports = router;