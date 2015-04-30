window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
window.URL = window.URL || window.webkitURL;

var audioContext;
var oscilloscope;

function init() {
  oscilloscope = AudioOscilloscope(document.getElementById('canvas'), {
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

  oscilloscope.on('drawFrame', function(osc) {
    var c = osc.canvas;
    var ctx = osc.canvasContext;
    var gradient = ctx.createLinearGradient(0,0,c.width,0);
    gradient.addColorStop(0, randomColor());
    gradient.addColorStop(0.5, randomColor());
    gradient.addColorStop(1, randomColor());
    ctx.strokeStyle = gradient;
  });

  oscilloscope.draw();

  try {
    audioContext = new AudioContext();
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({
    audio: true
  }, startUserMedia, userMediaError);
}

function startUserMedia(stream) {
  var streamSource = audioContext.createMediaStreamSource(stream);
  oscilloscope.addSource(streamSource);
}

function userMediaError(error) {
  console.error(error);
}

function randomColor() {
  var i = 3;
  var colors = [];
  while(i--) {
    colors.push(random(0,255));
  }
  return 'rgb(' + colors.join(',') + ')';
}

function random(a,b) {
  return ((Math.random() * (b - a + 1) + a)|0);
}

window.onload = init;
