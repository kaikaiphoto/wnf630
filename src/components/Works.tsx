import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Film, Disc, Volume2, Sparkles, ChevronRight, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRACKS, VIDEOS } from '../data';
import { TrackItem, VideoItem } from '../types';
import { erhuPlayer } from '../utils/audio';

export default function Works() {
  const [activeTrack, setActiveTrack] = useState<TrackItem>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [eraFilter, setEraFilter] = useState<'all' | 'traditional' | 'modern'>('all');
  
  // Video Lightbox state
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoTimer, setVideoTimer] = useState(0);
  const videoIntervalRef = useRef<any>(null);

  // Sync state with global erhuPlayer
  useEffect(() => {
    // If the component unmounts, stop the music
    return () => {
      erhuPlayer.stop();
    };
  }, []);

  // Format time (e.g. 13 -> 00:13)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackSelect = (track: TrackItem) => {
    if (activeTrack.id === track.id) {
      // Toggle play/pause
      handlePlayToggle();
    } else {
      // Stop old and play new
      erhuPlayer.stop();
      setActiveTrack(track);
      setIsPlaying(true);
      setCurrentTime(0);
      setProgress(0);
      
      // Start synthesizing
      erhuPlayer.play(
        track.id,
        (current, prog) => {
          setCurrentTime(current);
          setProgress(prog);
        },
        () => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        }
      );
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      erhuPlayer.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      erhuPlayer.play(
        activeTrack.id,
        (current, prog) => {
          setCurrentTime(current);
          setProgress(prog);
        },
        () => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        }
      );
    }
  };

  const handleStop = () => {
    erhuPlayer.stop();
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  // Video simulated playback controls
  const handleOpenVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsVideoPlaying(true);
    setVideoTimer(0);
    // Stop any music playing
    erhuPlayer.stop();
    setIsPlaying(false);

    // Simulate progress counting
    if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
    videoIntervalRef.current = setInterval(() => {
      setVideoTimer((prev) => (prev >= 180 ? 0 : prev + 1));
    }, 1000);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsVideoPlaying(false);
    if (videoIntervalRef.current) {
      clearInterval(videoIntervalRef.current);
      videoIntervalRef.current = null;
    }
  };

  const filteredTracks = TRACKS.filter(track => {
    if (eraFilter === 'all') return true;
    return track.era === eraFilter;
  });

  return (
    <section
      id="works"
      className="py-24 bg-[#1c0808] relative overflow-hidden"
    >
      {/* Decorative radial ink drop animation background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-950/40 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <p className="text-amber-500 font-mono text-xs tracking-widest uppercase">
            MASTERPIECE SHOWCASE
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 tracking-widest">
            二胡代表作品
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-4" />
          <p className="text-stone-400 font-sans text-xs sm:text-sm max-w-xl mx-auto pt-2">
            二胡声声，承载千年幽思。点击播放，体验由 Web Audio 合成器现场渲染的国乐声效。
          </p>
        </div>

        {/* SECTION 1: MASTER CLASS MUSIC PLAYER */}
        <div className="bg-[#240c0c] border border-red-950/40 rounded-lg p-6 sm:p-10 shadow-2xl mb-20 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Player Side (Left 5 columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#150404] p-6 sm:p-8 rounded border border-red-950/50 relative overflow-hidden">
              
              {/* Background abstract ink ripples on play */}
              {isPlaying && (
                <div className="absolute inset-0 pointer-events-none z-0">
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0.05, 0.15] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-amber-500/10"
                  />
                  <motion.div
                    animate={{ scale: [1, 2.4, 1], opacity: [0.1, 0.02, 0.1] }}
                    transition={{ repeat: Infinity, duration: 5, delay: 1, ease: 'easeInOut' }}
                    className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-amber-500/5"
                  />
                </div>
              )}

              {/* Player Top Info */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-amber-500 tracking-widest uppercase bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded">
                    {activeTrack.era === 'traditional' ? '传统古曲' : '现代协奏'}
                  </span>
                  <div className="flex items-center space-x-1.5 text-stone-500">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-xs font-mono">LIVE SYNTH</span>
                  </div>
                </div>

                {/* Vinyl Spin Area */}
                <div className="py-8 flex justify-center">
                  <div className="relative">
                    {/* Outer shining edge */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-red-950 via-red-900/40 to-red-950 shadow-xl opacity-80" />
                    
                    {/* Vinyl Disc Body */}
                    <motion.div
                      animate={isPlaying ? { rotate: 360 } : {}}
                      transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                      className="w-44 h-44 rounded-full bg-[#150404] border-4 border-[#1c0808] flex items-center justify-center relative shadow-2xl z-10"
                    >
                      {/* Vinyl grooves lines */}
                      <div className="absolute inset-3 rounded-full border border-red-900/20" />
                      <div className="absolute inset-6 rounded-full border border-red-900/15" />
                      <div className="absolute inset-10 rounded-full border border-red-900/10" />
                      <div className="absolute inset-14 rounded-full border border-red-900/5" />

                      {/* Center label (Classical style) */}
                      <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center relative overflow-hidden">
                        <Disc className={`w-8 h-8 text-amber-400 ${isPlaying ? 'animate-pulse' : ''}`} />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Track Details */}
                <div className="text-center space-y-1">
                  <h3 className="text-stone-100 font-serif font-bold text-lg tracking-wider">
                    {activeTrack.title}
                  </h3>
                  <p className="text-stone-400 text-xs">
                    万年芳 独奏示范录音
                  </p>
                </div>
              </div>

              {/* Controls and Progress */}
              <div className="space-y-4 relative z-10 pt-4">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="h-1 bg-red-950/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: 'linear' }}
                    />
                  </div>
                  <div className="flex justify-between text-stone-500 text-xxs font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{activeTrack.duration}</span>
                  </div>
                </div>

                {/* Play Buttons */}
                <div className="flex items-center justify-center space-x-6">
                  {isPlaying && (
                    <button
                      onClick={handleStop}
                      className="p-2.5 rounded-full border border-red-950/60 hover:border-red-900/60 hover:text-red-400 text-stone-400 transition-all duration-300 active:scale-90"
                      title="停止"
                    >
                      <span className="block w-2.5 h-2.5 bg-current rounded-sm" />
                    </button>
                  )}

                  <button
                    onClick={handlePlayToggle}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 flex items-center justify-center shadow-lg transition-transform duration-300 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current text-stone-950" />
                    ) : (
                      <Play className="w-6 h-6 fill-current text-stone-950 translate-x-0.5" />
                    )}
                  </button>

                  <div className="w-10" /> {/* Spacer to align nicely with stop */}
                </div>
              </div>

            </div>

            {/* Selection & Story Side (Right 7 columns) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              
              {/* Tabs for Era selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-red-950/40 pb-2">
                  <span className="text-sm font-serif font-bold text-stone-100 tracking-wider flex items-center space-x-2">
                    <Music className="w-4 h-4 text-amber-500" />
                    <span>选曲赏析</span>
                  </span>
                  
                  {/* Era filter */}
                  <div className="flex space-x-2">
                    {(['all', 'traditional', 'modern'] as const).map((era) => (
                      <button
                        key={era}
                        onClick={() => setEraFilter(era)}
                        className={`px-3 py-1 text-xs rounded transition-all duration-300 ${
                          eraFilter === era
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'text-stone-400 hover:text-stone-200 hover:bg-red-900/20'
                        }`}
                      >
                        {era === 'all' ? '全部' : era === 'traditional' ? '古曲传统' : '现代交响'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tracks list scrollbox */}
                <div className="max-h-[220px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {filteredTracks.map((track) => {
                    const isSelected = track.id === activeTrack.id;
                    const isCurrentPlaying = isSelected && isPlaying;
                    return (
                      <button
                        key={track.id}
                        onClick={() => handleTrackSelect(track)}
                        className={`w-full text-left p-3 rounded flex items-center justify-between border transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#150404] border-amber-500/30'
                            : 'bg-[#240c0c]/60 border-red-950/30 hover:border-red-900/40 hover:bg-red-950/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected 
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                              : 'bg-[#240c0c] border-red-950/40 text-stone-500'
                          }`}>
                            {isCurrentPlaying ? (
                              <span className="flex space-x-0.5 items-end h-3">
                                <span className="w-0.5 h-2 bg-amber-400 animate-bounce" />
                                <span className="w-0.5 h-3 bg-amber-400 animate-bounce delay-75" />
                                <span className="w-0.5 h-1.5 bg-amber-400 animate-bounce delay-150" />
                              </span>
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current" />
                            )}
                          </div>
                          <div className="truncate pr-4">
                            <h4 className={`text-sm font-serif font-semibold tracking-wide ${isSelected ? 'text-amber-400' : 'text-stone-200'}`}>
                              {track.title.split(' (')[0]}
                            </h4>
                            <p className="text-xxs font-sans text-stone-400 truncate mt-0.5">
                              {track.description}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-stone-500 shrink-0">
                          {track.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Song Background Narrative Story Scroll */}
              <div className="bg-[#150404] p-5 rounded border border-red-950/40 relative flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-xs font-serif text-amber-500/80 font-semibold tracking-widest uppercase flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>乐曲解说 ・ 背景故事</span>
                  </h4>
                  <p className="text-stone-300 font-serif leading-relaxed text-sm tracking-wide">
                    {activeTrack.story || '正在加载此曲目艺术解析，敬请期待先生的更多作品录制。'}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-stone-500 text-xxs font-mono border-t border-red-950/30 pt-4 mt-4">
                  <span>琴圣传艺系列</span>
                  <span>万年芳亲书说乐</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* SECTION 2: LIVE RECORDING VIDEO THEATER */}
        <div className="space-y-6">
          <h3 className="text-xl font-serif text-stone-200 tracking-widest flex items-center space-x-2 border-b border-red-950/40 pb-3">
            <Film className="w-5 h-5 text-amber-500" />
            <span>演出精选视频</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => handleOpenVideo(video)}
                className="bg-[#240c0c] border border-red-950/30 rounded overflow-hidden group cursor-pointer hover:border-red-900/40 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-xl hover:shadow-black/40"
              >
                {/* Video Cover Image Wrapper */}
                <div className="relative overflow-hidden aspect-video bg-[#150404]">
                  <img
                    src={video.coverUrl}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-104 opacity-80 group-hover:opacity-100"
                  />
                  {/* Playing hover circle icon */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#240c0c]/90 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current text-amber-400 translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-stone-300 text-xxs font-mono tracking-widest">
                    {video.duration}
                  </span>
                </div>

                {/* Video Info Card */}
                <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-stone-200 group-hover:text-amber-400 font-serif font-bold text-sm tracking-wide transition-colors leading-snug">
                      {video.title}
                    </h4>
                    <p className="text-stone-400 text-xs font-sans line-clamp-2 leading-relaxed mt-1.5">
                      {video.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-stone-500 text-xxs font-mono border-t border-red-950/40 pt-3 mt-3">
                    <span>{video.venue}</span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* VIDEO LIGHTBOX / SIMULATION THEATER */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#240c0c] rounded-lg max-w-4xl w-full border border-red-950/40 overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="bg-[#150404] px-6 py-4 border-b border-red-950/40 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Film className="w-5 h-5 text-amber-500" />
                  <span className="text-stone-100 font-serif text-sm sm:text-base font-bold tracking-wider truncate max-w-md sm:max-w-xl">
                    {selectedVideo.title}
                  </span>
                </div>
                <button
                  onClick={handleCloseVideo}
                  className="p-1 text-stone-400 hover:text-stone-100 transition-colors focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Video Simulated Screen */}
              <div className="relative aspect-video bg-[#150404] flex flex-col items-center justify-center overflow-hidden">
                {/* Background cover blurred */}
                <img
                  src={selectedVideo.coverUrl}
                  alt="bg"
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-25"
                />

                {/* Glowing audio waveforms and visualizer nodes inside the simulated theater */}
                <div className="relative z-10 flex flex-col items-center text-center px-4 space-y-6">
                  {isVideoPlaying ? (
                    <>
                      {/* Interactive soundwave graphics */}
                      <div className="flex items-end space-x-1.5 h-16">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <motion.span
                            key={i}
                            animate={{
                              height: [
                                `${Math.sin(i + videoTimer) * 20 + 30}px`,
                                `${Math.cos(i * 2 + videoTimer) * 35 + 40}px`,
                                `${Math.sin(i * 1.5 + videoTimer) * 15 + 25}px`
                              ]
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.2 + (i % 3) * 0.2,
                              ease: 'easeInOut'
                            }}
                            className="w-1 rounded-full bg-amber-400"
                          />
                        ))}
                      </div>

                      {/* Playing details */}
                      <div className="space-y-1.5">
                        <p className="text-stone-200 font-sans text-xs sm:text-sm tracking-widest flex items-center justify-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span>视频正在高清重播中...</span>
                        </p>
                        <p className="text-stone-500 text-xxs font-mono">
                          正在解压高保真立体声轨道 (24-bit PCM)
                        </p>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg transition-transform active:scale-95"
                    >
                      <Play className="w-6 h-6 fill-current text-stone-950 translate-x-0.5" />
                    </button>
                  )}
                </div>

                {/* Subtitle placeholder scrolling on simulated timer */}
                {isVideoPlaying && (
                  <div className="absolute bottom-14 left-4 right-4 text-center z-10 pointer-events-none">
                    <p className="text-amber-300 font-serif text-sm sm:text-base tracking-widest bg-black/80 backdrop-blur-sm px-4 py-1.5 inline-block rounded border border-red-950/35">
                      {videoTimer % 12 < 4 
                        ? '「听这极高亢而苍凉的内弦音，在广阔的大地上传递」'
                        : videoTimer % 12 < 8
                        ? '「这里指法运用了独特的滑揉，二胡的哭泣声油然而生」'
                        : '「万先生拉弓极其深沉，整个交响乐团渐次汇入」'}
                    </p>
                  </div>
                )}

                {/* Player Bottom Control Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/90 border-t border-red-950/40 px-4 flex items-center justify-between text-stone-300 z-10 text-xs text-xs">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-stone-400">
                      {formatTime(videoTimer)} / 03:00
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-stone-400">
                    <span className="font-mono tracking-widest text-xxs bg-[#240c0c] px-1.5 py-0.5 rounded text-amber-500">
                      1080P Ultra
                    </span>
                    <Maximize2 className="w-4 h-4 hover:text-stone-200 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Video description footer */}
              <div className="p-6 bg-[#150404] border-t border-red-950/40">
                <p className="text-stone-300 text-sm font-sans leading-relaxed">
                  {selectedVideo.description}
                </p>
                <div className="flex flex-wrap gap-4 mt-4 text-stone-500 text-xs font-mono">
                  <span>录制地点: {selectedVideo.venue}</span>
                  <span>录制时间: {selectedVideo.date}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
