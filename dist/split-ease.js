
/* SPLIT-EASE version 1.0.0 */

var SplitEase = (function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  //  _____       _ _ _   _____
  // /  ___|     | (_) | |  ___|
  // \ `--. _ __ | |_| |_| |__  __ _ ___  ___
  //  `--. \ '_ \| | | __|  __|/ _` / __|/ _ \
  // /\__/ / |_) | | | |_| |__| (_| \__ \  __/
  // \____/| .__/|_|_|\__\____/\__,_|___/\___|
  //       | |
  //       |_|
  function linear(t, b, c, d) {
    return c * t / d + b;
  }

  function cosine(t, b, c, d) {
    return c / -2 * (Math.cos(Math.PI * t / d) - 1) + b;
  }

  function power(t, b, c, d, p) {
    return (t /= d / 2) < 1 ? c / 2 * Math.pow(t, p) + b : c / -2 * (Math.pow(2 - t, p) - 2) + b;
  }
  /*
    JS Built In GLobals

    TypeError(msg) -- wrong type
    RangeError(msg) -- wrong range
    Error

    Object
    Number
    Boolean

  et1, et2
    - must Numbers > 0
    - should be < 1; if not will be clipped
    - exception is et1 and et2 both greater than 1, in which they will be scaled

  options
    must be an Object
    pow -> Number; 1 < pow < 6
    sin -> Boolean; overrides pow

  [
    [0.25],
    [0.25, 0.25],
    [0.25, { sin: true }]
    [0.25, { pow: 3 }]
    [0.25, 0.25, { sin: true }]
  ]

  */
  // NOTE: possibly no need to use Math.max when parsing args, it's done on the next line anyway


  function SplitEase() {
    var et1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
    var et2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.max(1 - et1, 0);
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    // NOTE: possibly no need to use Math.max when parsing args, it's done on the next line anyway
    if (_typeof(et2) == 'object') {
      opts = et2;
      et2 = Math.max(1 - et1, 0);
    }

    et1 = Math.max(et1, 0);
    et2 = Math.max(et2, 0);
    var eSum = et1 + et2;
    var eScale = eSum > 1 ? 1 / eSum : 1;
    et1 *= eScale;
    et2 *= eScale;
    var _opts = opts,
        _opts$pow = _opts.pow,
        pow = _opts$pow === void 0 ? 2 : _opts$pow,
        sin = _opts.sin;
    var curve = sin ? cosine : power;
    var p = sin ? Math.PI / 2 : pow;
    var ev1 = et1 > 0 ? 1 / (p / et1 - (p - 1) * (et2 / et1 + 1)) : 0;
    var ev2 = et2 > 0 ? 1 / (p / et2 - (p - 1) * (et1 / et2 + 1)) : 0;
    return function (time) {
      return time <= 0 ? 0 : time > 1 ? 1 : time <= et1 ? curve(time, 0, ev1 * 2, et1 * 2, p) : time > 1 - et2 ? curve(time - (1 - et2 * 2), 1 - ev2 * 2, ev2 * 2, et2 * 2, p) : linear(time - et1, ev1, 1 - (ev1 + ev2), 1 - (et1 + et2));
    };
  }

  return SplitEase;

}());

/*
  LICENSES

  ----

	SPLIT-EASE
  Open source under the ISC License (ISC)
  Copyright (c) 2018 Lu Nelson

  Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  ----

	PENNER EASING EQUATIONS
  Open source under the BSD License.
  Copyright (c) 2001 Robert Penner
  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
