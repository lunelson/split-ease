<img src="split-ease.svg" alt="" width="480">

# Split-Ease

## The easing curve with a beginning, middle and end.

### Usage

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

## The easing library that's actually easy.

Split-Ease generates uniquely powerful and flexible easing functions for JavaScript animation, by interpolating through separate *acceleration*, *constant-speed*, and *deceleration* segments in variable proportion and curvature.

See [the demo]().

## WTF

## Installation

## API
 (in, constant, out). It integrates "power" and "sine" polynomial curves (such as popularized by Robert Penner c. 2001), in a manner that allows independently-variable proportion and curvature.


## Other projects

https://github.com/mattdesl/eases
