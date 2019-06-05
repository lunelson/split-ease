var fs = require('fs');

var purgeCSS = require('purgecss');

new purgeCSS({
  content: ['temp/index.html'],
  css: ['temp/index.css'],
  whitelistPatterns: [/^lazy/, /^flickity/],
})
  .purge()
  .forEach(out => {
    fs.writeFile(out.file, out.css, err => {
      console.log(err || `file ${out.file} purged`);
    });
  });
