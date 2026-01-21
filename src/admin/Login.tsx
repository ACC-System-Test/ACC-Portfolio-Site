import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import api from '../services/api';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            // Handle NestJS TransformInterceptor wrapper if it exists (backup)
            const result = response.data.data || response.data;
            const { access_token, user: userData } = result;

            if (!access_token || !userData) {
                throw new Error('Invalid login response from server');
            }

            login(access_token, userData);

            // Short delay to ensure context state is updated before navigation
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 100);
        } catch (err: any) {
            console.error('Login failed', err);
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#0084d1]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#0084d1]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="bg-[#0084d1]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#0084d1]">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                    <p className="text-gray-500 text-sm mt-2">Sign in to manage your content</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-sm">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0084d1] transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0084d1] focus:ring-4 focus:ring-[#0084d1]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0084d1] transition-colors" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0084d1] focus:ring-4 focus:ring-[#0084d1]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0084d1] hover:bg-[#006bb0] text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-xs">
                        Secure Access • Africa Cybersecurity Consortium
                    </p>
                </div>
            </div>
        </div>
    );
};
