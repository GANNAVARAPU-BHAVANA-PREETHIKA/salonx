import { Routes, Route, useLocation, Link, BrowserRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Calendar, 
  User, 
  Layout, 
  Scissors, 
  Sparkles,
  Zap,
  Share2
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Pages
import HomeScreen from './pages/HomeScreen';
import StylistDetail from './pages/StylistDetail';
import BookingPage from './pages/BookingPage';
import QueueTracking from './pages/QueueTracking';
import SubscriptionPage from './pages/SubscriptionPage';
import OwnerDashboard from './pages/OwnerDashboard';
import StylistsMarketplace from './pages/StylistsMarketplace';
import AIScan from './pages/AIScan';
import ProfilePage from './pages/ProfilePage';
import SalonsList from './pages/SalonsList';
import OnboardingFlow from './components/OnboardingFlow';

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Scissors, path: '/stylists', label: 'Market' },
    { icon: Zap, path: '/queue', label: 'Queue' },
    { icon: Sparkles, path: '/memberships', label: 'Gold' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 glass rounded-full flex items-center justify-around px-2 z-50 shadow-2xl border-white/10 md:hidden">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`relative p-3 rounded-full transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            <item.icon size={22} />
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-primary/10 rounded-full -z-10 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

const Header = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lumiere Grooming',
          text: 'Check out these luxury grooming rituals!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 glass border-b border-white/5 flex items-center justify-between px-6 z-40">
    <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" 
          alt="Avatar" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden sm:block">
        <p className="text-[10px] text-on-surface-variant font-medium tracking-wider uppercase leading-none mb-1">Welcome back</p>
        <h2 className="text-primary font-serif font-bold text-base leading-none">Arjun R.</h2>
      </div>
    </Link>
      <div className="flex items-center gap-4">
        <motion.button 
          onClick={handleShare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 glass rounded-full flex items-center justify-center text-primary"
        >
          <Share2 size={20} />
        </motion.button>
      <div className="hidden md:flex gap-6 items-center ml-4">
        <Link to="/" className="text-on-surface hover:text-primary transition-colors text-sm font-medium">Home</Link>
        <Link to="/salons" className="text-on-surface hover:text-primary transition-colors text-sm font-medium">Salons</Link>
        <Link to="/stylists" className="text-on-surface hover:text-primary transition-colors text-sm font-medium">Stylists</Link>
        <Link to="/queue" className="text-on-surface hover:text-primary transition-colors text-sm font-medium">Activity</Link>
        <Link to="/profile" className="text-on-surface hover:text-primary transition-colors text-sm font-medium">Profile</Link>
        <Link to="/stylists" className="hidden lg:block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-primary text-background font-bold rounded-full text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Book Now
          </motion.button>
        </Link>
      </div>
    </div>
    </header>
  );
};

const AppContent = () => {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem('onboarding_completed') !== 'true';
  });

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/salons" element={<SalonsList />} />
          <Route path="/stylists" element={<StylistsMarketplace />} />
          <Route path="/stylist/:id" element={<StylistDetail />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/queue" element={<QueueTracking />} />
          <Route path="/memberships" element={<SubscriptionPage />} />
          <Route path="/admin" element={<OwnerDashboard />} />
          <Route path="/ai-scan" element={<AIScan />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Navigation />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
