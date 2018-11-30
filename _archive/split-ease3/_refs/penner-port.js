 /*
 * This is a near-direct port of Robert Penner's easing equations. Please shower Robert with
 * praise and all of your admiration. His license is provided below.
 *
 * Kirupa:
 * https://kirupa.googlecode.com/svn/trunk/easing.js
 * http://www.kirupa.com/html5/animating_with_easing_functions_in_javascript.htm
 *
*/

function linear(currFrame, start, delta, totalFrames) {
    var progress = currFrame / totalFrames;
    return delta * progress + start;
}

function easeInQuad(currFrame, start, delta, totalFrames) {
    return delta * (currFrame /= totalFrames) * currFrame + start;
}

function easeOutQuad(currFrame, start, delta, totalFrames) {
    return -delta * (currFrame /= totalFrames) * (currFrame - 2) + start;
}

function easeInOutQuad(currFrame, start, delta, totalFrames) {
    if ((currFrame /= totalFrames / 2) < 1) {
        return delta / 2 * currFrame * currFrame + start;
    }
    return -delta / 2 * ((--currFrame) * (currFrame - 2) - 1) + start;
}

function easeInCubic(currFrame, start, delta, totalFrames) {
    return delta * Math.pow(progress, 3) + start;
}

function easeOutCubic(currFrame, start, delta, totalFrames) {
    return delta * (Math.pow(progress - 1, 3) + 1) + start;
}

function easeInOutCubic(currFrame, start, delta, totalFrames) {
    if ((currFrame /= totalFrames / 2) < 1) {
        return delta / 2 * Math.pow(currFrame, 3) + start;
    }
    return delta / 2 * (Math.pow(currFrame - 2, 3) + 2) + start;
}

function easeInQuart(currFrame, start, delta, totalFrames) {
    return delta * Math.pow (progress, 4) + start;
}

function easeOutQuart(currFrame, start, delta, totalFrames) {
    return -delta * (Math.pow(progress - 1, 4) - 1) + start;
}

function easeInOutQuart(currFrame, start, delta, totalFrames) {
    if ((currFrame /= totalFrames / 2) < 1) {
        return delta / 2 * Math.pow(currFrame, 4) + start;
    }
    return -delta/2 * (Math.pow(currFrame - 2, 4) - 2) + start;
}

function easeInQuint(currFrame, start, delta, totalFrames) {
    return delta * Math.pow (progress, 5) + start;
}

function easeOutQuint(currFrame, start, delta, totalFrames) {
    return delta * (Math.pow(progress - 1, 5) + 1) + start;
}

function easeInOutQuint(currFrame, start, delta, totalFrames) {
    if ((currFrame /= totalFrames / 2) < 1) {
        return delta / 2 * Math.pow(currFrame, 5) + start;
    }
    return delta / 2 * (Math.pow(currFrame - 2, 5) + 2) + start;
}

function easeInSine(currFrame, start, delta, totalFrames) {
    return delta * (1 - Math.cos(progress * (Math.PI / 2))) + start;
}

function easeOutSine(currFrame, start, delta, totalFrames) {
    return delta * Math.sin(progress * (Math.PI / 2)) + start;
}

function easeInOutSine(currFrame, start, delta, totalFrames) {
    return delta / 2 * (1 - Math.cos(Math.PI * progress)) + start;
}

function easeInExpo(currFrame, start, delta, totalFrames) {
    return delta * Math.pow(2, 10 * (progress - 1)) + start;
}

function easeOutExpo(currFrame, start, delta, totalFrames) {
    return delta * (-Math.pow(2, -10 * progress) + 1) + start;
}

function easeInOutExpo(currFrame, start, delta, totalFrames) {
    if ((currFrame /= totalFrames / 2) < 1) {
        return delta / 2 * Math.pow(2, 10 * (currFrame - 1)) + start;
    }
    return delta / 2 * (-Math.pow(2, -10 * --currFrame) + 2) + start;
}

function easeInCirc(currFrame, start, delta, totalFrames) {
    return delta * (1 - Math.sqrt(1 - (currFrame /= totalFrames) * currFrame)) + start;
}

function easeOutCirc(currFrame, start, delta, totalFrames) {
    return delta * Math.sqrt(1 - (currFrame = progress - 1) * currFrame) + start;
}

function easeInOutCirc(currFrame, start, delta, totalFrames) {
    if ((currFrame /= totalFrames / 2) < 1) {
        return delta / 2 * (1 - Math.sqrt(1 - currFrame * currFrame)) + start;
    }
    return delta / 2 * (Math.sqrt(1 - (currFrame -= 2) * currFrame) + 1) + start;
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

 */