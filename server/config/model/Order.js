import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        phone: { type: String, required: true }
    },
    deliveryMethod: { type: String, default: "Standard Delivery" },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    },
    paymentMethod: { type: String, default: "COD" }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
