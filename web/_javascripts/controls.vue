<template lang="pug">

  form#controls(@submit.prevent).stack-xs

    .stack-xxs
      .d-flex.ai-center
        .label.f-sans-xs.strong Easing Pattern / Timing
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
        .label.f-sans-xs.strong Curve Type / Power
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

</template>
<script>
export default {
  data() {
    return {
      isSplit: true,
      pattern: 'split',
      easeIn: 0.3,
      easeOut: 0.3,
      curve: 'pow',
      power: 2,
    };
  },
  computed: {
    _easeIn: {
      get() {
        return this.easeIn;
      },
      set(n) {
        this.easeIn = n;
        if (this.pattern != 'point' && this.easeIn + this.easeOut > 1) {
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
    // argList() {
    //   const opts = {};
    //   opts[this.type] = this[this.type];
    //   const times = this.pattern == 'point' ? [this.easeIn] : [this.easeIn, this.easeOut];
    //   return [...times, opts];
    // },
    // easeFn() {
    //   return SplitEase(...this.argList);
    // },
  },
  methods: {
    resetPattern() {
      this.pattern = 'split';
      this.easeIn = 0.3;
      this.easeOut = 0.3;
    },
    resetCurve() {
      this.curve = 'pow';
      this.power = 2;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
