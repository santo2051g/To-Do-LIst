import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Calendar, Briefcase, Smile, Sparkles } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    year: '',
    Department: '',
    Age: ''
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        ...formData,
        year: parseInt(formData.year),
        Age: parseInt(formData.Age)
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen py-16 px-6 flex items-center justify-center">
      <div className="glass-card p-10 rounded-3xl w-full max-w-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700 -m-16"></div>
        
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-purple-600/10 p-4 rounded-2xl text-purple-500 mb-4 ring-1 ring-purple-500/20">
            <Sparkles size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
          <p className="text-slate-400 mt-2 text-sm">Fill in your information to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500"><User size={18} /></span>
                <input
                  type="text"
                  placeholder="johndoe"
                  className="input-field pl-11"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500"><Mail size={18} /></span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="input-field pl-11"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Security Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500"><Lock size={18} /></span>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field pl-11 font-mono"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Age</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500"><Smile size={18} /></span>
                <input
                  type="number"
                  placeholder="24"
                  className="input-field pl-11"
                  onChange={(e) => setFormData({ ...formData, Age: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Year</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500"><Calendar size={18} /></span>
                <input
                  type="number"
                  placeholder="2024"
                  className="input-field pl-11"
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Dep.</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500"><Briefcase size={18} /></span>
                <input
                  type="text"
                  placeholder="Eng."
                  className="input-field pl-11"
                  onChange={(e) => setFormData({ ...formData, Department: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <button className="btn-primary mt-4 py-4 group-hover:scale-[1.01]">
            Create Final Account
          </button>
        </form>

        <p className="text-slate-400 mt-10 text-center text-sm relative border-t border-slate-800 pt-6">
          Member already? {' '}
          <Link to="/login" className="text-white hover:text-indigo-400 font-semibold transition-colors">
            Login to your dashboard
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
