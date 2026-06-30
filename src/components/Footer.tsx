import { Music, ArrowUp, Mail, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onBackToTop: () => void;
}

export default function Footer({ onBackToTop }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#150404] border-t border-red-950/40 text-stone-400 py-12 relative overflow-hidden">
      
      {/* Visual divider design */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-950/35 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-red-950/30">
          
          {/* Brand block */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg tracking-widest text-stone-100 font-bold">万年芳二胡艺术网</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            <p className="text-xxs font-mono tracking-widest text-stone-500 uppercase">
              MAESTRO WAN NIANFANG OFFICIAL ART & PORTFOLIO HUB
            </p>
          </div>

          {/* Quick statement on copyrights */}
          <div className="flex items-center space-x-2 text-xxs font-serif text-stone-500 italic max-w-xs text-center md:text-right">
            <span>“弦外音，韵里意。千载国琴，世代相续。”</span>
          </div>

          {/* Back to top bubble */}
          <button
            onClick={onBackToTop}
            className="p-3 bg-[#240c0c] hover:bg-red-950 border border-red-950/40 hover:border-red-900/40 rounded-full text-stone-300 hover:text-amber-400 transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer"
            title="回到顶部"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Legal credentials and system design */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4 text-xxs font-mono text-stone-500">
          <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-1.5 text-center sm:text-left">
            <span>&copy; {year} 万年芳二胡艺术工作室. 保留所有权利.</span>
            <span className="hidden sm:inline">|</span>
            <a href="#about" className="hover:text-stone-300 transition-colors">艺术馆条款</a>
            <span className="hidden sm:inline">|</span>
            <a href="#contact" className="hover:text-stone-300 transition-colors">隐私与保密</a>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <ShieldAlert className="w-3 h-3 text-stone-600" />
              <span>官方认证书 (Verified Official)</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
