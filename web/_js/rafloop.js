var test = document.querySelector('.test');

var rendering = false;
function stop() { rendering = false; }
function render() {
  if (!rendering){ requestAnimationFrame(loop); }
  rendering = setTimeout(stop, 150);
}

function loop() {
  console.log('looping');
  if (rendering) {
    requestAnimationFrame(loop);
    // looping call
    test.style.backgroundColor = 'pink';
  } else {
    // last call
    test.style.backgroundColor = 'lightblue';
  }
}

window.addEventListener('scroll', render);
