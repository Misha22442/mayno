// server/api/index.js

// ⭐ 1. ЦІ РЯДКИ МАЮТЬ БУТИ АБСОЛЮТНО ПЕРШИМИ
const path = require('path'); 
require('dotenv').config({ 
    path: path.resolve(__dirname, '..', '.env') 
}); 

// 2. ІМПОРТ ЗАЛЕЖНОСТЕЙ
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); 

// ⭐ ДОДАНО: Імпорт моделей для реєстрації схем у Mongoose
const Item = require('../models/Item.js'); 
const User = require('../models/User.js');

const itemRoutes = require('../routes/itemRoutes.js');
const authRoutes = require('../routes/authRoutes.js');

const app = express();

// CORS - дозволяємо всі домени
app.use(cors({
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept', 'role']
}));

// Обробка preflight запитів
app.options('*', cors());

// ВИПРАВЛЕННЯ: Використовуємо bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Підключення до БД
const DB_URI = process.env.MONGO_URI; 

const mongooseOptions = {
    tls: true,
    serverSelectionTimeoutMS: 10000
};

mongoose.connect(DB_URI, mongooseOptions)
  .then(() => {
    console.log('MongoDB connected');

    // Маршрути
    app.use('/items', itemRoutes);
    app.use('/auth', authRoutes);

    app.get('/', (req, res) => res.send('Army Inventory API is running'));

    // Сервер стартує тільки після успішного підключення до БД
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Завершити процес, щоб не приймати запити без БД
    process.exit(1); 
  });

module.exports = app;