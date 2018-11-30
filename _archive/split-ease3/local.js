/**
 * EASING WORKSHOP *

  REFS
  https://github.com/bit101/quicksettings
  https://htmlpreview.github.io/?https://github.com/bit101/quicksettings/blob/master/demos/master_demo.html
  https://htmlpreview.github.io/?https://raw.githubusercontent.com/bit101/quicksettings/master/doc/module-QuickSettings.html
  http://greensock.com/ease-visualizer

 */

var contextPlus = require('ln-js/canvas/context-plus');

var canvas = document.getElementById('canvas'),
    ctx = contextPlus(canvas.getContext('2d')),
    width = ctx.canvas.width = 600,
    height = ctx.canvas.height = 600,
    margin = 40;

var Handle = require('ln-js/canvas/handle');

var testHandle = new Handle(ctx, width/2, height/2, {radius: 16}, hello);
var testHandle2 = new Handle(ctx, width/3, height/3, {radius: 16, lineWidth: 3, movableY: false}, hello);

function hello() { console.log('hello'); }
function render() {
  requestAnimationFrame(render);
  ctx.clearRect(0,0,width,height);
  ctx.strokeShape(400, 400, [[-5,0],[0,10],[5,0]], 0, 'rgb(20,200,20)', 2, true)
  Handle.instances.forEach((handle) => handle.draw());
}

render();

