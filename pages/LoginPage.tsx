
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { config } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Turjomd123#@' && password === '147852@@$$') {
      sessionStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-8">
      <Link to="/" className="mb-6">
        <img src={config.logoUrl} alt="Amazon" className="h-10 object-contain brightness-0" />
      </Link>

      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-8">
        <h1 className="text-3xl font-normal mb-4">Sign in</h1>
        
        {error && <div className="bg-red-50 border border-red-500 text-red-700 p-2 text-sm mb-4 rounded">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email or mobile phone number</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-400 rounded p-2 focus:ring-1 focus:ring-orange-500 outline-none text-sm"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold">Password</label>
              <a href="#" className="text-xs text-blue-600 hover:text-orange-700 hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 rounded p-2 focus:ring-1 focus:ring-orange-500 outline-none text-sm"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="amazon-yellow amazon-yellow-hover py-2 rounded text-sm shadow hover:bg-opacity-90 transition-all">
            Continue
          </button>
        </form>

        <p className="text-xs mt-4 text-gray-600 leading-relaxed">
          By continuing, you agree to Amazon's <span className="text-blue-600 hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Notice</span>.
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center mt-6">
        <div className="w-full flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-xs text-gray-500">New to Amazon?</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button className="w-full border border-gray-300 bg-gray-50 py-1 rounded text-sm hover:bg-gray-100 shadow-sm">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
