<template lang="pug">

  include /_templates/utilities

  #feature-graph.span.stack-l
    .debug
      pre: code graphWidth: {{ typeof graphWidth }}
      pre: code graphHeight: {{ typeof graphHeight }}
    .span.grapher.rel
      canvas(ref='canvas')
      +ph({ aspect: 2, color: 'transparent' })
      form#controls(@submit.prevent).stack-xs.mt-xs

        .stack-xxs
          .d-flex.ai-center
            .label.f-sans-xs.strong Ease-In/-Out Pattern | Timing
            .radio.f-sans-xs.strong.ml-auto
              input.vhide(id='radio-pattern-split', type='radio', value='split', v-model='pattern')
              label(for='radio-pattern-split') Split
              input.vhide(id='check-pattern', type='checkbox', true-value='split', false-value='point', v-model='pattern')
              label.ml-xs(for='check-pattern')
              input.vhide(id='radio-pattern-point', type='radio', value='point', v-model='pattern')
              label.ml-xs(for='radio-pattern-point') Midpoint
              span.pipe.ml-xs
              button.ml-xs(type='button', @click='resetPattern') Reset

          .range.f-sans-xs.strong
            label.vhide(for="range-ease1") {{ pattern == 'split' ? 'Ease-In Proportion' : 'Ease-In/-Out Proportion'}}
            input(id="range-ease1", type="range", min="0.000", max="1.000", step="0.001", v-model.number="_easeIn")

          .range.f-sans-xs.strong
            label.vhide(for="range-ease2") Ease-Out Proportion
            input(id="range-ease2", type="range", :disabled="pattern=='point'", min="0.000", max="1.000", step="0.001", v-model.number="_easeOut", style="direction: rtl")

        .stack-xxs
          .d-flex.ai-center
            .label.f-sans-xs.strong Curve Type | Power
            .radio.f-sans-xs.strong.ml-auto
              input.vhide(id='radio-curve-pow', type='radio', value='pow', v-model='curve')
              label(for='radio-curve-pow') Power: {{ power.toFixed(1) }}
              input.vhide(id='check-curve', type='checkbox', true-value='pow', false-value='sin', v-model='curve')
              label.ml-xs(for='check-curve')
              input.vhide(id='radio-curve-sin', type='radio', value='sin', v-model='curve')
              label.ml-xs(for='radio-curve-sin') Sine
              span.pipe.ml-xs
              button.ml-xs(type='button', @click='resetCurve') Reset

          .range.f-sans-xs.strong
            label.vhide(for="range-power") Ease-Out Proportion
            input(id='range-power', type="range", :disabled="curve=='sin'", min="1.000", max="5.000", step="0.001", v-model.number="power")

    .span.readout
      figure.stack-s
        .code
          .stack.a-center
            .call.f-mono.strong {{ fnSignature }}
        figcaption.f-mono-xs Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vestibulum id ligula porta felis euismod semper.

</template>
<script>
import SplitEase from '../../';
import { easeGraph } from './graphing.js';

export default {
  data() {
    return {
      pattern: 'point',
      easeIn: 0.5,
      easeOut: 0.5,
      curve: 'pow',
      power: 2,
      canvas: null,
      ctx: null,
      graphWidth: 600,
    };
  },
  computed: {
    fnSignature() {
      return `SplitEase(${this.easeIn.toFixed(2)}${this.pattern == 'split' ? this.fnArg2 : ''}${
        this.power != 2 || this.curve == 'sin' ? this.fnOpts : ''
      })`;
    },
    fnArg2() {
      return `, ${this.easeOut.toFixed(2)}`;
    },
    fnOpts() {
      return `, { ${this.curve == 'sin' ? 'sin: true' : `pow: ${this.power.toFixed(2)}`} }`;
    },
    _easeIn: {
      get() {
        return this.easeIn;
      },
      set(n) {
        this.easeIn = n;
        if (this.easeIn + this.easeOut > 1) {
          this.easeOut = 1 - this.easeIn;
        }
      },
    },
    _easeOut: {
      get() {
        return this.pattern == 'point' ? 1 - this.easeIn : this.easeOut;
      },
      set(n) {
        this.easeOut = n;
        if (this.pattern != 'point' && this.easeIn + this.easeOut > 1) {
          this.easeIn = 1 - this.easeOut;
        }
      },
    },
    // sin() {
    //   return this.type == 'sin';
    // },
    easeFn() {
      const args = this.pattern == 'point' ? [this.easeIn] : [this.easeIn, this.easeOut];
      const opts = this.curve == 'sin' ? { sin: true } : { pow: this.power };
      return SplitEase(...args, opts);
    },
    graphHeight() {
      return this.graphWidth / 2;
    },
    // easeFn() {
    //   return SplitEase(...this.argList);
    // },
  },
  methods: {
    resetPattern() {
      this.pattern = 'point';
      this.easeIn = 0.5;
      this.easeOut = 0.5;
    },
    resetCurve() {
      this.curve = 'pow';
      this.power = 2;
    },
    draw() {
      this.ctx.clearRect(0, 0, this.graphWidth, this.graphHeight);
      easeGraph(
        this.ctx,
        this.easeFn,
        0,
        10,
        this.graphWidth - 0,
        this.graphHeight - 20,
        'rgb(200, 100, 100)',
        'rgb(255,200,100)',
      );
    },
  },
  mounted() {
    this.canvas = this.$refs['canvas'];
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 4;
    this.graphWidth = this.canvas.getBoundingClientRect().width;
    this.canvas.width = this.graphWidth;
    this.canvas.height = this.graphHeight;
    this.draw();
    window.addEventListener('resize', e => {
      this.graphWidth = this.canvas.getBoundingClientRect().width;
      this.canvas.width = this.graphWidth;
      this.canvas.height = this.graphHeight;
      this.draw();
    });
  },
  watch: {
    easeFn() {
      this.draw();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
