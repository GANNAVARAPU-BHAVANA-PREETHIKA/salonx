import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Star, Instagram, Youtube, Calendar, MessageSquare, ArrowLeft, ArrowRight, Clock, CalendarDays } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { TRENDING_STYLISTS } from '../constants';
import { useState, useMemo } from 'react';
import { format, addDays, startOfToday, isSameDay, isAfter, parse } from 'date-fns';

const MOCK_BOOKINGS: Record<string, number> = {
  [`${format(new Date(), 'yyyy-MM-dd')}-10:00 AM`]: 3,
  [`${format(new Date(), 'yyyy-MM-dd')}-12:30 PM`]: 2,
};

const MAX_CAPACITY = 3;

export default function StylistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const stylist = TRENDING_STYLISTS.find(s => s.id === id) || TRENDING_STYLISTS[0];

  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const dates = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i)), []);
  const allSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM', '09:00 PM'];

  const availableSlots = useMemo(() => {
    const now = new Date();
    const isToday = isSameDay(selectedDate, now);

    return allSlots.map(time => {
      const slotDateTime = parse(`${format(selectedDate, 'yyyy-MM-dd')} ${time}`, 'yyyy-MM-dd hh:mm a', new Date());
      const bookings = MOCK_BOOKINGS[`${format(selectedDate, 'yyyy-MM-dd')}-${time}`] || 0;
      
      const hasPassed = isToday && !isAfter(slotDateTime, now);
      const isFull = bookings >= MAX_CAPACITY;

      return {
        time,
        hidden: hasPassed,
        disabled: isFull,
        bookings,
        isFull,
        hasPassed
      };
    }).filter(slot => !slot.hidden);
  }, [selectedDate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <button 
        onClick={() => navigate(-1)}
        className="glass p-3 rounded-full text-on-surface hover:text-primary transition-colors inline-block mb-4"
      >
        <ArrowLeft size={20} />
      </button>

      <section className="flex flex-col lg:flex-row gap-12">
        {/* Profile Hero */}
        <div className="lg:w-1/2">
          <div className="relative aspect-[4/5] rounded-radius-xl overflow-hidden glass border-primary/20">
            <img 
              src={stylist.imageUrl} 
              alt={stylist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border-primary/30">
                  Featured Artist
                </span>
                <span className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-on-surface border-white/10">
                  {stylist.experience} Experience
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif mb-4 flex items-center gap-4">
                {stylist.name}
                <CheckCircle2 size={32} className="text-primary" />
              </h1>
              <div className="flex gap-8">
                <div>
                  <p className="text-primary font-bold text-xl">{stylist.rating}</p>
                  <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">Rating</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-white font-bold text-xl">₹{stylist.pricePerHour}/hr</p>
                  <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">Pricing</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-white font-bold text-xl">{stylist.location}</p>
                  <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">Location</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Actions */}
        <div className="lg:w-1/2 space-y-8 py-4">
          <div className="space-y-4">
            <h3 className="text-label-caps text-primary tracking-[.4em] uppercase">About Artist</h3>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Sameer is a celebrity visionary specializing in architectural fades and futuristic editorial styling. Featured in Vogue & GQ.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 glass rounded-2xl flex items-center justify-center gap-3 text-on-surface hover:text-primary transition-colors"
            >
              <Instagram size={20} />
              Portfolio
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 glass rounded-2xl flex items-center justify-center gap-3 text-on-surface hover:text-primary transition-colors"
            >
              <Youtube size={20} />
              Reels
            </motion.button>
          </div>

          <div className="space-y-4 pt-8">
            <h3 className="text-label-caps text-primary tracking-[.4em] uppercase">Signature Services</h3>
            <div className="space-y-3">
              {['Cyber Fade', 'Hydro-Transformation', 'Editorial Sculpting'].map((service) => (
                <div key={service} className="p-4 glass rounded-xl flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-colors">
                  <span className="font-medium group-hover:text-primary transition-colors">{service}</span>
                  <ArrowRight size={16} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-label-caps text-primary tracking-[.4em] uppercase">Reserve a Session</h3>
              <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                <Clock size={12} className="text-primary" />
                Live Availability
              </div>
            </div>

            {/* Date Picker */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {dates.map((date) => {
                const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                return (
                  <motion.button
                    key={date.toString()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(date)}
                    className={`min-w-[70px] p-4 rounded-2xl border transition-all flex flex-col items-center gap-1
                      ${isSelected ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-white/5 glass text-on-surface-variant'}
                    `}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">{format(date, 'EEE')}</span>
                    <span className="text-lg font-serif">{format(date, 'dd')}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Slot Picker */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot.time;
                return (
                  <motion.button
                    key={slot.time}
                    whileHover={slot.disabled ? {} : { scale: 1.02 }}
                    whileTap={slot.disabled ? {} : { scale: 0.98 }}
                    disabled={slot.disabled}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`py-3 px-3 rounded-xl border transition-all text-xs font-medium relative
                      ${isSelected ? 'border-primary bg-primary text-background shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 
                        slot.disabled ? 'border-white/5 bg-white/5 text-on-surface-variant opacity-40 cursor-not-allowed' : 
                        'border-white/5 glass text-on-surface-variant hover:text-on-surface hover:border-primary/40'}
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <span>{slot.time}</span>
                      {slot.disabled ? (
                        <span className="text-[8px] uppercase font-bold text-accent">{slot.isFull ? 'Full' : 'Past'}</span>
                      ) : (
                        <div className="flex -space-x-1">
                          {Array.from({ length: MAX_CAPACITY }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-1.5 h-1.5 rounded-full border-[0.5px] border-background ${i < slot.bookings ? (isSelected ? 'bg-background' : 'bg-primary') : (isSelected ? 'bg-white/20' : 'bg-white/10')}`} 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <motion.button 
              whileHover={!selectedSlot ? {} : { scale: 1.05 }}
              whileTap={!selectedSlot ? {} : { scale: 0.95 }}
              disabled={!selectedSlot}
              onClick={() => navigate(`/book/${stylist.id}`, { state: { date: selectedDate, slot: selectedSlot } })}
              className="flex-1 py-5 bg-primary text-background font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_0_40px_rgba(212,175,55,0.3)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {selectedSlot ? `Confirm ritual at ${selectedSlot}` : 'Select a slot'}
            </motion.button>
            <button className="p-5 glass rounded-full text-on-surface hover:text-primary transition-colors">
              <MessageSquare size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-serif">Aura Masterpieces</h3>
          <span className="text-on-surface-variant text-xs font-bold tracking-widest uppercase italic">Updated Yesterday</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden glass border-white/5 relative group"
            >
              <img 
                src={`https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400&sig=${i}`} 
                alt="Work"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
