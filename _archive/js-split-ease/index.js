// base functions, adapted from Penner equations c. 2001
function lin(t, b, c, d) {
  return c * t / d + b;
}
function cos(t, b, c, d) {
  return c / -2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
function pow(t, b, c, d, p) {
  return (t /= d / 2) < 1
    ? c / 2 * Math.pow(t, p) + b
    : c / -2 * (Math.pow(2 - t, p) - 2) + b;
}

/*
  meta-ease
  common ease functions revamped, with independently configurable curve segments
  ---
  metaEase.sine(t, s1, s2)
  metaEase.power(t, s1, s2, p)
 */

const metaEase = {
  /**
   * return a sin (acutall cos) ease curve based on time value 0-1 and ease in/out values
   * @param  {Number} time -- float in range 0 t 1
   * @param  {Number} et1  -- float >= 0
   * @param  {Number} et2  -- float >= 0
   * @return {Number}      -- float in range 0 to 1
   */
  sine(time, et1 = 0.5, et2 = 0.5) {
    // TODO: error on arguments out of range
    const eSum = et1 + et2;
    const eScale = eSum > 1 ? 1 / eSum : 1;
    const p = Math.PI / 2;
    et1 *= eScale;
    et2 *= eScale;
    // magic
    const ev1 = et1 > 0 ? 1 / (p / et1 - (2 * p - 2) * (1 + et2 / et1) / 2) : 0;
    const ev2 = et2 > 0 ? 1 / (p / et2 - (2 * p - 2) * (1 + et1 / et2) / 2) : 0;
    if (time <= 0) {
      return 0;
    } else if (time > 1) {
      return 1;
    } else if (time <= et1) {
      return cos(time, 0, ev1 * 2, et1 * 2, p);
    } else if (time > 1 - et2) {
      return cos(time - (1 - et2 * 2), 1 - ev2 * 2, ev2 * 2, et2 * 2, p);
    } else {
      return lin(time - et1, ev1, 1 - (ev1 + ev2), 1 - (et1 + et2));
    }
  },

  /**
   * return a power (x^p) curve based on time value 0-1, ease in/out values and power value p
   * @param  {Number} time -- float in range 0 t 1
   * @param  {Number} et1  -- float >= 0
   * @param  {Number} et2  -- float >= 0
   * @param  {Number} p    -- float in range 1 to 5
   * @return {Number}      -- float in range 0 to 1
   */
  power(time, et1 = 0.5, et2 = 0.5, p = 2) {
    // TODO: error on arguments out of range
    const eSum = et1 + et2;
    const eScale = eSum > 1 ? 1 / eSum : 1;
    et1 *= eScale;
    et2 *= eScale;
    // magic
    const ev1 = et1 > 0 ? 1 / (p / et1 - (2 * p - 2) * (1 + et2 / et1) / 2) : 0;
    const ev2 = et2 > 0 ? 1 / (p / et2 - (2 * p - 2) * (1 + et1 / et2) / 2) : 0;
    if (time <= 0) {
      return 0;
    } else if (time >= 1) {
      return 1;
    } else if (time <= et1) {
      return pow(time, 0, ev1 * 2, et1 * 2, p);
    } else if (time >= 1 - et2) {
      return pow(time - (1 - et2 * 2), 1 - ev2 * 2, ev2 * 2, et2 * 2, p);
    } else {
      return lin(time - et1, ev1, 1 - (ev1 + ev2), 1 - (et1 + et2));
    }
  }
};

export default metaEase;

/*
  LICENSES

  ----
  META-EASE
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
