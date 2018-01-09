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

var MusicalScore = function () {
  function MusicalScore(soundbank) {
    _classCallCheck(this, MusicalScore);

    this.soundbank = soundbank;
    this.tracks = [];
    this.stopped = true;
  }

  _createClass(MusicalScore, [{
    key: "playNote",
    value: function playNote(instrument, n) {
      //$FlowFixMe
      new Audio(this.soundbank + instrument + "/" + encodeURIComponent(n) + ".ogg").play();
    }
  }, {
    key: "playTrack",
    value: function playTrack(instrument, notes) {
      var _this = this;

      var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var tm = 0;
      notes.split(" ").forEach(function (n) {
        setTimeout(function () {
          return _this.playNote(instrument, n);
        }, tm);
        tm += durations[n[n.length - 1]];
      });

      if (!this.stopped && loop) {
        setTimeout(function () {
          return _this.playTrack(instrument, notes, true);
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
      var _this2 = this;

      var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.stopped = !loop;
      this.tracks.forEach(function (track) {
        return _this2.playTrack(track.instrument, track.notes, loop);
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