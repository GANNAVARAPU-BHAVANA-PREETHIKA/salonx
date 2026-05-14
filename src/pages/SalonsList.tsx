import { motion, AnimatePresence } from 'motion/react';
import { FEATURED_SALONS } from '../constants';
import { Star, MapPin, Clock, ArrowRight, ChevronDown, CalendarDays, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';

const locations = ["All Mumbai", "Bandra", "Juhu", "Colaba", "Andheri"];

export default function SalonsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Mumbai");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [sortBy, setSortBy] = useState("rating"); // rating, waitTime, distance
  const [showSortPicker, setShowSortPicker] = useState(false);

  const filteredSalons = useMemo(() => {
    let results = [...FEATURED_SALONS];
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

    // Sort logic
    results.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "waitTime") return a.estimatedWait - b.estimatedWait;
      if (sortBy === "distance") {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      }
      return 0;
    });

    return results;
  }, [selectedLocation, searchQuery, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-serif">Luxury Salons</h2>
        <p className="text-on-surface-variant text-sm">Discover and book the finest grooming destinations in Mumbai.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search by name or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass py-4 pl-14 pr-6 rounded-2xl border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-on-surface-variant/50"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative flex-1 md:flex-initial">
            <button 
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="w-full h-full flex items-center justify-between gap-3 glass px-6 py-4 rounded-2xl text-sm font-bold border-white/10 min-w-[200px]"
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
                  className="absolute top-full left-0 mt-2 w-full glass rounded-2xl overflow-hidden z-50 border border-white/10 shadow-2xl"
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

          <div className="relative">
            <button 
              onClick={() => setShowSortPicker(!showSortPicker)}
              className={`glass p-4 rounded-2xl border transition-colors ${showSortPicker ? 'border-primary text-primary' : 'border-white/5'}`}
            >
              <SlidersHorizontal size={20} />
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-3 py-1">Sort By</p>
                  </div>
                  {[
                    { id: 'rating', label: 'Highest Rated' },
                    { id: 'waitTime', label: 'Shortest Wait' },
                    { id: 'distance', label: 'Nearest' }
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
      </div>

      {/* Salons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSalons.length > 0 ? filteredSalons.map((salon) => (
          <motion.div 
            key={salon.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-radius-xl overflow-hidden glass border border-white/5 group"
            whileHover={{ y: -8 }}
          >
            <div className="h-56 relative overflow-hidden">
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
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-xl">{salon.name}</h4>
                <p className="text-primary text-sm font-serif font-bold">~{salon.estimatedWait}m</p>
              </div>
              <p className="text-xs text-on-surface-variant mb-6 flex items-center gap-1">
                <MapPin size={10} />
                {salon.address} • {salon.distance}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to={`/book/${salon.id}`}
                  className="flex items-center justify-center gap-2 py-3 bg-primary text-background rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Book Ritual
                </Link>
                <Link 
                  to={`/queue`}
                  className="flex items-center justify-center gap-2 py-3 glass rounded-xl font-bold text-sm border-white/10 hover:bg-white/5 transition-colors"
                >
                  Live Queue
                </Link>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-on-surface-variant gap-4">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-2">
              <MapPin size={32} className="opacity-20" />
            </div>
            <h3 className="text-xl font-serif text-white">No Salons Match Your Search</h3>
            <p className="text-sm max-w-xs text-center">Try adjusting your filters or searching in a different location.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedLocation("All Mumbai"); }}
              className="mt-4 text-primary font-bold uppercase tracking-widest text-xs"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
