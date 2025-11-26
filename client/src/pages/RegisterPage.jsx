import React, { useState } from 'react';
import axios from '../utils/axios'; // Використовуємо налаштований axios
import { useNavigate, Link } from 'react-router-dom'; // ⭐ ІМПОРТ LINK
import '../App.css'; // Для стилів

const RegisterPage = () => {
    const navigate = useNavigate();
    // Додаємо поле fullName для реєстрації
    const [creds, setCreds] = useState({ username: '', password: '', fullName: '' }); 
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const username = creds.username.trim();
        const password = creds.password.trim();
        const fullName = creds.fullName.trim(); // Отримуємо повне ім'я
        
        // 1. Валідація: мінімальна довжина пароля (навіть якщо є minLength в input)
        if (password.length < 6) {
             setError("Пароль повинен містити мінімум 6 символів.");
             return;
        }
        if (!username || !password || !fullName) {
            setError("Будь ласка, заповніть усі поля.");
            return;
        }

        try {
            // ⭐ ЗАПИТ НА СЕРВЕР (POST /auth/register)
            await axios.post('/auth/register', { username, password, fullName });
            
            // ⭐ УСПІХ: Повідомлення та редирект
            alert('Реєстрація успішна! Тепер увійдіть.');
            navigate('/'); // Перенаправляємо на сторінку логіну
            
        } catch (err) {
            // Обробка помилок 400/409 (Користувач існує, невірний формат)
            setError(err.response?.data?.message || 'Помилка реєстрації. Спробуйте інший логін.');
        }
    };

    return (
        <>
            {/* 1. ХЕДЕР (Копія з LoginPage) */}
            <header className="app-header">
                <a href="/home" className="app-header__logo">Речове майно роти</a>
                <nav className="app-header__nav">
                    <a href="/home" className="app-header__link">Головна</a>
                    <a href="/about" className="app-header__link">Про сайт</a>
                    <a href="/news" className="app-header__link">Новини</a>
                    <a href="/contacts" className="app-header__link">Контакти</a>
                </nav>
                <div>
                    <button className="btn-login-header">Увійти</button>
                    <button className="btn-theme-toggle">🌙</button> 
                </div>
            </header>

            {/* 2. СТОРІНКА РЕЄСТРАЦІЇ */}
            <div className="login-page">
                <div className="login-form-container">
                    <h2 className="login-form-container__title">Реєстрація</h2>
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        
                        {/* ПОЛЕ ПОВНОГО ІМЕНІ */}
                        <div className="form-group">
                            <label htmlFor="reg-name">Повне ім'я</label>
                            <input 
                                id="reg-name"
                                type="text" 
                                onChange={e => setCreds({...creds, fullName: e.target.value})}
                                required
                            />
                        </div>
                        {/* ПОЛЕ ЛОГІНУ */}
                        <div className="form-group">
                            <label htmlFor="reg-username">Логін</label>
                            <input 
                                id="reg-username"
                                type="text" 
                                onChange={e => setCreds({...creds, username: e.target.value})}
                                required
                            />
                        </div>
                        
                        {/* ПОЛЕ ПАРОЛЯ */}
                        <div className="form-group">
                            <label htmlFor="reg-password">Пароль (мінімум 6)</label>
                            <input 
                                id="reg-password"
                                type="password" 
                                onChange={e => setCreds({...creds, password: e.target.value})}
                                minLength="6" 
                                required
                            />
                        </div>
                        
                        {error && <p style={{color: 'red', textAlign: 'center', fontSize: '0.9em'}}>{error}</p>}
                        
                        <button type="submit" className="btn-submit">
                            Зареєструватися
                        </button>
                    </form>
                    
                    <div className="register-link">
                        {/* ⭐ ВИКОРИСТАННЯ LINK ДЛЯ ПЕРЕХОДУ НА СТОРІНКУ ЛОГІНУ */}
                        <Link to="/" className="register-link__login">Вже є аккаунт? Увійти</Link>
                    </div>
                </div>
            </div>
            
            {/* 3. ФУТЕР */}
            <footer className="app-footer">
                © 2025 Duty Roster Portal. Курсовий проект.
            </footer>
        </>
    );
};

export default RegisterPage;