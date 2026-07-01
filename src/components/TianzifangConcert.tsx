import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Users, Music, Compass, Award, Sparkles, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';

export default function TianzifangConcert() {
  const [activeTab, setActiveTab] = useState<'overview' | 'artists' | 'program' | 'tianzifang'>('overview');

  const performers = [
    {
      name: '苑杰',
      title: '二级演奏员',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', // elegant placeholder or matching
      bio: '1988年考入上海音乐学院民乐系，师从著名二胡教育家、演奏家项祖英教授，并随著名指挥家夏飞云教授学习指挥副科。1992年毕业进入上海民族乐团工作至今。中国民族管弦乐学会会员、兼任理事。曾担任上海民族乐团乐队首席。'
    },
    {
      name: '徐正宏',
      title: '一级演奏员',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: '1978年进入上海音乐学院附中。系上海音乐家协会会员、上海音协二胡专业委员会常务理事。曾任上海滑稽剧团乐队主任、上海文广民族乐团管理部主任、现任飞云民族乐团副团长。先后师从李作明、唐春贵、林心铭老师。'
    },
    {
      name: '邓伟民',
      title: '一级演奏员',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: '现为中国民族管弦乐学会常务理事、上海音乐家协会会员。曾担任上海民族乐团乐队副首席。先后师从于曹天立、李作明老师及中国二胡大师萧白镛先生学习二胡演奏。'
    },
    {
      name: '万年芳',
      title: '一级演奏员 / 音乐制作人',
      avatar: 'https://photos.1804078.xyz/42hu/wnf.png', // exact artist avatar
      bio: '中国民族管弦乐学会理事、上海计算机音乐协会理事、上海音乐家协会会员。曾任上海民族乐团弦乐声部长。在乐团期间先后师从方志强、邹德荣老师。深耕民族音乐领域四十余载，二胡艺术的集大成者与创新引领者。'
    },
    {
      name: '何思宣',
      title: '特邀主持 / 滑稽剧团演员',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: '上海滑稽剧团演员。曾参演滑稽喜剧《乌鸦与麻雀》、《弄堂里向》、《宝兴里》等；作为特邀嘉宾参与了电视台春节栏目：《百家心开开心心过大年》、长三角方言大赛的表演；并参与了多部电影、电视剧的拍摄。'
    }
  ];

  const program = [
    { num: 1, title: '二胡齐奏《光明行》', author: '刘天华曲', players: '苑杰、徐正宏、邓伟民、万年芳' },
    { num: 2, title: '二胡《豫北叙事曲》', author: '刘文金曲', players: '苑杰' },
    { num: 3, title: '低音二胡《听松》', author: '华彦钧曲', players: '苑杰' },
    { num: 4, title: '板胡《月牙五更》', author: '刘明源改编', players: '徐正宏' },
    { num: 5, title: '二胡《相望》', author: '曹元德曲', players: '邓伟民' },
    { num: 6, title: '二胡《想丁香》', author: '电视连续剧《刘老根》插曲', players: '邓伟民' },
    { num: 7, title: '二胡《洪湖人民的心愿》', author: '闵惠芬编曲', players: '邓伟民' },
    { num: 8, title: '二胡《翻身歌》', author: '张振阗曲 / 王国潼改编', players: '万年芳' },
    { num: 9, title: '二胡《椰子风》', author: '项祖英编曲', players: '万年芳' },
    { num: 10, title: '二胡《苏南小曲》', author: '朱昌耀编曲', players: '苑杰' },
    { num: 11, title: '低音二胡《二泉映月》', author: '华彦钧曲', players: '徐正宏' },
    { num: 12, title: '二胡《江河水》', author: '黄海怀移植', players: '徐正宏' },
    { num: 13, title: '二胡《All of Me》', author: '约翰·传奇曲', players: '邓伟民' },
    { num: 14, title: '二胡《春诗》', author: '钟义良曲', players: '万年芳' },
    { num: 15, title: '二胡齐奏《葡萄熟了》', author: '周维曲', players: '吴宇泽、史明思（美国）、邓伟民' }
  ];

  const staff = {
    planning: '吴梅森、邓伟民、罗继钢',
    coordination: '罗继钢、王博宇、邓伟民',
    stageDirector: '姚伟、沈根祥',
    soundStage: '姚伟、王博宇、康健',
    stagehands: '沈根祥、姚伟',
    photo: '阿甘、姚健中、孙清',
    accompaniment: '扬琴 周晓萌、中阮 周维裴、二胡与中胡 孙毅、笛子 杨仁杰、笙 叶明荣、打击乐 朱福生、汪一凡'
  };

  return (
    <section id="tianzifang-concert" className="py-24 bg-[#150404] relative overflow-hidden border-t border-b border-red-950/30">
      {/* Decorative Traditional Chinese Ink Wash overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-red-950/30 blur-[120px]" />
        <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-amber-950/20 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <p className="text-amber-500 font-mono text-xs tracking-widest uppercase">CLASSIC CONCERT REVIEW</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 tracking-widest">金秋雅集田子坊 · 四君胡琴演奏会</h2>
          <p className="text-amber-500/85 font-serif text-sm tracking-widest italic mt-1">—— 弓吟弦歌五十春 ——</p>
          <div className="w-20 h-0.5 bg-amber-500/60 mx-auto mt-4" />
          <p className="text-stone-400 font-sans text-xs sm:text-sm max-w-xl mx-auto pt-2">
            回顾 2025 年 10 月 18 日于上海田子坊艺术中心举办的经典名家雅集。
          </p>
        </div>

        {/* Traditional Custom Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {[
            { id: 'overview', label: '音乐会概览', desc: 'Overview' },
            { id: 'artists', label: '名家风采', desc: 'Performers' },
            { id: 'program', label: '节目单', desc: 'Program' },
            { id: 'tianzifang', label: '田子坊风情', desc: 'Tianzifang' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg border text-center transition-all duration-300 min-w-[120px] ${
                activeTab === tab.id
                  ? 'bg-amber-500 border-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/10'
                  : 'bg-[#240c0c]/40 border-red-950/40 text-stone-400 hover:text-stone-200 hover:border-red-900/40'
              }`}
            >
              <p className="font-serif text-xs sm:text-sm tracking-wider">{tab.label}</p>
              <p className={`font-mono text-[9px] uppercase tracking-widest mt-0.5 ${activeTab === tab.id ? 'text-stone-900' : 'text-stone-600'}`}>{tab.desc}</p>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-[#240c0c] border border-red-950/30 rounded-xl p-6 sm:p-10 shadow-2xl min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Poster / Left */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="relative bg-[#150404] p-5 border border-amber-500/15 rounded-lg overflow-hidden group">
                    {/* Chinese classical texture border */}
                    <div className="absolute inset-2 border border-red-950/20 pointer-events-none" />
                    
                    <div className="space-y-4 text-center py-6">
                      <div className="inline-block bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded text-xxs font-mono text-amber-500 tracking-wider">
                        金秋重磅雅集演出
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 tracking-wider leading-relaxed">
                        弓吟弦歌五十春<br />
                        <span className="text-amber-500">四君胡琴演奏会</span>
                      </h3>
                      <div className="w-12 h-[1px] bg-amber-500/30 mx-auto" />
                      <p className="text-xs font-serif text-stone-400 leading-relaxed max-w-xs mx-auto">
                        万年芳、苑杰、徐正宏、邓伟民四位胡琴大师，金秋聚首，于海派石库门创意街区田子坊奉献巅峰合鸣。
                      </p>
                    </div>

                    <div className="border-t border-red-950/30 pt-4 mt-4 space-y-2.5 text-xxs sm:text-xs text-stone-400 font-sans">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-amber-500/70 shrink-0" />
                        <span><strong>时间:</strong> 2025年10月18日（星期六）下午2:00</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-amber-500/70 shrink-0" />
                        <span><strong>地点:</strong> 黄浦区田子坊艺术中心（泰康路210弄2号二楼）</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info List / Right */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-serif font-bold text-stone-100 border-b border-red-950/30 pb-2">
                      演奏会组织架构
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-300">
                      <div className="p-4 bg-[#150404]/50 rounded border border-red-950/20">
                        <p className="text-amber-500 font-serif font-bold mb-1">指导单位</p>
                        <p className="text-stone-300">上海市黄浦区田子坊地区管理办公室</p>
                      </div>
                      <div className="p-4 bg-[#150404]/50 rounded border border-red-950/20">
                        <p className="text-amber-500 font-serif font-bold mb-1">主办单位</p>
                        <p className="text-stone-300 leading-relaxed">
                          上海市黄浦区田子坊商会<br />
                          上海田子坊文化艺术中心
                        </p>
                      </div>
                      <div className="p-4 bg-[#150404]/50 rounded border border-red-950/20 sm:col-span-2">
                        <p className="text-amber-500 font-serif font-bold mb-1">协办单位</p>
                        <p className="text-stone-300">泉水叮咚（上海）艺术团</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-serif font-bold text-stone-100 flex items-center space-x-2">
                      <Users className="w-4 h-4 text-amber-500" />
                      <span>幕后制作与工作团队</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xxs sm:text-xs font-mono text-stone-400 bg-[#150404]/30 p-4 rounded border border-red-950/15">
                      <div><strong className="text-stone-500">策 划：</strong>{staff.planning}</div>
                      <div><strong className="text-stone-500">统 筹：</strong>{staff.coordination}</div>
                      <div><strong className="text-stone-500">舞台监督：</strong>{staff.stageDirector}</div>
                      <div><strong className="text-stone-500">音响舞美：</strong>{staff.soundStage}</div>
                      <div><strong className="text-stone-500">剧 务：</strong>{staff.stagehands}</div>
                      <div><strong className="text-stone-500">摄 影：</strong>{staff.photo}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'artists' && (
              <motion.div
                key="artists"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-red-950/30 pb-3">
                  <h3 className="text-lg font-serif font-bold text-stone-100 tracking-wider">
                    弦鸣名家（演职人员介绍）
                  </h3>
                  <span className="text-xxs font-mono text-amber-500/80 uppercase">5 Performers</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {performers.map((perf, i) => (
                    <div key={i} className="bg-[#150404]/60 border border-red-950/20 rounded-lg p-5 flex flex-col sm:flex-row gap-4 items-start hover:border-amber-500/20 transition-colors">
                      {/* Left: Avatar style placeholder with letter */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/10 to-red-950 flex items-center justify-center border border-amber-500/30 shrink-0 text-amber-500 font-serif font-bold text-lg shadow-inner">
                        {perf.name[0]}
                      </div>
                      
                      {/* Right: Info */}
                      <div className="space-y-1.5 flex-grow">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-base font-serif font-bold text-stone-200">{perf.name}</span>
                          <span className="text-xxs font-mono text-amber-500 font-semibold px-1.5 py-0.5 bg-amber-500/5 border border-amber-500/10 rounded">
                            {perf.title}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 leading-relaxed font-sans">
                          {perf.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'program' && (
              <motion.div
                key="program"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-950/30 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-stone-100 tracking-wider flex items-center space-x-2">
                      <Music className="w-5 h-5 text-amber-500" />
                      <span>胡琴演奏会节目单 (Program)</span>
                    </h3>
                    <p className="text-xxs font-mono text-stone-500">备注：出场顺序以年少者为先，年长者为后顺龄排列不分先后</p>
                  </div>
                  
                  <div className="bg-amber-500/5 px-3 py-1 rounded border border-amber-500/10 text-xxs font-serif text-amber-500 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>共 15 首经典名曲</span>
                  </div>
                </div>

                {/* Grid Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
                  {program.map((item) => (
                    <div 
                      key={item.num}
                      className="bg-[#150404]/50 border border-red-950/20 rounded p-4 flex items-center justify-between hover:border-red-900/40 hover:bg-[#150404]/80 transition-all group"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Number banner */}
                        <span className="w-6 h-6 rounded-full bg-red-950/60 flex items-center justify-center font-mono text-xxs font-bold text-stone-500 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                          {item.num.toString().padStart(2, '0')}
                        </span>
                        
                        <div>
                          <p className="text-xs sm:text-sm font-serif font-bold text-stone-200 group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xxs font-mono text-stone-500">
                            {item.author}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xxs sm:text-xs font-serif text-amber-500/90 italic">
                          演奏：{item.players}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Accompaniment info */}
                <div className="bg-[#150404] border border-red-950/40 p-5 rounded-lg space-y-2 mt-4">
                  <h4 className="text-xs font-serif text-amber-500 tracking-wider flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>小乐队伴奏人员</span>
                  </h4>
                  <p className="text-xxs sm:text-xs font-mono text-stone-400 leading-relaxed">
                    {staff.accompaniment}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'tianzifang' && (
              <motion.div
                key="tianzifang"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Text Intro */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 tracking-wider flex items-center space-x-2">
                      <Compass className="w-5.5 h-5.5 text-amber-500" />
                      <span>弄堂里的文化瑰宝 · 田子坊</span>
                    </h3>
                    <p className="text-xxs font-mono text-stone-500 uppercase">Shanghai Shikumen Historical Preservation Area</p>
                  </div>

                  <div className="text-stone-300 text-xs sm:text-sm leading-relaxed space-y-4 font-sans">
                    <p className="indent-6">
                      “田子坊”其名其实是画家黄永玉当年给这旧弄堂取得雅号。源自《史记》中记载的最早的一位名为“田子方”的画家，取其谐音，其用意自然不言而喻。
                    </p>
                    <p className="indent-6">
                      田子坊由原来的十多家弄堂工厂开创了上海第一个创意产业集聚区。加上600多户居民的石库门风貌保护区形成了如今的旅游景区。它不仅拥有典型的石库门和新式里弄建筑，还有20世纪工业厂房建筑。
                    </p>
                    <p className="indent-6">
                      在改造过程中，充分挖掘了旧厂房、旧民宅中的人文历史价值，既保留了具有原建筑美学特征的砖石墙体、屋梁结构，又将现代材质的设施，设备通过艺术手段融合其中。历史与未来、传统与现代、东方与西方、经典与流行在田子坊的交融，构成上海新的城市文化名片。
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      '国家AAA级旅游景区',
                      '中国最佳创意产业园',
                      '上海首批文化创意产业园',
                      '上海历史文化风貌保护区'
                    ].map((badge, idx) => (
                      <span key={idx} className="bg-amber-500/5 text-amber-500 text-xxs font-serif border border-amber-500/10 px-2 py-1 rounded">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scenic Frame or Styled illustration card */}
                <div className="lg:col-span-5">
                  <div className="bg-[#150404] p-5 rounded-lg border border-red-950/40 relative overflow-hidden group">
                    <div className="relative aspect-video rounded overflow-hidden mb-4 bg-[#240c0c] border border-red-950/20">
                      <img 
                        src="https://images.unsplash.com/photo-1547984609-44d277f7290d?auto=format&fit=crop&w=800&q=80" 
                        alt="Tianzifang Shanghai Alleyway" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-60 group-hover:scale-103 group-hover:opacity-75 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#150404] via-transparent to-transparent" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-serif font-bold text-stone-200">田子坊艺术中心 (Tianzifang Art Center)</p>
                      <p className="text-xxs font-mono text-stone-500">上海市黄浦区泰康路210弄2号</p>
                      <p className="text-xxs text-stone-400 font-sans pt-1 leading-relaxed">
                        上海最具人文底蕴的艺术交流地标之一，斑驳的清水红砖墙面与胡琴之音交相辉映，是民乐与海派文化碰撞交融的完美温床。
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
