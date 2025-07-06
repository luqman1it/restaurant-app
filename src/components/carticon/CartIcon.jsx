import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartPopup from '../CartPopup';
import './carticon.css';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
    const { cartItems } = useCart();
    const [showPopup, setShowPopup] = useState(false);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <div className="iconWrapper" onClick={() => setShowPopup(true)}>
                <FaShoppingCart size={24} />
                <span className="badge">{totalItems}</span>
            </div>

            {showPopup && <CartPopup onClose={() => setShowPopup(false)} />}
        </>
    );
};

export default CartIcon;
