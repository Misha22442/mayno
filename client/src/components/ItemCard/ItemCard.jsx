import React from 'react';
import Button from '../Button/Button';
import { useSelector } from 'react-redux';
import './ItemCard.css';

const ItemCard = ({ item, onDelete }) => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className="item-card">
            {/* ВИКОРИСТАННЯ FLOAT (вимога) */}
            <div className="item-card__image"></div>
            
            <div className="item-card__content">
                <h3 className="item-card__title">{item.name}</h3>
                <p className="item-card__meta">№: {item.serialNumber}</p>
                <p className="item-card__status">Статус: {item.status}</p>
                
                {user?.role === 'admin' && (
                    <div className="item-card__actions">
                        <Button variant="danger" onClick={() => onDelete(item._id)}>
                            Списати
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemCard;