import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InfoPages.css';

const NewsPage = () => {
  const navigate = useNavigate();

  const news = [
    {
      id: 1,
      date: '2025-01-20',
      title: 'Запуск оновленої версії системи',
      content: 'Ми презентуємо нову версію системи з покращеним інтерфейсом, швидшою роботою та новими можливостями для аналізу даних.'
    },
    {
      id: 2,
      date: '2025-01-15',
      title: 'Введена функція експорту звітів',
      content: 'Тепер ви можете експортувати звіти про майно в форматах PDF та Excel для подальшої обробки в офісних програмах.'
    },
    {
      id: 3,
      date: '2025-01-10',
      title: 'Посилена безпека даних',
      content: 'Впроваджено шифрування всіх передач даних та посилені вимоги до паролів для захисту вашої інформації.'
    },
    {
      id: 4,
      date: '2025-01-05',
      title: 'Мобільна версія тепер доступна',
      content: 'Система повністю оптимізована для мобільних пристроїв. Тепер ви можете працювати з майном де завгодно.'
    },
    {
      id: 5,
      date: '2024-12-28',
      title: 'Початок роботи системи',
      content: 'Офіційний запуск системи управління речовим майном роти. Перші користувачі починають працювати з платформою.'
    }
  ];

  return (
    <div className="info-page">
      <header className="app-header">
        <a href="/home" className="app-header__logo">Речове майно роти</a>
        <nav className="app-header__nav">
          <a href="/home" className="app-header__link">Головна</a>
          <a href="/about" className="app-header__link">Про сайт</a>
          <a href="/news" className="app-header__link active">Новини</a>
          <a href="/contacts" className="app-header__link">Контакти</a>
        </nav>
        <div>
          <button className="btn-login-header" onClick={() => navigate('/')}>Увійти</button>
          <button className="btn-theme-toggle">🌙</button>
        </div>
      </header>

      <main className="info-main">
        <section className="page-hero">
          <h1>Новини та оновлення</h1>
          <p>Слідкуйте за останніми новинами про розвиток системи</p>
        </section>

        <section className="news-section">
          <div className="news-container">
            {news.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-date">{item.date}</div>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-content">{item.content}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        © 2025 Duty Roster Portal. Курсовий проект.
      </footer>
    </div>
  );
};

export default NewsPage;
