<h3 align="center">
  <br />
  <img src="https://user-images.githubusercontent.com/168240/51434480-04fc1b80-1c16-11e9-811b-b4d1db1b08d3.png" alt="logo" width="700" />
  <br />
  <br />
  <br />
</h3>

# audio-oscilloscope

> Audio [oscilloscope](http://en.wikipedia.org/wiki/Oscilloscope) in canvas.

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/audio-oscilloscope/master/LICENSE) [![Build Status](https://travis-ci.org/miguelmota/audio-oscilloscope.svg?branch=master)](https://travis-ci.org/miguelmota/audio-oscilloscope) [![dependencies Status](https://david-dm.org/miguelmota/audio-oscilloscope/status.svg)](https://david-dm.org/miguelmota/audio-oscilloscope) [![NPM version](https://badge.fury.io/js/audio-oscilloscope.svg)](http://badge.fury.io/js/audio-oscilloscope)

[![NPM](https://nodei.co/npm/audio-oscilloscope.png)](https://nodei.co/npm/audio-oscilloscope)

<img src="https://raw.githubusercontent.com/miguelmota/audio-oscilloscope/master/screenshot.gif" width="600" />

## Demo

**[https://lab.miguelmota.com/audio-oscilloscope](https://lab.miguelmota.com/audio-oscilloscope)**

# Install

```bash
npm install audio-oscilloscope
```

## Usage

```javascript
var oscilloscope = AudioOscilloscope(document.getElementById('canvas'), {
  canvas: {
    width: function() {
      return window.innerWidth;
    },
    height: 400
  },
  canvasContext: {
    lineWidth: 2,
    fillStyle: 'rgb(0,0,0)',
    strokeStyle: 'green'
  }
});

oscilloscope.draw();

navigator.mediaDevices.getUserMedia({
  audio: true
}, function(stream) {
  var audioContext = new AudioContext();
  var source = audioContext.createMediaStreamSource(stream);
  oscilloscope.addSource(source);
}, function(error) {
  console.error(error);
});
```

## License

[MIT](LICENSE)
