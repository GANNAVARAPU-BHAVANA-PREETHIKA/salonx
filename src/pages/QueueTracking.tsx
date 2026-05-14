import { motion } from 'motion/react';
import { Zap, Clock, Users, ChevronRight, Share2, MapPin, Coffee, Bell, CalendarDays } from 'lucide-react';

export default function QueueTracking() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Grooming Queue',
          text: 'I am next in line at Lumiere Studio!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Queue link copied to clipboard!');
    }
  };

  const handleAction = (action: string) => {
    alert(`${action} request submitted to the concierge.`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto space-y-12"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-gold rounded-full text-primary font-bold text-xs uppercase tracking-widest neon-glow mb-4">
          <Zap size={14} fill="currentColor" />
          Live Tracking Active
        </div>
        <h1 className="text-3xl md:text-5xl font-serif leading-tight">You're up next.</h1>
        <p className="text-on-surface-variant text-lg">Vikram is finalizing the current masterpiece. Please head to the waiting lounge.</p>
      </div>

      {/* Futuristic Radial Timer */}
      <div className="relative flex flex-col items-center justify-center h-[400px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-80 h-80 rounded-full border-2 border-dashed border-primary/20"
          />
        </div>
        <div className="relative w-64 h-64 rounded-full border-4 border-white/5 flex flex-col items-center justify-center bg-surface/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(212,175,55,0.1)]">
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary/50 border-b-transparent border-l-transparent animate-spin duration-[3000ms]" />
          
          <motion.h2 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-6xl font-serif text-glow mb-2"
          >
            18
          </motion.h2>
          <p className="text-on-surface-variant text-[10px] font-bold tracking-[.4em] uppercase">Mins Remaining</p>
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="glass px-8 py-3 rounded-full flex items-center gap-4 text-sm font-medium">
            <Users size={18} className="text-primary" />
            <span className="text-white">2 people ahead of you</span>
          </div>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
            <CalendarDays size={10} className="text-accent" />
            Wait includes 3 advanced bookings for today
          </p>
        </div>
      </div>

      {/* Context Actions */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button 
          onClick={() => handleAction('Brew')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 glass rounded-2xl flex flex-col gap-3 group border-accent/20"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
            <Coffee size={20} />
          </div>
          <div className="text-left">
            <p className="font-bold">Order Brew</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Lounge Menu</p>
          </div>
        </motion.button>

        <motion.button 
          onClick={() => handleAction('Notification')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 glass rounded-2xl flex flex-col gap-3 group border-primary/20"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
            <Bell size={20} />
          </div>
          <div className="text-left">
            <p className="font-bold">Notify Me</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Proximity Alert</p>
          </div>
        </motion.button>
      </div>

      {/* Appointment Timeline */}
      <div className="glass p-8 rounded-3xl space-y-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
        <h3 className="text-label-caps text-on-surface-variant tracking-[.4em] uppercase">Process Status</h3>
        
        <div className="space-y-10 relative">
          <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-white/5" />
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <span className="text-[10px] font-bold">01</span>
            </div>
            <div>
              <p className="font-bold">Checked In</p>
              <p className="text-xs text-on-surface-variant">Lumiere Studio • 10:45 AM</p>
            </div>
          </div>

          <div className="flex items-center gap-6 relative z-10">
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent shadow-[0_0_15px_rgba(138,43,226,0.3)] animate-pulse">
              <span className="text-[10px] font-bold">02</span>
            </div>
            <div>
              <p className="font-bold text-accent">Waiting Lounge</p>
              <p className="text-xs text-on-surface-variant">Est. Seat Time: 11:20 AM</p>
            </div>
          </div>

          <div className="flex items-center gap-6 relative z-10 opacity-30">
            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-[10px] font-bold">03</span>
            </div>
            <div>
              <p className="font-bold">Transformation</p>
              <p className="text-xs text-on-surface-variant">With Master Stylist Vikram</p>
            </div>
          </div>
        </div>
      </div>

      <motion.button 
        onClick={handleShare}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 glass border-white/10 rounded-2xl flex items-center justify-center gap-3 text-on-surface-variant font-bold text-sm tracking-widest uppercase"
      >
        <Share2 size={18} />
        Live Share Queue
      </motion.button>
    </motion.div>
  );
}
