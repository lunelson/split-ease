function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t,o,r){return o/-2*(Math.cos(Math.PI*e/r)-1)+t}function o(e,t,o,r,n){return(e/=r/2)<1?o/2*Math.pow(e,n)+t:o/-2*(Math.pow(2-e,n)-2)+t}module.exports=function(r,n,i){if("object"==e(n)&&(i=n,n=void 0),void 0!==r&&r<0)throw new RangeError("SplitEase: ease-in ratio must be > 0; received ".concat(r));if(void 0!==n&&n<0)throw new RangeError("SplitEase: ease-out ratio must be > 0; received ".concat(n));if(void 0!==r&&"number"!=typeof r)throw new TypeError("SplitEase: ease-in ratio must be a number; received ".concat(r));if(void 0!==n&&"number"!=typeof n)throw new TypeError("SplitEase: ease-out ratio must be a number; received ".concat(n));if(void 0!==i&&!function(t){if("object"!==e(t))return!1;if("[object Object]"!==Object.prototype.toString.call(t))return!1;switch(Object.getPrototypeOf(t)){case Object.prototype:case null:return!0;default:return!1}}(i))throw new TypeError("SplitEase: options must be a plain object; received ".concat(i));r=void 0===r?.5:r,n=void 0===n?Math.max(1-r,0):n,i=void 0===i?{pow:2}:i;var a=r+n;r>1?console.warn("SplitEase: ease-in ratio is > 1 [".concat(r,"]; both ratios will be scaled down")):n>1?console.warn("SplitEase: ease-out ratio is > 1 [".concat(n,"]; both ratios will be scaled down")):a>1&&console.warn("SplitEase: total easing ratio is > 1 [".concat(a,"]; both ratios will be scaled down"));var c=a>1?1/a:1;r*=c,n*=c;var s=i.pow,p=i.sin;if(s&&s<1)throw new RangeError("SplitEase: pow parameter must be >= 1; received ".concat(s));s&&s>5&&console.warn("SplitEase: pow parameter is > 5; curve is extreme beyond this point!");var u=p?t:o,l=p?Math.PI/2:s,b=r>0?1/(l/r-(l-1)*(n/r+1)):0,w=n>0?1/(l/n-(l-1)*(r/n+1)):0;return function(e){return e<=0?0:e>1?1:e<=r?u(e,0,2*b,2*r,l):e>1-n?u(e-(1-2*n),1-2*w,2*w,2*n,l):(1-(b+w))*(e-r)/(1-(r+n))+b}};
//# sourceMappingURL=split-ease.js.map
