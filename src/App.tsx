import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X, Calendar, BookOpen, Music, Newspaper, Mail, ChevronRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Schedule from './components/Schedule';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Data & Types
import { NEWS, ARTIST_INFO } from './data';
import { NewsItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Scroll Spy to highlight current navigation section
  useEffect(() => {
    const sections = ['hero', 'news-section', 'about', 'works', 'schedule', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for nav bar

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // map news-section spy back to hero or about for navbar active item
            if (sectionId === 'news-section') {
              setActiveSection('hero');
            } else {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const targetId = sectionId === 'hero' ? 'hero' : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('hero');
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#1c0808] text-stone-300 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. Header/Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 2. Banner/Hero Presentation */}
      <Hero 
        onExploreWorks={() => handleNavigate('works')} 
        onContact={() => handleNavigate('contact')} 
      />

      {/* 3. Latest News / 最新动态 (Integrated immediately after Hero) */}
      <section id="news-section" className="py-20 bg-[#1c0808] border-t border-b border-red-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div className="space-y-1">
              <p className="text-amber-500 font-mono text-xs tracking-widest uppercase">LATEST ACTIVITIES</p>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-100 tracking-widest flex items-center space-x-2">
                <Newspaper className="w-5.5 h-5.5 text-amber-500/80" />
                <span>最新艺术动态</span>
              </h2>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm font-serif max-w-sm">
              “闻琴知雅意” —— 了解万年芳先生近期的学术表彰、演出计划及官方出版。
            </p>
          </div>

          {/* News grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-[#2a0e0e]/60 border border-red-950/30 rounded-lg overflow-hidden group hover:border-red-900/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Cover */}
                {article.imageUrl && (
                  <div className="relative aspect-video overflow-hidden bg-[#150404]">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transform group-hover:scale-103 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a0e0e]/80 via-transparent to-transparent" />
                  </div>
                )}

                {/* Body Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xxs font-mono text-stone-500">
                      <span className="text-amber-500/80 font-semibold tracking-wider bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 rounded">
                        {article.category === 'performance' ? '演艺公告' : article.category === 'academic' ? '学术泰斗' : '官方出版'}
                      </span>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="text-stone-200 group-hover:text-amber-400 font-serif font-bold text-sm sm:text-base leading-snug transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-stone-400 text-xs leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-amber-500 hover:text-amber-400 text-xs font-serif tracking-wider flex items-center space-x-1 mt-2.5 transition-all self-start group-hover:translate-x-1 duration-300 cursor-pointer"
                  >
                    <span>阅读新闻全文</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Biography / Artistic Journey */}
      <About />

      {/* 5. Masterpieces / Dynamic Synthesizer Player */}
      <Works />

      {/* 6. Performance Calendars / Local Booking reservations */}
      <Schedule />

      {/* 7. Contact Board & Cooperation logs */}
      <Contact />

      {/* 8. Footer */}
      <Footer onBackToTop={handleBackToTop} />

      {/* 9. NEWS READING LIGHTBOX */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#240c0c] border border-red-900/30 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl relative my-8"
            >
              {/* Cover Header Image if exists */}
              {selectedArticle.imageUrl && (
                <div className="relative h-48 sm:h-64 bg-[#150404] overflow-hidden">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#240c0c] via-[#240c0c]/40 to-transparent" />
                  
                  {/* Close button inside image */}
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-stone-200 hover:text-stone-50 transition-colors focus:outline-none z-10"
                    title="关闭"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 relative">
                {/* Fallback simple Close button if no image */}
                {!selectedArticle.imageUrl && (
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xxs font-mono text-stone-400">
                    <span className="text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                      {selectedArticle.category === 'performance' ? '演艺公告' : selectedArticle.category === 'academic' ? '学术活动' : '官方报道'}
                    </span>
                    <span>发布日期: {selectedArticle.date}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 leading-snug">
                    {selectedArticle.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-amber-500/60" />
                </div>

                {/* Poetic description / summary box */}
                <p className="bg-[#150404] p-4 rounded text-stone-300 font-serif leading-relaxed text-sm border-l-2 border-amber-500 italic">
                  “{selectedArticle.summary}”
                </p>

                {/* Body Content paragraphs */}
                <div className="text-stone-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                  {selectedArticle.content.split('\n\n').map((para, i) => (
                    <p key={i} className="indent-8">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Footer seal signature */}
                <div className="border-t border-red-900/20 pt-6 flex justify-between items-center text-stone-500 text-xxs font-mono">
                  <span>中国民乐新闻中心 ・ 官方受权发布</span>
                  <span className="font-serif italic text-amber-500/80">万年芳工作室</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
