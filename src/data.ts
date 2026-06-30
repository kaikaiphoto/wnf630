import { EventItem, TrackItem, VideoItem, NewsItem } from './types';

export const ARTIST_INFO = {
  name: '万年芳',
  title: '著名二胡演奏家 / 教育家 / 国家二级演员',
  slogan: '弦动山河，韵载春秋',
  subSlogan: '以两弦之音，承华夏千年之律，融现代交响之美',
  avatarUrl: 'https://photos.1804078.xyz/42hu/wnf.png',
  email: 'wnf@wannianfang-erhu.com',
  phone: '+86 (021) 8888-6666',
  address: '中国上海徐汇区民族艺术文化交流中心',
  bioBrief: '万年芳先生，深耕民族音乐领域四十余载，当代二胡艺术的集大成者与创新引领者。他深得传统琴学精髓，其演奏音色饱满淳厚、情感深沉真挚，既能完美诠释传统二胡音乐的深邃与苍凉，又以开放的国际视野，推动二胡与西方管弦乐、现代室内乐的跨界融合。',
  bioFull: [
    '万年芳，生于江南水乡之世家，自幼受丝竹乐熏陶，七岁习琴，后考入中央音乐学院，师从多位国乐泰斗。深厚的学术功底与卓越的艺术天赋，使他在青年时期便斩获金钟奖、文华奖等中国民乐最高荣誉。',
    '作为国家一级演员及中国音乐家协会理事，万年芳先生多次代表国家出访欧美、亚洲数十个国家与地区，与柏林爱乐乐团、伦敦交响乐团等世界顶尖交响乐团合作，将二胡这一承载华夏千载哀乐的“中国小提琴”带上了世界最瞩目的古典音乐圣殿。',
    '万先生不仅在演奏上臻于化境，在二胡艺术的理论研究与现代教学上亦建树颇丰。他主编了多部《二胡现代演奏教程》，将西方提琴的揉弦与弓法技巧有机融入二胡教学中，培养了数十位活跃于当今乐坛的一线青年二胡演奏家，桃李满天下。'
  ],
  stylePhilosophy: '“二胡两弦，一内一外，一阴一阳。内弦低沉如大地，外弦高亢如苍穹。其妙处不在于炫技，而在于‘弦外之音’、‘气韵生动’。每一次拉弓、每一次揉弦，皆是内心情感与天地大气的共鸣。”',
  achievements: [
    { year: '1988', title: '荣获中国首届“全国二胡大赛”青年专业组一等奖（金奖）' },
    { year: '1995', title: '被评为国家二级演员，享受国务院特殊津贴' },
    { year: '2001', title: '主创并首演大型二胡协奏曲《山河祭》，获国家舞台艺术精品工程金奖' },
    { year: '2010', title: '在维也纳金色大厅成功举办个人二胡独奏音乐会，开民乐海外独奏之先河' },
    { year: '2018', title: '荣获“杰出民乐艺术家”终身成就奖，表彰其在国际文化交流中的卓越贡献' }
  ],
  socials: {
    wechat: '万年芳二胡艺术 (WanNianfangErhu)',
    weibo: 'https://weibo.com/u/wannianfangerhu',
    bilibili: 'https://space.bilibili.com/wannianfangerhu',
    youtube: 'https://youtube.com/c/wannianfangerhu'
  }
};

export const TRACKS: TrackItem[] = [
  {
    id: 'track-1',
    title: '二泉映月 (The Moon Reflected in the Second Spring)',
    duration: '06:12',
    era: 'traditional',
    description: '华彦钧（阿炳）代表作。万年芳先生的演奏音色苍凉悲壮，深沉中透露出不屈与高洁。',
    story: '此曲是我国民间音乐家阿炳的传世之作。万年芳先生在演奏中采用了深沉的重揉弦与宽广的弓法，将惠山二泉的夜色与瞎子阿炳坎坷孤独的一生，融化在哀而不伤、怨而不怒的旋律中，令人动容。'
  },
  {
    id: 'track-2',
    title: '赛马 (Horse Racing)',
    duration: '02:05',
    era: 'traditional',
    description: '黄海怀作。曲调热烈奔放，描绘内蒙古大草原牧民在节日中赛马的壮观场面。',
    story: '本曲以其欢快洒脱的节奏和模仿马嘶声的拨弦技巧闻名。万年芳先生在此曲中展现了出神入化的快弓与跳弓技巧，颗粒感极强，生动再现了万马奔腾、鞭声清脆、蹄声如雷的草原盛景。'
  },
  {
    id: 'track-3',
    title: '江河水 (River Waters)',
    duration: '07:15',
    era: 'traditional',
    description: '东北民间乐曲。以极其悲愤、激越的音调诉说旧时代人民的无尽哀怨。',
    story: '《江河水》原为双管独奏，后移植为二胡。乐曲声声如诉、字字泣血。万年芳先生通过独特的揉压弦以及滑音，把寡妇在江边哭诉丈夫的悲痛心情表现得淋漓尽致，被乐评界赞为“一曲终了，满座湿襟”。'
  },
  {
    id: 'track-4',
    title: '长城随想 (Great Wall Capriccio)',
    duration: '08:40',
    era: 'modern',
    description: '刘文金作。中国二胡协奏曲的里程碑，展现长城的雄伟气魄与华夏民族的精神。',
    story: '全曲共分四个乐章：《关山行》、《烽火操》、《忠魂祭》、《舞狂欢》。网站精选了第四乐章《舞狂欢》片段。万年芳先生与国家交响乐团协同合奏，气势磅礴，具有史诗般的壮丽感。'
  },
  {
    id: 'track-5',
    title: '听松 (Listening to the Pines)',
    duration: '03:45',
    era: 'traditional',
    description: '阿炳作。旋律刚劲有力，音调跌宕起伏，描写岳飞抗金、听松涛排兵布阵的英勇精神。',
    story: '《听松》气势凝重而有力，通过松涛声托物言志，抒发了抗敌爱国的情怀。万年芳先生的运弓沉稳、力度多变，将松针迎风、劲松傲雪的刚毅之气表现得极其传神。'
  }
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: '《二泉映月》—— 万年芳与国家交响乐团金色大厅演出实录',
    duration: '06:15',
    venue: '奥地利维也纳金色大厅',
    date: '2010-10-18',
    coverUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    videoUrl: '', // Will simulate player beautifully
    description: '万年芳先生携手著名指挥家及国家大剧院管弦乐团，在维也纳金色大厅为欧洲观众奉献了一场震撼人心的中国民族交响盛宴。'
  },
  {
    id: 'vid-2',
    title: '大型二胡协奏曲《山河祭》首演实况精选',
    duration: '15:30',
    venue: '北京国家大剧院歌剧院',
    date: '2015-05-24',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    videoUrl: '',
    description: '《山河祭》是万年芳先生历时五年创作的二胡协奏史诗，用四个乐章展现中华民族百折不挠的奋斗历程与山河壮丽图景。'
  },
  {
    id: 'vid-3',
    title: '二胡大师班：如何掌握传统民乐中的“气韵与揉弦”',
    duration: '45:00',
    venue: '中国音乐学院学术报告厅',
    date: '2023-11-12',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    videoUrl: '',
    description: '万年芳先生倾囊相授四十年习琴经验，详细讲解二胡左手压弦、揉弦以及运弓的呼吸控制。'
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: '“弦动山河”——万年芳二胡独奏音乐会（北京站）',
    type: 'concert',
    date: '2026-09-18',
    time: '19:30',
    venue: '国家大剧院・音乐厅',
    city: '北京',
    status: 'upcoming',
    description: '巡演首站。万年芳先生将携手中国广播民族乐团，为您带来包括《二泉映月》、《赛马》及全新力作首演在内的重磅节目。',
    ticketLink: 'https://www.chncpa.org/'
  },
  {
    id: 'evt-2',
    title: '二胡大师课：从传统曲目看民乐演奏的“中庸之道”',
    type: 'lecture',
    date: '2026-10-10',
    time: '14:00',
    venue: '上海音乐学院学术报告厅',
    city: '上海',
    status: 'upcoming',
    description: '万年芳先生将亲临上音，面向全校师生及国乐爱好者举办专题讲座，解析中国传统哲学在民乐演奏中的精微体现。',
    ticketLink: 'https://www.shcmusic.edu.cn/'
  },
  {
    id: 'evt-3',
    title: '“风雅颂”——东方弦乐室内乐音乐会（杭州站）',
    type: 'concert',
    date: '2026-11-05',
    time: '19:45',
    venue: '杭州大剧院・歌剧院',
    city: '杭州',
    status: 'upcoming',
    description: '本场音乐会以中西室内乐交融为特色，万年芳先生将领衔重奏组，探索二胡与大提琴、竖琴的奇妙对话。',
    ticketLink: 'https://www.hzdjy.com/'
  },
  {
    id: 'evt-4',
    title: '万年芳二胡艺术国际研讨会暨巡回汇报演出（纽约站）',
    type: 'international',
    date: '2026-05-12',
    time: '20:00',
    venue: '纽约卡内基音乐厅 (Carnegie Hall)',
    city: '纽约',
    status: 'completed',
    description: '受邀赴美学术交流及独奏演出，获得《纽约时报》及多位国际古典音乐评论家的高度评价，成功推动二胡艺术海外传播。'
  },
  {
    id: 'evt-5',
    title: '“弦歌逐梦”——万年芳师生二胡作品音乐会',
    type: 'concert',
    date: '2026-06-15',
    time: '19:30',
    venue: '西安音乐学院・音乐厅',
    city: '西安',
    status: 'completed',
    description: '集中展示万年芳先生及其优秀学生团队的二胡艺术风采，曲目包罗万象，见证国乐精神的薪火相传。'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: '万年芳先生荣膺第十三届“国乐守望者”终身艺术导师称号',
    summary: '昨日在上海举行的国乐盛典上，著名二胡演奏家万年芳被授予本年度唯一“国乐守望者”终身学术与艺术导师殊荣。',
    content: '在本次备受瞩目的国乐盛典上，组委会一致同意将“国乐守望者”这一极具分量的行业最高荣誉授予万年芳先生。评委会给出的授奖词写道：“万年芳先生以数十载不懈的探索，坚守二胡之风骨、拓展民乐之边界。他桃李遍神州，音容冠国际，是当代国乐当之无愧的奠基石与守望人。”万年芳先生表示，这份荣誉属于所有默默为中国民乐传承奉献的同仁，未来他将倾注更多心力于二胡的国际化传播。',
    date: '2026-06-25',
    category: 'academic',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-2',
    title: '2026“弦动山河”全国二胡独奏巡演计划正式启航',
    summary: '本次巡演将历时四个月，跨越北京、上海、广州、杭州、成都等九大城市，呈献多首从未公开发表的原创二胡力作。',
    content: '经过一年多的精心筹备，万年芳先生2026“弦动山河”全国独奏音乐会巡演日程已正式敲定。此次巡演不仅保留了《二泉映月》、《江河水》等教科书级的经典曲目，万先生更将携手青年作曲家联袂献上一支全新二胡协奏曲《太极随想》。各站门票将于近期在各大票务平台同步开启预售，杭州站、上海站的大师班讲座日程也已排定，敬请乐迷朋友关注。',
    date: '2026-06-20',
    category: 'performance',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-3',
    title: '《万年芳二胡精选珍藏黑胶专辑》由国家唱片博物馆录制发行',
    summary: '该专辑汇集了万年芳先生过去三十年里最受赞誉的独奏录音珍贵母带，采用高保真纯模拟技术重新后期处理。',
    content: '为了抢救和保存珍贵的民乐历史录音，中国唱片总公司与国家唱片博物馆联合推出了《万年芳二胡精选珍藏黑胶专辑》。专辑收录了万先生在维也纳、卡内基等著名音乐厅的现场演奏母带，由中外顶级录音大师采用最先进的黑胶物理直刻工艺进行重制，极具学术参考与收藏价值。昨日，首批限量版1000张已被各大音乐学院图书馆及海内外藏家抢购一空。',
    date: '2026-05-18',
    category: 'media',
    imageUrl: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80'
  }
];
