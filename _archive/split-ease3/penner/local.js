// allow this to function as responsive iframe
require('ln-js/layout/iframe/content');

window.onload = function(){
  'use strict';

  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      width = canvas.width = 400,
      height = canvas.height = 400,
      margin = 40;

  var axes = {
    origin: [margin, margin],
    width: width - 2*margin,
    height: height - 2*margin,
    scale: 100
  };


  var Penner = require('ln-js/math/penner');

  var panel = QuickSettings.create(400, 0, 'Penner Interpolations');
  panel.setDraggable(false);
  panel.addDropDown('Function', Object.keys(Penner), render);

  // void ctx.strokeRect(x, y, width, height);
  function strokeGraph(ctx, x, y, width, height, fx) {
    ctx.save();
    ctx.translate(x, y + height);
    ctx.scale(width, -height);
    ctx.lineWidth = ctx.lineWidth / width;
    ctx.beginPath();
    for (let pos = 0; pos < width; pos++) {
      let xValue = pos/width;
      if (pos === 0) {
        ctx.moveTo(0, 0);
      } else {
        ctx.lineTo(xValue, fx(xValue, 0, 1, 1));
      }
    }
    ctx.stroke();
    ctx.restore();
  }


  function easeInOutSine(currFrame, start, delta, totalFrames) {
    var progress = currFrame / totalFrames;
    return delta / 2 * (1 - Math.cos(Math.PI * progress)) + start;
  }

  function render() {
    ctx.clearRect(0,0,width,height);

    ctx.save();
    ctx.translate(0, height);
    ctx.scale(1, -1);

    // AXES
    ctx.lineWidth = "1";
    ctx.strokeStyle = "rgb(128, 128, 0)";
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(axes.origin[0]+axes.width, axes.origin[1]);
    ctx.moveTo(axes.origin[0], margin);
    ctx.lineTo(axes.origin[0], axes.origin[1]+axes.height);
    ctx.stroke();

    // GRAPH
    ctx.lineWidth = "2";
    ctx.strokeStyle = "rgb(128, 128, 128)";
    ctx.beginPath();
    ctx.restore();
    strokeGraph(ctx, 40, 40, width - 80, height - 80, Penner[panel.getDropDownValue('Function').value]);
    // var gWidth = width - 2 * margin;
    // var gHeight = height - 2 * margin;
    // for (let x = 0; x < gWidth; x++) {
    //   if (x === 0) {
    //     ctx.moveTo(x+margin, easeInOutSine(x, margin, gHeight, gWidth));
    //   } else {
    //     ctx.lineTo(x+margin, easeInOutSine(x, margin, gHeight, gWidth));
    //   }
    // }
    // ctx.stroke();

    // ctx.restore();

    requestAnimationFrame(render);
  }

  render();
};
