import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, loading, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] px-4 space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="text-slate-300" size={40} />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
                    <p className="text-slate-500 mt-2">Looks like you haven't added anything yet.</p>
                </div>
                <Link to="/items" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-12">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item._id}
                                    variants={itemVariants}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="flex items-center gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                                >
                                    <div className="w-24 h-32 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden">
                                        <img src={item.itemId?.image} alt={item.itemId?.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-slate-900 truncate">{item.itemId?.name}</h3>
                                        <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-bold text-[10px]">{item.itemId?.category}</p>
                                        <p className="text-blue-600 font-bold mt-2">₹{item.itemId?.price}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <button
                                                onClick={() => item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)}
                                                className="p-1 hover:text-blue-600 transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="p-1 hover:text-blue-600 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-4">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 sticky top-32">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-slate-500 text-sm">
                                <span>Subtotal ({cartCount} items)</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 text-sm">
                                <span>Shipping</span>
                                <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
                            </div>
                            <div className="h-px bg-slate-100 my-4" />
                            <div className="flex justify-between text-slate-900 font-black text-xl">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full flex items-center justify-center gap-3 p-5 bg-slate-900 text-white rounded-[1.5rem] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200"
                            >
                                Checkout <ArrowRight size={16} />
                            </button>

                            <div className="flex items-center justify-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest font-bold pt-4">
                                <Truck size={14} /> Fast, Secure Delivery
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
