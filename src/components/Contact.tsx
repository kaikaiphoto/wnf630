import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, ExternalLink, Globe, Shield, Sparkles, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTIST_INFO } from '../data';
import { ContactMessage } from '../types';

export default function Contact() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'performance', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOutbox, setShowOutbox] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('erhu_contact_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: 'msg-' + Math.random().toString(36).substring(2, 9),
        name: formData.name,
        email: formData.email,
        subject: formData.subject === 'performance' ? '演艺演出邀约' : formData.subject === 'academic' ? '学术/大师课邀请' : '学生拜师求学',
        content: formData.content,
        date: new Date().toLocaleDateString('zh-CN') + ' ' + new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        status: 'pending'
      };

      const updated = [newMessage, ...messages];
      setMessages(updated);
      localStorage.setItem('erhu_contact_messages', JSON.stringify(updated));

      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'performance', content: '' });

      // Fade success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('erhu_contact_messages', JSON.stringify(updated));
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[#1c0808] relative overflow-hidden"
    >
      {/* Structural water-ink wash decorative overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-red-950/20 blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-t from-[#1c0808] to-transparent blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <p className="text-amber-500 font-mono text-xs tracking-widest uppercase">
            CONTACT & COLLABORATION
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 tracking-widest">
            联系与演艺合作
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-4" />
          <p className="text-stone-400 font-sans text-xs sm:text-sm max-w-xl mx-auto pt-2">
            承接海内外大型交响音乐会、室内乐重奏、学术讲座及大师课邀约。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Card info (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#240c0c] border border-red-950/40 rounded-lg p-6 sm:p-8 space-y-8 shadow-2xl relative">
              
              {/* Corner Stamp */}
              <div className="absolute top-4 right-4 w-10 h-10 border border-amber-500/10 flex items-center justify-center text-stone-600 rounded">
                <Shield className="w-5 h-5 opacity-40" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif text-stone-100 tracking-wider">
                  万年芳工作室
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  如有演艺策划、民乐录音、独奏会、重奏会等项目，欢迎通过以下官方通道与先生的团队取得联系。我们将在 24 小时内回复您的来信。
                </p>
              </div>

              {/* Direct Info Lines */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#150404] rounded border border-red-950/40 text-amber-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-stone-500 text-xxs font-mono uppercase tracking-wider">商务合作邮箱</p>
                    <a
                      href={`mailto:${ARTIST_INFO.email}`}
                      className="text-stone-200 hover:text-amber-400 transition-colors font-mono text-sm sm:text-base font-semibold"
                    >
                      {ARTIST_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#150404] rounded border border-red-950/40 text-amber-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-stone-500 text-xxs font-mono uppercase tracking-wider">工作室电话</p>
                    <p className="text-stone-200 font-mono text-sm sm:text-base font-semibold">
                      {ARTIST_INFO.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#150404] rounded border border-red-950/40 text-amber-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-stone-500 text-xxs font-mono uppercase tracking-wider">地址 ADDRESS</p>
                    <p className="text-stone-300 text-xs sm:text-sm">
                      {ARTIST_INFO.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Platforms Traditional Seals */}
              <div className="border-t border-red-950/40 pt-6 space-y-4">
                <h4 className="text-stone-400 font-serif text-xs tracking-wider">
                  官方新媒体发布渠道
                </h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#150404] rounded border border-red-950/40 flex flex-col justify-between h-20 group">
                    <span className="text-stone-500 font-mono text-xxs">微信公众号</span>
                    <span className="text-stone-200 font-semibold group-hover:text-amber-400 transition-colors truncate">
                      万年芳二胡艺术
                    </span>
                  </div>

                  <a
                    href={ARTIST_INFO.socials.weibo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#150404] rounded border border-red-950/40 flex flex-col justify-between h-20 group hover:border-amber-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between text-stone-500 text-xxs">
                      <span>新浪微博</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <span className="text-stone-200 font-semibold group-hover:text-amber-400 transition-colors">
                      @万年芳二胡
                    </span>
                  </a>

                  <a
                    href={ARTIST_INFO.socials.bilibili}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#150404] rounded border border-red-950/40 flex flex-col justify-between h-20 group hover:border-amber-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between text-stone-500 text-xxs">
                      <span>哔哩哔哩</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <span className="text-stone-200 font-semibold group-hover:text-amber-400 transition-colors">
                      @万年芳二胡艺术
                    </span>
                  </a>

                  <a
                    href={ARTIST_INFO.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#150404] rounded border border-red-950/40 flex flex-col justify-between h-20 group hover:border-amber-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between text-stone-500 text-xxs">
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <span className="text-stone-200 font-semibold group-hover:text-amber-400 transition-colors">
                      Wan Nianfang Erhu
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Message Form (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form & Outbox Toggles */}
            <div className="flex items-center justify-between border-b border-red-950/40 pb-3">
              <span className="text-sm font-serif font-semibold text-stone-200 tracking-wider flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span>在线留言咨询</span>
              </span>

              {messages.length > 0 && (
                <button
                  onClick={() => setShowOutbox(!showOutbox)}
                  className="text-amber-500 hover:text-amber-400 text-xs tracking-wider flex items-center space-x-1 font-serif"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>{showOutbox ? '返回留言板' : `查看我的发信箱 (${messages.length})`}</span>
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!showOutbox ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-5 bg-[#240c0c] border border-red-950/40 rounded-lg p-6 sm:p-8">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider uppercase block">姓名 (NAME)</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="您的尊姓大名"
                          className="w-full bg-[#150404] border border-red-950/40 focus:border-amber-500/50 rounded p-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider uppercase block">电子邮箱 (EMAIL)</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="cooperation@example.com"
                          className="w-full bg-[#150404] border border-red-950/40 focus:border-amber-500/50 rounded p-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider uppercase block">意向类别 (COOPERATION TYPE)</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-[#150404] border border-red-950/40 focus:border-amber-500/50 rounded p-2.5 text-xs text-stone-200 focus:outline-none transition-colors appearance-none"
                      >
                        <option value="performance">演艺演出邀约 (Concerts & Recitals)</option>
                        <option value="academic">学术与研讨会大师课 (Lectures & Masterclass)</option>
                        <option value="apprentice">学生拜师求学 (Educational Consultation)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider uppercase block">详细合作说明 (DETAILED INQUIRY)</label>
                      <textarea
                        name="content"
                        required
                        rows={5}
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="请具体写下您的邀约计划、预算规模、时间地点，或求学资历，方便工作室为您高效处理..."
                        className="w-full bg-[#150404] border border-red-950/40 focus:border-amber-500/50 rounded p-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none resize-none transition-colors"
                      />
                    </div>

                    {/* Success prompt banner */}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded text-xs"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>您的留言已安全送达。点击右上角“发信箱”可查看已发送的咨询详情！</span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-red-950 to-[#240c0c] hover:from-amber-500 hover:to-amber-600 text-stone-300 hover:text-stone-950 border border-red-900/30 hover:border-amber-500 rounded text-xs font-serif font-bold tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-stone-950 border-t-transparent" />
                          <span>正在发送来信...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>发送官方合作函</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="outbox-container"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 bg-[#240c0c] border border-red-950/40 rounded-lg p-6"
                >
                  <h4 className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase">
                    我的发信箱 (OUTBOX LOGS)
                  </h4>

                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                    {messages.map((msg) => (
                      <div key={msg.id} className="bg-[#150404] border border-red-950/30 p-4 rounded space-y-3 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-serif font-bold text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                            {msg.subject}
                          </span>
                          <span className="text-xxs font-mono text-stone-500">{msg.date}</span>
                        </div>

                        <p className="text-stone-200 text-xs font-sans whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>

                        <div className="flex items-center justify-between border-t border-red-950/25 pt-2.5 text-xxs font-mono text-stone-500">
                          <span>发件人: {msg.name} ({msg.email})</span>
                          <div className="flex items-center space-x-3">
                            <span className="text-amber-500 flex items-center space-x-1">
                              <Sparkles className="w-3 h-3" />
                              <span>等待工作室接洽</span>
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-stone-600 hover:text-red-400 transition-colors"
                            >
                              删除日志
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowOutbox(false)}
                    className="w-full py-2.5 bg-[#150404] border border-red-950/40 hover:border-red-900/40 text-stone-300 rounded text-xs transition-colors"
                  >
                    返回留言咨询
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
