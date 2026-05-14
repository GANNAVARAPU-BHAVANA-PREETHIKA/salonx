import { motion } from 'motion/react';
import { User, Settings, CreditCard, Bell, Shield, Sparkles, LogOut, ArrowRight, Camera, CalendarDays, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const user = {
    name: "Arjun Raghavan",
    email: "arjun.r@lumiere.com",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    membership: "Gold Member",
    nextAppointment: "Tomorrow, 10:30 AM"
  };

  const appointments = [
    {
      id: "1",
      stylist: "Vikram Mehta",
      service: "Signature Scissor Cut",
      date: "May 15, 2026",
      time: "10:30 AM",
      status: "Upcoming",
      price: "₹2,499",
      image: "https://images.unsplash.com/photo-1599305090598-fe179d501c27?auto=format&fit=crop&q=80&w=100"
    },
    {
      id: "2",
      stylist: "Sarah Drasner",
      service: "Luxury Beard Spa",
      date: "May 02, 2026",
      time: "03:00 PM",
      status: "Completed",
      price: "₹1,899",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=100"
    }
  ];

  const menuItems = [
    { icon: Settings, label: "Profile Settings", sub: "Personal info, preferences" },
    { icon: CreditCard, label: "Payment Methods", sub: "Cards, UPI, Wallets" },
    { icon: Bell, label: "Notifications", sub: "Queue alerts, reminders" },
    { icon: Shield, label: "Privacy & Security", sub: "Data controls, visibility" }
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to terminate your current session?")) {
      localStorage.removeItem('onboarding_completed');
      window.location.href = '/';
    }
  };

  const handleMenuClick = (label: string) => {
    alert(`${label} configuration is managed in the secure member portal. Redirecting to encryption layer...`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      <header className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full p-1 border-2 border-primary/30">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <button className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center border-4 border-background">
            <Camera size={18} />
          </button>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif">{user.name}</h1>
          <p className="text-on-surface-variant text-sm font-medium">{user.email}</p>
        </div>
        <div className="glass px-6 py-2 rounded-full border border-primary/30 flex items-center gap-2">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{user.membership}</span>
        </div>
      </header>

      {/* AI Scan Prompt */}
      <Link to="/ai-scan">
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-gold p-6 rounded-[32px] border-primary/20 flex items-center justify-between group"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Aesthetics Profile</h3>
              <p className="text-on-surface-variant text-xs">Update your face geometry scan</p>
            </div>
          </div>
          <ArrowRight className="text-primary group-hover:translate-x-2 transition-transform" />
        </motion.div>
      </Link>

      <div className="space-y-4">
        <h4 className="text-label-caps text-on-surface-variant tracking-[.3em] uppercase pl-4">Ritual Journals</h4>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <motion.div 
              key={apt.id}
              whileHover={{ x: 5 }}
              className="glass p-5 rounded-[28px] border border-white/5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                  <img src={apt.image} className="w-full h-full object-cover" alt={apt.stylist} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h5 className="font-bold text-sm tracking-wide">{apt.service}</h5>
                    <span className={`text-[8px] uppercase font-black tracking-tighter px-2 py-0.5 rounded-full ${apt.status === 'Upcoming' ? 'bg-primary/20 text-primary' : 'bg-green-500/20 text-green-400'}`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{apt.stylist}</p>
                  <div className="flex items-center gap-3 mt-2 text-on-surface-variant">
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <CalendarDays size={12} className="text-primary" />
                      {apt.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <Clock size={12} className="text-primary" />
                      {apt.time}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-serif text-primary mb-1">{apt.price}</p>
                {apt.status === 'Completed' && (
                  <CheckCircle2 size={14} className="text-green-400 ml-auto" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-label-caps text-on-surface-variant tracking-[.3em] uppercase pl-4">Account Workspace</h4>
        <div className="glass rounded-[32px] overflow-hidden border border-white/5 divide-y divide-white/5">
          {menuItems.map((item, i) => (
            <button 
              key={i}
              onClick={() => handleMenuClick(item.label)}
              className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-6">
                <div className="text-on-surface-variant group-hover:text-primary transition-colors">
                  <item.icon size={22} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm">{item.label}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{item.sub}</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="w-full py-6 flex items-center justify-center gap-3 text-accent font-bold uppercase tracking-widest text-xs hover:bg-accent/5 rounded-3xl transition-colors"
      >
        <LogOut size={16} />
        Terminate Session
      </button>
    </motion.div>
  );
}
