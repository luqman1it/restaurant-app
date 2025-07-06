import React from 'react';
import './itemcard.css'
const ItemCard = ({ item, onClick }) => {
    return (
        <div className='card'>
            <div className="cont-img">
                {item.image && (
                    <img className='imgCard'
                        src={item.image}
                        alt={item.name}

                    />
                )}
            </div>
            <div className="right-card">
                <h3 className='titleCard'>{item.name}</h3>
                <p className='infoCard'>{item.description}</p>
                <div className="pay-card">
                    <p className='priceCard'><strong>AED {item.price}</strong></p>
                    <button className='addCart'
                        onClick={onClick}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
