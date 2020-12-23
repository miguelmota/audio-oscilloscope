(function(root) {
  'use strict';

  function _isFunction(v) {
    return typeof v === 'function';
  }

  function _result(v) {
    return _isFunction(v) ? v() : v;
  }

  function AudioOscilloscope(canvas, options) {
    if (!(this instanceof AudioOscilloscope)) {
      return new AudioOscilloscope(canvas, options);
    }
    options = options || {};
    var canvasOptions = options.canvas || {};
    var canvasContextOptions = options.canvasContext || {};
    this.analyser = null;
    this.bufferLength = 0;
    this.dataArray = [];
    this.canvas = canvas;
    this.width = _result(canvasOptions.width) || this.canvas.width;
    this.height = _result(canvasOptions.height) || this.canvas.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvasContext = this.canvas.getContext('2d');
    this.canvasContext.fillStyle = _result(canvasContextOptions.fillStyle) || 'rgb(255, 255, 255)';
    this.canvasContext.strokeStyle = _result(canvasContextOptions.strokeStyle) || 'rgb(0, 0, 0)';
    this.canvasContext.lineWidth = _result(canvasContextOptions.lineWidth) || 1;
    this.onDrawFrame = (_isFunction(options.onDrawFrame) ? options.onDrawFrame : function(){});

    var self = this;
    window.onresize = function() {
      self.width = _result(canvasOptions.width) || self.canvas.width;
      self.height = _result(canvasOptions.height) || self.canvas.height;
      self.canvas.width = self.width;
      self.canvas.height = self.height;
    };
  }

  AudioOscilloscope.prototype.addSource = function(streamSource) {
    this.streamSource = streamSource;
    this.audioContext = this.streamSource.context;
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.source = this.audioContext.createBufferSource();
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.streamSource.connect(this.analyser);
  };

  AudioOscilloscope.prototype.draw = function draw() {
    var analyser = this.analyser;
    var dataArray = this.dataArray;
    var bufferLength = this.bufferLength;
    var ctx = this.canvasContext;
    var w = this.width;
    var h = this.height;

    if (analyser) {
      analyser.getByteTimeDomainData(dataArray);
    }

    ctx.fillRect(0, 0, w, h);
    ctx.beginPath();

    var sliceWidth = w * 1.0 / bufferLength;
    var x = 0;

    if (!bufferLength) {
      ctx.moveTo(0, this.height/2);
    }

    for (var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * (h/2);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(w, h/2);
    ctx.stroke();

    this.onDrawFrame(this);
    requestAnimationFrame(draw.bind(this));
  };

  AudioOscilloscope.prototype.on = function(type, callback) {
    if (type === 'drawFrame') {
      this.onDrawFrame = callback;
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = AudioOscilloscope;
    }
    exports.AudioOscilloscope = AudioOscilloscope;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return AudioOscilloscope;
    });
  } else {
    root.AudioOscilloscope = AudioOscilloscope;
  }
})(this);
