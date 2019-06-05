// @ts-nocheck
import '@lunelson/homework';

import Vue from 'vue';

// import { easeGraph } from './_javascripts/graphing';
// import {
//   linear,
//   easeInQuad,
//   easeOutQuad,
//   easeInOutQuad,
//   easeInCubic,
//   easeOutCubic,
//   easeInOutCubic,
//   easeInQuart,
//   easeOutQuart,
//   easeInOutQuart,
//   easeInQuint,
//   easeOutQuint,
//   easeInOutQuint,
//   easeInSine,
//   easeOutSine,
//   easeInOutSine,
// } from './_javascripts/lib/penner';

// MEDIA
import Media from './_javascripts/media';

// FEATURE
import FeatureGraph from './_javascripts/feature-graph.vue';
const FeatureGraphVM = new Vue({ render: h => h(FeatureGraph) }).$mount('#feature-graph');

// CURVE-SETS
// const curveSets = [
//   [easeInSine, easeOutSine, easeInOutSine],
//   [easeInQuad, easeOutQuad, easeInOutQuad],
//   [easeInCubic, easeOutCubic, easeInOutCubic],
//   [easeInQuart, easeOutQuart, easeInOutQuart],
//   [easeInQuint, easeOutQuint, easeInOutQuint],
// ];

// document.querySelectorAll('.curve-set').forEach((set, i) => {
//   set.querySelectorAll('canvas').forEach((canvas, j) => {
//     canvas.width = 200;
//     canvas.height = 100;
//     const ctx = canvas.getContext('2d');
//     const s = 2;

//     ctx.lineWidth = s;
//     easeGraph(ctx, curveSets[i][j], s, s, 200 - 2 * s, 100 - 2 * s, 'rgb(200, 100, 100)', 'rgb(255,200,100)');
//   });
// });
