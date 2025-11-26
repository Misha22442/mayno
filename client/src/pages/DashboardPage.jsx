import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem } from '../store/itemsSlice';
import { logout } from '../store/authSlice';
import ItemCard from '../components/ItemCard/ItemCard';
import Button from '../components/Button/Button';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.items);
    const { user } = useSelector(state => state.auth);
    
    const [form, setForm] = useState({ name: '', serialNumber: '', category: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        'Зброя',
        'Боєприпаси',
        'Оптика',
        'Засоби зв\'язку',
        'Транспорт',
        'Техніка',
        'Речове майно',
        'Спорядження',
        'Медичне забезпечення',
        'Електроніка',
        'Інструменти',
        'Вимірювальна апаратура',
        'Матеріали та запчастини',
        'Паливно-енергетичне обладнання',
        'Інше'
    ];

    const statuses = ['На складі', 'Видано', 'Ремонт', 'Списано'];

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    // Фільтрація списку
    const filteredList = list.filter(item => {
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        const matchesSearch = searchQuery === '' || 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesCategory && matchesSearch;
    });

    // Статистика
    const stats = {
        total: list.length,
        onStock: list.filter(i => i.status === 'На складі').length,
        issued: list.filter(i => i.status === 'Видано').length,
        repair: list.filter(i => i.status === 'Ремонт').length,
        writtenOff: list.filter(i => i.status === 'Списано').length
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!form.name.trim()) {
            setError('Будь ласка, введіть назву майна');
            return;
        }
        if (!form.serialNumber.trim()) {
            setError('Будь ласка, введіть серійний номер');
            return;
        }
        if (!form.category) {
            setError('Будь ласка, виберіть категорію');
            return;
        }

        dispatch(addItem(form)).then(() => {
            setSuccess('Майно успішно додано!');
            setForm({ name: '', serialNumber: '', category: '' });
            setTimeout(() => setSuccess(''), 3000);
        }).catch(err => {
            setError(err.message || 'Помилка при додаванні майна');
        });
    };

    const handleDelete = (itemId) => {
        if (window.confirm('Ви впевнені що хочете списати це майно?')) {
            dispatch(updateItem({ _id: itemId, status: 'Списано' })).then(() => {
                setSuccess('Майно успішно списано!');
                setTimeout(() => setSuccess(''), 3000);
            }).catch(err => {
                setError(err.message || 'Помилка при списанні майна');
            });
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <h2>👋 Привіт, {user?.fullName} ({user?.role})</h2>
                <Button variant="danger" onClick={() => dispatch(logout())}>🚪 Вихід</Button>
            </header>

            {/* Статистика */}
            <section className="dashboard__stats">
                <div className="stat-card stat-card--total">
                    <span className="stat-card__number">{stats.total}</span>
                    <span className="stat-card__label">Всього</span>
                </div>
                <div className="stat-card stat-card--stock">
                    <span className="stat-card__number">{stats.onStock}</span>
                    <span className="stat-card__label">На складі</span>
                </div>
                <div className="stat-card stat-card--issued">
                    <span className="stat-card__number">{stats.issued}</span>
                    <span className="stat-card__label">Видано</span>
                </div>
                <div className="stat-card stat-card--repair">
                    <span className="stat-card__number">{stats.repair}</span>
                    <span className="stat-card__label">Ремонт</span>
                </div>
                <div className="stat-card stat-card--written">
                    <span className="stat-card__number">{stats.writtenOff}</span>
                    <span className="stat-card__label">Списано</span>
                </div>
            </section>

            {user?.role === 'admin' && (
                <section className="dashboard__controls">
                    {error && <div className="alert alert--error">{error}</div>}
                    {success && <div className="alert alert--success">{success}</div>}
                    
                    <form onSubmit={handleSubmit} className="add-form">
                        <input 
                            placeholder="Назва" 
                            value={form.name} 
                            onChange={e => setForm({...form, name: e.target.value})} 
                            required 
                        />
                        <input 
                            placeholder="Серійний номер" 
                            value={form.serialNumber} 
                            onChange={e => setForm({...form, serialNumber: e.target.value})} 
                            required 
                        />
                        <select 
                            value={form.category} 
                            onChange={e => setForm({...form, category: e.target.value})} 
                            required
                        >
                            <option value="">Виберіть категорію</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <Button type="submit" variant="success">➕ Додати майно</Button>
                    </form>
                </section>
            )}

            {/* Фільтри */}
            <section className="dashboard__filters">
                <input 
                    type="text"
                    placeholder="🔍 Пошук за назвою або номером..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="filter-search"
                />
                <select 
                    value={filterStatus} 
                    onChange={e => setFilterStatus(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">📋 Всі статуси</option>
                    {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <select 
                    value={filterCategory} 
                    onChange={e => setFilterCategory(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">📁 Всі категорії</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </section>

            <section className="dashboard__grid">
                {filteredList && filteredList.length > 0 ? (
                    filteredList.map(item => (
                        <ItemCard key={item._id} item={item} onDelete={handleDelete} />
                    ))
                ) : (
                    <p className="no-items">🔍 Немає майна за вибраними фільтрами</p>
                )}
            </section>
        </div>
    );
};

export default DashboardPage;