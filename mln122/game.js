const FINISH_DISTANCE = 8200;
const GRAVITY = 2200;
const JUMP_FORCE = 770;
const IMPACT_DURATION = 0.34;
const IMPACT_SPEED_FACTOR = 0.42;
const PLAYER = { width: 76, height: 96 };
const PLAYER_HITBOX = {
  stand: { x: 18, y: 10, width: 40, height: 78 },
  duck: { x: 16, y: 52, width: 54, height: 32 },
};

const eras = [
  {
    year: "1986",
    title: "Đổi mới",
    start: 0,
    bullets: [
      "Điểm mở: lực lượng sản xuất bị kìm bởi cơ chế bao cấp.",
      "Khi bấm chạy, nhân vật tượng trưng cho việc giải phóng động lực sản xuất.",
    ],
  },
  {
    year: "1995",
    title: "Mở cửa - FDI",
    start: 0.25,
    bullets: [
      "Nhà máy và khu công nghiệp xuất hiện: vốn, kỹ thuật, việc làm.",
      "Cần nói rõ: thu hút FDI không đồng nghĩa phụ thuộc, phải học công nghệ.",
    ],
  },
  {
    year: "2007",
    title: "Hội nhập WTO",
    start: 0.5,
    bullets: [
      "Cảng biển, container, đô thị: Việt Nam vào chuỗi cung ứng toàn cầu.",
      "Chướng ngại ở đoạn này là cạnh tranh, khủng hoảng, năng suất thấp.",
    ],
  },
  {
    year: "2025",
    title: "Công nghiệp 4.0",
    start: 0.75,
    bullets: [
      "AI, dữ liệu, bán dẫn, tự động hóa là item cần hứng để bứt tốc.",
      "Chốt vấn đề: hiện đại hóa phải đi cùng tự chủ công nghệ và nhân lực CLC.",
    ],
  },
];

const gameplayPickups = [
  { label: "FDI", icon: "FDI", color: "#41b6e6", score: 140, effects: { industry: 8, people: 3 } },
  { label: "AI", icon: "AI", color: "#7c5cff", score: 180, effects: { technology: 10, autonomy: 2 } },
  { label: "Nhân lực CLC", icon: "CLC", color: "#49b66e", score: 160, effects: { people: 9, technology: 4 } },
  { label: "Logistics", icon: "LOG", color: "#f5a524", score: 130, effects: { industry: 5, autonomy: 4 } },
];

const hazards = {
  jump: [
    { label: "Khủng hoảng", icon: "KH", color: "#e65a4f", score: -110, effects: { industry: -7, people: -5 } },
    { label: "Năng suất thấp", icon: "NS", color: "#c99516", score: -100, effects: { industry: -5, people: -4 } },
    { label: "Ô nhiễm", icon: "ON", color: "#8f6f2a", score: -95, effects: { people: -4, industry: -4 } },
  ],
  duck: [
    { label: "Phụ thuộc CN", icon: "PT", color: "#7c5cff", score: -125, effects: { autonomy: -9, technology: -4 } },
    { label: "Bẫy gia công", icon: "GC", color: "#d04f9f", score: -115, effects: { industry: -5, autonomy: -5 } },
    { label: "Cạnh tranh rẻ", icon: "CT", color: "#e97933", score: -105, effects: { people: -4, industry: -5 } },
  ],
};

const state = {
  status: "ready",
  distance: 0,
  score: 0,
  energy: 100,
  metrics: { industry: 35, technology: 18, autonomy: 42, people: 48 },
  playerY: 0,
  velocity: 0,
  grounded: true,
  ducking: false,
  entities: [],
  uid: 0,
  spawnTimer: 1.15,
  checkpointIndex: 0,
  lastHazardMode: "duck",
  impactTimer: 0,
  lastTime: 0,
};

let audioContext = null;

const el = {
  stage: document.querySelector("#stage"),
  backdrop: document.querySelector(".backdrop"),
  road: document.querySelector(".road"),
  runner: document.querySelector("#runner"),
  entities: document.querySelector("#entities"),
  toast: document.querySelector("#toast"),
  startOverlay: document.querySelector("#startOverlay"),
  checkpointOverlay: document.querySelector("#checkpointOverlay"),
  finishOverlay: document.querySelector("#finishOverlay"),
  checkpointYear: document.querySelector("#checkpointYear"),
  checkpointTitle: document.querySelector("#checkpointTitle"),
  checkpointBullets: document.querySelector("#checkpointBullets"),
  continueButton: document.querySelector("#continueButton"),
  restartButton: document.querySelector("#restartButton"),
  score: document.querySelector("#score"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  energy: document.querySelector("#energy"),
  energyBar: document.querySelector("#energyBar"),
  currentYear: document.querySelector("#currentYear"),
  currentEra: document.querySelector("#currentEra"),
  industry: document.querySelector("#industry"),
  technology: document.querySelector("#technology"),
  autonomy: document.querySelector("#autonomy"),
  people: document.querySelector("#people"),
  industryBar: document.querySelector("#industryBar"),
  technologyBar: document.querySelector("#technologyBar"),
  autonomyBar: document.querySelector("#autonomyBar"),
  peopleBar: document.querySelector("#peopleBar"),
};

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
  return audioContext;
}

function playImpactSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(128, now);
  oscillator.frequency.exponentialRampToValueAtTime(58, now + 0.14);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.13, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.2);
}

function getTrack(stageHeight) {
  const runnerBottom = Number.parseFloat(window.getComputedStyle(el.runner).bottom) || 62;
  const groundY = stageHeight - runnerBottom;
  return {
    groundY,
    playerTop: groundY - PLAYER.height,
  };
}

function currentEra(progress) {
  return [...eras].reverse().find((era) => progress >= era.start) || eras[0];
}

function applyEffects(effects) {
  for (const key of Object.keys(effects)) {
    state.metrics[key] = clamp(state.metrics[key] + effects[key]);
  }
}

function startGame() {
  getAudioContext();
  if (state.status === "finished") {
    resetGame();
    return;
  }
  if (state.status === "checkpoint") {
    state.status = "running";
    el.checkpointOverlay.hidden = true;
    return;
  }
  if (state.status === "ready") {
    state.status = "running";
    el.startOverlay.hidden = true;
    state.spawnTimer = 1.15;
  }
}

function jump() {
  if (state.status !== "running") {
    startGame();
    return;
  }
  if (!state.grounded) return;
  state.ducking = false;
  state.grounded = false;
  state.velocity = JUMP_FORCE;
}

function setDucking(ducking) {
  if (state.status !== "running") return;
  state.ducking = ducking && state.grounded;
}

function showCheckpoint(index) {
  const checkpoint = eras[index];
  state.status = "checkpoint";
  state.checkpointIndex = index;
  el.checkpointYear.textContent = checkpoint.year;
  el.checkpointTitle.textContent = checkpoint.title;
  el.checkpointBullets.innerHTML = checkpoint.bullets.map((line) => `<li>${line}</li>`).join("");
  el.checkpointOverlay.hidden = false;
}

function showToast(text, tone) {
  el.toast.textContent = text;
  el.toast.className = `toast ${tone}`;
  el.toast.hidden = false;
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    el.toast.hidden = true;
  }, 760);
}

function spawnEntity(stageWidth, stageHeight) {
  const progress = Math.min(state.distance / FINISH_DISTANCE, 1);
  const { groundY } = getTrack(stageHeight);
  const isPickup = Math.random() > 0.42;

  if (isPickup) {
    const item = pick(gameplayPickups);
    const lane = Math.random() > (progress > 0.45 ? 0.5 : 0.62) ? "high" : "low";
    const size = 48;
    const y = lane === "high" ? groundY - 158 : groundY - 82;

    state.entities.push({
      id: state.uid++,
      kind: "pickup",
      lane,
      item,
      x: stageWidth + 96,
      y,
      width: size,
      height: size,
    });
    return;
  }

  let mode = Math.random() > 0.5 ? "jump" : "duck";
  if (mode === state.lastHazardMode && Math.random() > 0.35) {
    mode = mode === "jump" ? "duck" : "jump";
  }

  state.lastHazardMode = mode;
  const item = pick(hazards[mode]);
  const shape =
    mode === "duck"
      ? { y: groundY - 106, width: 86, height: 40 }
      : { y: groundY - 54, width: 46, height: 54 };

  state.entities.push({
    id: state.uid++,
    kind: "obstacle",
    mode,
    item,
    x: stageWidth + 96,
    y: shape.y,
    width: shape.width,
    height: shape.height,
  });
}

function overlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function hitEntity(entity) {
  if (entity.kind === "pickup") {
    applyEffects(entity.item.effects);
    state.score += entity.item.score;
    showToast(`+ ${entity.item.label}`, "good");
    return;
  }

  applyEffects(entity.item.effects);
  state.energy = clamp(state.energy - 8);
  state.score = Math.max(0, state.score + entity.item.score);
  state.impactTimer = IMPACT_DURATION;
  playImpactSound();
  el.stage.classList.remove("shake");
  void el.stage.offsetWidth;
  el.stage.classList.add("shake");
  window.setTimeout(() => el.stage.classList.remove("shake"), 260);
  showToast(`Va chạm: ${entity.item.label}`, "bad");
}

function finishGame() {
  state.status = "finished";
  const avg =
    (state.metrics.industry + state.metrics.technology + state.metrics.autonomy + state.metrics.people + state.energy) / 5;
  let title = "Chưa đủ lực chuyển đổi";
  let body = "Các cú va chạm làm suy yếu nền tảng. Dùng kết quả này để nói về rủi ro phụ thuộc và năng suất thấp.";
  if (avg >= 78 && state.score >= 1800) {
    title = "Bứt tốc 4.0";
    body = "Việt Nam giữ nhịp công nghiệp hóa, nâng năng lực công nghệ, nhân lực và tự chủ.";
  } else if (avg >= 58) {
    title = "Qua vạch đích nhưng còn lệch nhịp";
    body = "Hướng đi đúng, nhưng cần cân bằng tăng trưởng, tự chủ, công nghệ và chất lượng lao động.";
  }
  document.querySelector("#finishTitle").textContent = title;
  document.querySelector("#finishBody").textContent = body;
  el.finishOverlay.hidden = false;
}

function resetGame() {
  state.status = "ready";
  state.distance = 0;
  state.score = 0;
  state.energy = 100;
  state.metrics = { industry: 35, technology: 18, autonomy: 42, people: 48 };
  state.playerY = 0;
  state.velocity = 0;
  state.grounded = true;
  state.ducking = false;
  state.entities = [];
  state.spawnTimer = 1.15;
  state.checkpointIndex = 0;
  state.lastHazardMode = "duck";
  state.impactTimer = 0;
  el.startOverlay.hidden = false;
  el.finishOverlay.hidden = true;
  el.checkpointOverlay.hidden = true;
  render();
}

function renderEntities() {
  el.entities.innerHTML = state.entities
    .map(
      (entity) => `
        <div class="entity ${entity.kind} ${entity.mode || ""} ${entity.lane ? `lane-${entity.lane}` : ""}" style="left:${entity.x}px;top:${entity.y}px;width:${entity.width}px;height:${entity.height}px;--entity:${entity.item.color}">
          <div class="icon">${entity.item.icon}</div>
          <div class="label">${entity.item.label}</div>
        </div>
      `,
    )
    .join("");
}

function render() {
  const progress = Math.min(state.distance / FINISH_DISTANCE, 1);
  const era = currentEra(progress);
  const impacted = state.impactTimer > 0;
  const impactStep = Math.floor(state.impactTimer * 40) % 2;
  const impactX = impacted ? (impactStep ? -12 : -6) : 0;
  const impactTilt = impacted ? (impactStep ? -4 : 3) : 0;

  el.backdrop.style.transform = `translateX(-${progress * 75}%)`;
  el.road.style.backgroundPosition = `${-state.distance * 0.7}px 38px, 0 0`;
  el.runner.style.transform = `translate(${impactX}px, ${-state.playerY}px) rotate(${impactTilt}deg)`;
  el.runner.classList.toggle("running", state.status === "running");
  el.runner.classList.toggle("ducking", state.status === "running" && state.ducking && state.grounded);
  el.runner.classList.toggle("hit", impacted);
  el.stage.classList.toggle("impact", impacted);
  el.currentYear.textContent = era.year;
  el.currentEra.textContent = era.title;
  el.score.textContent = state.score;
  el.progressText.textContent = `${Math.round(progress * 100)}%`;
  el.progressBar.style.width = `${progress * 100}%`;
  el.energy.textContent = state.energy;
  el.energyBar.style.width = `${state.energy}%`;

  for (const key of ["industry", "technology", "autonomy", "people"]) {
    el[key].textContent = state.metrics[key];
    el[`${key}Bar`].style.width = `${state.metrics[key]}%`;
  }

  renderEntities();
}

function tick(time) {
  if (!state.lastTime) state.lastTime = time;
  const dt = Math.min((time - state.lastTime) / 1000, 0.035);
  state.lastTime = time;
  state.impactTimer = Math.max(0, state.impactTimer - dt);

  if (state.status === "running") {
    const bounds = el.stage.getBoundingClientRect();
    const progress = Math.min(state.distance / FINISH_DISTANCE, 1);
    const baseSpeed = 200 + progress * 120;
    const speed = baseSpeed * (state.impactTimer > 0 ? IMPACT_SPEED_FACTOR : 1);

    state.distance = Math.min(FINISH_DISTANCE, state.distance + speed * dt);
    const updatedProgress = Math.min(state.distance / FINISH_DISTANCE, 1);
    state.spawnTimer -= dt;
    if (state.spawnTimer <= 0) {
      spawnEntity(bounds.width, bounds.height);
      state.spawnTimer = 1.55 + Math.random() * 0.85 - updatedProgress * 0.1;
    }

    if (!state.grounded) {
      state.velocity -= GRAVITY * dt;
      state.playerY += state.velocity * dt;
      if (state.playerY <= 0) {
        state.playerY = 0;
        state.velocity = 0;
        state.grounded = true;
      }
    }

    const ducking = state.ducking && state.grounded;
    const { playerTop: basePlayerTop } = getTrack(bounds.height);
    const hitbox = ducking ? PLAYER_HITBOX.duck : PLAYER_HITBOX.stand;
    const playerRect = {
      left: bounds.width * 0.15 + hitbox.x,
      right: bounds.width * 0.15 + hitbox.x + hitbox.width,
      top: basePlayerTop - state.playerY + hitbox.y,
      bottom: basePlayerTop - state.playerY + hitbox.y + hitbox.height,
    };

    const nextEntities = [];
    for (const entity of state.entities) {
      entity.x -= speed * dt * 1.35;
      const padX = entity.kind === "pickup" ? 14 : entity.mode === "duck" ? 18 : 12;
      const padY = entity.kind === "pickup" ? 14 : entity.mode === "duck" ? 8 : 10;
      const entityRect = {
        left: entity.x + padX,
        right: entity.x + entity.width - padX,
        top: entity.y + padY,
        bottom: entity.y + entity.height - padY,
      };
      if (overlap(playerRect, entityRect)) {
        hitEntity(entity);
      } else if (entity.x > -120) {
        nextEntities.push(entity);
      }
    }
    state.entities = nextEntities;

    const nextCheckpoint = eras[state.checkpointIndex + 1];
    if (nextCheckpoint && updatedProgress >= nextCheckpoint.start) {
      showCheckpoint(state.checkpointIndex + 1);
    }

    if (state.distance >= FINISH_DISTANCE || state.energy <= 0) {
      finishGame();
    }
  }

  render();
  requestAnimationFrame(tick);
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
    event.preventDefault();
    jump();
  }
  if (event.code === "ArrowDown" || event.code === "KeyS") {
    event.preventDefault();
    setDucking(true);
  }
  if (event.code === "KeyR") resetGame();
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowDown" || event.code === "KeyS") {
    event.preventDefault();
    setDucking(false);
  }
});

el.stage.addEventListener("pointerdown", jump);
el.continueButton.addEventListener("click", startGame);
el.restartButton.addEventListener("click", resetGame);

render();
requestAnimationFrame(tick);
