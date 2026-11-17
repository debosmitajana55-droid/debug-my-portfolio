/* =========================================================
   Debug My Portfolio: main script (vanilla JS, no libraries)

   1. Content data          5. Fixing a section (with FLIP animations)
   2. Rendering + breaking  6. Fake build screen
   3. Bugs (crawl + squash) 7. Console commands
   4. Sound + confetti      8. Start
   ========================================================= */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const rand = (a, b) => a + Math.random() * (b - a);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------------- 1. Content ---------------- */
  const EMAIL = "debosmitajana55@gmail.com";
  const skills = [
    { name: "C", level: 80, color: "#3de0ff" },
    { name: "C++", level: 75, color: "#7aa2ff" },
    { name: "Python", level: 75, color: "#ffd84d" },
    { name: "JavaScript", level: 65, color: "#f7df1e" },
    { name: "HTML", level: 85, color: "#ff7a45" },
    { name: "CSS", level: 80, color: "#3de0ff" },
    { name: "Git & GitHub", level: 65, color: "#ff4fa3" },
    { name: "SQL / Databases", level: 65, color: "#c6ff3d" },
    { name: "Power BI", level: 70, color: "#ffc53d" },
  ];
  const projects = [
    { emoji: "🐞", title: "Debug My Portfolio", desc: "This website. It deliberately ships broken: crawling bugs, FLIP animations, a working mini terminal and a fake CI build, all in vanilla JavaScript.", tags: ["JavaScript", "CSS animations", "DOM"], link: "https://github.com/debosmitajana55-droid/debug-my-portfolio", linkText: "source ↗" },
    { emoji: "🌐", title: "Personal Portfolio Website", desc: "My classic portfolio: responsive, dark/light theme, scroll animations, filters and a validated contact form.", tags: ["HTML", "CSS", "JavaScript"], link: "https://debosmitajana55-droid.github.io/portfolio/", linkText: "live ↗" },
    { emoji: "🖥️", title: "LAN-Based Examination System", desc: "Diploma project: an exam system that runs over a college Local Area Network, so students take tests from lab PCs connected to a central system.", tags: ["Networking", "LAN", "Client–Server"] },
    { emoji: "🗄️", title: "Database Administration & Website Design", desc: "Diploma project: designed database tables and SQL queries, and built web pages to display and manage the data.", tags: ["SQL", "Database", "HTML", "CSS"] },
    { emoji: "📊", title: "Power BI Data Dashboard", desc: "Interactive dashboards that turn raw data into charts and summaries, with slicers to explore the numbers.", tags: ["Power BI", "Data Analysis"] },
  ];

  const BUGS = {
    hero: { err: "TypeError: name.render is not a function  (hero.js:12)", fix: "fix(hero): render name and rotate photo upright" },
    about: { err: "CSSError: line-height: -1 is not valid  (about.css:7)", fix: "fix(about): restore readable line-height" },
    skills: { err: "RangeError: skill level is NaN  (skills.json:1)", fix: "fix(skills): parse levels as numbers" },
    journey: { err: "LogicError: timeline is not sorted  (journey.log:3)", fix: "fix(journey): sort timeline by year" },
    projects: { err: "LayoutError: z-index war in .cards  (projects/index.css:42)", fix: "fix(projects): put cards back on the grid" },
    contact: { err: "404: contact details not found  (contact.sh:1)", fix: "fix(contact): load real contact info" },
  };
  const order = ["hero", "about", "skills", "journey", "projects", "contact"];
  const fixed = new Set();
  let fixedByUser = 0, autoFixing = false;

  /* ---------------- 2. Rendering + breaking ---------------- */
  $("#skillList").innerHTML = skills.map((s) => `
    <div class="skill" style="--r:${rand(-14, 14).toFixed(1)}deg;--x:${rand(-10, 60).toFixed(0)}px;--y:${rand(0, 70).toFixed(0)}px">
      <div class="skill-top"><span>${s.name}</span><span class="pct">NaN%</span></div>
      <div class="bar"><i style="background:${s.color}" data-w="${s.level}"></i></div>
    </div>`).join("");

  $("#cards").innerHTML = projects.map((p) => `
    <article class="card" style="--r:${rand(-16, 16).toFixed(1)}deg;--x:${rand(0, 55).toFixed(0)}%;--y:${rand(0, 150).toFixed(0)}px">
      <span class="emoji">${p.emoji}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">${p.linkText}</a>` : ""}
    </article>`).join("");

  // journey: wrong dates while broken
  $$("#timeline li").forEach((li) => {
    li.style.setProperty("--r", rand(-3, 3).toFixed(1) + "deg");
    $("time", li).textContent = "undefined";
  });

  // hero: scramble the name until fixed
  const heroName = $("#heroName"), realName = heroName.dataset.text;
  const glyphs = "!<>-_\\/[]{}—=+*^?#01ΔΣλ";
  let scrambleTimer = setInterval(() => {
    heroName.textContent = [...realName].map((c) => (c === " " ? " " : Math.random() < 0.7 ? glyphs[(Math.random() * glyphs.length) | 0] : c)).join("");
  }, 90);
  function decodeName() {
    clearInterval(scrambleTimer);
    let frame = 0;
    const t = setInterval(() => {
      frame++;
      heroName.textContent = [...realName].map((c, i) => (c === " " || i < frame / 2 ? c : glyphs[(Math.random() * glyphs.length) | 0])).join("");
      if (frame / 2 >= realName.length) { clearInterval(t); heroName.textContent = realName; }
    }, 35);
  }

  /* ---------------- 3. Bugs ---------------- */
  const bugSVG = (hue) => `
    <svg viewBox="0 0 46 46" aria-hidden="true">
      <g class="legs" stroke="#111" stroke-width="2.4" stroke-linecap="round">
        <path d="M14 18 L4 12M14 24 L3 24M14 30 L5 37M32 18 L42 12M32 24 L43 24M32 30 L41 37"/>
      </g>
      <path d="M18 9 L13 2M28 9 L33 2" stroke="#111" stroke-width="2" stroke-linecap="round"/>
      <circle cx="23" cy="11" r="6" fill="#151515"/>
      <ellipse cx="23" cy="27" rx="11" ry="14" fill="hsl(${hue} 90% 52%)" stroke="#111" stroke-width="2"/>
      <path d="M23 13 V41" stroke="#111" stroke-width="2"/>
      <circle cx="18" cy="23" r="2.6" fill="#111"/><circle cx="28" cy="25" r="2.6" fill="#111"/>
      <circle cx="19" cy="33" r="2.2" fill="#111"/><circle cx="27.5" cy="34" r="2.2" fill="#111"/>
      <circle cx="20.5" cy="9.5" r="1.3" fill="#fff"/><circle cx="25.5" cy="9.5" r="1.3" fill="#fff"/>
    </svg>`;

  const bugs = [];
  const pointer = { x: -999, y: -999 };
  addEventListener("pointermove", (e) => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });

  order.forEach((id, i) => {
    const sec = $("#" + id);
    const el = document.createElement("button");
    el.className = "bug";
    el.setAttribute("aria-label", `Squash bug: ${BUGS[id].err}`);
    el.title = "squash me!";
    el.innerHTML = bugSVG([0, 25, 330, 280, 15, 350][i]);
    sec.appendChild(el);
    const b = { id, sec, el, svg: el.firstElementChild, x: 0, y: 0, a: rand(0, 6.28), speed: rand(45, 70), flee: 0 };
    placeBug(b, true);
    bugs.push(b);
    el.addEventListener("click", (e) => { e.stopPropagation(); squash(b, true); });
  });

  function placeBug(b, first) {
    const w = b.sec.clientWidth, h = b.sec.clientHeight;
    if (first) { b.x = rand(w * 0.45, w - 80); b.y = rand(60, Math.max(80, h - 90)); }
  }

  let lastT = performance.now();
  function crawl(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    bugs.forEach((b) => {
      if (b.dead) return;
      const w = b.sec.clientWidth, h = b.sec.clientHeight;
      // run away a little if the cursor gets close (desktop only)
      const r = b.sec.getBoundingClientRect();
      const px = pointer.x - r.left, py = pointer.y - r.top;
      const half = b.el.offsetWidth / 2, d = Math.hypot(px - (b.x + half), py - (b.y + half));
      if (d < 90 && b.flee <= 0) { b.a = Math.atan2(b.y + half - py, b.x + half - px) + rand(-0.6, 0.6); b.flee = 0.45; }
      b.flee -= dt;
      b.a += rand(-2.2, 2.2) * dt;
      const sp = b.speed * (b.flee > 0 ? 2.6 : 1);
      b.x += Math.cos(b.a) * sp * dt; b.y += Math.sin(b.a) * sp * dt;
      const sz = b.el.offsetWidth, minY = 40, maxX = w - sz - 4, maxY = h - sz - 6;
      if (b.x < 4 || b.x > maxX) { b.a = Math.PI - b.a; b.x = Math.max(4, Math.min(maxX, b.x)); }
      if (b.y < minY || b.y > maxY) { b.a = -b.a; b.y = Math.max(minY, Math.min(maxY, b.y)); }
      b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
      b.svg.style.transform = `rotate(${(b.a * 180) / Math.PI + 90}deg)`;
    });
    requestAnimationFrame(crawl);
  }

  function squash(b, byUser) {
    if (b.dead) return;
    b.dead = true;
    b.el.classList.add("squashed");
    sfx.splat();
    const splat = document.createElement("div");
    splat.className = "splat";
    splat.style.left = b.x - 8 + "px"; splat.style.top = b.y - 8 + "px";
    splat.innerHTML = `<svg viewBox="0 0 70 70"><path fill="#9be22d" opacity=".85" d="M35 8c6 0 7 9 12 10s11-6 14-1-4 10-2 15 11 5 9 11-10 3-13 8 2 12-4 13-8-7-14-7-9 8-14 5 1-11-3-15-12-1-12-7 9-7 9-12-8-9-4-13 10 2 14-1 3-11 8-12z"/></svg>`;
    b.sec.appendChild(splat);
    setTimeout(() => { b.el.remove(); }, 520);
    setTimeout(() => splat.remove(), 2600);
    fix(b.id, byUser);
  }

  /* ---------------- 4. Sound + confetti ---------------- */
  let actx = null, soundOn = true;
  const audio = () => { if (!actx) try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} return actx; };
  function tone(f, d, type = "square", v = 0.04, delay = 0) {
    const a = audio(); if (!a || !soundOn) return;
    const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + delay;
    o.type = type; o.frequency.setValueAtTime(f, t); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(a.destination); o.start(t); o.stop(t + d + 0.05);
  }
  const sfx = {
    splat() {
      const a = audio(); if (!a || !soundOn) return;
      const len = a.sampleRate * 0.18, buf = a.createBuffer(1, len, a.sampleRate), ch = buf.getChannelData(0);
      for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      const src = a.createBufferSource(), g = a.createGain(), f = a.createBiquadFilter();
      f.type = "lowpass"; f.frequency.value = 900; g.gain.value = 0.35;
      src.buffer = buf; src.connect(f).connect(g).connect(a.destination); src.start();
      tone(520, 0.12, "square", 0.03, 0.12); tone(780, 0.16, "square", 0.03, 0.2);
    },
    win() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.25, "triangle", 0.06, i * 0.11)); },
  };
  $("#soundBtn").onclick = () => { soundOn = !soundOn; $("#soundBtn").textContent = soundOn ? "🔊" : "🔇"; };

  const cf = $("#confetti"), cctx = cf.getContext("2d");
  function confetti() {
    cf.width = innerWidth; cf.height = innerHeight;
    const colors = ["#c6ff3d", "#ff4fa3", "#3de0ff", "#ffd84d", "#ffffff"];
    const ps = Array.from({ length: 220 }, () => ({ x: innerWidth / 2 + rand(-80, 80), y: innerHeight * 0.35, vx: rand(-9, 9), vy: rand(-15, -4), r: rand(4, 9), c: colors[(Math.random() * 5) | 0], a: rand(0, 6), va: rand(-0.3, 0.3) }));
    let frames = 0;
    (function step() {
      cctx.clearRect(0, 0, cf.width, cf.height);
      ps.forEach((p) => {
        p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
        cctx.save(); cctx.translate(p.x, p.y); cctx.rotate(p.a); cctx.fillStyle = p.c; cctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); cctx.restore();
      });
      if (++frames < 200) requestAnimationFrame(step); else cctx.clearRect(0, 0, cf.width, cf.height);
    })();
  }

  /* ---------------- 5. Fixing a section ---------------- */
  // FLIP: animate elements from where they were (broken) to where they end up (fixed)
  function flip(els, change) {
    const first = els.map((e) => ({ r: e.getBoundingClientRect(), rot: parseFloat(getComputedStyle(e).getPropertyValue("--r")) || 0 }));
    change();
    els.forEach((e, i) => {
      const last = e.getBoundingClientRect();
      const dx = first[i].r.left + first[i].r.width / 2 - (last.left + last.width / 2);
      const dy = first[i].r.top + first[i].r.height / 2 - (last.top + last.height / 2);
      e.animate([{ transform: `translate(${dx}px, ${dy}px) rotate(${first[i].rot}deg)` }, { transform: "none" }],
        { duration: 750 + i * 70, easing: "cubic-bezier(.2,.9,.25,1.15)" });
    });
  }

  const fixers = {
    hero() { $("#hero").classList.remove("broken"); decodeName(); },
    about() { $("#about").classList.remove("broken"); },
    skills() {
      const els = $$("#skillList .skill");
      flip(els, () => $("#skills").classList.remove("broken"));
      els.forEach((el, i) => {
        const s = skills[i], pct = $(".pct", el), bar = $(".bar i", el);
        setTimeout(() => {
          bar.style.width = s.level + "%";
          let n = 0; const t = setInterval(() => { n = Math.min(s.level, n + 3); pct.textContent = n + "%"; if (n >= s.level) clearInterval(t); }, 20);
        }, 500 + i * 60);
      });
    },
    journey() {
      const list = $("#timeline"), items = $$("#timeline li");
      flip(items, () => {
        $("#journey").classList.remove("broken");
        items.sort((a, b) => a.dataset.order - b.dataset.order).forEach((li) => list.appendChild(li));
      });
      items.forEach((li) => { $("time", li).textContent = li.dataset.year; });
    },
    projects() { const els = $$("#cards .card"); flip(els, () => $("#projects").classList.remove("broken")); },
    contact() {
      $("#contact").classList.remove("broken");
      $$("#contact .c-card").forEach((a, i) => {
        a.href = a.dataset.href;
        if (!a.href.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; }
        const b = $("b", a), txt = a.dataset.real;
        b.textContent = "";
        [...txt].forEach((ch, k) => setTimeout(() => { b.textContent += ch; }, 300 + i * 120 + k * 22));
      });
    },
  };

  function fix(id, byUser) {
    if (fixed.has(id)) return;
    fixed.add(id);
    if (byUser) fixedByUser++;
    const sec = $("#" + id);
    const err = $(".err", sec);
    fixers[id]();
    err.innerHTML = `✔ fixed in commit <b>${Math.random().toString(16).slice(2, 9)}</b> <span>${BUGS[id].fix}</span>`;
    sec.classList.add("fixed-flash");
    setTimeout(() => sec.classList.remove("fixed-flash"), 900);
    const bug = bugs.find((b) => b.id === id);
    if (bug && !bug.dead) { bug.dead = true; bug.el.remove(); }
    log(`$ git commit -m "${BUGS[id].fix}"`, "ok");
    log(`  [main ${Math.random().toString(16).slice(2, 9)}] 1 file changed. Bugs left: ${order.length - fixed.size}`, "dim");
    updateStatus();
  }

  function updateStatus() {
    const left = order.length - fixed.size;
    const bc = $("#bugCount");
    bc.textContent = "🐞 " + left; bc.classList.remove("bump"); void bc.offsetWidth; bc.classList.add("bump");
    $("#buildBar").style.width = (fixed.size / order.length) * 100 + "%";
    if (left === 0) {
      const pill = $("#buildPill");
      pill.className = "build pass"; pill.textContent = "✔ build passing";
      $("#autoFix").disabled = true;
      document.body.classList.remove("hunting");
      $("#byYou").textContent = fixedByUser;
      $("#deployed").hidden = false;
      log("$ npm run build", "info");
      log("✔ 0 errors. Build passed. Deploying to production… 🚀 done.", "ok");
      setTimeout(() => { confetti(); sfx.win(); }, 300);
    }
  }

  async function autoFix() {
    if (autoFixing) return;
    autoFixing = true; $("#autoFix").disabled = true;
    log("$ npm run autofix", "info");
    for (const id of order) {
      if (fixed.has(id)) continue;
      const b = bugs.find((x) => x.id === id);
      b.sec.scrollIntoView({ behavior: "smooth", block: "center" });
      await sleep(650);
      squash(b, false);
      await sleep(900);
    }
    autoFixing = false;
  }
  $("#autoFix").onclick = autoFix;

  /* ---------------- 6. Fake build screen ---------------- */
  const bootLines = [
    ["$ npm run build", ""],
    ["> building debosmita.dev for production…", ""],
    ["✓ 128 modules transformed", "ok"],
    ...order.map((id) => ["✖ " + BUGS[id].err, "bad"]),
    ["", ""],
    ["BUILD FAILED with 6 errors.", "bad"],
    ["shipping it anyway 🙃  …someone please fix this", ""],
  ];
  let bootDone = false;
  async function boot() {
    const pre = $("#bootLog");
    for (const [txt, cls] of bootLines) {
      if (bootDone) return;
      pre.insertAdjacentHTML("beforeend", `<span class="${cls}">${txt}</span>\n`);
      if (txt.startsWith("BUILD FAILED")) $("#boot").classList.add("flash");
      await sleep(cls === "bad" ? 220 : 380);
    }
    await sleep(700);
    endBoot();
  }
  function endBoot() {
    if (bootDone) return;
    bootDone = true;
    $("#boot").classList.add("hide");
    setTimeout(() => $("#boot").remove(), 600);
    order.forEach((id) => log("✖ Uncaught " + BUGS[id].err, "e"));
    log("🐞 6 bugs are crawling around this page. Click them to fix the site, or type 'help'.", "info");
  }
  $("#boot").addEventListener("click", endBoot);
  addEventListener("keydown", () => { if (!bootDone) endBoot(); }, { once: true });

  /* ---------------- 7. Console ---------------- */
  const logEl = $("#log");
  function log(text, cls = "") {
    const d = document.createElement("div");
    d.className = cls; d.textContent = text;
    logEl.appendChild(d); logEl.scrollTop = logEl.scrollHeight;
  }
  $("#consoleToggle").onclick = () => {
    const closed = document.body.classList.toggle("console-closed");
    $("#consoleToggle").setAttribute("aria-expanded", !closed);
    $("#consoleToggle span").textContent = closed ? "▴ console" : "▸ console";
  };

  const cmds = {
    help: () => ["commands:", "  whoami · about · skills · journey · projects · contact", "  bugs · fix <name> · fix all · ls · date · clear", "  sudo hire debosmita"].forEach((l) => log(l, "info")),
    whoami: () => log("Debosmita Jana · B.Tech CSE (2nd year, lateral entry) @ Shoolini University · from Haldia, West Bengal", "ok"),
    ls: () => log("about.md  skills.json  journey.log  projects/  contact.sh  bugs.txt", ""),
    date: () => log(new Date().toString(), ""),
    clear: () => { logEl.innerHTML = ""; },
    bugs: () => { const left = order.filter((id) => !fixed.has(id)); log(left.length ? "open bugs: " + left.join(", ") : "0 open bugs. 🎉", left.length ? "e" : "ok"); },
    "fix all": autoFix,
    "sudo hire debosmita": () => { log("[sudo] permission granted ✨ opening email…", "ok"); location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Let's work together!")}`; },
    "sudo rm -rf /": () => log("nice try 😄 this portfolio has enough bugs already", "e"),
    "hire debosmita": () => log("permission denied. try: sudo hire debosmita", "e"),
  };
  ["about", "skills", "journey", "projects", "contact"].forEach((s) => {
    cmds[s] = () => { $("#" + s).scrollIntoView({ behavior: "smooth" }); log(fixed.has(s) ? `opened ${s} ✔` : `opened ${s} (still broken, squash its bug!)`, fixed.has(s) ? "ok" : "e"); };
  });
  $("#prompt").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = $("#cmd").value.trim(); $("#cmd").value = "";
    if (!raw) return;
    log("guest@debosmita.dev:~$ " + raw, "dim");
    const c = raw.toLowerCase().replace(/\s+/g, " ");
    if (cmds[c]) return cmds[c]();
    const m = c.match(/^fix (\w+)$/);
    if (m && BUGS[m[1]]) { if (fixed.has(m[1])) log(m[1] + " is already fixed ✔", "ok"); else squash(bugs.find((b) => b.id === m[1]), true); return; }
    if (c.startsWith("echo ")) return log(raw.slice(5));
    log(`command not found: ${raw}. type 'help'`, "e");
  });

  /* ---------------- 8. Start ---------------- */
  if (matchMedia("(max-width: 520px)").matches) document.body.classList.add("console-closed"), ($("#consoleToggle span").textContent = "▴ console");
  addEventListener("resize", () => bugs.forEach((b) => { b.x = Math.min(b.x, b.sec.clientWidth - 60); b.y = Math.min(b.y, b.sec.clientHeight - 60); }));
  requestAnimationFrame(crawl);
  boot();
  console.log("%c🐞 Hi! You found the real console. The bugs are on the page though.", "color:#c6ff3d;font-size:14px");
})();
