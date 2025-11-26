const User = require('../models/User.js');

// Логін
exports.login = async (req, res) => {
  const raw = req.body || {};
  const username = raw.username ? String(raw.username).trim() : '';
  const password = raw.password ? String(raw.password).trim() : '';
  console.log('[auth.login] incoming body:', { username, passwordLength: password.length });
  
  try {
    const user = await User.findOne({ username }).select('+password');
    // ... (DEV-only debug output - залишаємо його для діагностики) ...
    // ...

    if (!user) {
      console.log('[auth.login] user not found:', username);
      return res.status(400).json({ message: 'Невірний логін або пароль' });
    }
    
    const stored = user.password ? String(user.password).trim() : '';
    if (stored !== password) {
      console.log('[auth.login] wrong password for user:', username, { storedRepr: stored, incomingRepr: password });
      return res.status(400).json({ message: 'Невірний логін або пароль' });
    }

    // УСПІХ
    res.json({ 
      username: user.username, 
      role: user.role, 
      fullName: user.fullName 
    });
  } catch (err) {
    console.error('[auth.login] error:', err);
    res.status(500).json({ error: 'Помилка сервера при авторизації. Див. консоль.' });
  }
};

// ----------------------------------------------------------------------
// ⭐ ФУНКЦІЯ: РЕЄСТРАЦІЯ КОРИСТУВАЧА
// ----------------------------------------------------------------------
exports.register = async (req, res) => {
    const { username: rawUsername, password: rawPassword, fullName: rawFullName } = req.body;
    
    const username = rawUsername ? String(rawUsername).trim() : '';
    const password = rawPassword ? String(rawPassword).trim() : '';
    const fullName = rawFullName ? String(rawFullName).trim() : 'Новий користувач';

    if (!username || !password) {
        return res.status(400).json({ message: 'Введіть логін та пароль.' });
    }
    
    // Перевірка мінімальної довжини
    if (password.length < 6) {
        return res.status(400).json({ message: 'Пароль має бути не менше 6 символів.' });
    }

    try {
        // Перевірка, чи існує користувач
        let user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ message: 'Користувач з таким логіном вже існує.' });
        }

        // ⭐ ТУТ ВІДБУВАЄТЬСЯ СТВОРЕННЯ ЗАПИСУ В БД
        user = new User({ 
            username, 
            password,
            fullName,
            role: 'user' 
        });
        await user.save(); // <-- ЗБЕРЕЖЕННЯ В MONGO
        
        // УСПІХ
        res.status(201).json({ 
            message: 'Реєстрація успішна. Тепер увійдіть.', 
            username: user.username,
            fullName: user.fullName
        });

    } catch (err) {
        console.error("[auth.register] error:", err);
        res.status(500).json({ error: 'Помилка сервера при реєстрації.' });
    }
};

// ----------------------------------------------------------------------


// Тимчасовий DEV-ендпоінт для створення тестового користувача
exports.createTestUser = async (req, res) => {
  const raw = req.body || {};
  const username = raw.username ? String(raw.username).trim() : '';
  const password = raw.password ? String(raw.password).trim() : '';
  const role = raw.role || 'admin';
  const fullName = raw.fullName || 'Admin';
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });
  
  // ⭐ ДОДАНО: Валідація мінімальної довжини для чистоти БД
  if (password.length < 6) {
    return res.status(400).json({ message: 'Пароль має бути не менше 6 символів.' });
  }
  
  try {
    let user = await User.findOne({ username });
    if (user) return res.json({ message: 'user already exists', username: user.username });
    
    user = new User({ username, password, role, fullName });
    await user.save(); // <-- ЗБЕРЕЖЕННЯ В MONGO
    
    console.log('[auth.createTestUser] created user:', username);
    return res.json({ message: 'user created', username: user.username });
  } catch (err) {
    console.error('[auth.createTestUser] error:', err);
    return res.status(500).json({ error: err.message });
  }
};