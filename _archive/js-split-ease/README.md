![](/split-ease.svg)

# SplitEase

SplitEase is an alternative approach to easing functions for JavaScript which computes ease-curves in terms of separately variable continuous segments, opening a new range of speed-control patterns for interpolation-based motion design and animation.

See [the interactive demo]().

Feedback or questions: [ping me on Twitter](https://twitter.com/lunelson)


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

Install it [coming soon]

```sh
npm install meta-ease
```

Use it

```js
// e.g. tween.js
const myTween = new TWEEN.Tween(obj);
myTween.easing((t) => { metaEase.power(t, 0.7, 0.2, 2.2) });

// e.g. anime.js
anime.easings['myMetaEase'] = function(t) { return metaEase.power(t, 0.7, 0.2, 2.2); }
const myAnimation = anime({
  //...options
  easing: 'myMetaEase'
});
```

## Backstory

Most animation uses interpolation (rather than simulation) to create the illusion of movement, and uses 'easing' or 'timing' functions to make this appear natural. The most widely-used of these were introduced by [Robert Penner](http://robertpenner.com/easing/) as part of [his book on programming Macromedia Flash MX  in 2001](http://robertpenner.com/easing/penner_chapter7_tweening.pdf) where he proposed 10 curve-types (Sine, Exp, Back, Circ, Elastic, Bounce, and 4 Power curves) times 3 easing patterns (easeIn, easeOut and easeInOut). These are still found in the source code of jQuery, Velocity, Greensock, and most other animation codebases.

SplitEase takes two of these curve-types (Power and Sine, the most fundamental ones for movement) and makes the easing pattern variable and dynamic: calculating the 'in' (acceleration) and 'out' (deceleration) durations as separate segments and offering the unique possibility of a third, linear (constant-speed) segment; and for the Power set, unifying the sub-types (Quadratic, Cubic, Quartic etc.) by offering power (`p`) as a fourth argument.

## How

The API of time `t` in the range `0..1` is compatible with animation libraries that otherwise use Penner-style easing functions. You may have to wrap metaEase in an anonymous callback—example here from [tween.js](https://github.com/tweenjs/tween.js):


## Now

Download / Star / Fork this on Github.

[Ping / Follow me on Twitter](https://twitter.com/lunelson).

# rollup-starter-lib

This repo contains a bare-bones example of how to create a library using Rollup, including importing a module from `node_modules` and converting it from CommonJS.

We're creating a library called `how-long-till-lunch`, which usefully tells us how long we have to wait until lunch, using the [ms](https://github.com/zeit/ms) package:

```js
console.log('it will be lunchtime in ' + howLongTillLunch());
```

## Getting started

Clone this repository and install its dependencies:

```bash
git clone https://github.com/rollup/rollup-starter-lib
cd rollup-starter-lib
npm install
```

`npm run build` builds the library to `dist`, generating three files:

* `dist/how-long-till-lunch.cjs.js`
    A CommonJS bundle, suitable for use in Node.js, that `require`s the external dependency. This corresponds to the `"main"` field in package.json
* `dist/how-long-till-lunch.esm.js`
    an ES module bundle, suitable for use in other people's libraries and applications, that `import`s the external dependency. This corresponds to the `"module"` field in package.json
* `dist/how-long-till-lunch.umd.js`
    a UMD build, suitable for use in any environment (including the browser, as a `<script>` tag), that includes the external dependency. This corresponds to the `"browser"` field in package.json

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change using [rollup-watch](https://github.com/rollup/rollup-watch).

`npm test` builds the library, then tests it.

*Note that you would often include the `dist` folder in your [.gitignore](https://github.com/rollup/rollup-starter-lib/blob/master/.gitignore) file, but they are included here for ease of illustration.*


## Variations

* [babel](https://github.com/rollup/rollup-starter-lib/tree/babel) — illustrates writing the source code in ES2015 and transpiling it for older environments with [Babel](https://babeljs.io/)
* [buble](https://github.com/rollup/rollup-starter-lib/tree/buble) — similar, but using [Bublé](https://buble.surge.sh/) which is a faster alternative with less configuration



## License

[MIT](LICENSE).
