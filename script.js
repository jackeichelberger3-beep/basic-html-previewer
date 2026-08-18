/* global TEMPLATES */
/* ---------- Samples ---------- */
const SAMPLE_HTML = `<div style="text-align:center">
  <h1>👋 Hello, World!</h1>
  <p>Edit the HTML, CSS, and JS panels.</p>
  <button id="btn">Click me</button>
</div>`;

const SAMPLE_CSS = `body {
  font-family: system-ui, sans-serif;
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #1a73e8, #34a853);
  color: white;
}
h1 { font-size: 3rem; margin: 0 0 8px; }
p { opacity: .9; margin: 0 0 16px; }
button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background: white;
  color: #1a73e8;
  font-weight: 600;
  cursor: pointer;
}
button:hover { opacity: .9; }`;

const SAMPLE_JS = `const btn = document.getElementById('btn');
let count = 0;
console.log('Script loaded');
btn.addEventListener('click', () => {
  count++;
  btn.textContent = 'Clicked ' + count + ' times';
  console.log('Clicked', count);
});`;

/* ---------- Console capture hook (injected into preview) ---------- */
const CONSOLE_HOOK = `<script>
(function(){
  var send = function(level, args){
    try {
      var text = Array.prototype.map.call(args, function(a){
        try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch(e){ return String(a); }
      }).join(' ');
      parent.postMessage({ __cv: 1, level: level, text: text }, '*');
    } catch(e){}
  };
  ['log','info','warn','error','debug'].forEach(function(l){
    var orig = console[l] ? console[l].bind(console) : function(){};
    console[l] = function(){ send(l, arguments); orig.apply(console, arguments); };
  });
  window.addEventListener('error', function(e){ send('error', [(e.message||'Error') + ' @ line ' + (e.lineno||0)]); });
  window.addEventListener('unhandledrejection', function(e){ send('error', ['Unhandled rejection: ' + (e.reason && e.reason.message ? e.reason.message : e.reason)]); });
})();
<\/script>`;

/* ---------- Formatter ---------- */
function formatHTML(html) {
  const tab = "  ";
  const voidTags = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
  let src = html.replace(/\r\n/g, "\n").replace(/>\s+</g, "><").trim();
  const tokens = [];
  let i = 0;
  while (i < src.length) {
    if (src[i] === "<") {
      const end = src.indexOf(">", i);
      if (end === -1) { tokens.push(src.slice(i)); break; }
      tokens.push(src.slice(i, end + 1));
      i = end + 1;
    } else {
      const next = src.indexOf("<", i);
      if (next === -1) { tokens.push(src.slice(i)); break; }
      tokens.push(src.slice(i, next));
      i = next;
    }
  }
  let out = "", indent = 0;
  for (let tok of tokens) {
    const t = tok.trim();
    if (!t) continue;
    const isClose = /^<\/[^>]+>$/.test(t);
    const isOpen = /^<[^\/!?][^>]*[^\/]>$/.test(t);
    const m = t.match(/^<\/?([a-zA-Z0-9]+)/);
    const isVoid = m ? voidTags.test(m[1]) : false;
    if (isClose) indent = Math.max(0, indent - 1);
    out += tab.repeat(Math.max(0, indent)) + t + "\n";
    if (isOpen && !isVoid) indent++;
  }
  return out.trim();
}

function formatCSS(css) {
  let src = css.replace(/\s+/g, " ").trim();
  let out = "", indent = 0, buf = "";
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") { out += "  ".repeat(indent) + buf.trim() + " {\n"; buf = ""; indent++; }
    else if (ch === "}") { if (buf.trim()) out += "  ".repeat(indent) + buf.trim() + "\n"; buf = ""; indent = Math.max(0, indent - 1); out += "  ".repeat(indent) + "}\n"; }
    else if (ch === ";") { out += "  ".repeat(indent) + buf.trim() + ";\n"; buf = ""; }
    else { buf += ch; }
  }
  return out.trim();
}

function formatJS(js) {
  const tab = "  ";
  let src = js.replace(/\r\n/g, "\n");
  src = src.replace(/;\s*/g, ";\n").replace(/\s*{\s*/g, " {\n").replace(/\s*}\s*/g, "\n}\n").replace(/,\s*/g, ", ");
  let out = "", indent = 0;
  for (let raw of src.split("\n")) {
    let line = raw.trim();
    if (!line) continue;
    if (line.startsWith("}")) indent = Math.max(0, indent - 1);
    out += tab.repeat(Math.max(0, indent)) + line + "\n";
    const opens = (line.match(/{/g) || []).length;
    const closes = (line.match(/}/g) || []).length;
    indent = Math.max(0, indent + opens - closes);
  }
  return out.trim();
}

function formatCode(code, lang) {
  if (!code) return code;
  try {
    if (lang === "css") return formatCSS(code);
    if (lang === "js") return formatJS(code);
    return formatHTML(code);
  } catch { return code; }
}

/* ---------- State ---------- */
const LANGS = [
  { id: "html", label: "HTML", color: "#f28b82" },
  { id: "css", label: "CSS", color: "#fdd663" },
  { id: "js", label: "JS", color: "#81c995" },
];

let tabSeq = 1;
let tabs = [];
let activeId = null;
let view = "split";

const $ = (id) => document.getElementById(id);
const editor = $("editor");
const preview = $("preview");
const lineNumbers = $("lineNumbers");
const charCount = $("charCount");
const workspace = $("workspace");
const toastEl = $("toast");
const tabsEl = $("tabs");
const langSwitch = $("langSwitch");
const consoleBody = $("consoleBody");
const consoleEl = $("console");
const consoleCount = $("consoleCount");
const consoleBadges = $("consoleBadges");
const ctxMenu = $("ctxMenu");

let consoleCollapsed = false;
let logs = [];

function makeTab(name = "untitled.html") {
  return { id: tabSeq++, name, html: "", css: "", js: "", mode: "html", wrap: false, pinned: false, previewKey: 0 };
}
function getActive() { return tabs.find((t) => t.id === activeId); }

function buildDoc(t) {
  return "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>" + (t.name || "untitled") +
    "</title>" + CONSOLE_HOOK + "<style>" + t.css + "</style></head><body>" + t.html +
    "<" + "script>" + t.js + "<\/script></body></html>";
}

/* ---------- Console ---------- */
window.addEventListener("message", (e) => {
  if (e.data && e.data.__cv) {
    logs.push({ level: e.data.level, text: e.data.text });
    renderConsole();
  }
});
function renderConsole() {
  consoleCount.textContent = logs.length + " message" + (logs.length === 1 ? "" : "s");
  let err = 0, warn = 0;
  logs.forEach((l) => { if (l.level === "error") err++; else if (l.level === "warn") warn++; });
  consoleBadges.innerHTML = "";
  if (err) consoleBadges.innerHTML += '<span class="badge err">' + err + "</span>";
  if (warn) consoleBadges.innerHTML += '<span class="badge warn">' + warn + "</span>";
  if (consoleCollapsed) return;
  if (!logs.length) {
    consoleBody.innerHTML = '<div class="log-empty">Console output from your script will appear here</div>';
    return;
  }
  const mark = { error: "✕", warn: "⚠", log: "›", info: "›", debug: "›" };
  consoleBody.innerHTML = logs.map((l) =>
    '<div class="log-line ' + l.level + '"><span class="log-mark">' + (mark[l.level] || "›") + "</span><span>" + escapeHtml(l.text) + "</span></div>"
  ).join("");
  consoleBody.scrollTop = consoleBody.scrollHeight;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
function clearLogs() { logs = []; renderConsole(); }

$("consoleToggle").addEventListener("click", () => {
  consoleCollapsed = !consoleCollapsed;
  consoleEl.classList.toggle("collapsed", consoleCollapsed);
  if (!consoleCollapsed) renderConsole();
});
$("consoleClear").addEventListener("click", clearLogs);

/* ---------- Tabs ---------- */
function ordered() {
  return [...tabs.filter((t) => t.pinned), ...tabs.filter((t) => !t.pinned)];
}
function renderTabs() {
  tabsEl.innerHTML = "";
  ordered().forEach((t) => {
    const el = document.createElement("div");
    el.className = "tab" + (t.id === activeId ? " active" : "") + (t.pinned ? " pinned" : "");
    el.title = t.name;
    el.innerHTML =
      '<svg class="tab-icon" viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>' +
      '<span class="tab-name"></span>' +
      '<button class="tab-close" title="Close"><svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>';
    el.querySelector(".tab-name").textContent = t.name;
    el.addEventListener("click", () => setActive(t.id));
    el.addEventListener("contextmenu", (e) => { e.preventDefault(); openCtxMenu(e.clientX, e.clientY, t.id); });
    el.addEventListener("auxclick", (e) => { if (e.button === 1) { e.preventDefault(); closeTab(t.id); } });
    el.querySelector(".tab-close").addEventListener("click", (e) => { e.stopPropagation(); closeTab(t.id); });
    tabsEl.appendChild(el);
  });
}

function setActive(id) {
  activeId = id;
  clearLogs();
  renderTabs();
  renderLangSwitch();
  loadActiveIntoEditor();
  renderPreview();
}
function loadActiveIntoEditor() {
  const t = getActive();
  if (!t) return;
  editor.value = t[t.mode];
  editor.classList.toggle("wrap", t.wrap);
  updateLineNumbers();
  updateWrapBtn();
}
function renderLangSwitch() {
  const t = getActive();
  langSwitch.innerHTML = "";
  LANGS.forEach((l) => {
    const b = document.createElement("button");
    b.className = "lang-btn" + (t && t.mode === l.id ? " active" : "");
    b.innerHTML = '<span class="lang-dot" style="background:' + l.color + '"></span>' + l.label;
    b.addEventListener("click", () => switchLang(l.id));
    langSwitch.appendChild(b);
  });
}
function switchLang(id) {
  const t = getActive();
  if (!t) return;
  t.mode = id;
  renderLangSwitch();
  loadActiveIntoEditor();
}
function closeTab(id) {
  const idx = tabs.findIndex((t) => t.id === id);
  tabs = tabs.filter((t) => t.id !== id);
  if (tabs.length === 0) { const f = makeTab(); tabs = [f]; activeId = f.id; }
  else if (id === activeId) activeId = tabs[Math.max(0, idx - 1)].id;
  renderTabs(); renderLangSwitch(); loadActiveIntoEditor(); renderConsole(); renderPreview();
}
function newTab() {
  const t = makeTab();
  tabs.push(t);
  setActive(t.id);
}
function renameTab(id) {
  const t = tabs.find((x) => x.id === id);
  const name = prompt("Tab name", t ? t.name : "");
  if (name && name.trim()) { t.name = name.trim(); renderTabs(); }
}
function togglePin(id) {
  const t = tabs.find((x) => x.id === id);
  if (!t) return;
  t.pinned = !t.pinned;
  renderTabs();
}

/* ---------- Context menu ---------- */
function openCtxMenu(x, y, id) {
  const t = tabs.find((x) => x.id === id);
  if (!t) return;
  ctxMenu.innerHTML =
    '<button class="ctx-item" data-act="rename">Rename</button>' +
    '<button class="ctx-item" data-act="pin">' + (t.pinned ? "Unpin" : "Pin") + "</button>" +
    '<div class="ctx-sep"></div>' +
    '<button class="ctx-item danger" data-act="close">Close</button>';
  ctxMenu.style.left = Math.min(x, window.innerWidth - 180) + "px";
  ctxMenu.style.top = Math.min(y, window.innerHeight - 130) + "px";
  ctxMenu.hidden = false;
  ctxMenu.querySelectorAll(".ctx-item").forEach((b) => {
    b.addEventListener("click", () => {
      const act = b.dataset.act;
      if (act === "rename") renameTab(id);
      else if (act === "pin") togglePin(id);
      else if (act === "close") closeTab(id);
      closeCtxMenu();
    });
  });
}
function closeCtxMenu() { ctxMenu.hidden = true; }
document.addEventListener("mousedown", (e) => { if (!ctxMenu.hidden && !ctxMenu.contains(e.target)) closeCtxMenu(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCtxMenu(); });

/* ---------- Editor ---------- */
function persistEditor() { const t = getActive(); if (t) t[t.mode] = editor.value; }
function updateLineNumbers() {
  const lines = editor.value.split("\n").length;
  let nums = "";
  for (let i = 1; i <= lines; i++) nums += i + "\n";
  lineNumbers.textContent = nums;
  charCount.textContent = editor.value.length + " chars";
}
function updateWrapBtn() { const t = getActive(); $("wrapBtn").textContent = "Wrap: " + (t && t.wrap ? "On" : "Off"); }

editor.addEventListener("input", () => { persistEditor(); updateLineNumbers(); schedulePreview(); });
editor.addEventListener("scroll", () => { lineNumbers.scrollTop = editor.scrollTop; });
editor.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const s = editor.selectionStart, en = editor.selectionEnd;
    editor.value = editor.value.slice(0, s) + "  " + editor.value.slice(en);
    editor.selectionStart = editor.selectionEnd = s + 2;
    persistEditor(); updateLineNumbers(); schedulePreview();
  }
});

let previewTimer;
function schedulePreview() { clearTimeout(previewTimer); previewTimer = setTimeout(renderPreview, 300); }
function renderPreview() { const t = getActive(); if (t) preview.srcdoc = buildDoc(t); }

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

/* ---------- Toolbar ---------- */
$("openBtn").addEventListener("click", () => $("fileInput").click());
$("fileInput").addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const t = makeTab(file.name);
    t.html = String(ev.target?.result ?? "");
    tabs.push(t);
    setActive(t.id);
    toast("Opened: " + file.name);
  };
  reader.readAsText(file);
  e.target.value = "";
});

/* ---------- Drag & drop ---------- */
const editorPane = $("editorPane");
editorPane.addEventListener("dragover", (e) => { e.preventDefault(); });
editorPane.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer?.files || []);
  if (!files.length) return;
  files.forEach((file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = String(ev.target?.result ?? "");
      const t = makeTab(file.name);
      if (ext === "css") t.css = content;
      else if (ext === "js" || ext === "mjs") t.js = content;
      else t.html = content;
      tabs.push(t);
      setActive(t.id);
    };
    reader.readAsText(file);
  });
  toast("Opened " + files.length + " file" + (files.length > 1 ? "s" : ""));
});

$("newBtn").addEventListener("click", newTab);
$("newTabBtn").addEventListener("click", newTab);

$("formatBtn").addEventListener("click", () => {
  const t = getActive();
  if (!t) return;
  t[t.mode] = formatCode(t[t.mode], t.mode);
  editor.value = t[t.mode];
  updateLineNumbers();
  renderPreview();
  toast("Formatted " + t.mode.toUpperCase());
});

function openInNewTab() {
  const t = getActive();
  const w = window.open("about:blank", "_blank");
  if (!w) { toast("Popup blocked — allow popups"); return; }
  w.document.open(); w.document.write(buildDoc(t)); w.document.close();
}
$("newTabWindowBtn") && $("newTabWindowBtn").addEventListener("click", openInNewTab);
$("openTabSmall").addEventListener("click", openInNewTab);

$("saveBtn").addEventListener("click", () => {
  const t = getActive();
  const blob = new Blob([buildDoc(t)], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = (t && t.name) || "untitled.html"; a.click();
  URL.revokeObjectURL(url); toast("Saved");
});
$("copyBtn").addEventListener("click", async () => {
  const t = getActive();
  try { await navigator.clipboard.writeText(t[t.mode]); toast("Copied " + t.mode.toUpperCase()); }
  catch { toast("Copy failed"); }
});
$("wrapBtn").addEventListener("click", () => {
  const t = getActive(); t.wrap = !t.wrap;
  editor.classList.toggle("wrap", t.wrap); updateWrapBtn();
});
$("clearBtn").addEventListener("click", () => {
  const t = getActive(); t[t.mode] = ""; editor.value = "";
  updateLineNumbers(); renderPreview();
});
$("refreshBtn").addEventListener("click", () => { clearLogs(); renderPreview(); });

document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    view = btn.dataset.view;
    workspace.className = "workspace " + view;
  });
});

window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "t") { e.preventDefault(); newTab(); }
  if ((e.ctrlKey || e.metaKey) && e.key === "w") { e.preventDefault(); closeTab(activeId); }
});

/* ---------- Theme ---------- */
function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("cv-theme", theme);
  const sel = $("themeSelect");
  if (sel) sel.value = theme;
}
$("themeSelect").addEventListener("change", (e) => setTheme(e.target.value));

/* ---------- Templates ---------- */
function populateTemplates() {
  const sel = $("templateSelect");
  const groups = {};
  TEMPLATES.forEach((t) => { (groups[t.category] = groups[t.category] || []).push(t); });
  Object.keys(groups).forEach((cat) => {
    const og = document.createElement("optgroup");
    og.label = cat;
    groups[cat].forEach((t) => {
      const o = document.createElement("option");
      o.value = t.id; o.textContent = t.name;
      og.appendChild(o);
    });
    sel.appendChild(og);
  });
}
function applyTemplate(id) {
  const t = TEMPLATES.find((x) => x.id === id);
  if (!t) return;
  const tab = makeTab(t.name);
  tab.html = t.html; tab.css = t.css; tab.js = t.js;
  tabs.push(tab);
  setActive(t.id);
  toast("Template: " + t.name);
}
$("templateSelect").addEventListener("change", (e) => {
  if (e.target.value) { applyTemplate(e.target.value); e.target.value = ""; }
});
populateTemplates();

/* ---------- Init ---------- */
const init = makeTab("welcome.html");
init.html = SAMPLE_HTML; init.css = SAMPLE_CSS; init.js = SAMPLE_JS;
tabs = [init]; activeId = init.id;
setTheme(localStorage.getItem("cv-theme") || "black");
renderTabs(); renderLangSwitch(); loadActiveIntoEditor(); renderConsole(); renderPreview();
