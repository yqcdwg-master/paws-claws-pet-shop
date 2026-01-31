
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { UserProfile } from '../types';

interface AuthPageProps {
  user: UserProfile | null;
}

const AuthPage: React.FC<AuthPageProps> = ({ user }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-20 animate-fade-in text-center">
        <div className="bg-surface-light dark:bg-surface-dark p-10 rounded-3xl shadow-xl max-w-md mx-auto space-y-6">
          <span className="material-symbols-outlined text-6xl text-primary">verified_user</span>
          <h1 className="text-3xl font-black">账户已激活</h1>
          <p className="text-gray-500">您已登录为 <span className="font-bold text-primary">{user.email}</span></p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/shop')}
              className="w-full py-3 bg-primary text-[#111813] font-bold rounded-xl hover:bg-primary-dark transition-all"
            >
              开始购物
            </button>
            <button 
              onClick={() => supabase.auth.signOut()}
              className="w-full py-3 bg-neutral-light dark:bg-neutral-dark text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/shop');
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: '宠物爱好者'
            }
          }
        });
        if (error) throw error;
        setMessage({ type: 'success', text: '请检查您的电子邮件以获取确认链接！' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10 md:py-20 animate-fade-in flex items-center justify-center">
      <div className="w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row">
        {/* Visual Side */}
        <div className="hidden md:block md:w-5/12 bg-primary relative p-10 overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between text-[#111813]">
            <div className="space-y-4">
              <span className="material-symbols-outlined text-4xl">pets</span>
              <h2 className="text-3xl font-black leading-tight">欢迎加入大家庭</h2>
              <p className="text-sm font-medium opacity-80 leading-relaxed">加入我们超过 10,000 名信任 Paws & Claws 提供优质护理的宠物家长社区。</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span className="text-xs font-bold">独家折扣</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span className="text-xs font-bold">订单追踪</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/20 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-8 md:p-12 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-[#111813] dark:text-white">{isLogin ? 'Login' : 'Join Us'}</h2>
            <p className="text-gray-500 mt-2">{isLogin ? 'Enter your credentials to access your account' : 'Start your journey with us today'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {message && (
              <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                {message.text}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border-neutral-light dark:border-neutral-dark bg-neutral-light dark:bg-neutral-dark focus:ring-primary focus:border-primary px-4 py-3" 
                placeholder="you@example.com"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border-neutral-light dark:border-neutral-dark bg-neutral-light dark:bg-neutral-dark focus:ring-primary focus:border-primary px-4 py-3" 
                placeholder="••••••••"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 bg-[#111813] dark:bg-primary dark:text-[#111813] text-white font-black rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login Now' : 'Create Account')}
            </button>
          </form>

          <div className="text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary font-bold hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
