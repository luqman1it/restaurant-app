import React from 'react';
import { useCart } from '../context/CartContext';

const CartPopup = ({ onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, placeOrder } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.total, 0).toFixed(2);

    return (
        <div style={overlay}>
            <div style={popup}>
                <button onClick={onClose} style={closeBtn}>×</button>
                <h2>Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p>No items in the cart.</p>
                ) : (
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {cartItems.map((item, idx) => (
                            <div key={idx} style={itemBox}>
                                <p><strong>{item.name}</strong></p>

                                <div style={qtyControls}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={qtyBtn}>−</button>
                                    <span style={qtyText}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={qtyBtn}>+</button>
                                </div>

                                <p>Price: AED {item.total.toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} style={removeBtn}>Remove</button>
                                <hr />
                            </div>
                        ))}
                        <h3>Total: AED {total}</h3>
                        <button
                            onClick={placeOrder}
                            style={placeBtn}
                        >
                            Place Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// STYLES
const overlay = {
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

const popup = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1.5rem',
    width: '90%',
    maxWidth: '400px',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
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

const itemBox = {
    marginBottom: '1rem',
};

const removeBtn = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    marginTop: '4px',
};

const qtyControls = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0.5rem 0',
};

const qtyBtn = {
    width: '28px',
    height: '28px',
    border: '1px solid #ccc',
    borderRadius: '50%',
    backgroundColor: '#eee',
    fontSize: '1.2rem',
    cursor: 'pointer',
};

const qtyText = {
    fontSize: '1rem',
    minWidth: '24px',
    textAlign: 'center',
};
const placeBtn = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
};

export default CartPopup;
