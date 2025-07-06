import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, quantity, notes) => {
        const newItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity,
            notes,
            total: item.price * quantity,
        };

        setCartItems((prev) => [...prev, newItem]);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: newQty, total: item.price * newQty }
                    : item
            )
        );
    };
    const placeOrder = async () => {
        if (cartItems.length === 0) return alert('Cart is empty.');

        try {

            const orderPayload = cartItems.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                notes: item.notes,
            }));

            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: orderPayload }),
            });

            if (!response.ok) throw new Error('Failed to place order');

            alert('Order placed successfully!');
            setCartItems([]);
        } catch (err) {
            console.error('Error placing order:', err);
            alert('Failed to place order.');
        }
    };


    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        placeOrder,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
