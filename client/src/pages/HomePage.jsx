import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="app-header">
        <a href="/home" className="app-header__logo">Речове майно роти</a>
        <nav className="app-header__nav">
          <button onClick={() => navigate('/home')} className="app-header__link">Головна</button>
          <button onClick={() => navigate('/about')} className="app-header__link">Про сайт</button>
          <button onClick={() => navigate('/news')} className="app-header__link">Новини</button>
          <button onClick={() => navigate('/contacts')} className="app-header__link">Контакти</button>
        </nav>
        <div>
          <button className="btn-login-header" onClick={() => navigate('/')}>Увійти</button>
          <button className="btn-theme-toggle">🌙</button>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <h1>Система управління речовим майном роти</h1>
          <p>Зручна та безпечна система обліку всього майна</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Почати роботу</button>
        </section>

        <section className="info-section">
          <h2>Про систему</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>📊 Облік майна</h3>
              <p>Ведіть детальний облік всього майна роти. Записуйте серійні номери, стан та місцезнаходження кожної речи.</p>
            </div>
            <div className="info-card">
              <h3>👤 Розподіл</h3>
              <p>Призначайте речі конкретним людям та отримуйте звіти про розподіл майна в роті.</p>
            </div>
            <div className="info-card">
              <h3>🗑️ Списання</h3>
              <p>Легко списуйте зношене або втрачене майно з документуванням причини списання.</p>
            </div>
            <div className="info-card">
              <h3>📈 Звіти</h3>
              <p>Отримуйте детальні звіти про стан майна, кількість и розподіл ресурсів.</p>
            </div>
            <div className="info-card">
              <h3>🔐 Безпека</h3>
              <p>Захищений доступ з авторизацією. Тільки уповноважені користувачі можуть змінювати дані.</p>
            </div>
            <div className="info-card">
              <h3>📱 Мобільно</h3>
              <p>Адаптивний дизайн що працює на всіх пристроях - комп'ютер, планшет, телефон.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Готові почати?</h2>
          <p>Зареєструйтеся або увійдіть до системи, щоб розпочати роботу</p>
          <div className="button-group">
            <button className="btn-primary" onClick={() => navigate('/')}>Увійти</button>
            <button className="btn-secondary" onClick={() => navigate('/register')}>Зареєструватися</button>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        © 2025 Duty Roster Portal. Курсовий проект.
      </footer>
    </div>
  );
};

export default HomePage;
