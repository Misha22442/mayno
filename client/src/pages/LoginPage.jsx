import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/authSlice';
import '../App.css'; 

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [creds, setCreds] = useState({ username: '', password: '' });

    // Функція, яка дозволяє кнопці "Увійти" в хедері прокрутити до форми
    const handleHeaderLogin = () => {
        const formElement = document.getElementById('login-form-id');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const username = creds.username.trim();
        const password = creds.password.trim();

        // 1. Валідація мінімальної довжини пароля
        if (password.length < 6) {
             alert("Пароль повинен містити мінімум 6 символів.");
             return;
        }

        // 2. Валідація заповнення полів
        if (!username || !password) {
            alert("Будь ласка, введіть логін та пароль.");
            return;
        }

        // Надсилаємо чисті дані
        dispatch(loginUser({ username, password }));
    };

    return (
        <>
            {/* 1. ХЕДЕР (Навігаційна панель) */}
            <header className="app-header">
                {/* ЗМІНЕНО: Назва проекту */}
                <a href="/home" className="app-header__logo">Речове майно роти</a>
                <nav className="app-header__nav">
                    <a href="/home" className="app-header__link">Головна</a>
                    <a href="/about" className="app-header__link">Про сайт</a>
                    <a href="/news" className="app-header__link">Новини</a>
                    <a href="/contact" className="app-header__link">Контакти</a>
                </nav>
                <div>
                    <button className="btn-login-header" onClick={handleHeaderLogin}>Увійти</button>
                    <button className="btn-theme-toggle">🌙</button> 
                </div>
            </header>

            {/* 2. СТОРІНКА ЛОГІНУ (Центрування форми) */}
            <div className="login-page">
                {/* ⭐ ДОДАНО ID для скролінгу */}
                <div className="login-form-container" id="login-form-id"> 
                    <h2 className="login-form-container__title">Увійти в систему</h2>
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        
                        {/* ПОЛЕ ЛОГІНУ */}
                        <div className="form-group">
                            <label htmlFor="login-username">Логін</label>
                            <input 
                                id="login-username"
                                type="text" 
                                placeholder="Введіть логін"
                                onChange={e => setCreds({...creds, username: e.target.value})}
                                required
                            />
                        </div>
                        
                        {/* ПОЛЕ ПАРОЛЯ */}
                        <div className="form-group">
                            <label htmlFor="login-password">Пароль</label>
                            <input 
                                id="login-password"
                                type="password" 
                                placeholder="Пароль"
                                onChange={e => setCreds({...creds, password: e.target.value})}
                                minLength="6" 
                                required
                            />
                        </div>
                        
                        {/* КНОПКА SUBMIT */}
                        <button type="submit" className="btn-submit">
                            Увійти
                        </button>
                    </form>
                    
                    <div className="register-link">
                        Немає акаунту? <a href="/register">Зареєструватися</a>
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

export default LoginPage;