import {collatz} from "./collatzconjecture.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;
let worldWidth2 = worldWidth / 2;
let worldHeight2 = worldHeight / 2;
let worldUpdated = true;

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    worldWidth2 = worldWidth / 2;
    worldHeight2 = worldHeight / 2;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
    worldUpdated = true;
  }
};

updateWorldSettings();

// calc sequences
const sequences = [];
for (let i = 1; i <= 10000; i++) {

  const sequence = [];
  let val = i;
  sequence.unshift(val);
  while (val !== 1) {
    val = collatz(val);
    sequence.unshift(val);
  }
  sequences.push(sequence);
}

const update = () => {

  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  if (worldUpdated) {
    worldUpdated = false;
  }
  ctx.clearRect(0, 0, worldWidth, worldHeight);

  ctx.strokeStyle = "rgba(255,255,255,0.01";
  ctx.lineWidth = 2;

  const len = 10;
  const angle = 0.15;

  for (let i = 0; i < sequences.length; i++) {
    const sequence = sequences[i];

    ctx.save();
    ctx.translate(worldWidth2, worldHeight2);

    for (let j = 0; j < sequence.length; j++) {
      const v = sequence[j];
      // if (v % 2 === 0)
      //   ctx.rotate(angle);
      // else
      //   ctx.rotate(-angle);

      // if (v % 2 === 0)
      //   ctx.rotate(0.27 - 0.0002 * j);
      // else
      //   ctx.rotate(-0.19 + 0.00025 * j);

      if (v % 2 === 0)
        ctx.rotate(angle - 0.0001 * j);
      else
        ctx.rotate(-angle + 0.0001 * j);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(len, 0);
      ctx.stroke();
      ctx.translate(len, 0);
    }

    ctx.restore();
  }


  updateWorldSettings();

  // requestAnimationFrame(update);
}

update();

// let step = 0;
// let val = 670617279;
// while (val !== 1) {
//   step++;
//   val = collatz(val);
//   // console.log(val);
// }
// console.log(step);