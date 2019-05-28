/*
 * This is a near-direct port of Robert Penner's easing equations. Please shower Robert with
 * praise and all of your admiration. His license is provided below.
 *
 * Kirupa:
 * https://kirupa.googlecode.com/svn/trunk/easing.js
 * http://www.kirupa.com/html5/animating_with_easing_functions_in_javascript.htm
 *
*/

export function linear(t, b, c, d) {
  return c * t/d + b;
}

export function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}

export function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

export function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t + b;
  }
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

export function easeInCubic(t, b, c, d) {
  return c * Math.pow(t/d, 3) + b;
}

export function easeOutCubic(t, b, c, d) {
  return c * (Math.pow(t/d - 1, 3) + 1) + b;
}

export function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * Math.pow(t, 3) + b;
  }
  return c / 2 * (Math.pow(t - 2, 3) + 2) + b;
}

export function easeInQuart(t, b, c, d) {
  return c * Math.pow (t/d, 4) + b;
}

export function easeOutQuart(t, b, c, d) {
  return -c * (Math.pow(t/d - 1, 4) - 1) + b;
}

export function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * Math.pow(t, 4) + b;
  }
  return -c/2 * (Math.pow(t - 2, 4) - 2) + b;
}

export function easeInQuint(t, b, c, d) {
  return c * Math.pow (t/d, 5) + b;
}

export function easeOutQuint(t, b, c, d) {
  return c * (Math.pow(t/d - 1, 5) + 1) + b;
}

export function easeInOutQuint(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * Math.pow(t, 5) + b;
  }
  return c / 2 * (Math.pow(t - 2, 5) + 2) + b;
}

export function easeInSine(t, b, c, d) {
  return c * (1 - Math.cos(t/d * (Math.PI / 2))) + b;
}

export function easeOutSine(t, b, c, d) {
  return c * Math.sin(t/d * (Math.PI / 2)) + b;
}

export function easeInOutSine(t, b, c, d) {
  return c / 2 * (1 - Math.cos(Math.PI * t/d)) + b;
}

export function easeInExpo(t, b, c, d) {
  return c * Math.pow(2, 10 * (t/d - 1)) + b;
}

export function easeOutExpo(t, b, c, d) {
  return c * (-Math.pow(2, -10 * t/d) + 1) + b;
}

export function easeInOutExpo(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  }
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

export function easeInCirc(t, b, c, d) {
  return c * (1 - Math.sqrt(1 - (t /= d) * t)) + b;
}

export function easeOutCirc(t, b, c, d) {
  return c * Math.sqrt(1 - (t = (t /= d) - 1) * t) + b;
}

export function easeInOutCirc(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * (1 - Math.sqrt(1 - t * t)) + b;
  }
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

/*
* Copyright 2001 Robert Penner
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this list of
* conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list
* of conditions and the following disclaimer in the documentation and/or other materials
* provided with the distribution.
*
* Neither the name of the author nor the names of contributors may be used to endorse
* or promote products derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
* COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
* EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
* GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
* AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
* NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
* OF THE POSSIBILITY OF SUCH DAMAGE.
*/
