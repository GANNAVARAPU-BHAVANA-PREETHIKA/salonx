import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Scissors, Clock, ShieldCheck } from 'lucide-react';

const slides = [
  {
    title: "Skip the Waiting",
    description: "Every minute counts. Book your premium slot and track the live queue in real-time.",
    icon: Clock,
    color: "from-primary/20",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Elite Stylist Marketplace",
    description: "Connect with industry-leading artists and explore futuristic hair-tech portfolio.",
    icon: Scissors,
    color: "from-accent/20",
    image: "https://images.unsplash.com/photo-1522337094846-8a8101f4e1f2?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Luxury at Home",
    description: "Experience world-class grooming rituals delivered to your doorstep.",
    icon: ShieldCheck,
    color: "from-primary/20",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI-Powered Aesthetics",
    description: "Let our smart engine recommend your next signature look based on face geometry.",
    icon: Sparkles,
    color: "from-accent/20",
    image: "https://images.unsplash.com/photo-1621605815841-aa88c82b0ad2?auto=format&fit=crop&q=80&w=800"
  }
];

export default function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [isLapsed, setIsLapsed] = useState(false);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setIsLapsed(true);
      setTimeout(onComplete, 800);
    }
  };

  return (
    <AnimatePresence>
      {!isLapsed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col"
        >
          {/* Progress Bar */}
          <div className="absolute top-12 left-6 right-6 flex gap-2 h-1 px-4">
            {slides.map((_, i) => (
              <div key={i} className="flex-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: i <= current ? '100%' : '0%' }}
                  className={`h-full ${i % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}
                />
              </div>
            ))}
          </div>

          {/* Background Image Container */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={slides[current].image} 
                  className="w-full h-full object-cover" 
                  alt="Slide"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent`} />
              </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-10 space-y-8">
              <motion.div 
                key={`icon-${current}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`w-16 h-16 glass rounded-2xl flex items-center justify-center ${current % 2 === 0 ? 'text-primary' : 'text-accent'} shadow-2xl`}
              >
                {/* Dynamically render the icon */}
                {(() => {
                  const Icon = slides[current].icon;
                  return <Icon size={32} />;
                })()}
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  key={`title-${current}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-6xl font-serif text-glow leading-tight"
                >
                  {slides[current].title}
                </motion.h1>
                <motion.p 
                  key={`desc-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-on-surface-variant text-lg max-w-sm leading-relaxed"
                >
                  {slides[current].description}
                </motion.p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                className="group w-full max-w-xs py-5 bg-white text-background rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-4"
              >
                {current === slides.length - 1 ? 'Enter SalonX' : 'Continue'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
