import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, CreditCard, CheckCircle2, ArrowRight, Package, Loader2 } from 'lucide-react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Checkout = () => {
    const { cart, cartTotal, cartCount, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        deliveryMethod: 'Standard Delivery'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const orderData = {
                items: cart.map(item => ({
                    itemId: item.itemId._id,
                    name: item.itemId.name,
                    price: item.itemId.price,
                    quantity: item.quantity,
                    image: item.itemId.image
                })),
                totalAmount: cartTotal,
                shippingAddress: {
                    name: formData.name,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    phone: formData.phone
                },
                deliveryMethod: formData.deliveryMethod
            };

            await api.post('/api/order/place', orderData);
            setOrderSuccess(true);
            clearCart();
            setTimeout(() => navigate('/'), 5000);
        } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-200"
                >
                    <CheckCircle2 size={48} className="text-white" />
                </motion.div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-4">Order Received!</h1>
                <p className="text-slate-500 text-center max-w-md">
                    Thank you for your purchase. We're processing your order and will notify you soon.
                </p>
                <p className="text-slate-400 mt-8 text-xs font-bold uppercase tracking-widest animate-pulse">
                    Redirecting to home in 5 seconds...
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-12 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Package className="text-slate-200" size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Checkout is empty</h2>
                <button onClick={() => navigate('/items')} className="mt-6 text-blue-600 font-bold uppercase text-[10px] tracking-widest hover:underline">
                    Find something to buy
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-16 px-4">Secure Checkout</h1>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-16 px-4">
                {/* Left Side: Address Details */}
                <div className="lg:col-span-7 space-y-12">
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">1</div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Shipping Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Full Name</label>
                                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm focus:bg-white focus:border-blue-500 transition-all outline-none" placeholder="John Doe" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Street Address</label>
                                <input required name="street" value={formData.street} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm focus:bg-white focus:border-blue-500 transition-all outline-none" placeholder="123 Modern St." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">City</label>
                                <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm focus:bg-white focus:border-blue-500 transition-all outline-none" placeholder="Mumbai" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">State / Region</label>
                                <input required name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm focus:bg-white focus:border-blue-500 transition-all outline-none" placeholder="Maharashtra" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">ZIP / Postal Code</label>
                                <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm focus:bg-white focus:border-blue-500 transition-all outline-none" placeholder="400001" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Phone Number</label>
                                <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm focus:bg-white focus:border-blue-500 transition-all outline-none" placeholder="+91 98XXX XXXXX" />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center font-black">2</div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Delivery Method</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <label className="flex items-center justify-between p-6 bg-white rounded-3xl border border-blue-500/20 shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
                                <div className="flex items-center gap-4">
                                    <input type="radio" checked className="w-4 h-4 text-blue-600 focus:ring-blue-500" readOnly />
                                    <div>
                                        <p className="font-bold text-slate-900">Standard Delivery</p>
                                        <p className="text-xs text-slate-500">3 - 5 Business Days</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">Free</span>
                            </label>
                        </div>
                    </section>
                </div>

                {/* Right Side: Order Review */}
                <div className="lg:col-span-5">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-32">
                        <h2 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">Review Order</h2>

                        <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item._id} className="flex gap-4">
                                    <div className="w-16 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={item.itemId?.image} alt={item.itemId?.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm truncate">{item.itemId?.name}</h4>
                                        <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">{item.quantity} × ₹{item.itemId?.price}</p>
                                    </div>
                                    <div className="ml-auto font-bold text-sm text-slate-900">
                                        ₹{item.itemId?.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <div className="flex justify-between text-slate-500 text-sm">
                                <span>Subtotal</span>
                                <span className="font-bold text-slate-900">₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 text-sm">
                                <span>Delivery Fee</span>
                                <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
                            </div>
                            <div className="flex justify-between text-slate-900 font-black text-2xl pt-4">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 p-6 bg-slate-900 text-white rounded-[1.5rem] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                            >
                                {loading ? <Loader2 size={20} className="animate-spin" /> : (
                                    <>Place Order <ArrowRight size={16} /></>
                                )}
                            </button>
                            <p className="text-center text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-6 flex items-center justify-center gap-2">
                                <CreditCard size={12} /> Cash on Delivery (COD) Only
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
