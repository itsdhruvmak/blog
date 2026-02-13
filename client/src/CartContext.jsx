import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from './api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchCart = useCallback(async () => {
        if (!user) {
            setCart([]);
            return;
        }
        setLoading(true);
        try {
            const res = await api.get('/api/cart/get');
            setCart(res.data.cart);
        } catch (error) {
            console.error("Error fetching cart", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (itemId, quantity = 1) => {
        try {
            await api.post('/api/cart/add', { itemId, quantity });
            await fetchCart();
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            await api.post('/api/cart/update', { itemId, quantity });
            await fetchCart();
        } catch (error) {
            console.error("Error updating quantity", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await api.post('/api/cart/remove', { itemId });
            await fetchCart();
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    };

    const clearCart = async () => {
        try {
            await api.post('/api/cart/clear');
            setCart([]);
        } catch (error) {
            console.error("Error clearing cart", error);
        }
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => {
        const price = item.itemId?.price || 0;
        return total + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            fetchCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
