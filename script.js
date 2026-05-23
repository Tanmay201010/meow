/* ============================================
   HACKER BIRTHDAY - SCRIPT.JS
   All interactive features & animations
   ============================================ */

// ===== CONFIGURATION (CUSTOMIZE HERE) =====
const CONFIG = {
  friendName: "Aaryan",          // Change to your friend's name
  // CUSTOMIZE: birthday message typed on hero section
  typingMessage: "You've been granted full access to the most classified birthday celebration on the internet...",
  // CUSTOMIZE: Set a target birthday date for countdown (null = show live clock instead)
  birthdayDate: null, // e.g. "2026-06-15T00:00:00" or null for elapsed timer
  // Secret key sequence to activate party mode
  partyCode: "party",
};

// ===== MATRIX RAIN BACKGROUND =====
(function initMatrixRain() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>|/\\=+*&@#$%";
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array.from({ length: columns }, () => Math.random() * -100);

  window.addEventListener("resize", () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -100);
  });

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px 'Share Tech Mono', monospace";

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Bright green for the leading character, dimmer for the trail
      if (Math.random() > 0.98) {
        ctx.fillStyle = "#ffffff";
      } else {
        const brightness = Math.random();
        if (brightness > 0.5) {
          ctx.fillStyle = "#00ff41";
        } else {
          ctx.fillStyle = "rgba(0, 255, 65, 0.4)";
        }
      }

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== CUSTOM CURSOR =====
(function initCursor() {
  const cursor = document.getElementById("customCursor");
  const dot = document.getElementById("cursorDot");
  if (!cursor || !dot) return;
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });

  (function animate() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
    requestAnimationFrame(animate);
  })();

  document.querySelectorAll("button, a, .vault-card, .hack-btn, input").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
})();

// ===== CURSOR GLOW TRAIL =====
(function initCursorTrail() {
  const c = document.getElementById("cursorCanvas");
  if (!c) return;
  const ctx = c.getContext("2d");
  let particles = [];

  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener("resize", resize);

  document.addEventListener("mousemove", e => {
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
        life: 1, size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? "0,255,65" : "0,240,255"
      });
    }
    if (particles.length > 80) particles = particles.slice(-80);
  });

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.life -= 0.025;
      if (p.life <= 0) { particles.splice(i, 1); return; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.life})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== BOOT SEQUENCE =====
(function initBoot() {
  const screen = document.getElementById("loadingScreen");
  const container = document.getElementById("bootLines");
  const progress = document.getElementById("bootProgress");
  const bar = document.getElementById("bootProgressBar");
  const accessText = document.getElementById("accessGrantedBoot");
  const main = document.getElementById("mainContent");

  const lines = [
    { text: "[SYSTEM] Booting BirthdayOS v4.2.0...", cls: "" },
    { text: "[BIOS] Checking hardware... OK", cls: "" },
    { text: "QUESTION", cls: "" },
    { text: "[NET] Connecting to party servers...", cls: "cyan" },
    { text: `[NET] IP: ${fakeIP()} — Location: CLASSIFIED`, cls: "purple" },
    { text: "[SEC] Firewall bypass... INITIATED", cls: "" },
    { text: "[WARN] Unauthorized celebration detected!", cls: "error" },
    { text: "[SYS] Initializing Birthday Protocol...", cls: "cyan" },
    { text: "PROGRESS", cls: "" },
    { text: "[SYS] Decrypting Memories...", cls: "" },
    { text: "[SYS] Loading celebration.exe...", cls: "" },
    { text: "[SEC] Security bypassed successfully.", cls: "cyan" },
    { text: "[SYS] All systems operational.", cls: "" },
    { text: "ACCESS", cls: "" },
  ];

  let idx = 0;
  function nextLine() {
    if (idx >= lines.length) return;
    const l = lines[idx];
    if (l.text === "PROGRESS") {
      progress.style.display = "block";
      bar.style.width = "0%";
      setTimeout(() => { bar.style.width = "100%"; }, 100);
      idx++;
      setTimeout(nextLine, 1200);
      return;
    }
    if (l.text === "QUESTION") {
      const qDiv = document.createElement("div");
      qDiv.className = "boot-line cyan";
      qDiv.textContent = "[SYS] >> SECURITY CHECK: What do u smoke? 👀";
      container.appendChild(qDiv);
      setTimeout(() => qDiv.classList.add("show"), 50);
      const inputWrapper = document.createElement("div");
      inputWrapper.className = "boot-line show";
      inputWrapper.style.cssText = "display:flex;gap:8px;align-items:center;margin-top:6px;";
      inputWrapper.innerHTML = `<span style="color:#00ff41;">$&gt;</span><input id="bootQuestion" type="text" autocomplete="off" spellcheck="false" style="background:transparent;border:none;border-bottom:1px solid #00ff41;color:#00ff41;font-family:'Share Tech Mono',monospace;font-size:0.85rem;outline:none;flex:1;padding:2px 6px;" placeholder="type your answer and press Enter...">`;
      container.appendChild(inputWrapper);
      setTimeout(() => {
        const bootQ = document.getElementById("bootQuestion");
        if (!bootQ) return;
        bootQ.focus();
        bootQ.addEventListener("keydown", function handler(e) {
          if (e.key !== "Enter") return;
          const ans = bootQ.value.trim();
          if (!ans) return;
          if (ans.toLowerCase() === "omen") {
            bootQ.removeEventListener("keydown", handler);
            inputWrapper.style.pointerEvents = "none";
            inputWrapper.innerHTML = `<span style="color:#00ff41;">$&gt;</span>&nbsp;<span style="color:#ffffff;">${ans}</span>`;
            setTimeout(() => {
              const resp = document.createElement("div");
              resp.className = "boot-line cyan";
              resp.textContent = `[OK] Identity verified. Welcome back, soldier. 🫡`;
              container.appendChild(resp);
              setTimeout(() => resp.classList.add("show"), 50);
              idx++;
              setTimeout(nextLine, 700);
            }, 300);
          } else {
            bootQ.value = "";
            const denied = document.createElement("div");
            denied.className = "boot-line error";
            denied.textContent = `[ERROR] ACCESS DENIED ❌ — wrong answer. Try again.`;
            container.appendChild(denied);
            setTimeout(() => denied.classList.add("show"), 50);
          }
        });
      }, 300);
      return;
    }
    if (l.text === "ACCESS") {
      accessText.classList.add("show");
      setTimeout(() => {
        screen.classList.add("hidden");
        main.classList.remove("hidden");
        onMainReady();
      }, 1800);
      return;
    }
    const div = document.createElement("div");
    div.className = "boot-line " + l.cls;
    div.textContent = l.text;
    container.appendChild(div);
    setTimeout(() => div.classList.add("show"), 50);
    idx++;
    setTimeout(nextLine, 300 + Math.random() * 200);
  }
  setTimeout(nextLine, 600);
})();

function fakeIP() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".");
}

// ===== ON MAIN CONTENT READY =====
function onMainReady() {
  initTyping();
  initCyberClock();
  initIPTracker();
  initScrollReveal();
  initHackSequence();
  initMemoryVault();
  initTerminal();
  initPartyMode();
  scheduleAlerts();
  scheduleAIPopups();
  // Re-bind cursor hover for dynamic elements
  document.querySelectorAll("button, a, .vault-card, input").forEach(el => {
    el.addEventListener("mouseenter", () => document.getElementById("customCursor")?.classList.add("hover"));
    el.addEventListener("mouseleave", () => document.getElementById("customCursor")?.classList.remove("hover"));
  });
}

// ===== TYPING ANIMATION =====
function initTyping() {
  const el = document.getElementById("typingMessage");
  const text = CONFIG.typingMessage;
  let i = 0;
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 45 + Math.random() * 30);
    }
  }
  setTimeout(type, 500);
}

// ===== CYBER CLOCK =====
function initCyberClock() {
  const el = document.getElementById("cyberClock");
  const h = document.getElementById("cdHours");
  const m = document.getElementById("cdMins");
  const s = document.getElementById("cdSecs");
  const startTime = Date.now();

  function update() {
    const now = new Date();
    el.textContent = now.toLocaleTimeString("en-US", { hour12: false }) + " // " +
      now.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });

    // Elapsed since page load
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const eh = String(Math.floor(elapsed / 3600)).padStart(2, "0");
    const em = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
    const es = String(elapsed % 60).padStart(2, "0");
    if (h) h.textContent = eh;
    if (m) m.textContent = em;
    if (s) s.textContent = es;
  }
  update();
  setInterval(update, 1000);
}

// ===== IP TRACKER ANIMATION =====
function initIPTracker() {
  const el = document.getElementById("ipTracker");
  if (!el) return;
  const msgs = [
    `Tracking IP: ${fakeIP()}`,
    `Location: [ENCRYPTED]`,
    `Connection: SECURE`,
    `Proxy: ${Math.floor(Math.random() * 8) + 2} nodes`,
    `Latency: ${Math.floor(Math.random() * 50 + 10)}ms`,
    `Encryption: AES-256-GCM`,
  ];
  let i = 0;
  function cycle() {
    el.textContent = ">> " + msgs[i % msgs.length];
    i++;
  }
  cycle();
  setInterval(cycle, 3000);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// ===== HACK THE SYSTEM =====
function initHackSequence() {
  const btn = document.getElementById("hackBtn");
  const terminal = document.getElementById("hackTerminal");
  const surprise = document.getElementById("surpriseMsg");
  if (!btn) return;

  const steps = [
    { text: "> Connecting to birthday mainframe...", cls: "cmd", delay: 600 },
    { text: "[OK] Connection established.", cls: "info", delay: 400 },
    { text: "> Bypassing firewall...", cls: "cmd", delay: 500 },
    { type: "progress", delay: 1200 },
    { text: "[OK] Firewall bypassed.", cls: "info", delay: 300 },
    { text: "> Accessing classified birthday files...", cls: "cmd", delay: 600 },
    { text: "> Decrypting celebration.exe...", cls: "cmd", delay: 500 },
    { type: "progress", delay: 1000 },
    { text: "[OK] Decryption complete.", cls: "info", delay: 300 },
    { text: "> Downloading cake.pkg (420.69 MB)...", cls: "cmd", delay: 500 },
    { type: "progress", delay: 1200 },
    { text: "[OK] Download complete.", cls: "info", delay: 300 },
    { text: "> Installing party_mode.dll...", cls: "cmd", delay: 500 },
    { text: "> Compiling happiness.c...", cls: "cmd", delay: 400 },
    { text: "[WARN] Extreme celebration levels detected!", cls: "warn", delay: 500 },
    { text: "> Executing birthday_surprise.sh...", cls: "cmd", delay: 600 },
    { type: "progress", delay: 1000 },
    { text: "", cls: "success", delay: 200 },
    { text: "████████████████████████████████████████", cls: "success", delay: 200 },
    { text: "  SYSTEM OVERRIDE COMPLETE", cls: "success", delay: 200 },
    { text: "████████████████████████████████████████", cls: "success", delay: 200 },
  ];

  let running = false;
  btn.addEventListener("click", () => {
    if (running) return;
    running = true;
    terminal.classList.add("active");
    terminal.innerHTML = "";
    btn.textContent = "⚡ HACKING IN PROGRESS...";
    btn.style.pointerEvents = "none";

    let i = 0;
    function nextStep() {
      if (i >= steps.length) {
        setTimeout(() => { surprise.classList.add("show"); }, 400);
        btn.textContent = "✓ HACK COMPLETE";
        return;
      }
      const step = steps[i];
      if (step.type === "progress") {
        const wrap = document.createElement("div");
        wrap.className = "hack-progress-bar";
        const fill = document.createElement("div");
        fill.className = "hack-progress-fill";
        wrap.appendChild(fill);
        terminal.appendChild(wrap);
        terminal.scrollTop = terminal.scrollHeight;
        setTimeout(() => { fill.style.width = "100%"; }, 50);
        i++;
        setTimeout(nextStep, step.delay);
      } else {
        const div = document.createElement("div");
        div.className = step.cls;
        div.textContent = step.text;
        terminal.appendChild(div);
        terminal.scrollTop = terminal.scrollHeight;
        i++;
        setTimeout(nextStep, step.delay);
      }
    }
    nextStep();
  });
}

// ===== MEMORY VAULT =====
function initMemoryVault() {
  const cards = document.querySelectorAll(".vault-card");
  const modal = document.getElementById("vaultModal");
  const modalImg = document.getElementById("vaultModalImage");
  const modalCap = document.getElementById("vaultModalCaption");
  const modalClose = document.getElementById("vaultModalClose");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.add("decrypted");
      // Open modal
      const placeholder = card.querySelector(".gradient-placeholder");
      const img = card.querySelector("img");
      modalImg.innerHTML = "";
      if (img) {
        const clone = img.cloneNode();
        clone.style.width = "100%";
        clone.style.height = "300px";
        clone.style.objectFit = "cover";
        modalImg.appendChild(clone);
      } else if (placeholder) {
        const clone = placeholder.cloneNode();
        clone.style.width = "100%";
        clone.style.height = "300px";
        modalImg.appendChild(clone);
      }
      modalCap.textContent = card.dataset.caption || "Decrypted Memory";
      modal.classList.add("active");
    });
  });

  modalClose.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("active"); });
}

// ===== SECRET TERMINAL =====
function initTerminal() {
  const input = document.getElementById("terminalInput");
  const body = document.getElementById("terminalBody");
  if (!input) return;

  const commands = {
    help: `Available commands:\n  help     — Show this help\n  reveal   — Reveal a secret\n  birthday — Birthday wishes\n  secret   — A hidden message\n  hack     — Quick hack\n  whoami   — Your identity\n  coolness — Check coolness level\n  username — Show username\n  ls       — List files\n  cat      — Read a file\n  party    — ???\n  clear    — Clear terminal`,
    reveal: `🔓 SECRET UNLOCKED:\n"U are gay"`,
    birthday: `🎂 BIRTHDAY TERMINAL:\n\nparty dena bhai 🎉`,
    secret: `chutiya hai tu koi naya secret nahi hai lodu 💀`,
    hack: `gandu itna easy nahi hai hack karna bhosdi ke 😤`,
    whoami: `> User: ${CONFIG.friendName}\n> Role: nigga\n> Permissions: UNLIMITED\n> Status: CELEBRATING\n> Coolness: too hot 🔥`,
    coolness: `> Coolness Level: too hot 🔥\n> Warning: Do not touch — may cause burns`,
    username: `> Username: kajukatli`,
    ls: `total 7\ndrwxr-xr-x  memories/\ndrwxr-xr-x  adventures/\n-rw-r--r--  birthday_wishes.txt\n-rw-r--r--  secret_message.enc\n-rwx------  party_mode.exe\n-rw-r--r--  friendship.log\n-rw-r--r--  README.md`,
    cat: `> cat birthday_wishes.txt\n\nDear ${CONFIG.friendName},\n\nHappy Birthday! 🎂\nYou're not just a year older,\nyou're a year more LEGENDARY.\n\nKeep being amazing!\n\n[EOF]`,
    party: `> Loading party_mode.exe...\n> 🎉 PARTY MODE ACTIVATED! 🎉\n> Type the secret code anywhere on the page!`,
    clear: "CLEAR",
  };

  input.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    // Add prompt line
    addTermLine(`$> ${cmd}`, "prompt");

    if (cmd === "clear") {
      body.innerHTML = "";
      addTermLine("Terminal cleared.", "response");
    } else if (commands[cmd]) {
      const response = commands[cmd];
      response.split("\n").forEach(line => addTermLine(line, "response"));
      if (cmd === "party") activatePartyMode();
    } else {
      addTermLine(`Command not found: ${cmd}`, "error");
      addTermLine('Type "help" for available commands.', "info");
    }
    input.value = "";
    body.scrollTop = body.scrollHeight;
  });

  function addTermLine(text, cls) {
    const div = document.createElement("div");
    div.className = "line " + cls;
    div.textContent = text;
    body.appendChild(div);
  }
}

// ===== PARTY MODE =====
function initPartyMode() {
  let buffer = "";
  document.addEventListener("keydown", e => {
    buffer += e.key.toLowerCase();
    if (buffer.length > 20) buffer = buffer.slice(-20);
    if (buffer.includes(CONFIG.partyCode)) {
      buffer = "";
      activatePartyMode();
    }
  });
}

let partyActive = false;
function activatePartyMode() {
  if (partyActive) return;
  partyActive = true;
  document.body.classList.add("party-mode");

  // Show confetti canvas
  const confCanvas = document.getElementById("confettiCanvas");
  confCanvas.style.display = "block";
  confCanvas.width = window.innerWidth;
  confCanvas.height = window.innerHeight;
  const ctx = confCanvas.getContext("2d");

  const confetti = [];
  const colors = ["#00ff41", "#00f0ff", "#ff0040", "#bc13fe", "#ffaa00", "#ff69b4", "#ffd700"];

  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * confCanvas.width,
      y: Math.random() * confCanvas.height - confCanvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: Math.random() * 3 + 2,
      vx: (Math.random() - 0.5) * 2,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    });
  }

  let frames = 0;
  function drawConfetti() {
    ctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
    confetti.forEach(c => {
      c.y += c.vy;
      c.x += c.vx;
      c.rot += c.rotSpeed;
      if (c.y > confCanvas.height) { c.y = -20; c.x = Math.random() * confCanvas.width; }
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rot * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      ctx.restore();
    });
    frames++;
    if (frames < 600) requestAnimationFrame(drawConfetti);
    else {
      ctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
      confCanvas.style.display = "none";
      document.body.classList.remove("party-mode");
      partyActive = false;
    }
  }
  drawConfetti();

  // Show alert
  showCyberAlert("🎉 PARTY MODE ACTIVATED!", "All systems are now in celebration mode!", "purple");
}

// ===== MUSIC (MP3 - nae_nae_nigga.mp3) =====
(function initMusic() {
  const btn = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");
  if (!btn || !audio) return;
  let playing = false;

  audio.volume = 0.75;

  function startMusic() {
    audio.play().catch(() => {});
    btn.textContent = "♪ MUSIC: ON";
    playing = true;
  }

  function stopMusic() {
    audio.pause();
    btn.textContent = "♪ MUSIC: OFF";
    playing = false;
  }

  // Autoplay on first user interaction (browser policy)
  function tryAutoplay() {
    startMusic();
    document.removeEventListener("click", tryAutoplay);
    document.removeEventListener("keydown", tryAutoplay);
  }

  // Try immediate autoplay first; fall back to first interaction
  audio.play().then(() => {
    btn.textContent = "♪ MUSIC: ON";
    playing = true;
  }).catch(() => {
    // Blocked by browser — wait for user interaction
    document.addEventListener("click", tryAutoplay, { once: true });
    document.addEventListener("keydown", tryAutoplay, { once: true });
  });

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!playing) {
      startMusic();
    } else {
      stopMusic();
    }
  });
})();

// ===== CYBER ALERTS =====
function showCyberAlert(title, msg, type = "") {
  const container = document.getElementById("cyberAlertContainer");
  if (!container) return;
  const div = document.createElement("div");
  div.className = "cyber-alert " + type;
  div.innerHTML = `<div class="alert-title">${title}</div><div class="alert-msg">${msg}</div>`;
  container.appendChild(div);
  setTimeout(() => { div.style.opacity = "0"; div.style.transition = "opacity .5s"; }, 4000);
  setTimeout(() => div.remove(), 4500);
}

function scheduleAlerts() {
  const alerts = [
    { title: "⚠ SECURITY ALERT", msg: "Unauthorized birthday vibes detected in sector 7.", type: "" },
    { title: "📡 SIGNAL DETECTED", msg: "Incoming transmission: 'Happy Birthday!'", type: "cyan" },
    { title: "🔒 FIREWALL UPDATE", msg: "Celebration protocols have been updated.", type: "purple" },
    { title: "⚡ SYSTEM NOTICE", msg: "Happiness levels exceeding normal parameters.", type: "cyan" },
    { title: "🛡 DEFENSE BREACH", msg: "Birthday cake detected. Resistance is futile.", type: "" },
  ];
  let i = 0;
  function next() {
    if (i < alerts.length) {
      const a = alerts[i];
      showCyberAlert(a.title, a.msg, a.type);
      i++;
      setTimeout(next, 15000 + Math.random() * 10000);
    }
  }
  setTimeout(next, 8000);
}

// ===== AI ASSISTANT POPUPS =====
function scheduleAIPopups() {
  const popup = document.getElementById("aiPopup");
  const msgEl = document.getElementById("aiMsg");
  if (!popup || !msgEl) return;

  const messages = [
    `Welcome, ${CONFIG.friendName}. All birthday systems are online.`,
    "I've detected elevated celebration levels. This is normal for today.",
    "Pro tip: Try typing commands in the Secret Terminal below.",
    "Fun fact: You are the #1 reason today is awesome.",
    "Reminder: You are legally required to have fun today. 🎉",
  ];
  let i = 0;
  function showPopup() {
    if (i >= messages.length) return;
    msgEl.textContent = messages[i];
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 5000);
    i++;
    setTimeout(showPopup, 25000 + Math.random() * 15000);
  }
  setTimeout(showPopup, 5000);
}
