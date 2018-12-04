<template>
  <div id="demo">
    <a href="" class="github-corner" aria-label="View source on Github"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#17A1E6; color:#0A1433; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
    <div class="wrap stack stack--l">

      <!-- LOGO -->
      <div class="logo">
        <svg viewBox="0 0 763 191" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g fill-rule="nonzero" fill="#17A1E6">
                <path d="M81.7776797,37.340614 C97.6287512,6.23115083 135.653646,-6.13168817 166.764308,9.71998593 L515.390375,187.353839 L521.923165,187.315483 L168.12628,7.04696635 C135.529289,-9.56203015 95.7027996,3.40297592 79.1076977,35.9726973 L0,190.379854 L3.38097942,190.360003 L81.7776797,37.340614 Z"></path>
                <path d="M141.77768,37.340614 C157.628751,6.23115083 195.653646,-6.13168817 226.764308,9.71998593 L575.390375,187.353839 L581.923165,187.315483 L228.12628,7.04696635 C195.529289,-9.56203015 155.7028,3.40297592 139.107698,35.9726973 L60,190.379854 L63.3809794,190.360003 L141.77768,37.340614 Z"></path>
                <path d="M201.77768,37.340614 C217.628751,6.23115083 255.653646,-6.13168817 286.764308,9.71998593 L635.390375,187.353839 L641.923165,187.315483 L288.12628,7.04696635 C255.529289,-9.56203015 215.7028,3.40297592 199.107698,35.9726973 L120,190.379854 L123.380979,190.360003 L201.77768,37.340614 Z"></path>
                <path d="M763,-0.379853848 L683.892302,154.027303 C667.2972,186.597024 627.470711,199.56203 594.87372,182.953034 L241.076835,2.68451676 L247.609625,2.64616075 L596.235692,180.280014 C627.346354,196.131688 665.371249,183.768849 681.22232,152.659386 L759.619021,-0.360003083 L763,-0.379853848 Z"></path>
                <path d="M703,-0.379853848 L623.892302,154.027303 C607.2972,186.597024 567.470711,199.56203 534.87372,182.953034 L181.076835,2.68451676 L187.609625,2.64616075 L536.235692,180.280014 C567.346354,196.131688 605.371249,183.768849 621.22232,152.659386 L699.619021,-0.360003083 L703,-0.379853848 Z"></path>
                <path d="M643,-0.379853848 L563.892302,154.027303 C547.2972,186.597024 507.470711,199.56203 474.87372,182.953034 L121.076835,2.68451676 L127.609625,2.64616075 L476.235692,180.280014 C507.346354,196.131688 545.371249,183.768849 561.22232,152.659386 L639.619021,-0.360003083 L643,-0.379853848 Z"></path>
            </g>
        </svg>
      </div>

      <div class="copy sect stack">
        <h1 id="meta-ease">"Meta Ease"</h1>
        <h2 id="interpolation-with-independent-curve-segments">Interpolation with independent curve-segments</h2>
      </div>

      <div class="copy sect stack">
        <p><code>Meta-Ease</code> is an animation interpolation (easing) function that combines acceleration (ease-in), constant-speed, and deceleration (ease-out) curve-segments in variable proportion. It accepts an input <code>t</code> in the range <code>0...1</code> followed by duration [and curvature] arguments. See below.</p>
      </div>

      <div class="code sect">
        <pre v-if="curveType == 'sin'">metaEase.{{ curveType }}(t, {{ easeIn | precise }}, {{ easeOut | precise }})</pre>
        <pre v-else>metaEase.{{ curveType }}(t, {{ easeIn | precise }}, {{ easeOut | precise }}, {{ power | precise }})</pre>
      </div>

      <div class="ctrl sect">
        <div class="ctrl-left">
          <label for="easeIn">Ease-In</label>
        </div>
        <div class="ctrl-main">
          <input type="range" min="0.000" max="1.000" step="0.001" v-model.number="easeIn">
        </div>
        <div class="ctrl-right">
          <input type="number" id="easeIn" min="0.000" max="1.000" step="0.100" v-model.number="easeIn"/>
        </div>
        <div class="ctrl-left">
          <label for="easeOut">Ease-Out</label>
        </div>
        <div class="ctrl-main">
          <input type="range" min="0.000" max="1.000" step="0.001" v-model.number="easeOutInv">
        </div>
        <div class="ctrl-right">
          <input type="number" id="easeOut" min="0.000" max="1.000" step="0.100" v-model.number="easeOut"/>
        </div>
      </div>

      <div class="ctrl sect">
        <div class="ctrl-left">
          <span>Ease Type</span>
        </div>
        <div class="ctrl-main ctrl-sub">
          <span class="select">
            <select v-model="curveType">
              <option value="sine">Sine</option>
              <option value="power">Power</option>
            </select>
          </span>
          <div class="ctrl-sub">
            <label :disabled="curveType == 'sine'" class="" for="easeOut">Curvature</label>
            <input :disabled="curveType == 'sine'" class="" type="range" min="1.000" max="5.000" step="0.001" v-model.number="power">
          </div>
        </div>
        <div class="ctrl-right">
          <input :disabled="curveType == 'power'" class="" type="number" id="easeOut" min="0.000" max="1.000" step="0.100" v-model.number="power"/>
        </div>
      </div>

      <canvas id="canvas"></canvas>

      <div class="copy sect stack">
        <h3 id="why">Why</h3>
        <p>Most animation on the web uses interpolation rather than simulation to make changes over time and it is common to use curve functions to interpolate these changes—especially with movement—so they appear more natural. The most widely-used set of &lsquo;easing&rsquo; or &lsquo;timing&rsquo; functions was introduced by Robert Penner in 2001 as part of &hellip;. and is found today in the code of jQuery, Velocity, Greensock, etc.</p>
        <p><code>Meta-Ease</code> adapts a subset of those functions (Power and Sine) to enhance possibilities for animators by resolving limitations of Penner&rsquo;s formulations, such as that: (1) they were separated in <code>easeIn</code>, <code>easeOut</code> or <code>easeInOut</code> versions with no variation of proportion; (2) the Power set was separated by exponent  (<code>Quadratic</code>, <code>Cubic</code>, <code>Quartic</code> etc.) with no [more precise] variation of curvature; and (3) they offered no combination of linear (constant-speed) interpolation with easing interpolation (they are always either accelerating or decelerating).</p>
      </div>

      <div class="copy sect stack">
        <h3 id="how">Install / How To</h3>
        <p>The API of time <code>t</code> in the range <code>0..1</code> is compatible with animation libraries that otherwise use Penner-style easing functions. You may have to wrap metaEase in an anonymous callback—example here from <a href="https://github.com/tweenjs/tween.js">tween.js</a>:</p>
        <pre>
  <code class="js">const myTween = new TWEEN.Tween(obj);
  myTween.easing((t) =&gt; { metaEase.power(t, 0.7, 0.2, 2.2) });
  // e.g. anime.js
  anime.easings[&apos;myMetaEase&apos;] = function(t) {
    return metaEase.power(t, 0.7, 0.2, 2.2);
  }
  const myAnimation = anime({
    //...options
    easing: &apos;myMetaEase&apos;
  });</code>
        </pre>
        <p>Download / Star / Fork this on Github.</p>
        <p><a href="https://twitter.com/lunelson">Ping / Follow me on Twitter</a>.</p>
      </div>

    </div>
  </div>
</template>
<style lang="scss"> @import "scss/app"; </style>

<script>

// node modules
import { times, padEnd, debounce } from 'lodash';
import { TweenLite, Ease } from 'gsap';
TweenLite.defaultEase = Linear.easeNone;

// local modules
import render from './js/render';

// main file
import metaEase from '../index';
const { sine, power } = metaEase;

export default {
  name: 'meta-ease-demo',
  mounted() {
    this.ctx = this.$el.querySelector('#canvas').getContext('2d');
    this.ctx.canvas.width = 1000;
    this.ctx.canvas.height = 500;
    this.reAnimate = debounce(this.animate, 300);
    this.render();
    this.reAnimate();
  },
  updated() {
    this.render();
    this.reAnimate();
  },
  filters: {
    titleCase(value) {
      if (!value) return '';
      var s = value.toString();
      return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
    },
    precise(value) {
      return value.toFixed(3);
    },
  },
  data () {
    return {
      progress: {x: 0.0, y: 0.0},
      duration: 1.5,
      easeIn: 0.3,
      easeOut: 0.3,
      curveType: 'sine',
      power: 2,
    }
  },
  computed: {
    easeOutInv: {
      get() { return 1 - this.easeOut; },
      set(n) { this.easeOut = 1 - n; }
    }
  },
  methods: {
    render,
    animate() {
      this.progress = {x: 0.0, y: 0.0};
      // reference pen for this http://codepen.io/anon/pen/BWWdbw?editors=0010
      TweenLite.to( this.progress, this.duration, { y: 1.0, ease: new Ease((t) => metaEase[this.curveType](t, this.easeIn, this.easeOut, this.power)) });
      TweenLite.to( this.progress, this.duration, { x: 1.0 , onUpdate: function() {
        this.render();
      }, onUpdateScope: this});
    },
  }
}
</script>
