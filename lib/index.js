"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var durations = {
  "w": 2000,
  "h": 1000,
  "q": 500,
  "i": 250,
  "s": 125,
  "t": 64,
  "x": 32,
  "o": 16
};

var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

var octaves = [2, 3, 4, 5, 6, 7];

var MusicalScore = function () {
  function MusicalScore(soundbank) {
    _classCallCheck(this, MusicalScore);

    this.soundbank = soundbank;
    this.tracks = [];
    this.stopped = true;
    this.soundMap = {};
  }
  //$FlowFixMe


  _createClass(MusicalScore, [{
    key: "preLoad",
    value: function preLoad(cb) {
      var _this = this;

      var instruments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ["bass", "guitar", "horn", "piano", "string"];

      var total = instruments.length * notes.length * octaves.length * Object.keys(durations).length;
      var current = 0;

      var interval = window.setInterval(function () {
        return cb(current / total * 100);
      }, 20);
      instruments.forEach(function (instrument) {
        _this.soundMap[instrument] = {};
        notes.forEach(function (note) {
          octaves.forEach(function (octave) {
            Object.keys(durations).forEach(function (duration) {
              var n = "" + note + octave + duration;
              _this.soundMap[instrument][n] = new Audio(_this.soundbank + instrument + "/" + encodeURIComponent(n) + ".ogg");
              _this.soundMap[instrument][n].oncanplay = function () {
                current++;
              };
            });
          });
        });
      });
    }
  }, {
    key: "playNote",
    value: function playNote(instrument, n) {
      if (n[0] === 'R') {
        return;
      }
      var audio = this.soundMap[instrument] && this.soundMap[instrument][n] ? this.soundMap[instrument][n]
      //$FlowFixMe
      : new Audio(this.soundbank + instrument + "/" + encodeURIComponent(n) + ".ogg");
      this.soundMap[instrument] = this.soundMap[instrument] || {};
      this.soundMap[instrument][n] = audio;
      audio.pause();
      audio.currentTime = 0;
      audio.play();
      return audio;
    }
  }, {
    key: "playTrack",
    value: function playTrack(instrument, notes) {
      var _this2 = this;

      var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var tm = 0;
      notes.split(" ").forEach(function (n) {
        setTimeout(function () {
          return _this2.playNote(instrument, n);
        }, tm);
        tm += durations[n[n.length - 1]];
      });

      if (!this.stopped && loop) {
        setTimeout(function () {
          return _this2.playTrack(instrument, notes, true);
        }, tm);
      }
    }
  }, {
    key: "addTrack",
    value: function addTrack(instrument, notes) {
      this.tracks.push({ instrument: instrument, notes: notes });
    }
  }, {
    key: "play",
    value: function play() {
      var _this3 = this;

      var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.stopped = !loop;
      this.tracks.forEach(function (track) {
        return _this3.playTrack(track.instrument, track.notes, loop);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stopped = true;
    }
  }]);

  return MusicalScore;
}();

exports.default = MusicalScore;