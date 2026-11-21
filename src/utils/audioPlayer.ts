import { WEDDING_CONFIG } from '../config/wedding';

type Listener = (isPlaying: boolean) => void;

/**
 * Persistent singleton audio controller.
 * - Preloads the wedding M4A file (`./assets/wedding-song.m4a`) early so tapping
 *   the envelope initiates playback immediately on iOS Safari, Android Chrome, and desktop.
 * - Skips the ~1.9s leading silence in the song file on initial start so guests hear
 *   the music right as the envelope begins opening.
 * - Survives scrolling and language toggling without restarting.
 * - Falls back gracefully to a gentle synthesized Web Audio nocturne only if audio
 *   playback is unavailable.
 */
class WeddingAudioController {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners = new Set<Listener>();
  private useSynthFallback = false;
  private hasStartedOnce = false;

  private audioCtx: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private synthTimer: number | null = null;
  private noteIndex = 0;

  public preload(): void {
    try {
      const el = this.ensureAudioElement();
      if (el.readyState === 0) {
        el.load();
      }
    } catch {
      // Ignore preload errors
    }
  }

  private ensureAudioElement(): HTMLAudioElement {
    if (!this.audio) {
      const el = new Audio(WEDDING_CONFIG.assets.weddingSong);
      el.loop = true;
      el.preload = 'auto';
      el.setAttribute('playsinline', 'true');
      el.setAttribute('webkit-playsinline', 'true');
      el.volume = 0.85;

      el.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      el.addEventListener('pause', () => {
        if (!this.useSynthFallback) {
          this.isPlaying = false;
          this.notify();
        }
      });

      el.addEventListener('error', () => {
        if (!this.useSynthFallback && this.isPlaying) {
          this.useSynthFallback = true;
          this.startSynthLoop();
        } else {
          this.useSynthFallback = true;
        }
      });

      this.audio = el;
    }
    return this.audio;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.isPlaying);
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }

  public playFromUserGesture(): void {
    if (this.isPlaying) return;

    if (this.useSynthFallback) {
      this.startSynthLoop();
      this.isPlaying = true;
      this.notify();
      return;
    }

    const el = this.ensureAudioElement();

    // Jump past the 1.99s silent lead-in on first open so music is heard instantaneously
    if (!this.hasStartedOnce) {
      this.hasStartedOnce = true;
      try {
        if (el.currentTime < 1.8) {
          el.currentTime = 1.9;
        }
      } catch {
        el.addEventListener(
          'loadedmetadata',
          () => {
            try {
              if (el.currentTime < 1.8) el.currentTime = 1.9;
            } catch {
              // Ignore seek errors
            }
          },
          { once: true }
        );
      }
    }

    // Call el.play() synchronously within the user tap handler for strict iOS/Safari unlock
    const playPromise = el.play();
    this.isPlaying = true;
    this.notify();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        if (el.error || el.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
          this.useSynthFallback = true;
          this.startSynthLoop();
          this.isPlaying = true;
          this.notify();
        } else {
          // Retry once cleanly; if blocked, switch gracefully to Web Audio unlock
          el.load();
          el.play().catch(() => {
            this.isPlaying = false;
            this.notify();
          });
        }
      });
    }
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.playFromUserGesture();
    }
  }

  public pause(): void {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    this.stopSynthLoop();
    this.isPlaying = false;
    this.notify();
  }

  private startSynthLoop(): void {
    if (this.synthTimer !== null) return;
    try {
      const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContextCtor();
      }
      if (this.audioCtx.state === 'suspended') {
        void this.audioCtx.resume();
      }

      if (!this.synthGain) {
        this.synthGain = this.audioCtx.createGain();
        this.synthGain.gain.value = 0.08;
        this.synthGain.connect(this.audioCtx.destination);
      }

      const melody = [
        261.63, 329.63, 392.0, 493.88, 523.25, 493.88, 392.0, 329.63,
        293.66, 349.23, 440.0, 523.25, 587.33, 523.25, 440.0, 349.23,
        220.0, 261.63, 329.63, 392.0, 440.0, 392.0, 329.63, 261.63,
        196.0, 246.94, 293.66, 392.0, 440.0, 392.0, 293.66, 246.94,
      ];

      const playNote = () => {
        if (!this.audioCtx || !this.synthGain) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const env = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(melody[this.noteIndex % melody.length], now);
        this.noteIndex += 1;

        env.gain.setValueAtTime(0.0001, now);
        env.gain.exponentialRampToValueAtTime(0.28, now + 0.08);
        env.gain.exponentialRampToValueAtTime(0.0001, now + 1.55);

        osc.connect(env);
        env.connect(this.synthGain);

        osc.start(now);
        osc.stop(now + 1.6);
      };

      playNote();
      this.synthTimer = window.setInterval(playNote, 720);
    } catch {
      // Ignore Web Audio errors gracefully
    }
  }

  private stopSynthLoop(): void {
    if (this.synthTimer !== null) {
      window.clearInterval(this.synthTimer);
      this.synthTimer = null;
    }
  }
}

export const weddingAudio = new WeddingAudioController();
