import React from 'react';

const CategoryCard = ({ category, onClick }) => {
    const { name, image, is_closed, opening_time } = category;

    return (
        <div
            onClick={onClick}
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#fff',
            }}
        >
            {image && <img src={image} alt={name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />}
            <h3>{name}</h3>
            {is_closed && (
                <p style={{ color: 'red', fontSize: '0.85rem' }}>Opens at {opening_time}</p>
            )}
        </div>
    );
};

export default CategoryCard;
