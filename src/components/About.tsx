import { Award, GraduationCap, Globe, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { ARTIST_INFO } from '../data';

export default function About() {
  // Map years to suitable icons
  const getAchievementIcon = (year: string) => {
    switch (year) {
      case '1988': return Award;
      case '1995': return ShieldCheck;
      case '2001': return Heart;
      case '2010': return Globe;
      case '2018': return GraduationCap;
      default: return Award;
    }
  };

  return (
    <section
      id="about"
      className="py-24 bg-[#240c0c] relative overflow-hidden"
    >
      {/* Decorative vertical lines and background symbols */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-950/40" />
        <div className="absolute left-[15%] right-[15%] top-[20%] bottom-[20%] border-l border-r border-red-950/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-amber-500 font-mono text-xs tracking-widest uppercase"
          >
            THE ARTISTIC JOURNEY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif text-stone-100 tracking-widest"
          >
            艺术生平与追求
          </motion.h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-4" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Side: Philosophy Card and Portrait details */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            {/* Water-Ink philosophy card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="bg-[#150404] p-8 sm:p-10 rounded border border-red-950/50 relative shadow-xl shadow-red-950/30 flex-grow flex flex-col justify-center overflow-hidden group"
            >
              {/* Decorative ink stain simulation in the corner */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#240c0c]/60 blur-3xl pointer-events-none group-hover:bg-amber-950/10 transition-colors duration-500" />
              
              {/* Gold double line top border detail */}
              <div className="w-12 h-1 bg-amber-500/40 mb-6" />
              
              <h3 className="text-xl font-serif text-stone-100 mb-6 tracking-wider flex items-center space-x-2">
                <span className="text-amber-500">琴禅合一</span>
                <span className="text-stone-500 text-sm">・ 演奏哲学</span>
              </h3>
              
              <p className="text-stone-300 font-serif leading-relaxed text-base sm:text-lg italic tracking-wide relative z-10">
                {ARTIST_INFO.stylePhilosophy}
              </p>
              
              <p className="text-stone-500 text-right mt-6 text-xs tracking-wider font-mono">
                — 万年芳・自述
              </p>
            </motion.div>

            {/* Teaching / Cultural achievement card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-gradient-to-r from-[#150404] to-[#240c0c] p-6 rounded border border-red-950/50 shadow-lg flex items-center space-x-4"
            >
              <div className="p-3 bg-amber-500/10 rounded border border-amber-500/20 text-amber-500">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-stone-100 font-serif font-semibold tracking-wide text-sm sm:text-base">
                  教学足迹与传承
                </h4>
                <p className="text-stone-400 text-xs mt-1 font-sans leading-relaxed">
                  出任中央音乐学院等多家著名学府特聘教授，编著经典教程，累计培养青年民乐翘楚百余人。
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Full Biography and Interactive Timeline */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Bio Paragraphs */}
            <div className="space-y-6 text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
              {ARTIST_INFO.bioFull.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Timeline Milestones */}
            <div className="space-y-8 pt-4">
              <h3 className="text-lg font-serif text-amber-500 tracking-wider flex items-center space-x-2">
                <span>艺术里程碑</span>
                <span className="w-12 h-[1px] bg-amber-500/30" />
              </h3>

              <div className="relative border-l border-red-950/40 pl-6 sm:pl-8 space-y-8 py-2">
                {ARTIST_INFO.achievements.map((achievement, idx) => {
                  const Icon = getAchievementIcon(achievement.year);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                      className="relative group"
                    >
                      {/* Timeline Dot Indicator with Icon */}
                      <div className="absolute -left-[39px] sm:-left-[47px] top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-[#1a0505] border border-red-900/40 text-stone-400 flex items-center justify-center group-hover:border-amber-500 group-hover:text-amber-500 transition-all duration-300 shadow-md">
                        <Icon className="w-3 sm:w-4 h-3 sm:h-4" />
                      </div>

                      {/* Achievement Item Content */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/80 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded">
                          {achievement.year} 年
                        </span>
                        <p className="text-stone-200 font-serif text-sm sm:text-base tracking-wide group-hover:text-stone-50 transition-colors duration-300">
                          {achievement.title}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
