import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import api from '../api/axios';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { password });
            // localStorage.setItem('adminToken', response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Access denied. Please check your credentials.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] text-slate-900 px-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-sm"
            >
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 mb-5">
                        <ShieldCheck size={24} className="text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Admin Portal</h2>
                    <p className="text-slate-500 mt-2 text-[11px] uppercase tracking-[0.2em] font-semibold">Secure Authentication</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Security Key
                            </label>
                        </div>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs text-center font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="w-full group relative flex items-center justify-center p-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Note */}
                <footer className="mt-12 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                        Protected System &bull; © 2026
                    </p>
                </footer>
            </motion.div>
        </div>
    );
};

export default AdminLogin;