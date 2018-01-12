/* @flow */
const durations = {
    "w": 2000,
    "h": 1000,
    "q": 500,
    "i": 250,
    "s": 125,
    "t": 64,
    "x": 32,
    "o": 16
};

const notes = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G","G#", "A", "A#", "B"
];

const octaves = [2,3,4,5,6,7];


class MusicalScore {
  soundbank : string;
  tracks : Array<{instrument : string, notes : string }>;
  stopped : boolean;
  //$FlowFixMe
  soundMap: { [key: string]: { [key: string]: Audio }};

  constructor(soundbank : string) {
    this.soundbank = soundbank;
    this.tracks = [];
    this.stopped = true;
    this.soundMap = {};
  }

  preLoad(cb : (number) => void, instruments : Array<string>  = ["bass", "guitar",  "horn", "piano", "string"]) {
    const total = instruments.length * notes.length * octaves.length * Object.keys(durations).length;
    let current = 0;

    let interval = window.setInterval(() => cb((current / total) * 100), 20);
    instruments.forEach(instrument => {
      this.soundMap[instrument] = {};
      notes.forEach(note => {
        octaves.forEach(octave => {
          Object.keys(durations).forEach(duration => {
            const n = `${note}${octave}${duration}`;
            this.soundMap[instrument][n] = new Audio(this.soundbank + instrument + "/" + encodeURIComponent(n) + ".ogg");
            this.soundMap[instrument][n].oncanplay = () => { current++; };
          });
        });
      });
    });
  }

  playNote(instrument : string, n : string) {
    if (n[0] === 'R') { return; }
    const audio = this.soundMap[instrument] && this.soundMap[instrument][n]
      ? this.soundMap[instrument][n]
      //$FlowFixMe
      : new Audio(this.soundbank + instrument + "/" + encodeURIComponent(n) + ".ogg");
    this.soundMap[instrument] = this.soundMap[instrument] || {};
    this.soundMap[instrument][n] = audio;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    return audio;
  }

  playTrack(instrument : string, notes : string, loop : boolean = false) {
    let tm = 0;
    notes.split(" ").forEach((n) => {
        setTimeout(() => this.playNote(instrument, n), tm);
        tm += durations[n[n.length - 1]];
    });

    if (!this.stopped && loop) {
        setTimeout(() => this.playTrack(instrument, notes, true), tm);
    }
  }

  addTrack(instrument : string, notes : string) {
    this.tracks.push({instrument : instrument, notes : notes});
  }

  play(loop : boolean = false)  {
    this.stopped = !loop;
    this.tracks.forEach(track => this.playTrack(track.instrument, track.notes, loop));
  }

  stop() {
    this.stopped = true;
  }
}

export default MusicalScore;
