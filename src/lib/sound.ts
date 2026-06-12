let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function makeNoiseBurst(
  ac: AudioContext,
  durationSec: number,
  startAt: number,
  gainVal: number,
  decay: number,
  filterType: BiquadFilterType,
  filterFreq: number,
  filterQ = 1
) {
  const len = Math.floor(ac.sampleRate * durationSec);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * decay));
  }

  const src = ac.createBufferSource();
  src.buffer = buf;

  const flt = ac.createBiquadFilter();
  flt.type = filterType;
  flt.frequency.value = filterFreq;
  flt.Q.value = filterQ;

  const gain = ac.createGain();
  gain.gain.value = gainVal;

  src.connect(flt);
  flt.connect(gain);
  gain.connect(ac.destination);
  src.start(startAt);
}

export function playClick() {
  const ac = getCtx();
  if (!ac) return;
  makeNoiseBurst(ac, 0.035, ac.currentTime, 0.10, 0.25, "highpass", 2200);
}

export function playShutter() {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  // sharp mechanical click (shutter open)
  makeNoiseBurst(ac, 0.055, t, 0.22, 0.18, "bandpass", 900, 1.8);
  // film advance whirr (low rumble tail)
  makeNoiseBurst(ac, 0.20, t + 0.03, 0.10, 0.60, "lowpass", 500);
  // second click (shutter close)
  makeNoiseBurst(ac, 0.04, t + 0.13, 0.14, 0.22, "bandpass", 1100, 2.0);
}
