## format

- build to pkg.module as described here https://github.com/rollup/rollup/wiki/pkg.module

```json
{
  "name": "my-package",
  "version": "0.1.0",
  "main": "dist/my-package.umd.js",
  "module": "dist/my-package.es2015.js"
}
```

## workflow

https://github.com/tschaub/gh-pages
https://github.com/cantidio/node-github-pages


## content

- download link
- CDN / unpkg / npm / bower / links
- github project / issues link
- star / follow links
- twitter tweet / follow links
- one sentence description: what it does

## organization

- re-organize the bundle as here https://webpack.js.org/guides/author-libraries/


meta-ease
...provides interpolation methods with independently controlled ease-in and -out sections, supporting Sine and variable Power easing
...interpolates sine- and power-curve easing with independent in/out durations

meta-ease enables variable dynamic interpolation (easing) curves for animation, by providing independently controlled "in" (acceleration), "out" (deceleration) and constant-speed segments.


## design

- implement Travis CI github pages workflow https://voorhoede.github.io/front-end-tooling-recipes/travis-deploy-to-gh-pages/

- implement real sass grid and stack
- make a travelling blue square at the side, with progress line
- add floating labels to grid
- try the font Royal Sans:

```
font-family: 'Royal Sans Bold'
font-family: 'Royal Sans Medium'
font-family: 'Royal Sans Roman'
font-family: 'Royal Sans XLight'
<script type="text/javascript">
    (function() {
        var path = '//easy.myfonts.net/v2/js?sid=300551(font-family=Royal+Sans+Bold)&sid=300555(font-family=Royal+Sans+Medium)&sid=300557(font-family=Royal+Sans+Roman)&sid=300559(font-family=Royal+Sans+XLight)&key=mvpUpY9VPl',
            protocol = ('https:' == document.location.protocol ? 'https:' : 'http:'),
            trial = document.createElement('script');
        trial.type = 'text/javascript';
        trial.async = true;
        trial.src = protocol + path;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(trial);
    })();
</script>
```

## super- / meta-ease

- ask for help at GSAP on using the Ease class -- specifically OSUBlake, who created the visualisation tool
  https://greensock.com/docs/#/HTML5/GSAP/Easing/Ease/
- when published...
  - use ISC license
  - quote original penner terms http://robertpenner.com/easing/
  - this is official javascript source https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
  - post to GSAP forums
  - ping Andrey Sitnik https://github.com/ai/easings.net
  - post to Lego Mushroom https://codepen.io/sol0mka/

## ping other libs

TweenJS

- this SO topic https://stackoverflow.com/questions/32488647/how-to-acheive-ballistic-easing-effect-in-tweenjs
-

## floating precision

this might be worth solving

https://stackoverflow.com/questions/11695618/dealing-with-float-precision-in-javascript
https://github.com/MikeMcl/big.js
https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
https://github.com/MikeMcl/big.js/wiki

