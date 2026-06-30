import { useState, useEffect } from 'react';
import { Menu, X, Music, Mail, Calendar, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: '首页', icon: Sparkles },
    { id: 'about', label: '艺术历程', icon: BookOpen },
    { id: 'works', label: '作品展示', icon: Music },
    { id: 'schedule', label: '演出日程', icon: Calendar },
    { id: 'contact', label: '联系合作', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1c0808]/90 backdrop-blur-md shadow-lg border-b border-red-950/30 py-3'
          : 'bg-gradient-to-b from-[#1c0808]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Calligraphy Signature */}
          <div 
            className="flex items-baseline space-x-3 cursor-pointer"
            onClick={() => handleNavClick('hero')}
          >
            <span className="font-serif text-2xl tracking-widest text-stone-100 font-bold relative group">
              万年芳
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="text-xs font-sans text-stone-400 tracking-widest hidden sm:inline-block border-l border-stone-800 pl-3">
              二胡演奏家 官方网站
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 text-sm tracking-wider transition-all duration-300 relative py-2 ${
                    isActive
                      ? 'text-amber-400 font-medium'
                      : 'text-stone-300 hover:text-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-300 hover:text-stone-100 focus:outline-none p-2 rounded-md hover:bg-red-900/20 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1c0808]/95 backdrop-blur-lg border-b border-red-950/40"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-base tracking-wider transition-colors ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 font-medium border-l-2 border-amber-500'
                        : 'text-stone-300 hover:bg-red-900/20 hover:text-stone-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 opacity-85" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
