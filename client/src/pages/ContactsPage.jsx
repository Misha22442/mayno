import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import '../styles/InfoPages.css';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.error || 'Помилка відправки. Спробуйте пізніше.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="info-page">
      <header className="app-header">
        <a href="/home" className="app-header__logo">Речове майно роти</a>
        <nav className="app-header__nav">
          <a href="/home" className="app-header__link">Головна</a>
          <a href="/about" className="app-header__link">Про сайт</a>
          <a href="/news" className="app-header__link">Новини</a>
          <a href="/contacts" className="app-header__link active">Контакти</a>
        </nav>
        <div>
          <button className="btn-login-header" onClick={() => navigate('/')}>Увійти</button>
          <button className="btn-theme-toggle">🌙</button>
        </div>
      </header>

      <main className="info-main">
        <section className="page-hero">
          <h1>Контакти</h1>
          <p>Зв'яжіться з нами або отримайте додаткову інформацію</p>
        </section>

        <section className="contacts-section">
          <div className="contacts-container">
            {/* Контактна інформація */}
            <div className="contact-info">
              <h2>Контактна інформація</h2>
              
              <div className="info-block">
                <h3>📞 Телефон</h3>
                <p>+380 (XX) XXX-XX-XX</p>
              </div>

              <div className="info-block">
                <h3>📧 Email</h3>
                <p>
                  <a href="mailto:info@duty-roster.mil">info@duty-roster.mil</a><br/>
                  <a href="mailto:support@duty-roster.mil">support@duty-roster.mil</a>
                </p>
              </div>

              <div className="info-block">
                <h3>📍 Адреса</h3>
                <p>Київ, Україна</p>
              </div>

              <div className="info-block">
                <h3>🕐 Години роботи</h3>
                <p>
                  Пн-Пт: 08:00 - 18:00<br/>
                  Сб-Нд: За замовленням<br/>
                  <em>(Київський час, UTC+2)</em>
                </p>
              </div>

              <div className="info-block">
                <h3>❓ Поширені питання</h3>
                <ul>
                  <li>Як зареєструватися в системі?</li>
                  <li>Як додати нове майно?</li>
                  <li>Як експортувати звіти?</li>
                  <li>Як скинути пароль?</li>
                </ul>
              </div>
            </div>

            {/* Форма звернення */}
            <div className="contact-form">
              <h2>Форма звернення</h2>
              {submitted && (
                <div className="success-message">
                  ✅ Ваше повідомлення успішно надіслано на пошту! Ми вам відповімо найближчим часом.
                </div>
              )}
              
              {error && (
                <div className="error-message" style={{background: '#fee', color: '#c00', padding: '10px', borderRadius: '5px', marginBottom: '15px'}}>
                  ❌ {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Ім'я *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ваше ім'я"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Тема *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Тема вашого звернення"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Повідомлення *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Опишіть вашу проблему або питання..."
                    rows="6"
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Надсилання...' : 'Надіслати'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        © 2025 Duty Roster Portal. Курсовий проект.
      </footer>
    </div>
  );
};

export default ContactsPage;
