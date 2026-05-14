import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ArrowLeft, 
  CreditCard, 
  Apple, 
  Wallet, 
  CheckCircle2, 
  UserCheck, 
  X, 
  ShieldCheck,
  Scissors
} from 'lucide-react';
import { format, addDays, startOfToday, isSameDay, isAfter, parse } from 'date-fns';
import { TRENDING_STYLISTS, FEATURED_SALONS } from '../constants';

// Mock data for slot availability
const MOCK_BOOKINGS: Record<string, number> = {
  [`${format(new Date(), 'yyyy-MM-dd')}-10:00 AM`]: 3,
  [`${format(new Date(), 'yyyy-MM-dd')}-12:30 PM`]: 2,
};

const MAX_CAPACITY = 3;

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  details: {
    stylistName: string;
    date: Date;
    time: string;
    price: string;
  };
}

const ConfirmationModal = ({ onClose, onConfirm, details }: ConfirmationModalProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="glass w-full max-w-lg rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-serif">Confirm Ritual</h3>
          <button onClick={onClose} className="p-2 glass rounded-full hover:text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Scissors size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Master Stylist</p>
                <p className="text-xl font-medium">{details.stylistName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Scheduled For</p>
                <div className="flex items-center gap-2 text-sm text-on-surface">
                  <CalendarIcon size={14} className="text-primary" />
                  {format(details.date, 'MMMM do, yyyy')}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Ritual Window</p>
                <div className="flex items-center gap-2 text-sm text-on-surface">
                  <Clock size={14} className="text-primary" />
                  {details.time}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Verified Reservation</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Total Investment</p>
              <p className="text-3xl font-serif text-primary">{details.price}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onConfirm}
          className="w-full py-6 bg-primary text-background font-bold rounded-full uppercase tracking-widest text-sm shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Finalize & Pay
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state as { date?: Date | string; slot?: string } | null;

  const stylist = TRENDING_STYLISTS.find(s => s.id === id) || TRENDING_STYLISTS[0];

  const [selectedDate, setSelectedDate] = useState(() => {
    if (initialState?.date) return new Date(initialState.date);
    return startOfToday();
  });
  const [selectedSlot, setSelectedSlot] = useState<string | null>(initialState?.slot || null);
  const [step, setStep] = useState(initialState?.slot ? 2 : 1);
  const [showConfirm, setShowConfirm] = useState(false);

  const dates = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i)), []);
  
  const allSlots = stylist?.pricePerHour ? 
    ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'] :
    (FEATURED_SALONS.find(s => s.id === id)?.availableTimeSlots || ['10:00 AM', '12:30 PM', '03:00 PM', '05:30 PM', '08:00 PM']);

  // Filter slots based on system time and capacity - ONLY show available future slots
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
        hidden: hasPassed, // Hide if it has passed
        disabled: isFull, // Disable if full
        bookings,
        isFull,
        hasPassed
      };
    }).filter(slot => !slot.hidden); // Filter out hidden slots
  }, [selectedDate, id, allSlots]);

  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8"
      >
        <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_50px_rgba(212,175,55,0.4)]">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-serif text-glow">Reservation Confirmed</h1>
          <p className="text-on-surface-variant max-w-md mx-auto">Your ritual at Lumiere Studio is locked for {format(selectedDate, 'MMM do')} at {selectedSlot}.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/queue')}
            className="px-8 py-4 bg-primary text-background font-bold rounded-full uppercase tracking-widest text-xs shadow-2xl"
          >
            Track Queue
          </button>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-4 glass border-white/10 text-on-surface font-bold rounded-full uppercase tracking-widest text-xs"
          >
            Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="glass p-3 rounded-full text-on-surface"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className={`w-12 h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-primary' : 'bg-white/10'}`} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.section 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif">Select Time Slot</h2>
              <p className="text-on-surface-variant">Choose a ritual window that suits your rhythm.</p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {dates.map((date) => {
                  const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                  return (
                    <motion.button
                      key={date.toString()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDate(date)}
                      className={`min-w-[80px] p-4 rounded-2xl border transition-all flex flex-col items-center gap-1
                        ${isSelected ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-white/5 glass text-on-surface-variant'}
                      `}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest">{format(date, 'EEE')}</span>
                      <span className="text-xl font-serif">{format(date, 'dd')}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <motion.button
                      key={slot.time}
                      whileHover={slot.disabled ? {} : { scale: 1.02 }}
                      whileTap={slot.disabled ? {} : { scale: 0.98 }}
                      disabled={slot.disabled}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`py-4 px-4 rounded-xl border transition-all text-sm font-medium relative group
                        ${isSelected ? 'border-primary bg-primary text-background shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 
                          slot.disabled ? 'border-white/5 bg-white/5 text-on-surface-variant cursor-not-allowed opacity-40' : 
                          'border-white/5 glass text-on-surface-variant hover:text-on-surface hover:border-primary/50'}
                      `}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>{slot.time}</span>
                        {slot.isFull ? (
                          <span className="text-[9px] uppercase font-bold tracking-tighter text-accent">Full</span>
                        ) : slot.hasPassed ? (
                          <span className="text-[9px] uppercase font-bold tracking-tighter">Past</span>
                        ) : (
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="flex -space-x-1">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-1.5 h-1.5 rounded-full border-[0.5px] border-background ${i < slot.bookings ? (isSelected ? 'bg-background' : 'bg-primary') : (isSelected ? 'bg-white/20' : 'bg-white/10')}`} 
                                />
                              ))}
                            </div>
                            <span className={`text-[8px] uppercase font-bold ${isSelected ? 'text-background' : 'text-on-surface-variant'}`}>
                              {MAX_CAPACITY - slot.bookings} Left
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <motion.button 
              disabled={!selectedSlot}
              onClick={() => setStep(2)}
              className="w-full py-5 bg-primary text-background font-bold rounded-full uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Continue to Payment
            </motion.button>
          </motion.section>
        ) : (
          <motion.section 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif">Secure Ritual</h2>
              <p className="text-on-surface-variant">Confirm details for your transformation.</p>
            </div>

            <div className="glass p-8 rounded-3xl space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <div>
                  <h4 className="text-lg mb-1">Luxe Skin Fade + Sculpting</h4>
                  <p className="text-xs text-on-surface-variant">Artist: Sameer K.</p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold">₹2,499</p>
                  <p className="text-[10px] uppercase text-on-surface-variant italic">Inclusive of taxes</p>
                </div>
              </div>
              
              <div className="flex gap-12">
                <div className="flex items-center gap-3">
                  <CalendarIcon size={18} className="text-primary" />
                  <span className="text-sm font-medium">{format(selectedDate, 'MMM do')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-primary" />
                  <span className="text-sm font-medium">{selectedSlot}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-label-caps text-primary tracking-[.4em] uppercase">Payment Method</h3>
              <div className="space-y-4">
                {[
                  { id: 'apple', icon: Apple, label: 'Apple Pay', active: true },
                  { id: 'card', icon: CreditCard, label: 'Credit / Debit Card' },
                  { id: 'upi', icon: Wallet, label: 'UPI / NetBanking' },
                ].map((method) => (
                  <label key={method.id} className="flex items-center justify-between p-6 glass rounded-2xl border-white/5 cursor-pointer hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-6">
                      <method.icon size={24} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                      <span className="font-bold text-lg">{method.label}</span>
                    </div>
                    <input type="radio" name="payment" className="w-6 h-6 border-white/10 bg-transparent text-primary focus:ring-primary" defaultChecked={method.active} />
                  </label>
                ))}
              </div>
            </div>

            <motion.button 
              onClick={() => setShowConfirm(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-primary text-background font-bold rounded-full uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            >
              Pay & Confirm
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirm && (
          <ConfirmationModal 
            onClose={() => setShowConfirm(false)}
            onConfirm={() => {
              setShowConfirm(false);
              setStep(3);
            }}
            details={{
              stylistName: stylist.name,
              date: selectedDate,
              time: selectedSlot || '',
              price: '₹2,499'
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
