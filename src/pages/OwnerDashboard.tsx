import { motion } from 'motion/react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Scissors, 
  Package, 
  ArrowUpRight,
  TrendingDown,
  LayoutDashboard
} from 'lucide-react';

const stats = [
  { label: 'Revenue', value: '₹14.2L', trend: '+12%', up: true, icon: TrendingUp },
  { label: 'Wait Time', value: '18m', trend: '-5m', up: false, icon: Calendar },
  { label: 'Active Slots', value: '42/50', trend: '84%', up: true, icon: Scissors },
];

export default function OwnerDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif mb-2">Salon Analytics</h1>
          <p className="text-on-surface-variant">Lumiere Studio • Main Terminal</p>
        </div>
        <div className="flex gap-4">
          <button className="glass px-6 py-2 rounded-xl flex items-center gap-2 text-sm font-bold">
            <LayoutDashboard size={16} />
            Overview
          </button>
          <button className="bg-primary text-background px-6 py-2 rounded-xl flex items-center gap-2 text-sm font-bold">
            <TrendingUp size={16} />
            Performance
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.label}
            whileHover={{ y: -5 }}
            className="glass p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl text-primary">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-primary' : 'text-accent'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-serif">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Queue List */}
        <div className="glass p-8 rounded-3xl space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif">Live Operations</h2>
            <span className="text-xs text-primary font-bold tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">High Traffic</span>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 glass rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold">AR</div>
                  <div>
                    <p className="font-bold">Arjun Raghavan</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Master Fade • Seat 4</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">In Progress</p>
                  <p className="text-[10px] text-primary uppercase font-bold tracking-widest">12m Left</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Status */}
        <div className="glass p-8 rounded-3xl space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif">Supplies Terminal</h2>
            <Settings size={20} className="text-on-surface-variant" />
          </div>
          <div className="space-y-6">
            {[
              { name: 'Olaplex No. 3', stock: 12, max: 50 },
              { name: 'Matte Clay Wax', stock: 45, max: 100 },
              { name: 'Color Toner Silver', stock: 5, max: 30 },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">{item.name}</span>
                  <span className={item.stock < 10 ? 'text-accent' : 'text-primary'}>{item.stock} Units Left</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.stock / item.max) * 100}%` }}
                    className={`h-full ${item.stock < 10 ? 'bg-accent' : 'bg-primary'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
