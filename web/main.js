// window.process.env = 'development';

// import SplitEase from '../src/index';

import { easeGraph } from './_js/graphing';
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
} from './_js/lib/penner';

import Vue from 'vue';

import MaxiGraph from './_js/maxi-graph.vue';
export const desktopSideVM = new Vue({ render: h => h(MaxiGraph), }).$mount('#maxi-graph');


// const maxiGraph = new Vue({
//   el: '#maxi',
//   data: {
//     pattern: 'split',
//     easeIn: 0.3,
//     easeOut: 0.3,
//     type: 'pow',
//     pow: 2
//   },
//   computed: {
//     easeOut2: {
//       get() { return this.pattern == 'midpoint' ? 1 - this.easeIn : this.easeOut; },
//       set(n) { this.easeOut = n; }
//     },
//     sin() { return this.type == 'sin'; },
//     argList() {
//       const opts = {};
//       opts[this.type] = this[this.type];
//       const times = this.pattern == 'midpoint' ? [this.easeIn] : [this.easeIn, this.easeOut];
//       return [...times, opts];
//     },
//     easeFn() { return SplitEase(...this.argList); }
//   },
//   methods: {
//     draw() {
//       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       easeGraph(this.ctx, this.easeFn, 10, 10, 600 - 20, 300 - 20, 'rgb(200, 100, 100)', 'rgb(255,200,100)'); }
//   },
//   watch: {
//     argList() { this.draw(); }
//   },
//   mounted() {
//     this.canvas = this.$el.querySelector('canvas');
//     this.canvas.width = 600;
//     this.canvas.height = 300;
//     this.ctx = this.canvas.getContext('2d');
//     this.ctx.lineWidth = 2.5;
//     this.draw();
//   }
// });


// const mainCanvas = document.querySelector('canvas.maxi');
// mainCanvas.width = 600;
// mainCanvas.height = 300;

// const mainCTX = mainCanvas.getContext('2d');
// const mainEase = SplitEase(0.3, 0.2, {pow: 3});
// mainCTX.lineWidth = 2.5;
// easeGraph(mainCTX, mainEase, 10, 10, 600 - 20, 300 - 20, 'rgb(200, 100, 100)', 'rgb(255,200,100)');


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
