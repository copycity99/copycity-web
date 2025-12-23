import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminLogin: React.FC = () => {
  const { siteConfig } = useData();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use the password from site configuration
    const correctPassword = siteConfig.adminPassword || 'admin123';
    
    if (password === correctPassword) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('密碼錯誤，請重試');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-navy-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-navy-700">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">後台管理登入</h2>
          <p className="text-gray-500 mt-2">請輸入管理員密碼以進入儀表板</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition-all pr-12"
                placeholder="請輸入密碼"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                tabIndex={-1}
                title={showPassword ? "隱藏密碼" : "顯示密碼"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-navy-600 hover:bg-navy-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            登入系統
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-gray-600">
            ← 返回前台首頁
          </button>
        </div>
      </div>
    </div>
  );
};