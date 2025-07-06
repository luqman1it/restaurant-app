import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaPlus, FaSearch } from 'react-icons/fa';
const ItemDetailsModal = ({ item, onClose }) => {
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const FaPlusIcon = FaPlus;
    if (!item) return null;

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const totalPrice = (item.price * quantity).toFixed(2);

    const handleAddToCart = () => {
        addToCart(item, quantity, notes);
        onClose();
    };

    return (
        <div style={overlayStyles}>
            <div style={modalStyles}>
                <button onClick={onClose} style={closeBtn}>×</button>

                {item.image && (
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
                    />
                )}

                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <div style={addToCard}>
                    <p style={{ color: "#005074" }}><strong>AED {item.price}</strong></p>

                    <div style={qtyContainer}>
                        <button onClick={() => handleQuantityChange(-1)} style={qtyBtn}>-</button>
                        <span style={qtyText}>{quantity}</span>
                        <button onClick={() => handleQuantityChange(+1)} style={qtyBtn}>+</button>
                    </div>
                </div>

                <div style={detailCard} onClick={handleAddToCart}>
                    <button style={addBtn} >
                        <span><i className="icon"><FaPlusIcon /></i></span>  Add to Cart
                    </button>
                    <p><strong> AED {totalPrice}</strong></p>


                </div>
            </div>
        </div >
    );
};

const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalStyles = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
};

const closeBtn = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
};

const qtyContainer = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '1rem 0',
    border: '1px solid #005074',
    borderRadius: '5px'
};

const qtyBtn = {
    width: '35px',
    height: '35px',
    fontSize: '1.2rem',
    border: 'none',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
};

const qtyText = {
    fontSize: '1.2rem',
    minWidth: '30px',
    textAlign: 'center',
};


const addBtn = {
    backgroundColor: '#005074',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',

};
const addToCard = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

}
const detailCard = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#005074',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '10px',
    padding: '10px'
}
export default ItemDetailsModal;
