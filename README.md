# 🎂 Hacker Birthday Website

A cinematic, cyberpunk-themed birthday celebration website. Fully static — perfect for GitHub Pages.

## 🚀 Hosting on GitHub Pages

1. **Create a GitHub repo**: Go to [github.com/new](https://github.com/new), name it (e.g. `happy-birthday`)
2. **Upload files**: Upload `index.html`, `style.css`, `script.js` (and any images) to the repo
3. **Enable Pages**: Go to **Settings → Pages → Source → Deploy from branch → main → / (root) → Save**
4. **Visit**: Your site will be live at `https://yourusername.github.io/happy-birthday/`

## 🎨 Customization Guide & Presets

The website has been pre-configured with the following details:
- **Friend Name**: `Aaryan`
- **Username / Real Name**: `kajukatli`
- **Age**: `16`
- **Memory Vault Images**: Loaded in reverse order (`6.jpeg` for Memory #001, down to `1.jpeg` for Memory #006)

### Pre-configured Secret Commands:
- `reveal` — outputs: `"U are gay"`
- `birthday` — outputs: `"Level 16 unlocked! 🚀"`
- `username` — outputs: `"kajukatli"`
- `help` — displays the expanded command listing

### Change the friend's name
In `script.js`, edit the `CONFIG` object at the top:
```js
const CONFIG = {
  friendName: "Aaryan",  // ← Change this to customize further
  typingMessage: "Your custom message here...",
};
```

### Change the birthday date/countdown
In `script.js`, set `CONFIG.birthdayDate` to a date string like `"2026-06-15T00:00:00"`.

### Edit terminal commands
In `script.js`, find the `commands` object inside `initTerminal()` and add/edit responses.

## ✨ Features
- Matrix rain background
- System boot loading screen
- Glitch text & neon glow effects
- Classified profile card with hologram effect
- "Hack the System" terminal simulation
- Encrypted memory vault (photo gallery)
- Interactive secret terminal with commands
- Live cyber clock
- Party Mode easter egg (type "party")
- Ambient music toggle (Web Audio API)
- AI assistant popups
- Random cyber alerts
- Custom cursor with glow trail
- CRT scanline overlay
- Fully responsive design
