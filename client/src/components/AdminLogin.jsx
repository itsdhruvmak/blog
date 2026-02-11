import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { password });

            localStorage.setItem('adminToken', response.data.token);

            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="mb-6 text-2xl font-bold text-center">Admin Access</h2>
                {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
                <input
                    type="password"
                    placeholder="Enter Admin Password"
                    className="w-full p-2 mb-4 border rounded focus:outline-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full cursor-pointer p-2 text-white bg-black hover:bg-gray-800 transition-colors">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;