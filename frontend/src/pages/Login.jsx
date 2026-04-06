import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserPlus, Fingerprint } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12">
      <div className="glass-card p-10 rounded-3xl w-full max-w-md relative overflow-hidden group">
        {/* Abstract background decorative patterns */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700"></div>

        <div className="flex flex-col items-center mb-8 relative">
          <div className="bg-indigo-600/10 p-4 rounded-2xl text-indigo-500 mb-4 ring-1 ring-indigo-500/20">
            <Fingerprint size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome back</h2>
          <p className="text-slate-400 mt-2 text-sm">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email address</label>
            <div className="relative group/field">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within/field:text-indigo-500 transition-colors">
                <Mail size={18} />
              </span>
              <input
                type="email"
                placeholder="email@example.com"
                className="input-field pl-11"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group/field">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within/field:text-indigo-500 transition-colors">
                <Lock size={18} />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field pl-11 font-mono"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="btn-primary flex items-center justify-center space-x-2 group-hover:translate-y-[-2px]">
            <span>Sign In</span>
          </button>
        </form>

        <p className="text-slate-400 mt-8 text-center text-sm relative">
          Don't have an account yet? {' '}
          <Link to="/register" className="text-white hover:text-indigo-400 font-semibold transition-colors flex items-center justify-center mt-2 space-x-1">
            <UserPlus size={16} />
            <span>Create new account</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
