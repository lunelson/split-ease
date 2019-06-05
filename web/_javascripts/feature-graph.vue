<template lang="pug">

  include /_templates/utilities

  #feature-graph.span.stack-l.rel
    .span.grapher.rel(ref='feature')
      .progress-area.rel
        +ph({ height: '20px', color: 'transparent' }).ph-labels
        +ph({ aspect: 2.5, color: 'transparent' }).ph-graphs
          .progress
            .marker(ref='marker')
              .label.f-mono-xs.strong {{ progStr }}
      canvas(ref='canvas')
      form.controls(@submit.prevent).stack-xs.mt-xs

        .stack-xxs
          .d-flex.ai-center.jc-center
            .label.f-sans-xs.strong.mr-auto Ease-In/-Out Timing
            .radio.f-sans-xs.strong
              input.vhide(id='radio-pattern-split', type='radio', value='split', v-model='pattern')
              label(for='radio-pattern-split') Split
              input.vhide(id='check-pattern', type='checkbox', true-value='split', false-value='point', v-model='pattern')
              label.ml-xs(for='check-pattern')
              input.vhide(id='radio-pattern-point', type='radio', value='point', v-model='pattern')
              label.ml-xs(for='radio-pattern-point') Midpoint
              span.pipe.ml-xs
              input(type='tel', v-model='duration', :style='{width: `${duration.toString().length}ch`}').ml-xs
              span &thinsp;ms
              //- button.ml-xs(type='button', @click='resetPattern') Reset

          .range.f-sans-xs.strong
            label.vhide(for="range-ease1") {{ pattern == 'split' ? 'Ease-In Proportion' : 'Ease-In/-Out Proportion'}}
            input(id="range-ease1", type="range", min="0.000", max="1.000", step="0.001", v-model.number="_easeIn")

          .range.f-sans-xs.strong
            label.vhide(for="range-ease2") Ease-Out Proportion
            input(id="range-ease2", type="range", :disabled="pattern=='point'", min="0.000", max="1.000", step="0.001", v-model.number="_easeOut", style="direction: rtl")

        .stack-xxs
          .d-flex.ai-center.jc-center
            .label.f-sans-xs.strong.mr-auto Easing Curve
            .radio.f-sans-xs.strong
              input.vhide(id='radio-curve-pow', type='radio', value='pow', v-model='curve')
              label(for='radio-curve-pow') Power {{ power.toFixed(2) }}
              input.vhide(id='check-curve', type='checkbox', true-value='pow', false-value='sin', v-model='curve')
              label.ml-xs(for='check-curve')
              input.vhide(id='radio-curve-sin', type='radio', value='sin', v-model='curve')
              label.ml-xs(for='radio-curve-sin') Sine
              span.pipe.ml-xs
              button.ml-xs(type='button', @click='resetCurve') Reset All

          .range.f-sans-xs.strong
            label.vhide(for="range-power") Ease-Out Proportion
            input(id='range-power', type="range", :disabled="curve=='sin'", min="1.000", max="5.000", step="0.001", v-model.number="power")

    .span.readout
      figure.stack-s
        .code
          .stack.a-center
            .call.f-mono.strong {{ fnSignature }}
        figcaption.f-mono-xs SplitEase is a higher order function that accepts one or two numeric arguments, representing the ease in/out midpoint or separate in and out ratios, plus options for curve type and exponent. It returns a standard easing function which transforms a progress value #[strong t] in a range from #[strong 0] to #[strong 1].

</template>
<script>
import { TweenMax, Ease, CSSPlugin, TimelineMax } from 'gsap/all';
import { debounce } from 'tiny-throttle';

import SplitEase from '../../';
import { easeGraph } from './graphing.js';
import draw from './draw';

const keepGsap = [CSSPlugin, Ease];

export default {
  data() {
    return {
      duration: 1000,
      progress: 1,
      pattern: 'split',
      easeIn: 0.33,
      easeOut: 0.33,
      curve: 'pow',
      power: 2,
      canvas: null,
      ctx: null,
    };
  },
  computed: {
    progStr() {
      return `${(this.progress * 100).toFixed(0)}%`;
    },
    progStyle() {
      return { transform: `translateY(${(1 - this.progress) * 100}%)` };
    },
    fnSignature() {
      return `SplitEase(${this.easeIn.toFixed(2)}${this.pattern == 'split' ? this.fnArg2 : ''}${this.power != 2 || this.curve == 'sin' ? this.fnOpts : ''})`;
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
        if (this.pattern == 'point' || this.easeIn + this.easeOut > 1) {
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
    easeFn() {
      const args = this.pattern == 'point' ? [this.easeIn] : [this.easeIn, this.easeOut];
      const opts = this.curve == 'sin' ? { sin: true } : { pow: this.power };
      return SplitEase(...args, opts);
    },
  },
  watch: {
    pattern(newPattern) {
      if (newPattern == 'point') {
        const diff = 1 - this.easeIn - this.easeOut;
        this.easeIn += diff / 2;
        this.easeOut = 1 - this.easeIn;
      }
    },
    easeFn() {
      this.draw();
      this.demo();
    },
    duration() {
      this.demo();
    },
  },
  created() {
    this.demo = debounce(() => {
      const ease = new Ease(this.easeFn);
      const dist = this.$refs.marker.getBoundingClientRect().height;
      const timeline = new TimelineMax();
      this.progress = 0;
      timeline.set(this.$refs['marker'], { y: dist });
      timeline.to(
        this.$refs['marker'],
        this.duration / 1000,
        {
          y: 0,
          ease,
          onUpdate: () => (this.progress = timeline.progress()),
        },
        0.25,
      );
    }, 250);
  },
  mounted() {
    this.canvas = this.$refs['canvas'];
    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    window.addEventListener('resize', this.setFeatureCanvas);
    this.setFeatureCanvas();
  },
  methods: {
    draw,
    resetPattern() {},
    resetCurve() {
      this.pattern = 'split';
      this.easeIn = 0.33;
      this.easeOut = 0.33;
      this.curve = 'pow';
      this.power = 2;
    },
    setFeatureCanvas() {
      let { width, height } = this.$refs['feature'].getBoundingClientRect();
      width *= this.dpr;
      height *= this.dpr;
      Object.assign(this.canvas, { width, height });
      this.draw();
    },
  },
};
</script>
