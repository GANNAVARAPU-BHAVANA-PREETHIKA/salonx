import { motion, AnimatePresence } from 'motion/react';
import { TRENDING_STYLISTS } from '../constants';
import { Star, MapPin, Search, Filter, CheckCircle2, IndianRupee, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';

export default function StylistsMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating"); // rating, price, experience
  const [showSortPicker, setShowSortPicker] = useState(false);

  const filteredStylists = useMemo(() => {
    let results = [...TRENDING_STYLISTS];
    
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      results = results.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.specialty.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
      );
    }

    // Sort logic
    results.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") {
        return a.pricePerHour - b.pricePerHour;
      }
      return 0;
    });

    return results;
  }, [searchQuery, sortBy]);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <header className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-serif mb-2">Stylists</h1>
          <p className="text-on-surface-variant">Top-tier hair architects at your service</p>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 glass rounded-2xl flex items-center px-4 border border-white/5 group">
            <Search size={18} className="text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, specialty, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 py-4 text-sm px-4 placeholder:text-on-surface-variant/50"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowSortPicker(!showSortPicker)}
              className={`glass p-4 rounded-2xl border transition-colors ${showSortPicker ? 'border-primary text-primary' : 'border-white/5'}`}
            >
              <Filter size={18} />
            </button>
            <AnimatePresence>
              {showSortPicker && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-48 glass rounded-2xl overflow-hidden z-50 border border-white/10 shadow-2xl"
                >
                  <div className="p-2 border-b border-white/5 bg-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-3 py-1">Sort Stylists</p>
                  </div>
                  {[
                    { id: 'rating', label: 'Top Rated' },
                    { id: 'price', label: 'Price: Low to High' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setShowSortPicker(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors hover:bg-white/5 ${sortBy === option.id ? 'text-primary' : 'text-on-surface-variant'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStylists.map((stylist) => (
          <Link 
            key={stylist.id}
            to={`/stylist/${stylist.id}`}
            className="glass rounded-3xl overflow-hidden group border border-white/5 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
          >
            <div className="p-6 flex gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl overflow-hidden">
                  <img 
                    src={stylist.imageUrl} 
                    alt={stylist.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                {stylist.isVerified && (
                  <div className="absolute -top-2 -right-2 bg-primary text-background p-1 rounded-full shadow-lg">
                    <CheckCircle2 size={12} fill="currentColor" className="text-background" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{stylist.name}</h3>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">{stylist.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 glass px-2 py-1 rounded-lg text-xs font-bold border-white/10">
                    <Star size={10} className="text-primary fill-primary" />
                    {stylist.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {stylist.location}
                  </span>
                  <span className="flex items-center gap-1 text-primary">
                    <IndianRupee size={12} />
                    {stylist.pricePerHour}/hr
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-zinc-800" />
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                      +{stylist.reviews}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">View Profile</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
