import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Ticket, CheckCircle2, User, Phone, Mail, Award, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENTS } from '../data';
import { EventItem } from '../types';

export default function Schedule() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [bookings, setBookings] = useState<Array<{ id: string; eventId: string; eventTitle: string; name: string; seats: number; date: string }>>([]);
  
  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', seats: '1', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('erhu_concert_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const filteredEvents = EVENTS.filter((evt) => {
    if (filter === 'all') return true;
    return evt.status === filter;
  });

  const handleOpenBooking = (evt: EventItem) => {
    setSelectedEvent(evt);
    setSuccessMsg(false);
    setFormData({ name: '', email: '', phone: '', seats: '1', note: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newBooking = {
        id: 'bk-' + Math.random().toString(36).substring(2, 9),
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        name: formData.name,
        seats: parseInt(formData.seats),
        date: new Date().toLocaleDateString('zh-CN')
      };

      const updated = [newBooking, ...bookings];
      setBookings(updated);
      localStorage.setItem('erhu_concert_bookings', JSON.stringify(updated));

      setIsSubmitting(false);
      setSuccessMsg(true);
    }, 1200);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('erhu_concert_bookings', JSON.stringify(updated));
  };

  return (
    <section
      id="schedule"
      className="py-24 bg-stone-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-stone-950 via-transparent to-transparent blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <p className="text-amber-500 font-mono text-xs tracking-widest uppercase">
            CONCERT & LECTURE SCHEDULES
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 tracking-widest">
            演出与学术日程
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-4" />
          <p className="text-stone-400 font-sans text-xs sm:text-sm max-w-xl mx-auto pt-2">
            万年芳先生的艺术足迹。欢迎预约近期音乐会及大师讲座席位。
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center space-x-4 mb-10">
          {(['upcoming', 'completed', 'all'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2.5 rounded font-serif text-sm tracking-widest border transition-all duration-300 ${
                filter === type
                  ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                  : 'text-stone-300 border-stone-800 bg-stone-950/40 hover:text-stone-100 hover:border-stone-700'
              }`}
            >
              {type === 'upcoming' ? '近期日程 (Upcoming)' : type === 'completed' ? '过往足迹 (Completed)' : '全部演出 (All)'}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evt, index) => {
              const isUpcoming = evt.status === 'upcoming';
              return (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className="bg-stone-950 border border-stone-800/80 rounded-lg p-5 sm:p-6 hover:border-amber-500/30 transition-all duration-300 group flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6"
                >
                  {/* Left: Date details */}
                  <div className="flex items-center space-x-5 shrink-0">
                    <div className="text-center w-20 bg-stone-900 border border-stone-800 rounded py-2 group-hover:border-amber-500/20 transition-colors">
                      <p className="text-xxs font-mono text-amber-500 tracking-wider font-semibold uppercase">
                        {evt.type === 'concert' ? '音乐会' : evt.type === 'lecture' ? '讲座' : evt.type === 'masterclass' ? '大师班' : '国际交流'}
                      </p>
                      <p className="text-lg font-mono font-bold text-stone-100 mt-1">
                        {evt.date.split('-')[1]} / {evt.date.split('-')[2]}
                      </p>
                      <p className="text-xxs font-mono text-stone-500">
                        {evt.date.split('-')[0]}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xxs font-bold tracking-wider px-2 py-0.5 rounded ${
                          isUpcoming
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 animate-pulse'
                            : 'bg-stone-800 text-stone-500 border border-stone-800'
                        }`}>
                          {evt.status === 'upcoming' ? '售票预约中' : '演出已结束'}
                        </span>
                        <span className="text-xs font-mono text-stone-500">{evt.city}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-tight">
                        {evt.title}
                      </h3>
                    </div>
                  </div>

                  {/* Middle: Details & Location */}
                  <div className="flex-grow space-y-2 max-w-md">
                    <p className="text-stone-400 text-xs leading-relaxed line-clamp-2">
                      {evt.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xxs font-mono text-stone-500">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500/60" />
                        <span>{evt.venue}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500/60" />
                        <span>{evt.time}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right: Booking Action Button */}
                  <div className="shrink-0 flex items-center">
                    {isUpcoming ? (
                      <button
                        onClick={() => handleOpenBooking(evt)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-amber-500 text-stone-300 hover:text-stone-950 border border-stone-800 hover:border-amber-500 rounded text-xs font-serif font-bold tracking-widest transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>席位预定</span>
                      </button>
                    ) : (
                      <span className="text-stone-600 text-xs font-serif italic tracking-widest">
                        静待下次重逢
                      </span>
                    )}
                  </div>

                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 text-stone-500 font-serif">
              暂无当前日程，敬请关注后续安排。
            </div>
          )}
        </div>

        {/* BOOKINGS HISTORY STORAGE TAB */}
        {bookings.length > 0 && (
          <div className="max-w-3xl mx-auto mt-20 p-6 bg-stone-950 border border-stone-800 rounded-lg">
            <h3 className="text-base font-serif text-stone-200 tracking-wider mb-4 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>我的席位预约历史 ({bookings.length})</span>
            </h3>
            
            <div className="divide-y divide-stone-900">
              {bookings.map((bk) => (
                <div key={bk.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div className="space-y-1">
                    <p className="text-stone-200 font-serif font-semibold">{bk.eventTitle}</p>
                    <div className="flex items-center space-x-3 text-xxs font-mono text-stone-500">
                      <span>预约人: {bk.name}</span>
                      <span>席位: {bk.seats} 张</span>
                      <span>日期: {bk.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancelBooking(bk.id)}
                    className="text-stone-500 hover:text-red-400 text-xxs font-mono border border-stone-800 hover:border-red-900/30 px-2 py-1 rounded transition-colors"
                  >
                    取消预约
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-stone-900 border border-stone-800 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
                <span className="font-serif text-stone-100 font-bold tracking-wider">席位与讲座预定</span>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-stone-400 hover:text-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {!successMsg ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {/* Event summary banner */}
                    <div className="bg-stone-950 p-4 rounded border border-stone-800/60 space-y-1">
                      <p className="text-xxs font-mono text-amber-500 font-semibold uppercase">确认演出日程信息</p>
                      <h4 className="text-sm font-serif font-bold text-stone-200">{selectedEvent.title}</h4>
                      <p className="text-xxs font-sans text-stone-400 flex items-center space-x-3">
                        <span>城市: {selectedEvent.city}</span>
                        <span>场馆: {selectedEvent.venue}</span>
                        <span>时间: {selectedEvent.time}</span>
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider block">姓名 (NAME)</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="请输入姓名"
                            className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500/50 rounded p-2.5 pl-10 text-xs text-stone-200 placeholder-stone-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider block">电话 (PHONE)</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="输入联系电话"
                            className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500/50 rounded p-2.5 pl-10 text-xs text-stone-200 placeholder-stone-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider block">邮箱 (EMAIL)</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="您的邮箱"
                            className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500/50 rounded p-2.5 pl-10 text-xs text-stone-200 placeholder-stone-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider block">预定席位数 (SEATS)</label>
                        <div className="relative">
                          <Ticket className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                          <select
                            name="seats"
                            value={formData.seats}
                            onChange={handleInputChange}
                            className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500/50 rounded p-2.5 pl-10 text-xs text-stone-200 focus:outline-none appearance-none"
                          >
                            <option value="1">1 张门票</option>
                            <option value="2">2 张门票</option>
                            <option value="3">3 张门票</option>
                            <option value="4">4 张门票</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 text-xxs font-mono font-bold tracking-wider block">备注与寄语 (REMARKS)</label>
                      <textarea
                        name="note"
                        rows={3}
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="想对先生说的话或购票附加要求..."
                        className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500/50 rounded p-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex items-start space-x-2 text-xxs text-stone-500 bg-stone-950/40 p-3 rounded border border-stone-850">
                      <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        注意：本预约系统为个人官方通道免费特留预约位。提交成功后，工作室将在 3 个工作日内向您的邮箱发送电子确认书。请持有效证件及确认信前往场馆兑换实体票。
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif font-bold tracking-widest rounded transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-stone-950 border-t-transparent" />
                          <span>正在锁定席位...</span>
                        </>
                      ) : (
                        <span>提交免费席位预约</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-stone-100 font-serif text-base font-bold">席位预约已接收</h4>
                      <p className="text-stone-400 text-xs max-w-xs mx-auto leading-relaxed">
                        恭喜，您已成功提交【{selectedEvent.title}】的预约请求。您的电子订单号已锁定，请关注邮件通知。
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs tracking-wider transition-colors"
                    >
                      返回日程表
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <X className="hidden" /> {/* Added to prevent unused import errors if any */}
    </section>
  );
}
