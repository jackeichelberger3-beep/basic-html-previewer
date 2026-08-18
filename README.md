# HTML File Viewer

A standalone, zero-dependency HTML/CSS/JS playground with a Chrome-style tabbed interface. Edit HTML, CSS, and JavaScript in separate panels, format your code, watch console output, and preview live — in a black/grey Google-inspired UI.

## Features

- 🗂️ **Tabbed interface** — Chrome-style tabs; right-click a tab to **Rename**, **Pin/Unpin**, or **Close**
- 📌 **Pinned tabs** — pinned tabs shrink to an icon and snap to the left, just like Chrome
- 🖱️ **Drag & drop files** — drop `.html`, `.css`, or `.js` files onto the editor to open each in a new tab
- 🧩 **Separate HTML / CSS / JS editors** — segmented switcher per tab; all three combine into one live preview
- 📚 **Templates menu** — 14 ready-made starters: HTML5 boilerplate, CSS reset, JS starter, landing page, flexbox card, grid gallery, animated button, Tic-Tac-Toe, Snake, Memory Match, Reaction Test, Todo List, Digital Clock, Calculator
- ✨ **Format button** — one-click cleanup & indentation for the current panel (HTML, CSS, or JS)
- 🖥️ **Console panel** — captures `console.log/warn/error` and runtime errors from your script, shown at the bottom of the editor
- 📂 **Open HTML files** — load any `.html` / `.htm` file into a new tab
- 👁️ **Live preview** — debounced in-app iframe (scripts run sandboxed)
- 🪟 **New tab window** — renders the combined page in a fresh `about:blank` tab
- 🔄 **Split / Code / Preview** views
- 📋 Copy (current panel), 💾 Save (full HTML), 🔁 Refresh, ↩ Wrap toggle, 🧹 Clear (current panel)
- ⌨️ `Tab` inserts 2 spaces · `Ctrl+T` new tab · `Ctrl+W` close tab
- 🎨 **Themes** — switch between Black (default), Grey, White, and Retro (green-on-black, square corners); remembered across reloads
- 🌙 Google-inspired UI (Google Sans + Roboto Mono), rounded & minimal

## Run

Just open `index.html` in any browser. No build step, no server required.

```
git clone <your-repo>
cd html-viewer
# open index.html
```

## Files

```
html-viewer/
├── index.html
├── style.css
├── script.js
└── templates.js
```

## Notes

- The preview iframe is sandboxed (`allow-scripts allow-forms allow-modals allow-popups allow-same-origin`).
- The console hook is injected into the preview and forwards `console.*` calls and errors to the parent via `postMessage`.
- "New Tab" writes the combined HTML/CSS/JS into a real `about:blank` document for a true full-page render.
- Saving produces a single self-contained `.html` file with the CSS in `<style>` and JS in `<script>`.

MIT — free to use.
