<h1 align="center">
  <a href="https://split-ease.netlify.com">
    <img src="web/assets/banner.svg" width="80%" alt="Split-Ease Logo">
  </a>
  <br>
  SplitEase.js
</h1>

<h4 align="center">The curve with a beginning, middle and end.</h4>

<p align="center">
  <a href="#backstory">Backstory</a>&nbsp;|&nbsp;
  <a href="#getting-started">Getting started</a>&nbsp;|&nbsp;
  <a href="#documentation">Documentation</a>
</p>

SplitEase.js is a JavaScript function which offers animators and creative coders a means to compose separately timed variable __acceleration__, __constant-speed__ and __deceleration__ segments in a single continous interpolation. It weighs less than 1k.

For an interactive visualisation of its simple numeric API [see the homepage]().

## Backstory

Most strictly-timed (i.e. not simulation-based) animation on the web makes use of interpolation (easing) functions originally popularized by [Robert Penner](http://robertpenner.com/easing/) in his [2002 book on programming Flash MX](http://robertpenner.com/profmx/). This book proposed 10 curve-types (Sine, Quad, Cubic, Quart, Quint, Exp, Back, Circ, Elastic, Bounce) times 3 variations (easeIn, easeOut and easeInOut), to offer [30 different patterns of movement](https://easings.net/en).

SplitEase addresses the problem of deciding between the most common of these patterns, by composing the underlying math of the Sine and Power (Quad, Cubic, Quart, Quint) curves in a way that makes their ease-in/-out/-in-out proportions and their power curvature independently variable.

Feedback or questions: [ping me on Twitter](https://twitter.com/lunelson)

## Getting started

### Install

Via npm install

```bash
$ npm install split-ease --save
```
```js
// import in ES6+
import SplitEase from 'split-ease';

// …or require in CommonJS
const SplitEase = require('split-ease);
```

Via unpkg script include
```html
<script src="//unpkg.com/split-ease" charset="utf-8"></script>
```

or manual [download]() and include a script link to the UMD version.

```html
<script src="split-ease/dist/split-ease.umd.js"></script>
```

## Documentation

#### 1. Midpoint mode

- single numeric argument + options obj
- default curve is power, default exponent is 2
- et1 is basically the amount of the time (duration) that should be taken up by the ease-in portion. The ease-out portion will take up the remaining amount


#### 2. Split mode

- two numeric arguments + options obj
- et1 is the amount of easing time that should be taken up by the ease-in portion
- et2 is the proportional duration of the ease-out portion of the curve. If the total of et1 and et2 is less than 1, there will be a constant-speed segment in between them.

### Advantages

- a drop-in replacement for the entire power range of penner curves, as well as all power curves in between those, plus the sine curve.
- independently controllable ease-in and ease-out timing, while overall duration and displacement remain strict
- e.g. you cannot accurately simulate separately timed acceleration, constant-speed and deceleration of movemement over a strict displacement (e.g. distance) with any standard curves, including cubic-bezier and GSAP's Custom Ease
- you could simulate the movement accurately with Vector math, but doing so over a specified time and displacement is very complex.
-

## Compatibility / Comparisons

penner easings used in
jquery UI

...innumerable packages

libraries

[Popmotion](https://popmotion.io/api/easing/)
```js
import { tween } from 'popmotion';

tween({
  ease: SplitEase(/*...*/)
}).start();
```

[Tween.js](https://github.com/tweenjs/tween.js)
https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md#changing-the-easing-function-aka-make-it-bouncy
[Tween.js (ES6)](https://github.com/tweenjs/es6-tween/blob/master/API.md)
[How to use Tween.js with Three.js](https://medium.com/@lachlantweedie/animation-in-three-js-using-tween-js-with-examples-c598a19b1263)
```js
const myTween = new TWEEN.Tween(/*...*/);
myTween.easing(SplitEase(/*...*/));
```

[Velocity](http://velocityjs.org/)
http://velocityjs.org/#easing
```js
// register a custom ease in Velocity
$.Velocity.Easings.mySplitEase = SplitEase(/*...*/);
```

[AnimeJS](https://animejs.com/)
https://animejs.com/documentation/#customEasing


[GSAP (Greensock)](https://greensock.com/)
https://greensock.com/docs/Easing/Ease
```js
TweenLite.to(obj, 5, {x:600, ease:new Ease(myEase)});
```
[ThreeJS](https://threejs.org/)
[Popmotion](https://popmotion.io/)




### Installation

SplitEase can be installed via NPM or loaded via RawGit/UnPkg. The package includes UMD, CommonJS and ES Module flavors.

```sh
npm install --save-dev @lunelson/split-ease
```
```js
// ES Module
import SplitEase from 'split-ease';
```
```js
// Common JS
const SplitEase = require('split-ease);
```
```html
<!-- HTML script tag -->
<script src="main.js"></script>
```

### Usage

The SplitEase function accepts timing and curve options, and configures and returns an ease function which accepts a single parameter in the range of `0` to `1`. This signature conforms to the APIs of most animation libraries.

```js
```

See the [docs for more examples]().

### Background/Origins


SplitEase is an alternative easing function for animation, that combines variable ease-in, -out and linear segments in a single interpolation.

Play with the demo.

This is the first release. Feedback or questions: ping me on Twitter

## Getting Started

### Installation or linking

```sh
npm install split-ease
```

### Usage

with Anime.js

```js
anime({
  /*
    rest of config
   */
  easing: function(el, i, total) {
    return SplitEase(0.7, 0.2, { pow: 2.2 });
  }
});
```


## Other projects

https://github.com/mattdesl/eases

gre bezier easing
https://github.com/gre/bezier-easing

lea verou
cubic-bezier easing
  Lea Verou tool, does it in JS
  https://cubic-bezier.com/
  Matthew Lein tool, allows you to build CSS versions
  https://matthewlein.com/tools/ceaser

greensock custom ease
  https://greensock.com/ease-visualizer


![](/split-ease.svg)

### Prior Art

d3/d3-ease
well-visualised here
https://bl.ocks.org/mbostock/248bac3b8e354a9103c4

## Visualisations

d3-ease https://bl.ocks.org/mbostock/248bac3b8e354a9103c4
gsap

## Acknowledgements

Robert Penner
Andrey Sitnik for [easings.net](https://easings.net/en)
