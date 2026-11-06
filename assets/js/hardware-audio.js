/**
 * DrToB Systems — Hardware Audio Synthesizer
 * 100% Native Web Audio API (Zero audio file downloads, zero external latency).
 * Generates tactile mechanical haptics, frequency blips, and cryptographic commit chimes.
 */

let audioCtx = null;
let isAudioMuted = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function toggleAudio() {
  initAudio();
  isAudioMuted = !isAudioMuted;
  const btn = document.getElementById('audio-toggle-btn');
  const label = document.getElementById('audio-toggle-label');

  if (btn && label) {
    if (isAudioMuted) {
      label.innerText = 'AUDIO: MUTED';
      btn.style.borderColor = 'var(--border-line)';
      btn.style.color = 'var(--text-dim)';
    } else {
      label.innerText = 'AUDIO: LIVE';
      btn.style.borderColor = 'var(--accent-solar)';
      btn.style.color = 'var(--accent-solar)';
      playHapticBlip(880, 0.1);
    }
  }
}

function playHapticBlip(freq = 600, duration = 0.05, type = 'sine') {
  if (isAudioMuted || !audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Graceful fallback
  }
}

function playSuccessChime() {
  if (isAudioMuted || !audioCtx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playHapticBlip(freq, 0.14, 'triangle');
    }, idx * 60);
  });
}

window.toggleAudio = toggleAudio;
window.playHapticBlip = playHapticBlip;
window.playSuccessChime = playSuccessChime;
