import { motion, AnimatePresence } from 'motion/react';
import { FEATURED_SALONS, TRENDING_STYLISTS } from '../constants';
import { Star, MapPin, Clock, ArrowRight, Sparkles, Home as HomeIcon, ChevronDown, CalendarDays, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';

const locations = ["All Mumbai", "Bandra", "Juhu", "Colaba", "Andheri"];

const SectionHeader = ({ title, action, actionPath }: { title: string; action?: string; actionPath?: string }) => (
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xl md:text-2xl font-serif">{title}</h3>
    {action && actionPath && (
      <Link to={actionPath} className="text-primary text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-80 transition-opacity">
        {action}
        <ArrowRight size={14} />
      </Link>
    )}
  </div>
);

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Mumbai");
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const filteredSalons = useMemo(() => {
    let results = FEATURED_SALONS;
    if (selectedLocation !== "All Mumbai") {
      results = results.filter(s => s.locationTag === selectedLocation);
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      results = results.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.address.toLowerCase().includes(q)
      );
    }
    return results;
  }, [selectedLocation, searchQuery]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-12"
    >
      {/* Search & Location Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search luxury salons or styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass py-4 pl-14 pr-6 rounded-2xl border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-on-surface-variant/50"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="h-full flex items-center justify-between gap-3 glass px-6 py-4 rounded-2xl text-sm font-bold border-white/10 min-w-[180px]"
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              {selectedLocation}
            </div>
            <ChevronDown size={14} className={`transition-transform duration-300 ${showLocationPicker ? 'rotate-180' : ''}`} />
          </button>
        
        <AnimatePresence>
          {showLocationPicker && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 w-48 glass rounded-2xl overflow-hidden z-50 border border-white/10 shadow-2xl"
            >
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationPicker(false);
                  }}
                  className={`w-full text-left px-6 py-3 text-sm transition-colors hover:bg-white/5 ${selectedLocation === loc ? 'text-primary' : 'text-on-surface-variant'}`}
                >
                  {loc}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

      {/* Live Queue Banner */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-gold rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-primary/50 flex flex-col items-center justify-center text-primary shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <span className="text-2xl font-bold">3</span>
              <span className="text-[8px] uppercase tracking-tighter">Ahead</span>
            </div>
            <div>
              <p className="text-label-caps text-primary tracking-widest uppercase mb-1">Live Queue Stats</p>
              <h3 className="text-xl">Sameer's Luxe Studio</h3>
              <p className="text-on-surface-variant text-sm mt-1">Est. wait: 25 mins</p>
            </div>
          </div>
          <Link to="/queue">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-background font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] w-full md:w-auto"
            >
              Track Live
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Featured Salons */}
      <section>
        <SectionHeader title={`Luxury Salons ${selectedLocation !== 'All Mumbai' ? `in ${selectedLocation}` : 'Nearby'}`} action="See All" actionPath="/salons" />
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x min-h-[400px]">
          {filteredSalons.length > 0 ? filteredSalons.map((salon) => (
            <motion.div 
              key={salon.id}
              className="min-w-[300px] md:min-w-[400px] rounded-radius-xl overflow-hidden glass border border-white/5 snap-start group"
              whileHover={{ y: -10 }}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={salon.imageUrl} 
                  alt={salon.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} className="text-primary fill-primary" />
                  <span className="text-xs font-bold text-primary">{salon.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1 border-primary/20">
                    <Clock size={10} />
                    {salon.queueCount} Waiting
                  </div>
                  {salon.advanceBookings > 0 && (
                    <div className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-1 border-accent/20">
                      <CalendarDays size={10} />
                      {salon.advanceBookings} Booked
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg mb-1">{salon.name}</h4>
                <p className="text-xs text-on-surface-variant mb-4 flex items-center gap-1">
                  <MapPin size={10} />
                  {salon.address} • {salon.distance}
                </p>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Total Wait Time</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-serif text-primary">{salon.estimatedWait}</span>
                      <span className="text-xs text-on-surface-variant">mins</span>
                    </div>
                  </div>
                  <Link to={`/book/${salon.id}`} className="px-6 py-2 bg-primary text-background rounded-full font-bold text-sm">
                    Book
                  </Link>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="w-full h-64 flex flex-col items-center justify-center text-on-surface-variant gap-4">
              <MapPin size={48} className="opacity-20" />
              <p>No salons found in {selectedLocation} yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Stylists */}
      <section>
        <SectionHeader title="Premium Stylists" action="See All" actionPath="/stylists" />
        <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-4">
          {TRENDING_STYLISTS.map((stylist) => (
            <Link key={stylist.id} to={`/stylist/${stylist.id}`}>
              <motion.div 
                className="flex flex-col items-center gap-3 text-center min-w-[100px]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full p-1 border-2 border-primary/50 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <img 
                      src={stylist.imageUrl} 
                      alt={stylist.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {stylist.isVerified && (
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                      <Star size={12} className="text-background fill-background" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">{stylist.name}</p>
                  <p className="text-[10px] uppercase text-on-surface-variant font-medium tracking-[0.2em]">{stylist.specialty}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Home Service Card */}
      <motion.div 
        className="relative h-64 rounded-radius-xl overflow-hidden glass-gold group border-primary/30"
        whileHover={{ y: -5 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200" 
          alt="Home Service"
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="relative p-8 h-full flex flex-col justify-center max-w-sm">
          <div className="inline-flex items-center gap-2 text-primary font-bold tracking-[.3em] uppercase text-xs mb-4">
            <HomeIcon size={14} />
            Exclusive
          </div>
          <h2 className="text-3xl font-serif mb-4">Grooming at Your Doorstep</h2>
          <p className="text-on-surface-variant text-sm mb-6">Book world-class professionals for premium service at home.</p>
          <Link to="/stylists">
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-primary font-bold uppercase tracking-widest text-xs"
            >
              Explore Home Services
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* AI Recommendation Banner */}
      <section className="glass rounded-xl p-8 border-accent/20 relative overflow-hidden group">
        <div className="absolute right-[-50px] bottom-[-50px] w-80 h-80 bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-colors" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent neon-glow">
            <Sparkles size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">AI Hair Match</h3>
            <p className="text-on-surface-variant text-sm max-w-md">Our neural engine analyzes your face shape and hair texture to suggest the perfect luxury transformation.</p>
          </div>
          <Link to="/ai-scan" className="md:ml-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-accent text-white font-bold rounded-full shadow-[0_0_30px_rgba(138,43,226,0.3)] w-full md:w-auto"
            >
              Scan Profile
            </motion.button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
