const canvas = document.getElementById('pet');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const atlas = new Image();
const CELL_W = 192;
const CELL_H = 208;
const ATLAS_W = 1536;

const actions = {
  idle: { row: 0, frames: 6, fps: 6, label: '待机' },
  'running-right': { row: 1, frames: 8, fps: 10, label: '向右移动' },
  'running-left': { row: 2, frames: 8, fps: 10, label: '向左移动' },
  waving: { row: 3, frames: 4, fps: 7, label: '挥手' },
  jumping: { row: 4, frames: 5, fps: 8, label: '跳跃' },
  failed: { row: 5, frames: 8, fps: 7, label: '沮丧' },
  waiting: { row: 6, frames: 6, fps: 6, label: '等待' },
  running: { row: 7, frames: 6, fps: 7, label: '工作中' },
  review: { row: 8, frames: 6, fps: 6, label: '检查' }
};

let current = 'idle';
let frame = 0;
let paused = false;
let lastTime = 0;
let elapsed = 0;
let nextAuto = 7000;
const autoSequence = ['idle', 'waving', 'idle', 'running', 'review', 'waiting', 'idle', 'jumping'];
let autoIndex = 0;

function draw() {
  const spec = actions[current];
  ctx.clearRect(0, 0, CELL_W, CELL_H);
  if (atlas.complete) {
    ctx.drawImage(atlas, frame * CELL_W, spec.row * CELL_H, CELL_W, CELL_H, 0, 0, CELL_W, CELL_H);
  }
}

function setAction(name) {
  if (!actions[name]) name = 'idle';
  current = name;
  frame = 0;
  elapsed = 0;
  status.textContent = actions[name].label;
  draw();
}

function tick(now) {
  const dt = now - lastTime;
  lastTime = now;
  if (!paused && atlas.complete) {
    const spec = actions[current];
    elapsed += dt;
    if (elapsed >= 1000 / spec.fps) {
      frame = (frame + Math.floor(elapsed / (1000 / spec.fps))) % spec.frames;
      elapsed %= 1000 / spec.fps;
      draw();
    }
    nextAuto -= dt;
    if (nextAuto <= 0) {
      autoIndex = (autoIndex + 1) % autoSequence.length;
      setAction(autoSequence[autoIndex]);
      nextAuto = current === 'idle' ? 7000 : 2600;
    }
  }
  requestAnimationFrame(tick);
}

atlas.onload = draw;
atlas.src = 'assets/spritesheet.webp';
window.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  window.petHost.contextMenu();
});
window.petHost.onCommand((command) => {
  if (command === 'toggle-pause') {
    paused = !paused;
    status.textContent = paused ? '已暂停' : actions[current].label;
    draw();
  } else if (actions[command]) {
    paused = false;
    setAction(command);
  }
});

setAction('idle');
requestAnimationFrame(tick);
