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

class MusicalScore {
  soundbank : string;
  tracks : Array<{instrument : string, notes : string }>;
  stopped : boolean;

  constructor(soundbank : string) {
    this.soundbank = soundbank;
    this.tracks = [];
    this.stopped = true;
  }

  playNote(instrument : string, n : string) {
    if (n[0] === 'R') { return; }
    //$FlowFixMe
    new Audio(this.soundbank + instrument + "/" + encodeURIComponent(n) + ".ogg").play();
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
