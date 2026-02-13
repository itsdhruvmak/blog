import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../api/axios';

const ProtectedRoute = () => {
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await api.get('/api/auth/admin/check-auth');
                if (res.data.authenticated) {
                    setStatus('authenticated');
                } else {
                    setStatus('unauthenticated');
                }
            } catch (err) {
                setStatus('unauthenticated');
            }
        };
        checkSession();
    }, []);

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold">Verifying Session...</p>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;