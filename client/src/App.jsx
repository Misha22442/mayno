import React from 'react';
import { useSelector } from 'react-redux';
// ⭐ ДОДАНО: Імпорти для роутингу
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 

import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
// ⭐ ДОДАНО: Імпорт сторінки реєстрації
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import ContactsPage from './pages/ContactsPage';
import './App.css';

// Головний компонент, який керує відображенням сторінок
const AppRoutes = () => {
    // Отримуємо статус авторизації з Redux
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        // Визначаємо маршрути
        <Routes>
            
            {/* 1. Захищений маршрут: Якщо isAuth=true, показуємо Dashboard */}
            <Route 
                path="/dashboard" 
                element={isAuth ? <DashboardPage /> : <Navigate to="/" />} 
            />

            {/* 2. Інформаційні сторінки - доступні всім */}
            <Route 
                path="/home" 
                element={<HomePage />} 
            />
            <Route 
                path="/about" 
                element={<AboutPage />} 
            />
            <Route 
                path="/news" 
                element={<NewsPage />} 
            />
            <Route 
                path="/contacts" 
                element={<ContactsPage />} 
            />
            
            {/* 3. Відкриті маршрути: Логін та Реєстрація */}
            {/* Головна сторінка: Якщо вже авторизований, редирект на Dashboard */}
            <Route 
                path="/" 
                element={isAuth ? <Navigate to="/dashboard" /> : <LoginPage />} 
            />
            
            {/* Сторінка реєстрації */}
            <Route 
                path="/register" 
                element={isAuth ? <Navigate to="/dashboard" /> : <RegisterPage />} 
            />
            
            {/* Обробка неіснуючих шляхів */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

function App() {
    // Обгортаємо всю програму в BrowserRouter
    return (
        <Router>
             <div className="app">
                 <AppRoutes />
             </div>
        </Router>
    );
}

export default App;