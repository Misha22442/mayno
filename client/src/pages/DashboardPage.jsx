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

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Валідація
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
            // Замість видалення, оновлюємо статус на "Списано"
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
                <h2>Привіт, {user?.fullName} ({user?.role})</h2>
                <Button variant="danger" onClick={() => dispatch(logout())}>Вихід</Button>
            </header>

            {user?.role === 'admin' && (
                <section className="dashboard__controls">
                    {error && <div style={{color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffe6e6', borderRadius: '4px'}}>{error}</div>}
                    {success && <div style={{color: 'green', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#e6ffe6', borderRadius: '4px'}}>{success}</div>}
                    
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
                        <Button type="submit">Додати майно</Button>
                    </form>
                </section>
            )}

            <section className="dashboard__grid">
                {list && list.length > 0 ? (
                    list.map(item => (
                        <ItemCard key={item._id} item={item} onDelete={handleDelete} />
                    ))
                ) : (
                    <p>Немає доданого майна</p>
                )}
            </section>
        </div>
    );
};

export default DashboardPage;