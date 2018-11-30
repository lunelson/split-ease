import normGraph from './graph';
import metaEase from '../../index';

// import {drawArrow} from './canvas-utilities';
import { times, padEnd, debounce } from 'lodash';

const { sine, power } = metaEase;

const grayColor = '#5C5E66';
const blueColor = '#0A1433';
const redColor = '#993D3D';
const cyanColor = '#17A1E6';

export default function render() {

  const {ctx, easeIn, easeOut, curveType, power} = this;
  const ctxWidth = ctx.canvas.width;
  const ctxHeight = ctx.canvas.height;
  const textSize = 16;
  const mY = 32; // margin y
  const mX = 100; // margin x
  const b = 0; // bottom-area
  const left = mX;
  const top = mY;
  const width = ctxWidth - 2*mX;
  const height = ctxHeight - 2*mY - b;

  const easeInTime = Math.min(easeIn, easeIn/(easeIn+easeOut));
  const easeOutTime = Math.min(easeOut, easeOut/(easeOut+easeIn));
  const linearTime = Math.max(0, 1 - easeIn - easeOut);

  const easeInWidth = easeInTime * width;
  const easeOutWidth = easeOutTime * width;
  const linearWidth = linearTime * width;

  const {x:progX, y:progY} = this.progress;

  window.requestAnimationFrame(() => {

    // clear
    ctx.clearRect(0, 0, ctxWidth, ctxHeight);

    ctx.save();

      // draw ease areas
      ctx.translate(0, height + 2*mY);
      ctx.scale(1, -1);
      ctx.fillStyle = "rgba(50,50,50,0.05)";
      ctx.beginPath();
      ctx.rect(left, top, easeInWidth, height);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(left + width - easeOutWidth, top, easeOutWidth, height);
      ctx.fill();

      // draw cross-hairs
      ctx.strokeStyle = cyanColor;
      ctx.fillStyle = cyanColor;
      if (progX > 0 && progX < 1) {
        ctx.beginPath();
        ctx.moveTo(left + width * progX, top);
        ctx.lineTo(left + width * progX, top + height);
        ctx.moveTo(left, top + height * progY);
        ctx.lineTo(left + width, top + height * progY);
        ctx.stroke();
      }
      ctx.beginPath();
      const markerHeight = 12;
      const markerWidth = 64;
      ctx.rect(left + width + 12, top + height * progY - markerHeight/2, markerWidth, markerHeight);
      ctx.fill();

    ctx.restore();

    // draw graph
    const minEaseIn = Math.max(0.001, easeIn);
    const minEaseOut = Math.max(0.001, easeOut);
    normGraph(ctx, left, top, width, height, (t) => metaEase[curveType](t, easeIn, easeOut, power));

    ////////////
    // extras //
    ////////////

    ctx.beginPath();
    let tx = left + easeInWidth+linearWidth/2;
    let ty = top + height*(1 - metaEase[curveType](easeInTime + linearTime/2, easeInTime, easeOutTime, power));
    // ctx.ellipse(tx, ty, 4, 4, 0, 0, Math.PI*2);
    ctx.fill();

    // draw text
    // const textSize = 16
    ctx.strokeStyle = cyanColor;
    ctx.fillStyle = cyanColor;
    ctx.font = `${textSize}px Karla`;
    // ctx.textAlign = 'center';
    // if (easeInWidth > 100) {
    //   // ctx.textAlign = 'right';
    //   ctx.fillText('Acceleration', mX + easeInWidth/2, mY + height + b*2/3);
    // }
    // if (linearWidth > 120) {
    //   // ctx.textAlign = 'center';
    //   ctx.fillText('Constant Speed', mX + easeInWidth + linearWidth/2, mY + height + b*2/3);
    // }
    // if (easeOutWidth > 100) {
    //   // ctx.textAlign = 'left';
    //   ctx.fillText('Deceleration', mX + width - easeOutWidth/2, mY + height + b*2/3);
    // }

    ////////////////
    // label axes //
    ////////////////

    ctx.save();
      ctx.rotate(90 * Math.PI / 180);
      ctx.textAlign = 'left';
      ctx.fillText('Output', top, 24 - mX);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.textAlign = 'right';
      ctx.fillText('Input', mX + width, height + mY + 24);


      ctx.textAlign = 'left';
      ctx.fillStyle = "rgb(255,200,100)";
      ctx.fillText('Acceleration (Speed/Time)', mX, mY - textSize);
      ctx.textAlign = 'right';
      ctx.fillStyle = "rgb(200, 100, 100)";
      ctx.fillText('Speed (Change/Time)', mX + width, mY - textSize);
    ctx.restore();

    ///////////////
    // draw axes //
    ///////////////

    ctx.save();
      ctx.translate(0, height + 2*mY);
      ctx.scale(1, -1);
      ctx.lineWidth = "1";
      ctx.strokeStyle = cyanColor;

      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(left + width, top);
      ctx.moveTo(left, top);
      ctx.lineTo(left, top + height);


      times(11, (i)=>{
        const wStop = width*i/10;
        ctx.moveTo(left + wStop, top);
        ctx.lineTo(left + wStop, top - textSize/2);
        const hStop = height*i/10;
        ctx.moveTo(left, top + hStop);
        ctx.lineTo(left - textSize/2, top + hStop);
        // ctx.save();
        // ctx.translate(ctxWidth, height + 2*m);
        // ctx.scale(-1, -1);
        // ctx.lineWidth = "1";
        // // ctx.strokeStyle = "rgb(96, 96, 96)";
        // ctx.beginPath();
        // ctx.moveTo(m, m);
        // ctx.lineTo(left + width, top);
        // ctx.moveTo(left, top);
        // ctx.lineTo(left, top + height);
        // ctx.stroke();
        // ctx.restore();
      })
      ctx.stroke();
      ctx.fill();
    ctx.restore();


  });
}
