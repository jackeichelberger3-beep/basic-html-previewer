const TEMPLATES = [
  {
    id: "html5-boilerplate",
    name: "HTML5 Boilerplate",
    category: "Starters",
    description: "Semantic header, nav, main, footer skeleton",
    html: `<header>
  <h1>My Page</h1>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</header>
<main>
  <section>
    <h2>Welcome</h2>
    <p>Start building your page here.</p>
  </section>
</main>
<footer>
  <p>&copy; 2025</p>
</footer>`,
    css: `* { box-sizing: border-box; margin: 0; }
body { font-family: system-ui, sans-serif; line-height: 1.6; color: #222; max-width: 900px; margin: 0 auto; padding: 24px; }
header { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #eee; }
nav a { margin-left: 16px; text-decoration: none; color: #1a73e8; }
nav a:hover { text-decoration: underline; }
main { padding: 24px 0; }
footer { padding: 16px 0; border-top: 1px solid #eee; color: #888; font-size: 14px; }`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded');
});`,
  },
  {
    id: "css-reset",
    name: "CSS Reset",
    category: "Starters",
    description: "Modern CSS reset for consistent defaults",
    html: `<h1>CSS Reset Demo</h1>
<p>Headings and paragraphs get consistent defaults.</p>
<ul>
  <li>Lists are reset</li>
  <li>No default margins</li>
</ul>
<button>Buttons reset</button>`,
    css: `*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; }
body { font-family: system-ui, sans-serif; line-height: 1.5; padding: 24px; max-width: 800px; margin: 0 auto; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
button { cursor: pointer; background: none; border: none; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
h1, h2, h3, h4, h5, h6 { line-height: 1.2; font-weight: 600; }
p { margin-bottom: 1em; }
button { padding: 8px 16px; border: 1px solid #ddd; border-radius: 6px; }`,
    js: ``,
  },
  {
    id: "js-starter",
    name: "JavaScript Starter",
    category: "Starters",
    description: "DOM-ready handler with $ helpers",
    html: `<div id="app"></div>`,
    css: `body { font-family: system-ui, sans-serif; padding: 24px; }
#app { max-width: 600px; margin: 0 auto; }`,
    js: `const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  $('#app').innerHTML = '<h1>Hello from JS</h1><p>Start coding here.</p>';
  console.log('JS starter ready');
});`,
  },
  {
    id: "landing-page",
    name: "Landing Page",
    category: "Pages & Layout",
    description: "Gradient hero with CTA and feature grid",
    html: `<section class="hero">
  <h1>Build Something Amazing</h1>
  <p>A clean, modern landing page to get you started.</p>
  <div class="cta">
    <button class="primary">Get Started</button>
    <button class="ghost">Learn More</button>
  </div>
</section>
<section class="features">
  <div class="feature"><h3>Fast</h3><p>Lightning quick performance.</p></div>
  <div class="feature"><h3>Simple</h3><p>Easy to customize.</p></div>
  <div class="feature"><h3>Free</h3><p>Open and yours to use.</p></div>
</section>`,
    css: `* { box-sizing: border-box; margin: 0; }
body { font-family: system-ui, sans-serif; color: #222; }
.hero { text-align: center; padding: 96px 24px; background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
.hero h1 { font-size: 3rem; margin-bottom: 12px; }
.hero p { font-size: 1.2rem; opacity: 0.9; margin-bottom: 28px; }
.cta { display: flex; gap: 12px; justify-content: center; }
button { padding: 12px 24px; border-radius: 8px; font-size: 1rem; cursor: pointer; border: none; }
.primary { background: #fff; color: #764ba2; font-weight: 600; }
.ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.6); }
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; max-width: 900px; margin: 0 auto; padding: 64px 24px; }
.feature { text-align: center; }
.feature h3 { margin-bottom: 8px; }`,
    js: ``,
  },
  {
    id: "flexbox-card",
    name: "Flexbox Card",
    category: "Pages & Layout",
    description: "Centered profile card with avatar",
    html: `<div class="card">
  <div class="avatar">A</div>
  <h2>Ada Lovelace</h2>
  <p>Mathematician &amp; writer.</p>
  <button>Follow</button>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; }
body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f1f3f4; }
.card { background: #fff; border-radius: 16px; padding: 32px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); width: 280px; }
.avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #1a73e8, #34a853); color: #fff; display: grid; place-items: center; font-size: 2rem; font-weight: 700; margin: 0 auto 16px; }
.card h2 { font-size: 1.3rem; margin-bottom: 4px; }
.card p { color: #5f6368; margin-bottom: 20px; }
button { padding: 10px 24px; border: none; border-radius: 8px; background: #1a73e8; color: #fff; font-weight: 600; cursor: pointer; }
button:hover { background: #1765cc; }`,
    js: ``,
  },
  {
    id: "grid-gallery",
    name: "CSS Grid Gallery",
    category: "Pages & Layout",
    description: "Responsive auto-fill tile gallery",
    html: `<div class="gallery">
  <div class="tile" style="background:#f28b82"></div>
  <div class="tile" style="background:#fdd663"></div>
  <div class="tile" style="background:#81c995"></div>
  <div class="tile" style="background:#8ab4f8"></div>
  <div class="tile" style="background:#c58af9"></div>
  <div class="tile" style="background:#ff8bcb"></div>
</div>`,
    css: `* { margin: 0; box-sizing: border-box; }
body { font-family: system-ui; padding: 24px; }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; max-width: 900px; margin: 0 auto; }
.tile { aspect-ratio: 1; border-radius: 12px; transition: transform 0.2s; }
.tile:hover { transform: scale(1.05); }`,
    js: ``,
  },
  {
    id: "animated-button",
    name: "Animated Button",
    category: "UI",
    description: "Button with ripple click effect",
    html: `<div class="wrap">
  <button class="ripple">Click Me</button>
</div>`,
    css: `* { margin: 0; box-sizing: border-box; }
body { display: grid; place-items: center; min-height: 100vh; font-family: system-ui; background: #202124; }
.ripple { position: relative; overflow: hidden; padding: 14px 32px; border: none; border-radius: 10px; background: #8ab4f8; color: #202124; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.15s; }
.ripple:hover { transform: translateY(-2px); }
.ripple:active { transform: translateY(0); }
.ripple .wave { position: absolute; border-radius: 50%; transform: scale(0); background: rgba(255,255,255,0.5); animation: wave 0.6s ease-out; pointer-events: none; }
@keyframes wave { to { transform: scale(2.5); opacity: 0; } }`,
    js: `document.querySelector('.ripple').addEventListener('click', function(e) {
  const wave = document.createElement('span');
  wave.className = 'wave';
  const r = this.getBoundingClientRect();
  const size = Math.max(r.width, r.height);
  wave.style.width = wave.style.height = size + 'px';
  wave.style.left = (e.clientX - r.left - size / 2) + 'px';
  wave.style.top = (e.clientY - r.top - size / 2) + 'px';
  this.appendChild(wave);
  setTimeout(() => wave.remove(), 600);
  console.log('Clicked');
});`,
  },
  {
    id: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    category: "Games",
    description: "Two-player classic on a 3x3 grid",
    html: `<div class="game">
  <h1>Tic-Tac-Toe</h1>
  <div id="status">Player X's turn</div>
  <div class="board" id="board"></div>
  <button id="reset">New Game</button>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; font-family: system-ui; }
body { display: grid; place-items: center; min-height: 100vh; background: #f1f3f4; }
.game { text-align: center; }
h1 { margin-bottom: 8px; }
#status { margin-bottom: 12px; font-weight: 600; color: #5f6368; }
.board { display: grid; grid-template-columns: repeat(3, 80px); gap: 6px; margin: 0 auto 16px; }
.cell { width: 80px; height: 80px; background: #fff; border-radius: 10px; font-size: 2.5rem; font-weight: 700; display: grid; place-items: center; cursor: pointer; color: #1a73e8; }
.cell:hover { background: #e8f0fe; }
.cell.o { color: #d93025; }
button#reset { padding: 10px 20px; border: none; border-radius: 8px; background: #1a73e8; color: #fff; font-weight: 600; cursor: pointer; }`,
    js: `const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = Array(9).fill('');
let current = 'x';
const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function render() {
  board.innerHTML = '';
  cells.forEach((v, i) => {
    const c = document.createElement('div');
    c.className = 'cell ' + v;
    c.textContent = v.toUpperCase();
    c.addEventListener('click', () => play(i));
    board.appendChild(c);
  });
}
function play(i) {
  if (cells[i] || checkWin()) return;
  cells[i] = current;
  if (checkWin()) { status.textContent = 'Player ' + current.toUpperCase() + ' wins!'; render(); return; }
  if (cells.every(Boolean)) { status.textContent = "It's a draw!"; render(); return; }
  current = current === 'x' ? 'o' : 'x';
  status.textContent = "Player " + current.toUpperCase() + "'s turn";
  render();
}
function checkWin() { return wins.some(line => line.every(i => cells[i] === current)); }
document.getElementById('reset').addEventListener('click', () => {
  cells = Array(9).fill(''); current = 'x';
  status.textContent = "Player X's turn"; render();
});
render();`,
  },
  {
    id: "snake",
    name: "Snake",
    category: "Games",
    description: "Classic snake on canvas, arrow keys / WASD",
    html: `<div class="wrap">
  <h1>Snake</h1>
  <p>Score: <span id="score">0</span></p>
  <canvas id="c" width="320" height="320"></canvas>
  <p class="hint">Arrow keys or WASD</p>
</div>`,
    css: `* { margin: 0; font-family: system-ui; }
body { display: grid; place-items: center; min-height: 100vh; background: #202124; color: #e8eaed; }
.wrap { text-align: center; }
h1 { margin-bottom: 8px; }
p { margin: 6px 0; color: #9aa0a6; }
canvas { background: #1a1a1a; border: 1px solid #3c4043; border-radius: 8px; margin-top: 8px; }
.hint { font-size: 12px; }`,
    js: `const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
const G = 16;
let snake, dir, nextDir, food, score, loop;
function init() {
  snake = [{x:8,y:8}]; dir = {x:1,y:0}; nextDir = dir; score = 0;
  placeFood(); clearInterval(loop); loop = setInterval(tick, 120);
  document.getElementById('score').textContent = 0;
}
function placeFood() { food = { x: (Math.random()*G)|0, y: (Math.random()*G)|0 }; }
function tick() {
  dir = nextDir;
  const head = { x: (snake[0].x + dir.x + G) % G, y: (snake[0].y + dir.y + G) % G };
  if (snake.some(s => s.x === head.x && s.y === head.y)) { init(); return; }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) { score++; document.getElementById('score').textContent = score; placeFood(); }
  else snake.pop();
  draw();
}
function draw() {
  ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0,0,cv.width,cv.height);
  ctx.fillStyle = '#00ff66'; snake.forEach(s => ctx.fillRect(s.x*20+1, s.y*20+1, 18, 18));
  ctx.fillStyle = '#f28b82'; ctx.fillRect(food.x*20+1, food.y*20+1, 18, 18);
}
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if ((k === 'arrowup' || k === 'w') && dir.y === 0) nextDir = {x:0,y:-1};
  else if ((k === 'arrowdown' || k === 's') && dir.y === 0) nextDir = {x:0,y:1};
  else if ((k === 'arrowleft' || k === 'a') && dir.x === 0) nextDir = {x:-1,y:0};
  else if ((k === 'arrowright' || k === 'd') && dir.x === 0) nextDir = {x:1,y:0};
});
init();`,
  },
  {
    id: "memory-match",
    name: "Memory Match",
    category: "Games",
    description: "Flip cards to find matching emoji pairs",
    html: `<div class="game">
  <h1>Memory Match</h1>
  <p>Moves: <span id="moves">0</span></p>
  <div class="grid" id="grid"></div>
</div>`,
    css: `* { margin: 0; font-family: system-ui; box-sizing: border-box; }
body { display: grid; place-items: center; min-height: 100vh; background: #f1f3f4; }
.game { text-align: center; }
h1 { margin-bottom: 6px; }
p { color: #5f6368; margin-bottom: 12px; }
.grid { display: grid; grid-template-columns: repeat(4, 70px); gap: 10px; }
.card { width: 70px; height: 70px; border-radius: 10px; background: #1a73e8; color: #fff; font-size: 2rem; display: grid; place-items: center; cursor: pointer; }
.card.flipped { background: #fff; color: #1a73e8; border: 2px solid #1a73e8; }
.card.done { background: #34a853; color: #fff; cursor: default; }`,
    js: `const grid = document.getElementById('grid');
const movesEl = document.getElementById('moves');
const emojis = ['🍎','🍌','🍇','🍒','🥝','🍑','🍍','🥥'];
let cards, flipped, matched, moves, lock;
function init() {
  cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  flipped = []; matched = []; moves = 0; lock = false;
  movesEl.textContent = 0;
  grid.innerHTML = '';
  cards.forEach((e, i) => {
    const c = document.createElement('div');
    c.className = 'card';
    c.addEventListener('click', () => flip(i, c));
    grid.appendChild(c);
  });
}
function flip(i, el) {
  if (lock || flipped.includes(i) || matched.includes(i)) return;
  el.textContent = cards[i];
  el.classList.add('flipped');
  flipped.push(i);
  if (flipped.length === 2) {
    moves++; movesEl.textContent = moves; lock = true;
    const [a, b] = flipped;
    if (cards[a] === cards[b]) {
      matched.push(a, b);
      grid.children[a].classList.add('done');
      grid.children[b].classList.add('done');
      flipped = []; lock = false;
      if (matched.length === cards.length) setTimeout(() => alert('Done in ' + moves + ' moves!'), 200);
    } else {
      setTimeout(() => {
        grid.children[a].classList.remove('flipped'); grid.children[a].textContent = '';
        grid.children[b].classList.remove('flipped'); grid.children[b].textContent = '';
        flipped = []; lock = false;
      }, 700);
    }
  }
}
init();`,
  },
  {
    id: "reaction-test",
    name: "Reaction Time Test",
    category: "Games",
    description: "Wait for green, then click as fast as you can",
    html: `<div class="game">
  <h1>Reaction Time</h1>
  <p id="msg">Click the box to start</p>
  <div id="box" class="box idle">Click</div>
</div>`,
    css: `* { margin: 0; font-family: system-ui; }
body { display: grid; place-items: center; min-height: 100vh; background: #202124; color: #e8eaed; }
.game { text-align: center; }
h1 { margin-bottom: 8px; }
#msg { color: #9aa0a6; margin-bottom: 16px; }
.box { width: 260px; height: 160px; border-radius: 14px; display: grid; place-items: center; font-size: 1.4rem; font-weight: 600; cursor: pointer; user-select: none; }
.box.idle { background: #3c4043; color: #e8eaed; }
.box.wait { background: #f9ab00; color: #202124; }
.box.go { background: #34a853; color: #fff; }`,
    js: `const box = document.getElementById('box');
const msg = document.getElementById('msg');
let state = 'idle', start, timer;
box.className = 'box idle';
box.addEventListener('click', () => {
  if (state === 'idle' || state === 'done') {
    state = 'wait'; box.className = 'box wait'; box.textContent = 'Wait...'; msg.textContent = 'Wait for green...';
    timer = setTimeout(() => { state = 'go'; box.className = 'box go'; box.textContent = 'CLICK!'; start = Date.now(); }, 1000 + Math.random() * 2500);
  } else if (state === 'wait') {
    clearTimeout(timer); state = 'idle'; box.className = 'box idle'; box.textContent = 'Too soon!'; msg.textContent = 'Click to try again';
  } else if (state === 'go') {
    const ms = Date.now() - start; state = 'done'; box.className = 'box idle'; box.textContent = ms + ' ms'; msg.textContent = 'Click to try again';
    console.log('Reaction:', ms, 'ms');
  }
});`,
  },
  {
    id: "todo-list",
    name: "Todo List",
    category: "Apps",
    description: "Add, complete, and delete tasks",
    html: `<div class="app">
  <h1>Todo List</h1>
  <form id="form">
    <input id="inp" placeholder="Add a task..." autocomplete="off" />
    <button>Add</button>
  </form>
  <ul id="list"></ul>
</div>`,
    css: `* { margin: 0; box-sizing: border-box; font-family: system-ui; }
body { display: grid; place-items: start center; min-height: 100vh; background: #f1f3f4; padding-top: 60px; }
.app { width: 360px; }
h1 { text-align: center; margin-bottom: 16px; }
form { display: flex; gap: 8px; margin-bottom: 16px; }
input { flex: 1; padding: 10px; border: 1px solid #dadce0; border-radius: 8px; font-size: 14px; }
button { padding: 10px 16px; border: none; border-radius: 8px; background: #1a73e8; color: #fff; font-weight: 600; cursor: pointer; }
ul { list-style: none; }
li { display: flex; align-items: center; gap: 10px; padding: 10px; background: #fff; border-radius: 8px; margin-bottom: 8px; }
li.done span { text-decoration: line-through; color: #9aa0a6; }
li span { flex: 1; cursor: pointer; }
li button { background: transparent; color: #d93025; padding: 4px 8px; }`,
    js: `const form = document.getElementById('form');
const inp = document.getElementById('inp');
const list = document.getElementById('list');
let todos = [];
function render() {
  list.innerHTML = '';
  todos.forEach((t, i) => {
    const li = document.createElement('li');
    if (t.done) li.className = 'done';
    const span = document.createElement('span');
    span.textContent = t.text;
    span.addEventListener('click', () => { todos[i].done = !todos[i].done; render(); });
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', () => { todos.splice(i, 1); render(); });
    li.append(span, del);
    list.appendChild(li);
  });
}
form.addEventListener('submit', e => {
  e.preventDefault();
  if (inp.value.trim()) { todos.push({ text: inp.value.trim(), done: false }); inp.value = ''; render(); }
});
render();`,
  },
  {
    id: "digital-clock",
    name: "Digital Clock",
    category: "Apps",
    description: "Live updating time and date",
    html: `<div class="clock">
  <div id="time">00:00:00</div>
  <div id="date">--</div>
</div>`,
    css: `* { margin: 0; font-family: 'Roboto Mono', ui-monospace, monospace; }
body { display: grid; place-items: center; min-height: 100vh; background: #202124; color: #e8eaed; }
.clock { text-align: center; }
#time { font-size: 4rem; font-weight: 700; letter-spacing: 2px; }
#date { font-size: 1.1rem; color: #9aa0a6; margin-top: 8px; }`,
    js: `function tick() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  document.getElementById('time').textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  document.getElementById('date').textContent = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}
tick(); setInterval(tick, 1000);`,
  },
  {
    id: "calculator",
    name: "Calculator",
    category: "Apps",
    description: "Basic calculator with keyboard buttons",
    html: `<div class="calc">
  <div id="disp">0</div>
  <div class="keys">
    <button data-k="C">C</button><button data-k="±">±</button><button data-k="%">%</button><button data-k="/" class="op">÷</button>
    <button data-k="7">7</button><button data-k="8">8</button><button data-k="9">9</button><button data-k="*" class="op">×</button>
    <button data-k="4">4</button><button data-k="5">5</button><button data-k="6">6</button><button data-k="-" class="op">−</button>
    <button data-k="1">1</button><button data-k="2">2</button><button data-k="3">3</button><button data-k="+" class="op">+</button>
    <button data-k="0" class="zero">0</button><button data-k=".">.</button><button data-k="=" class="op">=</button>
  </div>
</div>`,
    css: `* { margin: 0; box-sizing: border-box; font-family: system-ui; }
body { display: grid; place-items: center; min-height: 100vh; background: #202124; }
.calc { width: 280px; background: #2a2b2e; border-radius: 16px; padding: 16px; }
#disp { background: #1a1a1a; color: #e8eaed; font-size: 2.5rem; text-align: right; padding: 16px; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.keys button { padding: 18px; font-size: 1.2rem; border: none; border-radius: 10px; background: #3c4043; color: #e8eaed; cursor: pointer; }
.keys button:hover { background: #4a4d52; }
.keys button.op { background: #8ab4f8; color: #202124; }
.keys button.zero { grid-column: span 2; }`,
    js: `const disp = document.getElementById('disp');
let cur = '0', prev = null, op = null, fresh = false;
function show() { disp.textContent = cur; }
function calc(a, b, o) { return o === '+' ? a+b : o === '-' ? a-b : o === '*' ? a*b : o === '/' ? (b === 0 ? 0 : a/b) : b; }
function press(k) {
  if (/[0-9]/.test(k)) { cur = fresh || cur === '0' ? k : cur + k; fresh = false; }
  else if (k === '.') { if (!cur.includes('.')) cur += '.'; fresh = false; }
  else if (k === 'C') { cur = '0'; prev = null; op = null; }
  else if (k === '±') { cur = String(-parseFloat(cur)); }
  else if (k === '%') { cur = String(parseFloat(cur) / 100); }
  else if (k === '=') { if (op && prev !== null) { cur = String(calc(prev, parseFloat(cur), op)); op = null; prev = null; fresh = true; } }
  else { if (op && prev !== null && !fresh) { cur = String(calc(prev, parseFloat(cur), op)); } prev = parseFloat(cur); op = k; fresh = true; }
  show();
}
document.querySelectorAll('.keys button').forEach(b => b.addEventListener('click', () => press(b.dataset.k)));
show();`,
  },
];
