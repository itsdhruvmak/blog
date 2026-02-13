import Order from '../config/model/Order.js';
import User from '../config/model/User.js';

export const placeOrder = async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress, deliveryMethod } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        const newOrder = await Order.create({
            userId,
            items,
            totalAmount,
            shippingAddress,
            deliveryMethod,
            status: "Pending",
            paymentStatus: "Pending",
            paymentMethod: "COD"
        });

        await User.findByIdAndUpdate(userId, { cart: [] });

        return res.status(201).json({
            message: "Order placed successfully",
            order: newOrder
        });
    } catch (error) {
        return res.status(500).json({ message: "Error placing order", error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching order", error: error.message });
    }
};
