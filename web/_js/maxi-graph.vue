<template lang="pug">


#maxi-graph

  pre: code {{argList}}
  canvas.maxi
  form(@submit.prevent)
    label(for="pattern") Pattern
    select#pattern(v-model="pattern")
      option(value="split", selected) Split
      option(value="midpoint") Midpoint

    label(for="easeIn") In Time
    input(type="range", min="0.000", max="1.000", step="0.001", v-model.number="easeIn")
    input#easeIn(type="number", min="0.000", max="1.000", step="0.100", v-model.number="easeIn")

    label(for="easeOut") Out Time
    input(:disabled="pattern=='midpoint'" type="range", min="0.000", max="1.000", step="0.001", v-model.number="easeOut2", style="direction: rtl")
    input#easeOut(:disabled="pattern=='midpoint'" type="number", min="0.000", max="1.000", step="0.100", v-model.number="easeOut2")

    label(for="pattern") Curvature
    select(v-model="type")
      option(value="pow", selected) Power
      option(value="sin") Sine

    input(:disabled="type=='sin'" type="range", min="1.000", max="5.000", step="0.001", v-model.number="pow")
    input#pow(:disabled="type=='sin'" type="number", min="1.000", max="5.000", step="0.100", v-model.number="pow")


</template><script>


// import SplitEase from '../../../src/index.js';
import SplitEase from '../../dist/split-ease.esm.js';
import { easeGraph } from './graphing.js';

export default {
  name: 'maxi-graph',
  data() {
    return {
      pattern: 'split',
      easeIn: 0.3,
      easeOut: 0.3,
      type: 'pow',
      pow: 2
    }
  },
  computed: {
    easeOut2: {
      get() { return this.pattern == 'midpoint' ? 1 - this.easeIn : this.easeOut; },
      set(n) { this.easeOut = n; }
    },
    sin() { return this.type == 'sin'; },
    argList() {
      const opts = {};
      opts[this.type] = this[this.type];
      const times = this.pattern == 'midpoint' ? [this.easeIn] : [this.easeIn, this.easeOut];
      return [...times, opts];
    },
    easeFn() { return SplitEase(...this.argList); }
  },
  methods: {
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      easeGraph(this.ctx, this.easeFn, 10, 10, 600 - 20, 300 - 20, 'rgb(200, 100, 100)', 'rgb(255,200,100)'); }
  },
  watch: {
    argList() { this.draw(); }
  },
  mounted() {
    this.canvas = this.$el.querySelector('canvas');
    this.canvas.width = 600;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 2.5;
    this.draw();
  }
}


</script>
