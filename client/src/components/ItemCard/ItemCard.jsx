import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../../store/itemsSlice';
import './ItemCard.css';

const ItemCard = ({ item, onDelete }) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(item.status);
    const [isLoading, setIsLoading] = useState(false);

    const statuses = ['На складі', 'Видано', 'Ремонт', 'Списано'];

    // Оновлюємо selectedStatus коли item.status змінюється
    useEffect(() => {
        setSelectedStatus(item.status);
    }, [item.status]);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSaveStatus = async () => {
        if (selectedStatus === item.status) {
            setIsEditing(false);
            return;
        }
        
        setIsLoading(true);
        try {
            await dispatch(updateItem({ _id: item._id, status: selectedStatus })).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Помилка оновлення статусу:', error);
            alert('Помилка при оновленні статусу: ' + (error.message || error));
            setSelectedStatus(item.status); // Повертаємо старий статус
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setSelectedStatus(item.status);
        setIsEditing(false);
    };

    // Колір статусу
    const getStatusColor = (status) => {
        switch(status) {
            case 'На складі': return '#28a745'; // зелений
            case 'Видано': return '#ffc107'; // жовтий
            case 'Ремонт': return '#fd7e14'; // оранжевий
            case 'Списано': return '#dc3545'; // червоний
            default: return '#6c757d';
        }
    };

    return (
        <div className={`item-card ${item.status === 'Списано' ? 'item-card--written-off' : ''}`}>
            {/* ВИКОРИСТАННЯ FLOAT (вимога) */}
            <div className="item-card__image"></div>
            
            <div className="item-card__content">
                <h3 className="item-card__title">{item.name}</h3>
                <p className="item-card__meta">№: {item.serialNumber}</p>
                <p className="item-card__category">Категорія: {item.category}</p>
                
                {/* Статус з можливістю редагування */}
                <div className="item-card__status-row">
                    <span>Статус: </span>
                    {isEditing ? (
                        <select 
                            value={selectedStatus} 
                            onChange={handleStatusChange}
                            className="item-card__status-select"
                            disabled={isLoading}
                        >
                            {statuses.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    ) : (
                        <span 
                            className="item-card__status-badge"
                            style={{ backgroundColor: getStatusColor(item.status) }}
                        >
                            {item.status}
                        </span>
                    )}
                </div>
                
                {/* Кнопки дій */}
                {user?.role === 'admin' && (
                    <div className="item-card__actions">
                        {isEditing ? (
                            <>
                                <Button variant="success" onClick={handleSaveStatus} disabled={isLoading}>
                                    {isLoading ? '⏳...' : '💾 Зберегти'}
                                </Button>
                                <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>
                                    ✖ Скасувати
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="primary" onClick={() => setIsEditing(true)}>
                                    ✏️ Змінити статус
                                </Button>
                                {item.status !== 'Списано' && (
                                    <Button variant="danger" onClick={() => onDelete(item._id)}>
                                        🗑️ Списати
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemCard;