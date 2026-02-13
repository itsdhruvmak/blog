import User from '../config/model/User.js';

export const addToCart = async (req, res) => {
    try {
        const { itemId, quantity = 1 } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const cartItemIndex = user.cart.findIndex(item => item.itemId.toString() === itemId);

        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ itemId, quantity });
        }

        await user.save();
        return res.status(200).json({ message: "Item added to cart", cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

export const updateCartQuantity = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = req.user.id;

        if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

        const user = await User.findById(userId);
        const cartItemIndex = user.cart.findIndex(item => item.itemId.toString() === itemId);

        if (cartItemIndex === -1) return res.status(404).json({ message: "Item not in cart" });

        user.cart[cartItemIndex].quantity = quantity;
        await user.save();

        return res.status(200).json({ message: "Cart updated", cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: "Error updating cart", error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        user.cart = user.cart.filter(item => item.itemId.toString() !== itemId);

        await user.save();
        return res.status(200).json({ message: "Item removed from cart", cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: "Error removing from cart", error: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('cart.itemId');

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        user.cart = [];
        await user.save();
        return res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        return res.status(500).json({ message: "Error clearing cart", error: error.message });
    }
};
