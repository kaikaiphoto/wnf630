// Erhu Web Audio Synthesizer for live performance simulation
// It models the resonant python-skin soundbox and characteristic string techniques (vibrato, slides).

interface Note {
  pitch: number; // MIDI number
  duration: number; // in seconds
  slide?: boolean; // slide from previous note
  staccato?: boolean; // shorter articulation
  vibratoDepth?: number;
}

const ERQUAN_MELODY: Note[] = [
  { pitch: 57, duration: 1.5 }, // A3
  { pitch: 62, duration: 1.0, slide: true }, // D4
  { pitch: 64, duration: 0.8 }, // E4
  { pitch: 65, duration: 1.2, vibratoDepth: 1.5 }, // F4
  { pitch: 64, duration: 0.6 }, // E4
  { pitch: 62, duration: 1.5 }, // D4
  { pitch: 57, duration: 1.0 }, // A3
  { pitch: 55, duration: 1.2 }, // G3
  { pitch: 57, duration: 2.0, vibratoDepth: 2.0 }, // A3
  
  { pitch: 62, duration: 1.2 }, // D4
  { pitch: 65, duration: 0.8, slide: true }, // F4
  { pitch: 67, duration: 1.0 }, // G4
  { pitch: 69, duration: 1.5, vibratoDepth: 1.8 }, // A4
  { pitch: 67, duration: 0.6 }, // G4
  { pitch: 65, duration: 0.6 }, // F4
  { pitch: 64, duration: 0.8 }, // E4
  { pitch: 62, duration: 2.5, vibratoDepth: 2.5 }, // D4
  
  { pitch: 69, duration: 1.2 }, // A4
  { pitch: 72, duration: 1.0, slide: true }, // C5
  { pitch: 74, duration: 1.8, vibratoDepth: 2.0 }, // D5
  { pitch: 72, duration: 0.6 }, // C5
  { pitch: 69, duration: 1.0 }, // A4
  { pitch: 67, duration: 0.8 }, // G4
  { pitch: 69, duration: 2.0 }  // A4
];

const SAIMA_MELODY: Note[] = [
  // Intro fast tempo
  { pitch: 69, duration: 0.25, staccato: true }, // A4
  { pitch: 69, duration: 0.25, staccato: true }, 
  { pitch: 71, duration: 0.25, staccato: true }, // B4
  { pitch: 74, duration: 0.25, staccato: true }, // D5
  { pitch: 76, duration: 0.25, staccato: true }, // E5
  { pitch: 76, duration: 0.25, staccato: true },
  { pitch: 78, duration: 0.25, staccato: true }, // F#5
  { pitch: 76, duration: 0.25, staccato: true }, // E5
  { pitch: 74, duration: 0.25, staccato: true }, // D5
  { pitch: 71, duration: 0.25, staccato: true }, // B4
  { pitch: 69, duration: 0.5 }, // A4
  
  // Theme
  { pitch: 74, duration: 0.3, staccato: true }, // D5
  { pitch: 74, duration: 0.3, staccato: true },
  { pitch: 71, duration: 0.3, staccato: true }, // B4
  { pitch: 69, duration: 0.3, staccato: true }, // A4
  { pitch: 74, duration: 0.6, vibratoDepth: 1.0 }, // D5
  
  { pitch: 76, duration: 0.3, staccato: true }, // E5
  { pitch: 76, duration: 0.3, staccato: true },
  { pitch: 74, duration: 0.3, staccato: true }, // D5
  { pitch: 71, duration: 0.3, staccato: true }, // B4
  { pitch: 76, duration: 0.6, vibratoDepth: 1.0 }, // E5
  
  { pitch: 78, duration: 0.3 }, // F#5
  { pitch: 81, duration: 0.3, slide: true }, // A5
  { pitch: 78, duration: 0.3 }, // F#5
  { pitch: 76, duration: 0.3 }, // E5
  { pitch: 74, duration: 0.4 }, // D5
  { pitch: 71, duration: 0.4 }, // B4
  { pitch: 69, duration: 0.8, vibratoDepth: 1.5 }, // A4

  // Whinny sequence placeholder
  { pitch: 74, duration: 0.1 }, 
  { pitch: 76, duration: 0.1 },
  { pitch: 78, duration: 0.1 },
  { pitch: 81, duration: 0.1 },
  { pitch: 83, duration: 0.8, vibratoDepth: 3.0 } // Horse whinny representation (handled dynamically)
];

// Fallback melody for others
const GENERIC_MELODY: Note[] = [
  { pitch: 62, duration: 1.0 },
  { pitch: 64, duration: 1.0 },
  { pitch: 67, duration: 1.5, vibratoDepth: 1.5 },
  { pitch: 69, duration: 1.0 },
  { pitch: 74, duration: 2.0, vibratoDepth: 2.0 }
];

export class ErhuSynthesizer {
  private ctx: AudioContext | null = null;
  private currentOsc: OscillatorNode | null = null;
  private currentGain: GainNode | null = null;
  private vibratoLFO: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  
  private activeTrackId: string | null = null;
  private isPlayingStatus: boolean = false;
  private playTimeoutId: any = null;
  private totalDuration: number = 0;
  private elapsedSeconds: number = 0;
  private timerIntervalId: any = null;
  
  private onTimeUpdateCallback: ((current: number, progress: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {}

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  public play(
    trackId: string,
    onTimeUpdate: (current: number, progress: number) => void,
    onEnd: () => void
  ) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.activeTrackId = trackId;
    this.isPlayingStatus = true;
    this.onTimeUpdateCallback = onTimeUpdate;
    this.onEndCallback = onEnd;

    // Pick melody
    let melody: Note[] = GENERIC_MELODY;
    if (trackId === 'track-1') {
      melody = ERQUAN_MELODY;
    } else if (trackId === 'track-2') {
      melody = SAIMA_MELODY;
    } else if (trackId === 'track-3') {
      // Jianghe Shui - emotional slow notes
      melody = [
        { pitch: 55, duration: 1.5 },
        { pitch: 58, duration: 1.0, slide: true },
        { pitch: 60, duration: 1.5, vibratoDepth: 3.0 },
        { pitch: 58, duration: 0.5 },
        { pitch: 55, duration: 1.2 },
        { pitch: 53, duration: 1.2 },
        { pitch: 50, duration: 2.5, vibratoDepth: 2.5 }
      ];
    } else if (trackId === 'track-4') {
      // Great Wall Capriccio
      melody = [
        { pitch: 62, duration: 1.2 },
        { pitch: 67, duration: 1.2 },
        { pitch: 69, duration: 1.5, vibratoDepth: 1.8 },
        { pitch: 71, duration: 1.0 },
        { pitch: 74, duration: 2.5, vibratoDepth: 2.5 }
      ];
    } else if (trackId === 'track-5') {
      // Ting Song
      melody = [
        { pitch: 57, duration: 0.8 },
        { pitch: 62, duration: 0.8 },
        { pitch: 60, duration: 0.8 },
        { pitch: 62, duration: 1.5, vibratoDepth: 2.0 },
        { pitch: 65, duration: 1.0 },
        { pitch: 64, duration: 0.8 },
        { pitch: 62, duration: 2.0 }
      ];
    }

    // Calculate total duration
    this.totalDuration = melody.reduce((acc, note) => acc + note.duration, 0);
    this.elapsedSeconds = 0;

    // Start playback schedule
    this.playMelody(melody);

    // Setup visual progress timer
    this.timerIntervalId = setInterval(() => {
      if (this.elapsedSeconds < this.totalDuration) {
        this.elapsedSeconds += 0.25;
        const progress = Math.min(100, (this.elapsedSeconds / this.totalDuration) * 100);
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(this.elapsedSeconds, progress);
        }
      }
    }, 250);
  }

  private playMelody(melody: Note[]) {
    let time = this.ctx!.currentTime;
    
    // Create central nodes for Erhu timbre modeling
    // Erhu is a bowed string, so it has rich harmonics. We can use a sawtooth wave or triangle wave.
    // The soundbox of python skin acts as a bandpass filter with high resonance.
    this.filter = this.ctx!.createBiquadFilter();
    this.filter.type = 'bandpass';
    this.filter.frequency.setValueAtTime(1000, time); // soundbox resonance frequency around 1000Hz
    this.filter.Q.setValueAtTime(1.5, time); // medium resonance

    const outputGain = this.ctx!.createGain();
    outputGain.gain.setValueAtTime(0.2, time); // limit volume
    
    this.filter.connect(outputGain);
    outputGain.connect(this.ctx!.destination);

    this.currentGain = outputGain;

    let previousFreq = 0;

    melody.forEach((note, index) => {
      const noteStart = time;
      const noteEnd = time + note.duration;
      
      const targetFreq = this.midiToFreq(note.pitch);

      // Create main voice oscillator
      const osc = this.ctx!.createOscillator();
      
      // Customize oscillator shape to sound string-like
      // Erhu is nasal, meaning odd and even harmonics, slightly saw-like but filtered
      osc.type = 'sawtooth';
      
      // Pitch Slide (Portamento)
      if (note.slide && previousFreq > 0) {
        osc.frequency.setValueAtTime(previousFreq, noteStart);
        osc.frequency.exponentialRampToValueAtTime(targetFreq, noteStart + 0.18);
      } else {
        osc.frequency.setValueAtTime(targetFreq, noteStart);
      }

      // Vibrato (soul of the Erhu)
      // LFO modulates the frequency of the oscillator at around 5.5Hz to 6Hz.
      const vibratoGain = this.ctx!.createGain();
      const lfo = this.ctx!.createOscillator();
      lfo.frequency.setValueAtTime(5.8, noteStart); // vibrato rate
      
      const vDepth = note.vibratoDepth || 0.8;
      // Fade-in the vibrato depth (Erhu players start a note steady and then vibrato rolls in)
      vibratoGain.gain.setValueAtTime(0, noteStart);
      vibratoGain.gain.linearRampToValueAtTime(vDepth * 5, noteStart + note.duration * 0.4);

      lfo.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      
      // Node management
      osc.connect(this.filter!);
      
      // Articulation Envelope (Volume)
      const noteGain = this.ctx!.createGain();
      osc.connect(noteGain);
      noteGain.connect(this.filter!);

      if (note.staccato) {
        // Crisp, fast bowing
        noteGain.gain.setValueAtTime(0, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.4, noteStart + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteEnd - 0.03);
      } else {
        // Expressive legato / cantabile bowing
        noteGain.gain.setValueAtTime(0, noteStart);
        // Slighter attack time to model bow friction
        noteGain.gain.linearRampToValueAtTime(0.35, noteStart + 0.08);
        noteGain.gain.setValueAtTime(0.35, noteEnd - 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteEnd);
      }

      // Special Horse Whinny modeling at the end of Saima (Track 2)
      if (this.activeTrackId === 'track-2' && index === melody.length - 1) {
        // Dramatic pitch sweep up and down quickly, with high vibrato
        osc.frequency.setValueAtTime(targetFreq, noteStart);
        osc.frequency.exponentialRampToValueAtTime(targetFreq * 1.5, noteStart + 0.2);
        osc.frequency.exponentialRampToValueAtTime(targetFreq * 0.8, noteStart + 0.5);
        osc.frequency.exponentialRampToValueAtTime(targetFreq * 1.2, noteStart + 0.8);
      }

      // Start & stop schedule
      lfo.start(noteStart);
      lfo.stop(noteEnd);
      osc.start(noteStart);
      osc.stop(noteEnd);

      previousFreq = targetFreq;
      time = noteEnd;
    });

    // Handle overall completion callback
    const totalTimeMs = (time - this.ctx!.currentTime) * 1000;
    this.playTimeoutId = setTimeout(() => {
      this.stop();
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    }, totalTimeMs);
  }

  public stop() {
    this.isPlayingStatus = false;
    this.activeTrackId = null;

    if (this.playTimeoutId) {
      clearTimeout(this.playTimeoutId);
      this.playTimeoutId = null;
    }
    if (this.timerIntervalId) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = null;
    }

    try {
      if (this.currentOsc) {
        this.currentOsc.stop();
        this.currentOsc = null;
      }
      if (this.vibratoLFO) {
        this.vibratoLFO.stop();
        this.vibratoLFO = null;
      }
      if (this.currentGain) {
        this.currentGain.disconnect();
        this.currentGain = null;
      }
    } catch (e) {
      console.warn('Audio stop encountered error:', e);
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingStatus;
  }

  public getActiveTrackId(): string | null {
    return this.activeTrackId;
  }

  public getDuration(): number {
    return this.totalDuration;
  }

  public getElapsed(): number {
    return this.elapsedSeconds;
  }
}

// Global player instance
export const erhuPlayer = new ErhuSynthesizer();
