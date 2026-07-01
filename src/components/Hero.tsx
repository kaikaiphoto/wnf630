import { Play, Calendar, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { ARTIST_INFO } from '../data';

interface HeroProps {
  onExploreWorks: () => void;
  onContact: () => void;
}

export default function Hero({ onExploreWorks, onContact }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#1c0808] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Dynamic Water-ink background overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-red-950 via-red-900/40 to-transparent blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-red-950 via-red-900/40 to-transparent blur-[150px]" />
        {/* Subtle decorative horizontal red ink line - traditional Chinese artistic signature */}
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-red-800/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Portrait Image with Classical Framing */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group max-w-[420px] sm:max-w-[500px] lg:max-w-[550px] w-full"
            >
              {/* Outer Golden Line Frame */}
              <div className="absolute inset-4 border border-amber-500/20 pointer-events-none -translate-x-3 -translate-y-3 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 z-0" />
              
              {/* Main Image Frame with Shadow & Soft Overlay */}
              <div className="relative z-10 overflow-hidden rounded shadow-2xl shadow-black/80 border border-red-950/50 bg-[#240c0c]">
                <img
                  src={ARTIST_INFO.avatarUrl}
                  alt={ARTIST_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform scale-102 transition-transform duration-700 group-hover:scale-105"
                  id="hero-artist-avatar"
                />
                
                {/* Subtle light/mist sweep across the face of the photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

            </motion.div>
          </div>

          {/* Right Column: Slogan, Title and Introduction */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              
              {/* Aesthetic Subtitle Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start space-x-2 text-amber-500 text-xs tracking-widest font-semibold uppercase"
              >
                <Music className="w-4 h-4 text-amber-500/80" />
                <span>ERHU VIRTUAL CONCERT HALL</span>
                <span className="w-8 h-[1px] bg-amber-500/40 hidden sm:inline-block" />
              </motion.div>

              {/* Master Slogan */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1.0 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-widest leading-tight text-stone-50 font-medium"
              >
                弦动山河
                <br className="sm:hidden" />
                <span className="text-amber-400 font-normal sm:ml-4">韵载春秋</span>
              </motion.h1>

              {/* Artist Name & Title Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.0 }}
                className="inline-flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 pt-2"
              >
                <span className="text-2xl sm:text-3xl font-serif text-stone-100 font-semibold tracking-widest border-stone-800 pr-0 sm:pr-4 sm:border-r">
                  {ARTIST_INFO.name}
                </span>
                <span className="text-sm font-sans text-stone-400 tracking-wider">
                  {ARTIST_INFO.title}
                </span>
              </motion.div>
            </div>

            {/* Poetic description / Slogan representation */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0 }}
              className="text-stone-300 font-serif leading-relaxed text-base sm:text-lg max-w-xl mx-auto lg:mx-0 italic border-l-2 border-red-950/60 pl-4 py-1"
            >
              {ARTIST_INFO.subSlogan}
            </motion.p>

            {/* Short Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="text-stone-400 font-sans leading-relaxed text-sm sm:text-base max-w-2xl mx-auto lg:mx-0"
            >
              {ARTIST_INFO.bioBrief}
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.0 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                id="hero-btn-explore"
                onClick={onExploreWorks}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-medium tracking-widest rounded transition-all duration-300 shadow-xl shadow-amber-950/20 flex items-center justify-center space-x-2.5 active:scale-98"
              >
                <Play className="w-4 h-4 fill-current text-stone-950" />
                <span>聆听代表作</span>
              </button>
              
              <button
                id="hero-btn-contact"
                onClick={onContact}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#240c0c] hover:bg-[#321212] border border-red-950/50 hover:border-red-900/40 text-stone-200 hover:text-stone-50 font-medium tracking-widest rounded transition-all duration-300 flex items-center justify-center space-x-2.5 active:scale-98"
              >
                <Calendar className="w-4 h-4 text-stone-400" />
                <span>商务合作与演出</span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Aesthetic bottom shadow fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1c0808] to-transparent pointer-events-none" />
    </section>
  );
}
