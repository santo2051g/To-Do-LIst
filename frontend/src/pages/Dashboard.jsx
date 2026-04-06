import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Mail, Calendar, Briefcase, Smile, Edit2, ShieldCheck, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();

  const handleUpdate = async () => {
    const newName = prompt('Enter your new username:', user.username);
    if (newName && newName !== user.username) {
      try {
        await updateUser({ username: newName });
        alert('Profile updated successfully!');
      } catch (err) {
        alert('Update failed. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Welcome Back, {user.username}
            </h1>
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <Clock size={16} className="text-indigo-500" />
              <span>Joined on {formatDate(user.createdAt)}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="group flex items-center space-x-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 px-6 py-3 rounded-2xl transition duration-500 border border-red-500/10 hover:border-red-500/30"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-bold">Sign Out</span>
          </button>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Profile Explorer */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card rounded-[2.5rem] p-10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 p-1 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-900">
                       <UserIcon size={64} className="text-white" />
                    </div>
                  </div>
                  <button 
                    onClick={handleUpdate}
                    className="absolute bottom-1 right-1 bg-white text-slate-900 p-2.5 rounded-full shadow-2xl hover:bg-indigo-500 hover:text-white transition duration-300"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>

                <div className="flex-1 space-y-8 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <InfoItem icon={<Mail />} label="Email" value={user.email} />
                    <InfoItem icon={<Briefcase />} label="Department" value={user.Department} />
                    <InfoItem icon={<Calendar />} label="Year" value={user.year} />
                    <InfoItem icon={<Smile />} label="Age" value={user.Age} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/20 to-transparent border border-indigo-500/10 p-8 rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-500/20 p-3 rounded-xl">
                    <ShieldCheck className="text-indigo-400" />
                </div>
                <div>
                   <h3 className="text-white font-bold">Secure Access</h3>
                   <p className="text-slate-400 text-sm">Authentication managed with industry-standard JWT protocols</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-mono text-indigo-500 border border-indigo-500/30 px-3 py-1 rounded-full uppercase tracking-tighter">Verified</span>
              </div>
            </div>
          </div>

          {/* Side Info Cards */}
          <div className="space-y-8">
             <div className="glass-card rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 animate-pulse">
                   <ShieldCheck size={40} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black text-white">System Status</h3>
                   <p className="text-slate-400 text-sm">Your connection is encrypted and your profile is protected.</p>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                   <div className="w-full h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
             </div>

             <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
                <h4 className="text-white font-bold mb-6 flex items-center">
                   <Edit2 size={16} className="mr-2 text-indigo-500" />
                   Security Logs
                </h4>
                <div className="space-y-4">
                   <LogItem label="Profile Access" time="Just now" />
                   <LogItem label="Login detected" time="15m ago" />
                   <LogItem label="Account created" time="Today" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1 text-indigo-500 bg-indigo-500/10 p-2.5 rounded-xl">
       {icon}
    </div>
    <div className="space-y-1">
      <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">{label}</span>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  </div>
);

const LogItem = ({ label, time }) => (
  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
    <span className="text-slate-300">{label}</span>
    <span className="text-slate-600 italic font-mono">{time}</span>
  </div>
);

export default Dashboard;
