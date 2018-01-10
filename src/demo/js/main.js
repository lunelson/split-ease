// window.process.env = 'development';

import SplitEase from '../../index';

// import Vue from './lib/vue';
import { easeGraph } from './graphing';
import {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInSine,
  easeOutSine,
  easeInOutSine
} from './lib/penner';

// VUE interactions
// NB see this for vue builds https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds


const mainCanvas = document.querySelector('canvas.maxi');
mainCanvas.width = 600;
mainCanvas.height = 300;

const mainCTX = mainCanvas.getContext('2d');
const mainEase = SplitEase(0.3, 0.2, {pow: 3});
mainCTX.lineWidth = 2.5;
easeGraph(mainCTX, mainEase, 10, 10, 600 - 20, 300 - 20, 'rgb(200, 100, 100)', 'rgb(255,200,100)');


// CURVE-SETS

const curveSets = [
  [easeInSine, easeOutSine, easeInOutSine],
  [easeInQuad, easeOutQuad, easeInOutQuad],
  [easeInCubic, easeOutCubic, easeInOutCubic],
  [easeInQuart, easeOutQuart, easeInOutQuart],
  [easeInQuint, easeOutQuint, easeInOutQuint],
];

document.querySelectorAll('.curve-set').forEach((set, i) => {
  set.querySelectorAll('canvas').forEach((canvas, j) => {
    canvas.width = 200;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    const s = 2;

    ctx.lineWidth = s;
    easeGraph(ctx, curveSets[i][j], s, s, 200 - 2*s, 100 - 2*s, 'rgb(200, 100, 100)', 'rgb(255,200,100)');
  });
});
