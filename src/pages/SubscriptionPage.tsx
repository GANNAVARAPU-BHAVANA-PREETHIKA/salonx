import { motion } from 'motion/react';
import { Star, ShieldCheck, Crown, Zap, Gift, Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: "Obsidian",
    price: "299",
    tier: "Basic",
    color: "from-white/10 to-white/5",
    accent: "text-secondary",
    description: "Standard access to all salons with digital queue management.",
    features: [
      "Real-time Queue Tracking",
      "5% Back on Luxury Products",
      "Standard Booking Windows"
    ]
  },
  {
    name: "Solstice",
    price: "499",
    tier: "Preferred",
    color: "from-accent/20 to-accent/5",
    accent: "text-accent",
    description: "Priority access and exclusive member-only digital content.",
    features: [
      "Priority Queue Placement",
      "10% Service Credits",
      "Quarterly Trend Reports",
      "Event Styling Pre-access"
    ],
    popular: true
  },
  {
    name: "Zenith Gold",
    price: "799",
    tier: "Elite",
    color: "from-primary/20 to-primary/5",
    accent: "text-primary",
    description: "The ultimate grooming ritual. Zero-wait and dedicated concierge.",
    features: [
      "Instant VIP Entry",
      "Dedicated Global Concierge",
      "Free Signature Coffee",
      "Monthly Curator Gift Box",
      "Home Service Priority"
    ]
  }
];

export default function SubscriptionPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-7xl font-serif text-glow leading-tight">SalonX Membership</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          Elevate your grooming ritual. Experience a world where time follows your lead.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {plans.map((plan) => (
          <motion.div 
            key={plan.name}
            whileHover={{ y: -15, scale: 1.02 }}
            className={`relative rounded-radius-xl p-8 bg-gradient-to-br ${plan.color} border border-white/10 flex flex-col group shadow-2xl transition-all duration-500`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-accent text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(138,43,226,0.3)]">
                Most Popular
              </div>
            )}

            <div className="space-y-6 mb-12">
              <div>
                <p className={`font-bold tracking-[.3em] uppercase text-[10px] ${plan.accent} mb-2`}>{plan.tier}</p>
                <h2 className="text-4xl font-serif">{plan.name}</h2>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-serif">₹{plan.price}</span>
                <span className="text-on-surface-variant text-sm font-medium">/ month</span>
              </div>

              <p className="text-on-surface-variant text-sm leading-relaxed min-h-[60px]">
                {plan.description}
              </p>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-4 items-start group/feature">
                    <div className="mt-1 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover/feature:bg-primary group-hover/feature:text-background transition-all">
                      <Check size={12} />
                    </div>
                    <span className="text-sm text-on-surface-variant group-hover/feature:text-on-surface transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-auto w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all
                ${plan.name.includes('Gold') 
                  ? 'bg-primary text-background shadow-[0_0_30px_rgba(212,175,55,0.3)]' 
                  : 'glass border-white/10 text-on-surface hover:border-primary/50'}
              `}
            >
              Select Plan
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Perks Banner */}
      <section className="glass rounded-radius-xl p-12 overflow-hidden relative">
        <div className="absolute left-[-100px] top-[-100px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="grid grid-cols-2 gap-4 md:gap-8 flex-1">
            <div className="flex flex-col gap-2 p-6 glass rounded-2xl border-white/5">
              <Zap className="text-primary mb-2" size={24} />
              <p className="font-bold">Zero-Wait</p>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">Instant seat allocation upon arrival at any flagship location.</p>
            </div>
            <div className="flex flex-col gap-2 p-6 glass rounded-2xl border-white/5">
              <ShieldCheck className="text-primary mb-2" size={24} />
              <p className="font-bold">VIP Privacy</p>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">Exclusive access to private suites for high-level grooming rituals.</p>
            </div>
          </div>
          <div className="max-w-md text-center md:text-left space-y-6">
            <h3 className="text-2xl md:text-4xl font-serif">Aura Elite Collective</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Join 50,000+ members who redefined their grooming standards. Unlock global concierge services and seasonal lifestyle boxes worth ₹3,500.
            </p>
            <button className="flex items-center gap-4 text-primary font-bold uppercase tracking-[.4em] text-xs hover:gap-6 transition-all">
              Compare All Benefits
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
