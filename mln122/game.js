(function () {
  "use strict";

  const CONTENT = window.MLN122_CONTENT;
  const SIM = window.MLN122_SIMULATOR;
  const STORAGE_KEY = "mln122.diorama.progress.v1";
  const SCHEMA_VERSION = 6;
  const PRESENTATION_SECONDS = 25 * 60;
  const STAGES = ["briefing", "explore", "decision", "consequence"];

  const root = document.querySelector("#game-root");
  const overlayRoot = document.querySelector("#overlay-root");
  const toastRegion = document.querySelector("#toast-region");
  const routeLabel = document.querySelector("#route-label");
  const routeProgress = document.querySelector("#route-progress");
  const routeProgressbar = document.querySelector("#route-progressbar");
  const routeCount = document.querySelector("#route-count");
  const modeLabel = document.querySelector("#mode-label");
  const miniTime = document.querySelector("#presentation-mini-time");
  const appShell = document.querySelector("#app-shell");

  if (!CONTENT || !SIM || !root || !overlayRoot) {
    document.body.innerHTML = '<p class="fatal-error">Không thể tải dữ liệu game. Hãy kiểm tra content.js và simulator.js.</p>';
    return;
  }

  const view = {
    overlay: null,
    overlayOpener: null,
    transition: null,
    motionFrame: null,
    toastTimer: null,
    timer: { remaining: PRESENTATION_SECONDS, running: false, deadline: null, intervalId: null }
  };

  const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  function emptyPlans() {
    return Object.fromEntries(CONTENT.eras.map((era) => [era.id, {
      visitedAdvisors: [],
      decisions: [],
      completed: false
    }]));
  }

  function defaultState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      contentVersion: CONTENT.version,
      mode: "solo",
      route: { screen: "home", eraId: null, stage: null, advisorId: null },
      plans: emptyPlans(),
      presentationPlans: emptyPlans(),
      startedAt: Date.now(),
      updatedAt: Date.now()
    };
  }

  function getEra(eraId) {
    return CONTENT.eras.find((era) => era.id === eraId) || null;
  }

  function getDilemma(era) {
    return era?.dilemmas?.[0] || null;
  }

  function validPlan(raw, era) {
    const source = raw && typeof raw === "object" ? raw : {};
    const advisorIds = new Set(era.advisors.map((advisor) => advisor.id));
    const visitedAdvisors = Array.isArray(source.visitedAdvisors)
      ? [...new Set(source.visitedAdvisors.filter((id) => advisorIds.has(id)))]
      : [];
    const dilemma = getDilemma(era);
    const decision = Array.isArray(source.decisions)
      ? source.decisions.find((item) => item?.dilemmaId === dilemma.id && dilemma.choices.some((choice) => choice.id === item.choiceId))
      : null;
    const decisions = decision ? [{ dilemmaId: dilemma.id, choiceId: decision.choiceId }] : [];
    return { visitedAdvisors, decisions, completed: Boolean(source.completed && decision) };
  }

  function isEraUnlocked(era, candidate = state) {
    if (candidate.mode === "presentation" || era.order === 0) return true;
    return Boolean(activePlans(candidate)[CONTENT.eras[era.order - 1].id]?.completed);
  }

  function activePlans(candidate = state) {
    return candidate.mode === "presentation" ? candidate.presentationPlans : candidate.plans;
  }

  function validRoute(raw, candidate) {
    const route = raw && typeof raw === "object" ? raw : {};
    if (route.screen === "final") {
      const complete = CONTENT.eras.every((era) => activePlans(candidate)[era.id].completed);
      return complete
        ? { screen: "final", eraId: null, stage: null, advisorId: null }
        : { screen: "home", eraId: null, stage: null, advisorId: null };
    }
    if (route.screen !== "era") return { screen: "home", eraId: null, stage: null, advisorId: null };
    const era = getEra(route.eraId);
    if (!era || !isEraUnlocked(era, candidate)) return { screen: "home", eraId: null, stage: null, advisorId: null };
    const plan = activePlans(candidate)[era.id];
    const migratedStage = route.stage === "report" ? "consequence" : route.stage;
    let stage = STAGES.includes(migratedStage) ? migratedStage : "briefing";
    if (candidate.mode === "solo" && stage === "decision" && plan.visitedAdvisors.length < era.advisors.length) stage = "explore";
    if (stage === "decision" && plan.decisions.length) stage = "consequence";
    if (stage === "consequence" && !plan.decisions.length) stage = "decision";
    const advisorId = stage === "explore" && era.advisors.some((advisor) => advisor.id === route.advisorId)
      ? route.advisorId
      : null;
    return { screen: "era", eraId: era.id, stage, advisorId };
  }

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!raw || typeof raw !== "object") return defaultState();
      const candidate = defaultState();
      candidate.mode = raw.mode === "presentation" ? "presentation" : "solo";
      CONTENT.eras.forEach((era) => { candidate.plans[era.id] = validPlan(raw.plans?.[era.id], era); });
      CONTENT.eras.forEach((era) => { candidate.presentationPlans[era.id] = validPlan(raw.presentationPlans?.[era.id], era); });
      candidate.startedAt = Number.isFinite(Number(raw.startedAt)) ? Number(raw.startedAt) : Date.now();
      candidate.updatedAt = Number.isFinite(Number(raw.updatedAt)) ? Number(raw.updatedAt) : Date.now();
      candidate.route = validRoute(raw.route, candidate);
      return candidate;
    } catch (_error) {
      return defaultState();
    }
  }

  let state = loadState();

  function persist() {
    state.updatedAt = Date.now();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_error) { /* Game vẫn chạy nếu storage bị chặn. */ }
  }

  // Ghi lại ngay state đã chuẩn hóa để lần tải sau không phải đi qua schema cũ.
  persist();

  function completedCount() {
    const plans = activePlans();
    return CONTENT.eras.filter((era) => plans[era.id].completed).length;
  }

  function currentSimulation() {
    return SIM.calculate(CONTENT, activePlans());
  }

  function firstIncompleteEra() {
    const plans = activePlans();
    return CONTENT.eras.find((era) => !plans[era.id].completed) || CONTENT.eras[CONTENT.eras.length - 1];
  }

  function ensurePresentationHistory(targetEra) {
    if (!targetEra || state.mode !== "presentation") return;
    const demo = SIM.createDemoPlans(CONTENT);
    CONTENT.eras.slice(0, targetEra.order).forEach((era) => {
      if (state.presentationPlans[era.id].completed) return;
      state.presentationPlans[era.id] = {
        visitedAdvisors: era.advisors.map((advisor) => advisor.id),
        decisions: demo[era.id]?.decisions || [],
        completed: true
      };
    });
  }

  function navigate(route) {
    state.route = route;
    persist();
    render();
    requestAnimationFrame(() => root.querySelector("[data-page-title]")?.focus({ preventScroll: true }));
  }

  function startOrResume() {
    const plans = activePlans();
    if (CONTENT.eras.every((era) => plans[era.id].completed)) {
      navigate({ screen: "final", eraId: null, stage: null, advisorId: null });
      return;
    }
    const era = firstIncompleteEra();
    const plan = plans[era.id];
    const stage = plan.decisions.length ? "consequence" : plan.visitedAdvisors.length ? "explore" : "briefing";
    navigate({ screen: "era", eraId: era.id, stage, advisorId: null });
  }

  function visitAdvisor(era, advisorId) {
    if (!era?.advisors.some((advisor) => advisor.id === advisorId)) return;
    const plan = activePlans()[era.id];
    state.route = { screen: "era", eraId: era.id, stage: "explore", advisorId };
    persist();
    render();
    requestAnimationFrame(() => root.querySelector(".advisor-panel [data-page-title]")?.focus({ preventScroll: true }));
  }

  function confirmAdvisor(era, advisorId) {
    if (!era?.advisors.some((advisor) => advisor.id === advisorId)) return;
    const plan = activePlans()[era.id];
    if (!plan.visitedAdvisors.includes(advisorId)) plan.visitedAdvisors.push(advisorId);
    state.route = { screen: "era", eraId: era.id, stage: "explore", advisorId: null };
    persist();
    render();
    requestAnimationFrame(() => {
      const next = root.querySelector(".advisor-hotspot:not(.is-visited)") || root.querySelector('[data-stage="decision"]');
      next?.focus({ preventScroll: true });
    });
    if (plan.visitedAdvisors.length < era.advisors.length) showToast("Đã ghi nhận góc nhìn.");
  }

  function choosePolicy(era, choiceId) {
    if (view.transition) return;
    const plan = activePlans()[era.id];
    if (plan.decisions.length) {
      navigate({ screen: "era", eraId: era.id, stage: "consequence", advisorId: null });
      return;
    }
    const dilemma = getDilemma(era);
    const choice = dilemma?.choices.find((item) => item.id === choiceId);
    if (!choice) return;

    const transition = { eraId: era.id, choiceId: choice.id, timeoutId: null };
    view.transition = transition;
    const decisionStage = root.querySelector(".decision-stage");
    decisionStage?.classList.add("is-committing");
    decisionStage?.setAttribute("aria-busy", "true");
    root.querySelectorAll(".policy-option").forEach((option) => {
      const selected = option.dataset.choiceId === choice.id;
      option.classList.add(selected ? "is-selected" : "is-receding");
      option.disabled = true;
      option.setAttribute("aria-disabled", "true");
    });

    const commit = () => {
      if (view.transition !== transition) return;
      const routeStillMatches = state.route.screen === "era"
        && state.route.stage === "decision"
        && state.route.eraId === era.id;
      view.transition = null;
      if (!routeStillMatches) return;
      plan.decisions = [{ dilemmaId: dilemma.id, choiceId: choice.id }];
      navigate({ screen: "era", eraId: era.id, stage: "consequence", advisorId: null });
    };

    transition.timeoutId = window.setTimeout(commit, prefersReducedMotion() ? 0 : 560);
  }

  function commitEra(era) {
    const plan = activePlans()[era.id];
    if (!plan.decisions.length) return;
    plan.completed = true;
    const next = CONTENT.eras[era.order + 1];
    if (next) navigate({ screen: "era", eraId: next.id, stage: "briefing", advisorId: null });
    else navigate({ screen: "final", eraId: null, stage: null, advisorId: null });
  }

  function dispatch(action, payload = {}) {
    if (view.transition) return;
    const era = getEra(payload.eraId || state.route.eraId);
    switch (action) {
      case "go-home": navigate({ screen: "home", eraId: null, stage: null, advisorId: null }); break;
      case "start-game": startOrResume(); break;
      case "open-era":
        if (era && isEraUnlocked(era)) {
          if (state.mode === "presentation") ensurePresentationHistory(era);
          const plan = activePlans()[era.id];
          const stage = plan.decisions.length ? "consequence" : plan.visitedAdvisors.length ? "explore" : "briefing";
          navigate({ screen: "era", eraId: era.id, stage, advisorId: null });
        }
        break;
      case "set-stage":
        if (era && STAGES.includes(payload.stage)) {
          const plan = activePlans()[era.id];
          if (payload.stage === "decision" && plan.decisions.length) {
            navigate({ screen: "era", eraId: era.id, stage: "consequence", advisorId: null });
            break;
          }
          if (payload.stage === "consequence" && !plan.decisions.length) break;
          navigate({ screen: "era", eraId: era.id, stage: payload.stage, advisorId: null });
        }
        break;
      case "visit-advisor": visitAdvisor(era, payload.advisorId); break;
      case "confirm-advisor": confirmAdvisor(era, payload.advisorId); break;
      case "close-advisor": navigate({ screen: "era", eraId: era.id, stage: "explore", advisorId: null }); break;
      case "choose-policy": choosePolicy(era, payload.choiceId); break;
      case "commit-era": commitEra(era); break;
      case "toggle-mode":
        state.mode = state.mode === "solo" ? "presentation" : "solo";
        if (state.mode === "presentation" && era) ensurePresentationHistory(era);
        state.route = validRoute(state.route, state);
        persist();
        render();
        showToast(state.mode === "presentation" ? "Đã bật chế độ trình bày." : "Đã chuyển về chế độ cá nhân.");
        break;
      case "open-final": navigate({ screen: "final", eraId: null, stage: null, advisorId: null }); break;
      case "open-sources": openOverlay("sources"); break;
      case "open-help": openOverlay("help"); break;
      case "open-presenter": openOverlay("presenter"); break;
      case "confirm-reset-all": openOverlay("reset-all"); break;
      case "open-knowledge": if (era) openOverlay({ type: "knowledge", eraId: era.id }); break;
      case "open-takeaway": if (era) openOverlay({ type: "takeaway", eraId: era.id }); break;
      case "check-answer":
        if (view.overlay?.type === "takeaway") {
          view.overlay.selectedAnswer = Number(payload.answerIndex);
          renderOverlay();
        }
        break;
      case "reset-all":
        stopTimer();
        view.timer.remaining = PRESENTATION_SECONDS;
        syncTimer();
        state = defaultState();
        closeOverlay(false);
        persist();
        render();
        showToast("Đã tạo một hành trình mới.");
        break;
      case "close-overlay": closeOverlay(); break;
      case "toggle-fullscreen": toggleFullscreen(); break;
      case "timer-toggle": toggleTimer(); break;
      case "timer-reset": resetTimer(); break;
      case "jump-era":
        if (!era) break;
        state.mode = "presentation";
        ensurePresentationHistory(era);
        closeOverlay(false);
        navigate({ screen: "era", eraId: era.id, stage: "briefing", advisorId: null });
        break;
      case "load-demo": {
        const demo = SIM.createDemoPlans(CONTENT);
        state.mode = "presentation";
        state.presentationPlans = emptyPlans();
        CONTENT.eras.forEach((item) => {
          state.presentationPlans[item.id] = {
            visitedAdvisors: item.advisors.map((advisor) => advisor.id),
            decisions: demo[item.id]?.decisions || [],
            completed: true
          };
        });
        closeOverlay(false);
        navigate({ screen: "final", eraId: null, stage: null, advisorId: null });
        showToast("Đã mở báo cáo dự phòng với lộ trình cân bằng.");
        break;
      }
      default: break;
    }
  }

  function render() {
    if (view.motionFrame) {
      window.cancelAnimationFrame(view.motionFrame);
      view.motionFrame = null;
    }
    const simulation = currentSimulation();
    const era = getEra(state.route.eraId);
    document.body.classList.toggle("is-presentation", state.mode === "presentation");
    document.body.dataset.screen = state.route.screen;
    document.body.dataset.stage = state.route.stage || "";
    document.body.style.setProperty("--era-accent", era?.accent || "#1c6654");
    updateTopbar(era);
    root.innerHTML = state.route.screen === "era" && era
      ? renderEra(era, simulation)
      : state.route.screen === "final"
        ? renderFinal(simulation)
        : renderHome();
    renderOverlay();
    if (state.route.stage === "consequence" || state.route.screen === "final") hydrateMetricMotion();
  }

  function updateTopbar(era) {
    const count = completedCount();
    const plans = activePlans();
    const progress = era ? Math.max(count, era.order + (plans[era.id].completed ? 1 : 0.35)) : count;
    routeLabel.textContent = era ? `${era.period} · ${stageName(state.route.stage)}` : state.route.screen === "final" ? "Chứng nhận chiến lược" : "Mở đầu";
    routeCount.textContent = `${count} / ${CONTENT.eras.length}`;
    routeProgress.style.width = `${Math.min(100, (progress / CONTENT.eras.length) * 100)}%`;
    routeProgressbar?.setAttribute("aria-valuenow", String(count));
    modeLabel.textContent = state.mode === "presentation" ? "Trình bày" : "Cá nhân";
    document.querySelector('[data-action="toggle-mode"]')?.setAttribute("aria-pressed", String(state.mode === "presentation"));
  }

  function stageName(stage) {
    return ({ briefing: "Hồ sơ", explore: "Gặp cố vấn", decision: "Quyết định", consequence: "Hệ quả" })[stage] || "Hành trình";
  }

  function renderHome() {
    const complete = completedCount();
    const plans = activePlans();
    const started = CONTENT.eras.some((era) => plans[era.id].visitedAdvisors.length || plans[era.id].decisions.length);
    const cta = complete === CONTENT.eras.length ? "Xem lại báo cáo" : started ? "Tiếp tục hành trình" : "Bắt đầu từ 1986";
    return `
      <section class="home-screen">
        <div class="home-screen__copy">
          <p class="eyebrow">NHÓM 7 · CHƯƠNG 6</p>
          <h1 data-page-title tabindex="-1">Hành trình<br><em>Kiến thiết.</em></h1>
          <p class="home-screen__lead">Đi qua bốn bước ngoặt của công nghiệp hóa, hiện đại hóa Việt Nam. Học bối cảnh, nghe ba góc nhìn rồi tự chọn con đường.</p>
          <div class="home-screen__actions">
            <button class="button button--primary" type="button" data-action="start-game">${cta}${renderIcon("arrow")}</button>
            <button class="button button--quiet" type="button" data-action="open-help">Cách chơi</button>
          </div>
          <p class="home-screen__note">Mỗi chặng khoảng 4 phút · Tiến trình được lưu trên thiết bị này.</p>
          <p class="home-screen__disclaimer">${escapeHTML(CONTENT.disclaimer)}</p>
        </div>
        <div class="era-ribbon" aria-label="Bốn kỷ nguyên">
          ${CONTENT.eras.map((era) => renderEraRibbon(era)).join("")}
        </div>
      </section>`;
  }

  function renderEraRibbon(era) {
    const plan = activePlans()[era.id];
    const unlocked = isEraUnlocked(era);
    const status = plan.completed ? "Đã ghi nhớ" : unlocked ? "Sẵn sàng" : "Chưa mở";
    return `
      <button class="era-ribbon__item ${plan.completed ? "is-complete" : ""}" type="button" data-action="open-era" data-era-id="${era.id}" ${unlocked ? "" : "disabled"} style="--item-image:url('${era.artwork}');--item-accent:${era.accent}">
        <span class="era-ribbon__number">${era.number}</span>
        <span class="era-ribbon__meta"><strong>${era.period}</strong><small>${escapeHTML(era.title)}</small></span>
        <span class="era-ribbon__status">${status}</span>
      </button>`;
  }

  function renderEra(era, simulation) {
    const plan = activePlans()[era.id];
    return `
      <section class="era-screen stage-${state.route.stage}" style="--era-image:url('${era.artwork}');--era-accent:${era.accent}">
        <header class="era-heading">
          <button class="text-button" type="button" data-action="go-home">${renderIcon("back")} Lộ trình</button>
          <div class="era-heading__identity"><span>Kỷ nguyên ${era.number}</span><strong>${era.period}</strong></div>
          <div class="era-heading__steps" aria-label="Tiến trình trong kỷ nguyên">
            ${STAGES.map((stage, index) => `<span class="${stage === state.route.stage ? "is-current" : stageCompleted(stage, plan) ? "is-done" : ""}" title="${stageName(stage)}" ${stage === state.route.stage ? 'aria-current="step"' : ""}>${index + 1}</span>`).join("")}
          </div>
        </header>
        ${renderStage(era, simulation)}
      </section>`;
  }

  function stageCompleted(stage, plan) {
    if (STAGES.indexOf(stage) < STAGES.indexOf(state.route.stage)) return true;
    if (stage === "briefing") return plan.visitedAdvisors.length > 0;
    if (stage === "explore") return plan.visitedAdvisors.length === 3;
    if (stage === "decision") return plan.decisions.length > 0;
    if (stage === "consequence") return plan.completed;
    return plan.completed;
  }

  function renderStage(era, simulation) {
    if (state.route.stage === "explore") return renderExplore(era);
    if (state.route.stage === "decision") return renderDecision(era);
    if (state.route.stage === "consequence") return renderConsequence(era, simulation);
    return renderBriefing(era);
  }

  function renderBriefing(era) {
    const briefing = era.briefing;
    return `
      <div class="briefing-stage">
        <div class="scene-photo" role="img" aria-label="${escapeHTML(era.artworkAlt)}"></div>
        <article class="briefing-sheet">
          <p class="eyebrow">HỒ SƠ KỶ NGUYÊN · ${era.period}</p>
          <h2 data-page-title tabindex="-1">${escapeHTML(era.milestone.title)}</h2>
          <p class="briefing-sheet__objective">${escapeHTML(briefing.objective)}</p>
          <ol class="theory-points">
            ${briefing.points.map((point, index) => `<li><span>0${index + 1}</span><div><strong>${escapeHTML(point.title)}</strong><p>${escapeHTML(point.text)}</p></div></li>`).join("")}
          </ol>
          <div class="briefing-actions">
            <button class="button button--accent" type="button" data-action="open-knowledge" data-era-id="${era.id}">${renderIcon("bookmark")} Kiến thức</button>
            <button class="button button--primary" type="button" data-action="set-stage" data-stage="explore" data-era-id="${era.id}">Gặp cố vấn (Tùy chọn)${renderIcon("arrow")}</button>
            <button class="button button--quiet" type="button" data-action="set-stage" data-stage="decision" data-era-id="${era.id}">Vào thẳng bàn quyết định</button>
          </div>
        </article>
      </div>`;
  }

  function renderExplore(era) {
    const plan = activePlans()[era.id];
    const selected = era.advisors.find((advisor) => advisor.id === state.route.advisorId);
    return `
      <div class="explore-stage">
        <div class="explore-scene">
          <p class="sr-only">${escapeHTML(era.artworkAlt)}</p>
          <div class="explore-scene__wash"></div>
          <div class="explore-objective">
            <span>Nhiệm vụ hiện tại</span>
            <strong data-page-title tabindex="-1">${state.mode === "presentation" ? "Ba góc nhìn cố vấn" : "Gặp đủ ba cố vấn"}</strong>
            <small>${state.mode === "presentation" ? "Có thể xem nhanh hoặc đi thẳng tới quyết định" : `${plan.visitedAdvisors.length} / 3 góc nhìn đã ghi nhận`}</small>
          </div>
          ${era.advisors.map((advisor, index) => renderHotspot(advisor, era, plan, index)).join("")}
          <div class="explore-footer">
            <p>Bạn có thể tham khảo 3 góc nhìn cố vấn (tùy chọn) hoặc bấm mở bàn quyết định bất kỳ lúc nào.</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <button class="button button--accent" type="button" data-action="open-knowledge" data-era-id="${era.id}">${renderIcon("bookmark")} Kiến thức</button>
              <button class="button button--primary" type="button" data-action="set-stage" data-stage="decision" data-era-id="${era.id}">Mở bàn quyết định${renderIcon("arrow")}</button>
            </div>
          </div>
        </div>
        ${selected ? renderAdvisorPanel(selected, era, plan) : ""}
      </div>`;
  }

  function renderHotspot(advisor, era, plan, index) {
    const visited = plan.visitedAdvisors.includes(advisor.id);
    const active = state.route.advisorId === advisor.id;
    return `
      <button class="advisor-hotspot ${visited ? "is-visited" : ""} ${active ? "is-active" : ""}" type="button" data-action="visit-advisor" data-era-id="${era.id}" data-advisor-id="${advisor.id}" style="--x:${advisor.x}%;--y:${advisor.y}%">
        <span class="advisor-hotspot__pulse"></span>
        <span class="advisor-hotspot__icon">${renderIcon(advisor.icon)}</span>
        <span class="advisor-hotspot__copy"><small>Góc nhìn 0${index + 1}</small><strong>${escapeHTML(advisor.role)}</strong></span>
        ${visited ? `<span class="advisor-hotspot__check">${renderIcon("check")}</span>` : ""}
      </button>`;
  }

  function renderAdvisorPanel(advisor, era, plan) {
    return `
      <aside class="advisor-panel" aria-label="Góc nhìn của ${escapeHTML(advisor.name)}">
        <button class="advisor-panel__close" type="button" data-action="close-advisor" data-era-id="${era.id}" aria-label="Đóng">×</button>
        <div class="advisor-panel__portrait">${renderIcon(advisor.icon)}</div>
        <p class="eyebrow">GÓC NHÌN ${String(era.advisors.indexOf(advisor) + 1).padStart(2, "0")}</p>
        <h2 data-page-title tabindex="-1">${escapeHTML(advisor.name)}</h2>
        <p class="advisor-panel__role">${escapeHTML(advisor.role)}</p>
        <blockquote>“${escapeHTML(advisor.stance)}”</blockquote>
        <div class="advisor-panel__insight"><span>Điều cần cân nhắc</span><p>${escapeHTML(advisor.insight)}</p></div>
        <button class="button button--quiet" type="button" data-action="${plan.visitedAdvisors.includes(advisor.id) ? "close-advisor" : "confirm-advisor"}" data-era-id="${era.id}" data-advisor-id="${advisor.id}">${plan.visitedAdvisors.includes(advisor.id) ? "Đóng hồ sơ" : "Ghi nhận góc nhìn"}</button>
      </aside>`;
  }

  function orderedChoices(era) {
    const choices = [...getDilemma(era).choices];
    const orders = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [1, 0, 2]];
    return orders[era.order].map((index) => choices[index]);
  }

  function renderDecision(era) {
    const dilemma = getDilemma(era);
    return `
      <div class="decision-stage">
        <aside class="decision-context">
          <p class="eyebrow">BÀN QUYẾT ĐỊNH · ${era.period}</p>
          <h2 data-page-title tabindex="-1">${escapeHTML(dilemma.prompt)}</h2>
          <p>${escapeHTML(dilemma.context)}</p>
          <div class="causal-chain">
            ${era.briefing.causal.map((step, index) => `<div><span>0${index + 1}</span><p>${escapeHTML(step)}</p></div>`).join("")}
          </div>
          <small>Không xem trước chỉ số. Hãy dựa vào hồ sơ và ba góc nhìn vừa thu thập.</small>
        </aside>
        <div class="decision-options" role="group" aria-label="Ba phương án chính sách">
          ${orderedChoices(era).map((choice, index) => renderPolicyOption(choice, era, index)).join("")}
        </div>
      </div>`;
  }

  function renderPolicyOption(choice, era, index) {
    const advisor = era.advisors.find((item) => item.id === choice.advisorId);
    return `
      <button class="policy-option" type="button" data-action="choose-policy" data-era-id="${era.id}" data-choice-id="${choice.id}">
        <span class="policy-option__key">${String.fromCharCode(65 + index)}</span>
        <span class="policy-option__icon">${renderIcon(advisor?.icon || "strategy")}</span>
        <span class="policy-option__copy"><small>${escapeHTML(advisor?.role || choice.tag)}</small><strong>${escapeHTML(choice.title)}</strong><p>${escapeHTML(choice.summary)}</p></span>
        <span class="policy-option__arrow">${renderIcon("arrow")}</span>
      </button>`;
  }

  function selectedChoice(era) {
    const decision = activePlans()[era.id].decisions[0];
    return getDilemma(era).choices.find((choice) => choice.id === decision?.choiceId) || null;
  }

  function renderConsequence(era, simulation) {
    const choice = selectedChoice(era);
    if (!choice) return renderDecision(era);
    const eraResult = simulation.eraResults[era.id];
    const result = eraResult?.decisionResults?.[0];
    const baselineGauges = simulation.history[0]?.gauges || SIM.getGauges(CONTENT.initialMetrics);
    const beforeGauges = eraResult?.beforeGauges || SIM.getGauges(result?.before || simulation.metrics);
    const afterGauges = eraResult?.afterGauges || SIM.getGauges(result?.after || simulation.metrics);
    const gaugeDeltas = eraResult?.gaugeDeltas || result?.gaugeDeltas || {};
    const verdicts = {
      recommended: ["Phù hợp nhất", "strong"],
      conditional: ["Hợp lý có điều kiện", "conditional"],
      risky: ["Rủi ro cao", "risky"]
    };
    const [label, tone] = verdicts[choice.verdict] || [choice.verdictLabel, "conditional"];
    const lesson = getDilemma(era).lesson || era.briefing.remember;
    const nextLabel = era.order === CONTENT.eras.length - 1
      ? "Xem chứng nhận"
      : "Sang kỷ nguyên tiếp";
    return `
      <div class="consequence-stage" data-outcome="${choice.verdict}" data-choice="${choice.id}">
        <div class="consequence-world">
          <p class="sr-only">${escapeHTML(era.artworkAlt)}</p>
          <div class="world-caption"><span>Thế giới vừa thay đổi</span><strong>${escapeHTML(choice.worldChange)}</strong></div>
        </div>
        <article class="consequence-card">
          <div class="verdict-stamp verdict-stamp--${tone}" aria-label="Đánh giá: ${escapeHTML(label)}">
            ${renderIcon(tone === "strong" ? "check" : tone === "risky" ? "warning" : "balance")}
            <span><small>Đánh giá</small><strong>${escapeHTML(label)}</strong></span>
          </div>
          <p class="eyebrow">HỆ QUẢ CHÍNH SÁCH</p>
          <h2 data-page-title tabindex="-1">${escapeHTML(choice.title)}</h2>
          <p class="consequence-card__outcome">${escapeHTML(choice.outcome)}</p>
          ${renderCumulativeImpact(beforeGauges, afterGauges, gaugeDeltas, baselineGauges)}
          <div class="consequence-card__actions">
            <button class="button button--accent" type="button" data-action="open-takeaway" data-era-id="${era.id}">${renderIcon("bookmark")} Ghi nhớ</button>
            <button class="button button--primary" type="button" data-action="commit-era" data-era-id="${era.id}">${nextLabel}${renderIcon("arrow")}</button>
          </div>
        </article>
      </div>`;
  }

  function gaugeDefinitions() {
    return [
      { key: "production", label: "Sản xuất", icon: "factory" },
      { key: "connection", label: "Hội nhập", icon: "globe" },
      { key: "resilience", label: "Nội lực", icon: "strategy" }
    ];
  }

  function renderCumulativeImpact(beforeGauges, afterGauges, deltas, baselineGauges) {
    return `<div class="impact-pills cumulative-impact" aria-label="Tác động tích lũy của quyết định">${gaugeDefinitions().map(({ key, label, icon }) => {
      const before = Number(beforeGauges[key] || 0);
      const after = Number(afterGauges[key] || 0);
      const delta = Number(deltas[key] ?? after - before);
      const cumulative = after - Number(baselineGauges[key] || 0);
      const tone = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
      return `<section class="impact-pill cumulative-impact__item impact-pill--${tone}" data-pillar="${key}" aria-label="${label}: từ ${before} thành ${after}; chặng này ${formatImpactValue(delta)}; tích lũy ${formatImpactValue(cumulative)}">
        <div class="impact-pill__heading">
          <span class="cumulative-impact__icon">${renderIcon(icon)}</span>
          <small>${label}</small>
          <span>${SIM.arrowFor(delta)}</span>
        </div>
        <div class="cumulative-impact__values" aria-hidden="true">
          <span><small>Trước</small><strong>${before}</strong></span>
          <i>→</i>
          <span><small>Sau</small><strong data-count-from="${before}" data-count-to="${after}">${after}</strong></span>
        </div>
        <div class="cumulative-impact__journey">
          <span>Chặng này <strong>${formatImpactValue(delta)}</strong></span>
          <span>Từ 1986 <strong>${formatImpactValue(cumulative)}</strong></span>
        </div>
        <span class="impact-pill__float" aria-hidden="true">${formatImpactValue(delta)}</span>
        <span class="impact-pill__meter" aria-hidden="true"><i style="--impact-size:${Math.max(0, Math.min(100, after))}%"></i></span>
      </section>`;
    }).join("")}</div>`;
  }

  function formatImpactValue(value) {
    const rounded = Math.round(Number(value) * 10) / 10;
    if (!rounded) return "±0";
    return rounded > 0 ? `+${rounded}` : `−${Math.abs(rounded)}`;
  }

  function hydrateMetricMotion() {
    const counters = [...root.querySelectorAll("[data-count-to]")];
    if (!counters.length) return;
    const finish = () => counters.forEach((counter) => {
      counter.textContent = formatCounterValue(counter, Number(counter.dataset.countTo));
    });
    if (prefersReducedMotion()) {
      finish();
      return;
    }

    counters.forEach((counter) => {
      counter.textContent = formatCounterValue(counter, Number(counter.dataset.countFrom || 0));
    });
    const startedAt = window.performance.now();
    const duration = 720;
    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach((counter) => {
        const from = Number(counter.dataset.countFrom || 0);
        const target = Number(counter.dataset.countTo);
        const current = Math.round((from + (target - from) * eased) * 10) / 10;
        counter.textContent = formatCounterValue(counter, current);
      });
      if (progress < 1) view.motionFrame = window.requestAnimationFrame(tick);
      else {
        finish();
        view.motionFrame = null;
      }
    };
    view.motionFrame = window.requestAnimationFrame(tick);
  }

  function formatCounterValue(counter, value) {
    return counter.dataset.countFormat === "delta"
      ? formatImpactValue(value)
      : String(Math.round(value * 10) / 10);
  }

  function renderFinal(simulation) {
    const profile = SIM.getProfile(CONTENT, simulation);
    const choices = CONTENT.eras.map((era) => ({ era, choice: selectedChoice(era) })).filter((item) => item.choice);
    const baselineGauges = simulation.history[0]?.gauges || SIM.getGauges(CONTENT.initialMetrics);
    return `
      <section class="final-screen">
        <article class="strategy-certificate">
          <header class="strategy-certificate__header">
            <div class="strategy-certificate__identity">
              <p class="eyebrow">CHỨNG NHẬN CHIẾN LƯỢC · ${escapeHTML(profile.eyebrow)}</p>
              <h1 data-page-title tabindex="-1">${escapeHTML(profile.title)}</h1>
              <p>${escapeHTML(profile.description)}</p>
            </div>
            <div class="strategy-certificate__seal" aria-label="Nhóm 7">
              <span>07</span>
              <small>NHÓM</small>
            </div>
          </header>
          ${renderCertificatePillars(baselineGauges, simulation.gauges)}
          ${renderCertificateTurningPoints(choices)}
          <section class="certificate-summary">
            <p class="eyebrow">TỔNG KẾT BÀI HỌC CHƯƠNG 6</p>
            <div class="certificate-summary__grid">
              <article>
                <div class="certificate-summary__header-line">
                  <span>01</span>
                  <strong>Thể chế là tiền đề</strong>
                </div>
                <p>Đổi mới cơ chế tháo gỡ điểm nghẽn và giải phóng mọi nguồn lực sản xuất xã hội.</p>
              </article>
              <article>
                <div class="certificate-summary__header-line">
                  <span>02</span>
                  <strong>Nội lực là quyết định</strong>
                </div>
                <p>Nguồn lực bên ngoài chỉ phát huy hiệu quả khi có năng lực nội tại để hấp thụ.</p>
              </article>
              <article>
                <div class="certificate-summary__header-line">
                  <span>03</span>
                  <strong>Đổi mới mô hình</strong>
                </div>
                <p>CNH–HĐH hướng tới tự chủ công nghệ, giá trị cao và phát triển bền vững.</p>
              </article>
            </div>
          </section>
          <section class="certificate-models">
            <p class="eyebrow">SO SÁNH CÁC MÔ HÌNH CÔNG NGHIỆP HÓA THẾ GIỚI VS VIỆT NAM</p>
            <div class="certificate-models__grid">
              ${CONTENT.modelComparison.map((m, index) => `
                <article class="model-card ${m.model === "Việt Nam hiện đại" ? "model-card--highlight" : ""}">
                  <div class="model-card__header">
                    <span>0${index + 1}</span>
                    <strong>${escapeHTML(m.model)}</strong>
                  </div>
                  <p class="model-card__logic">${escapeHTML(m.logic)}</p>
                  <small class="model-card__note">${escapeHTML(m.note)}</small>
                </article>
              `).join("")}
            </div>
          </section>
          <footer class="strategy-certificate__footer">
            <p class="certificate-conclusion">Rút ngắn CNH–HĐH chỉ bền vững khi nguồn lực quốc tế được chuyển hóa thành công nghệ, nội lực, giá trị cao và phát triển xanh.</p>
            <div class="certificate-actions">
              <button class="button button--quiet" type="button" data-action="go-home">Về lộ trình</button>
              <button class="button button--primary" type="button" data-action="confirm-reset-all">Hành trình mới${renderIcon("arrow")}</button>
            </div>
          </footer>
        </article>
      </section>`;
  }

  function renderCertificatePillars(baselineGauges, finalGauges) {
    return `<section class="certificate-pillars" aria-label="Ba trụ cột tích lũy sau 40 năm">
      ${gaugeDefinitions().map(({ key, label, icon }) => {
        const baseline = Number(baselineGauges[key] || 0);
        const value = Number(finalGauges[key] || 0);
        const delta = value - baseline;
        const tone = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
        return `<article class="certificate-pillar certificate-pillar--${tone}" data-pillar="${key}" aria-label="${label}: ${value} điểm, thay đổi ${formatImpactValue(delta)} từ mốc đầu">
          <div class="certificate-pillar__label">${renderIcon(icon)}<span>${label}</span></div>
          <strong class="certificate-pillar__value" data-count-from="${baseline}" data-count-to="${value}">${value}</strong>
          <div class="certificate-pillar__delta"><span>Mốc 1986 · ${baseline}</span><strong>${formatImpactValue(delta)}</strong></div>
          <span class="certificate-pillar__meter" aria-hidden="true"><i style="--pillar-value:${Math.max(0, Math.min(100, value))}%"></i></span>
        </article>`;
      }).join("")}
    </section>`;
  }

  function renderCertificateTurningPoints(choices) {
    return `
      <section class="certificate-route" aria-labelledby="certificate-route-title">
        <header>
          <p class="eyebrow">BỐN BƯỚC NGOẶT ĐÃ GHI DẤU</p>
          <h2 id="certificate-route-title">Lộ trình chính sách của bạn</h2>
        </header>
        <div class="certificate-turning-points">
          ${choices.map(({ era, choice }) => `<article class="certificate-turning-point" style="--item-accent:${era.accent}">
            <small>${escapeHTML(era.period)}</small>
            <strong>${escapeHTML(choice.title)}</strong>
          </article>`).join("")}
        </div>
      </section>`;
  }

  function renderIcon(name) {
    const paths = {
      arrow: '<path d="M5 12h13m-5-5 5 5-5 5"/>',
      back: '<path d="m11 6-6 6 6 6m-6-6h14"/>',
      bookmark: '<path d="M7 4.5h10v15l-5-3-5 3z"/>',
      check: '<path d="m5 12 4 4 10-10"/>',
      warning: '<path d="M12 4 3.5 19h17zM12 9v4m0 3h.01"/>',
      balance: '<path d="M12 4v16M7 6h10M5 8l-3 6h6zm14 0-3 6h6zM8 20h8"/>',
      factory: '<path d="M3 20V9l6 4V9l6 4V5h4l2 15zM7 17h2m4 0h2m4 0h1"/>',
      globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18"/>',
      route: '<path d="M5 19c8 0 3-14 11-14m0 0-2-2m2 2-2 2M5 16v6"/>',
      building: '<path d="M5 21V5h10v16M9 9h2m-2 4h2m-2 4h2m6-6h3v10H3"/>',
      links: '<path d="M9.5 14.5 7 17a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0m4.5.5L17 7a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0M8 12h8"/>',
      port: '<path d="M4 20h16M7 17V8h10v9M5 8h14M9 4h6v4m-4 4h2"/>',
      chain: '<path d="M4 7h5v5H4zm11 5h5v5h-5zM9 9.5h3a3 3 0 0 1 3 3"/>',
      spark: '<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zm7 14 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/>',
      chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5M10 10h4v4h-4z"/>',
      leaf: '<path d="M20 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16ZM5 20c3-5 7-8 12-11"/>',
      strategy: '<path d="M4 19V9l8-5 8 5v10M8 13h8m-8 4h8"/>',
      achievement: '<path d="M7 4h10v6a5 5 0 0 1-10 0zM7 6H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4M12 15v5m-4 0h8"/>',
      limitation: '<path d="M12 3v11m0 4v.01M4 21h16L12 3z"/>',
      thesis: '<path d="M5 5h14v14H5zM8 9h8m-8 4h8m-8 3h5"/>'
    };
    return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.strategy}</svg>`;
  }

  function openOverlay(typeOrObj) {
    view.overlayOpener = document.activeElement;
    view.overlay = typeof typeOrObj === "string" ? { type: typeOrObj } : typeOrObj;
    if (appShell) appShell.inert = true;
    document.body.classList.add("has-overlay");
    renderOverlay();
    requestAnimationFrame(() => overlayRoot.querySelector("button, [href]")?.focus());
  }

  function closeOverlay(restoreFocus = true) {
    view.overlay = null;
    overlayRoot.innerHTML = "";
    if (appShell) appShell.inert = false;
    document.body.classList.remove("has-overlay");
    if (restoreFocus) view.overlayOpener?.focus?.();
  }

  function renderOverlay() {
    if (!view.overlay) { overlayRoot.innerHTML = ""; return; }
    const { type } = view.overlay;
    const overlayEra = getEra(view.overlay.eraId);
    let body = "";
    if (type === "sources") body = renderSources();
    if (type === "help") body = renderHelp();
    if (type === "presenter") body = renderPresenter();
    if (type === "knowledge" && overlayEra) body = renderKnowledge(overlayEra);
    if (type === "takeaway" && overlayEra) body = renderTakeaway(overlayEra);
    if (type === "reset-all") body = `<div class="dialog dialog--small"><p class="eyebrow">HÀNH TRÌNH MỚI</p><h2>Xóa tiến trình hiện tại?</h2><p>Bốn lựa chọn đã lưu trên thiết bị này sẽ được đặt lại.</p><div class="dialog__actions"><button class="button button--quiet" data-action="close-overlay">Hủy</button><button class="button button--danger" data-action="reset-all">Đặt lại</button></div></div>`;
    const labels = {
      sources: "Nguồn và minh bạch sử dụng AI",
      help: "Cách chơi",
      presenter: "Kịch bản trình bày",
      knowledge: "Kiến thức lý thuyết",
      takeaway: "Ghi nhớ và tổng kết",
      "reset-all": "Xác nhận tạo hành trình mới"
    };
    overlayRoot.innerHTML = `<div class="overlay">
      <div class="overlay__backdrop" data-action="close-overlay" aria-hidden="true"></div>
      <div class="overlay__surface overlay__surface--${type}" role="dialog" aria-modal="true" aria-label="${labels[type] || "Hộp thoại"}">
        <button class="overlay__close" type="button" data-action="close-overlay" aria-label="Đóng hộp thoại">×</button>
        <div class="overlay__viewport" tabindex="0">${body}</div>
      </div>
    </div>`;
  }
  function renderKnowledge(era) {
    const k = era.knowledge;
    if (!k) return "";
    return `<div class="dialog dialog--knowledge">
      <header class="dialog-header">
        <p class="eyebrow">📚 KIẾN THỨC NỀN TẢNG · KỶ NGUYÊN ${era.number}</p>
        <h2 data-page-title tabindex="-1">${escapeHTML(k.title)}</h2>
      </header>
      <section class="knowledge-concepts">
        ${k.concepts.map((c) => `
          <article class="knowledge-concept-card">
            <div class="knowledge-concept-card__header">
              <span class="knowledge-concept-card__badge">Khái niệm</span>
              <strong>${escapeHTML(c.term)}</strong>
            </div>
            <p>${escapeHTML(c.definition)}</p>
          </article>
        `).join("")}
      </section>
      <section class="knowledge-context-box">
        <p class="eyebrow">📜 BỐI CẢNH LỊCH SỬ</p>
        <p>${escapeHTML(k.context)}</p>
      </section>
      <div class="knowledge-thesis-card">
        <div class="knowledge-thesis-card__icon">${renderIcon("bookmark")}</div>
        <div class="knowledge-thesis-card__content">
          <small>LUẬN ĐIỂM TRỌNG TÂM</small>
          <strong>${escapeHTML(k.thesis)}</strong>
        </div>
      </div>
    </div>`;
  }

  function renderTakeaway(era) {
    const report = era.report;
    if (!report) return "";
    return `<div class="dialog dialog--takeaway">
      <header class="dialog-header">
        <p class="eyebrow">💡 TỔNG KẾT & GHI NHỚ · KỶ NGUYÊN ${era.number}</p>
        <h2 data-page-title tabindex="-1">Tổng kết ${escapeHTML(era.title)} (${escapeHTML(era.period)})</h2>
      </header>
      <div class="takeaway-grid">
        <article class="takeaway-card takeaway-card--achievement">
          <div class="takeaway-card__tag">🟢 THÀNH TỰU NỔI BẬT</div>
          <p>${escapeHTML(report.achievement)}</p>
        </article>
        <article class="takeaway-card takeaway-card--limitation">
          <div class="takeaway-card__tag">🟡 HẠN CHẾ & THÁCH THỨC</div>
          <p>${escapeHTML(report.limitation)}</p>
        </article>
      </div>
      <div class="knowledge-thesis-card">
        <div class="knowledge-thesis-card__icon">${renderIcon("bookmark")}</div>
        <div class="knowledge-thesis-card__content">
          <small>BÀI HỌC LÝ LUẬN CỐT LÕI</small>
          <strong>${escapeHTML(report.thesis)}</strong>
        </div>
      </div>
    </div>`;
  }

  function renderSources() {
    const groups = Object.entries(CONTENT.sources).reduce((all, [id, source]) => {
      (all[source.group] ||= []).push({ id, ...source });
      return all;
    }, {});
    return `<div class="dialog dialog--wide"><p class="eyebrow">MINH BẠCH HỌC THUẬT</p><h2>Nguồn và AI Usage</h2><div class="source-layout"><div>${Object.entries(groups).map(([group, sources]) => `<section class="source-group"><h3>${escapeHTML(group)}</h3>${sources.map((source) => `<article><strong>${escapeHTML(source.label)}</strong><p>${escapeHTML(source.detail)}</p>${source.url ? `<a href="${escapeHTML(source.url)}" target="_blank" rel="noreferrer">Mở nguồn${renderIcon("arrow")}</a>` : ""}</article>`).join("")}</section>`).join("")}</div><aside class="ai-usage"><h3>AI đã hỗ trợ</h3>${CONTENT.aiUsage.assisted.map((item) => `<p>${escapeHTML(item)}</p>`).join("")}<h3>Nhóm chịu trách nhiệm</h3>${CONTENT.aiUsage.verified.map((item) => `<p>${escapeHTML(item)}</p>`).join("")}</aside></div></div>`;
  }

  function renderHelp() {
    return `<div class="dialog dialog--help"><p class="eyebrow">CÁCH CHƠI</p><h2>Bốn nhịp, một quyết định</h2><ol class="help-flow"><li><span>01</span><div><strong>Đọc hồ sơ</strong><p>Nắm ba ý lý thuyết cốt lõi.</p></div></li><li><span>02</span><div><strong>Gặp cố vấn</strong><p>Thu thập đủ ba góc nhìn.</p></div></li><li><span>03</span><div><strong>Chọn chiến lược</strong><p>Cân nhắc kỹ: lựa chọn sẽ được khóa.</p></div></li><li><span>04</span><div><strong>Gánh hệ quả</strong><p>Theo dõi ba trụ cột tích lũy rồi sang kỷ nguyên tiếp.</p></div></li></ol><p class="dialog__note"><kbd>1</kbd>–<kbd>3</kbd> chọn nhanh · <kbd>Esc</kbd> đóng hộp thoại.</p></div>`;
  }

  function renderPresenter() {
    return `<div class="dialog dialog--wide presenter-dialog"><p class="eyebrow">KỊCH BẢN 25 PHÚT · 4 THÀNH VIÊN</p><div class="presenter-clock"><strong data-presenter-time>${formatTime(view.timer.remaining)}</strong><div><button class="button button--primary" data-action="timer-toggle" aria-pressed="${view.timer.running}">${view.timer.running ? "Tạm dừng" : "Bắt đầu"}</button><button class="button button--quiet" data-action="timer-reset">Đặt lại</button></div></div><div class="presenter-runbook">${CONTENT.presentationStages.map((stage) => `<article><span>${escapeHTML(stage.time)}</span><strong>${escapeHTML(stage.member)}</strong><div><h3>${escapeHTML(stage.title)}</h3><p>${escapeHTML(stage.instruction)}</p></div></article>`).join("")}</div><div class="presenter-jumps">${CONTENT.eras.map((era) => `<button class="button button--quiet" data-action="jump-era" data-era-id="${era.id}">${era.number} · ${era.period}</button>`).join("")}<button class="button button--primary" data-action="load-demo">Báo cáo dự phòng${renderIcon("arrow")}</button></div></div>`;
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.ceil(seconds));
    return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function syncTimer() {
    if (view.timer.running && view.timer.deadline) {
      view.timer.remaining = Math.max(0, (view.timer.deadline - Date.now()) / 1000);
      if (view.timer.remaining <= 0) stopTimer();
    }
    miniTime.textContent = formatTime(view.timer.remaining);
    if (view.overlay?.type === "presenter") {
      const clock = overlayRoot.querySelector("[data-presenter-time]");
      if (clock) clock.textContent = formatTime(view.timer.remaining);
      const toggle = overlayRoot.querySelector('[data-action="timer-toggle"]');
      if (toggle) {
        toggle.textContent = view.timer.running ? "Tạm dừng" : "Bắt đầu";
        toggle.setAttribute("aria-pressed", String(view.timer.running));
      }
    }
  }

  function toggleTimer() {
    if (view.timer.running) stopTimer();
    else {
      view.timer.running = true;
      view.timer.deadline = Date.now() + view.timer.remaining * 1000;
      view.timer.intervalId = window.setInterval(syncTimer, 250);
      syncTimer();
    }
  }

  function stopTimer() {
    view.timer.running = false;
    view.timer.deadline = null;
    if (view.timer.intervalId) window.clearInterval(view.timer.intervalId);
    view.timer.intervalId = null;
    syncTimer();
  }

  function resetTimer() {
    stopTimer();
    view.timer.remaining = PRESENTATION_SECONDS;
    syncTimer();
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  }

  function showToast(message) {
    window.clearTimeout(view.toastTimer);
    toastRegion.textContent = message;
    toastRegion.classList.add("is-visible");
    view.toastTimer = window.setTimeout(() => toastRegion.classList.remove("is-visible"), 2400);
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-action]");
    if (!trigger || trigger.getAttribute("aria-disabled") === "true" || trigger.disabled) return;
    const payload = {
      eraId: trigger.dataset.eraId,
      advisorId: trigger.dataset.advisorId,
      choiceId: trigger.dataset.choiceId,
      stage: trigger.dataset.stage,
      answerIndex: trigger.dataset.answerIndex
    };
    dispatch(trigger.dataset.action, payload);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && view.overlay) { closeOverlay(); return; }
    if (view.overlay && event.key === "Tab") {
      const focusable = [...overlayRoot.querySelectorAll('button:not([disabled]), a[href], summary, [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!overlayRoot.contains(document.activeElement)) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      return;
    }
    if (view.overlay) return;
    if (view.transition) return;
    if (event.target.matches("input, textarea, select")) return;
    if (event.key.toLowerCase() === "f") toggleFullscreen();
    if (event.key.toLowerCase() === "p") openOverlay("presenter");
    const choiceKeys = { "1": 0, "2": 1, "3": 2, a: 0, b: 1, c: 2 };
    const pressedChoice = choiceKeys[event.key.toLowerCase()];
    if (state.route.screen === "era" && state.route.stage === "decision" && pressedChoice !== undefined) {
      const era = getEra(state.route.eraId);
      choosePolicy(era, orderedChoices(era)[pressedChoice].id);
    }
  });

  document.addEventListener("visibilitychange", () => { if (!document.hidden) syncTimer(); });
  syncTimer();
  render();
})();
