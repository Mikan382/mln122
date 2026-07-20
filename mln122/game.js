(function () {
  "use strict";

  const CONTENT = window.MLN122_CONTENT;
  const STORAGE_KEY = "mln122.archive.progress.v1";
  const SCHEMA_VERSION = 1;

  const root = document.querySelector("#game-root");
  const overlayRoot = document.querySelector("#overlay-root");
  const toastRegion = document.querySelector("#toast-region");
  const appShell = document.querySelector("#app-shell");
  const routeLabel = document.querySelector("#route-label");
  const routeProgress = document.querySelector("#route-progress");
  const routeCount = document.querySelector("#route-count");

  if (!CONTENT || !root || !overlayRoot) {
    document.body.innerHTML = '<p class="fatal-error">Không thể tải dữ liệu trò chơi. Hãy kiểm tra lại content.js.</p>';
    return;
  }

  const defaultProgress = () => ({
    schemaVersion: SCHEMA_VERSION,
    contentVersion: CONTENT.version,
    route: { screen: "home", eraId: null },
    unlockedEraIds: [CONTENT.eras[0].id],
    completedEraIds: [],
    visitedHotspots: {},
    puzzleResults: {},
    journalUnlocked: [],
    finalResult: null,
    startedAt: Date.now(),
    updatedAt: Date.now()
  });

  let state = loadProgress();
  let view = {
    overlay: null,
    puzzleDraft: null,
    finalDraft: null,
    selectedClassifyId: null,
    selectedFinalId: null,
    puzzleSession: null,
    pendingFocus: null,
    lastScreen: null
  };
  let toastTimer = null;
  const PRESENTATION_SECONDS = 25 * 60;
  const PRESENTATION_STAGES = [
    {
      start: 0,
      end: 5.5 * 60,
      time: "00:00–05:30",
      member: "TV1",
      title: "Mở khóa Đổi mới",
      objective: "Đặt câu hỏi lớn và chứng minh đổi mới thể chế là tiền đề của CNH–HĐH.",
      live: "Trang đầu → Hồ sơ 01 → “Đại hội VI” → puzzle Sắp xếp.",
      interaction: "Cả lớp giơ 1/2 để chọn mắt xích mở đầu.",
      close: "Thể chế mới khơi thông nguồn lực cho tiến trình công nghiệp hóa."
    },
    {
      start: 5.5 * 60,
      end: 11 * 60,
      time: "05:30–11:00",
      member: "TV2",
      title: "Tăng tốc CNH–HĐH",
      objective: "Làm rõ khái niệm CNH–HĐH cùng vai trò của thị trường, vốn, công nghệ và lộ trình.",
      live: "Hồ sơ 02 → “Hội nhập không bằng mọi giá” → puzzle Nối cặp.",
      interaction: "Mời lớp chọn tác động đúng của “Điều kiện và lộ trình”.",
      close: "Nguồn lực ngoài chỉ hiệu quả khi được hấp thụ bằng năng lực trong."
    },
    {
      start: 11 * 60,
      end: 16.5 * 60,
      time: "11:00–16:30",
      member: "TV3",
      title: "Hội nhập sâu",
      objective: "Đánh giá cân bằng thành tựu và giới hạn trong giai đoạn 2007–2020.",
      live: "Hồ sơ 03 → “Thành tựu” + “Giới hạn” → puzzle Chọn chứng cứ.",
      interaction: "Hỏi nhanh: “Gia nhập WTO tự động hoàn tất hiện đại hóa?” — 1 Có / 2 Không.",
      close: "Hội nhập mở cơ hội nhưng không tự động bảo đảm chất lượng CNH–HĐH."
    },
    {
      start: 16.5 * 60,
      end: 22 * 60,
      time: "16:30–22:00",
      member: "TV4",
      title: "Đổi chất mô hình",
      objective: "Kết nối đổi mới sáng tạo, tự chủ, giá trị cao và tăng trưởng xanh.",
      live: "Hồ sơ 04 → Ω Tổng hợp → phân loại 2 thẻ → Báo cáo → Nguồn & AI Usage.",
      interaction: "Mời lớp phân loại một đặc trưng của mô hình truyền thống / hiện đại.",
      close: "Giai đoạn mới phải nâng chất mô hình, không chỉ mở rộng quy mô."
    },
    {
      start: 22 * 60,
      end: 23.5 * 60,
      time: "22:00–23:30",
      member: "CẢ NHÓM",
      title: "Chốt bốn tiếng nói",
      objective: "TV1: 20s logic 4 giai đoạn · TV2: 20s CNH–HĐH và hội nhập · TV3: 20s thành tựu và giới hạn · TV4: 30s giá trị tự học, mời phản biện.",
      live: "Giữ màn Báo cáo làm nền; không mở thêm nội dung mới.",
      interaction: "Nhìn khán giả, mỗi người nói đúng một ý đã phân công.",
      close: "Một hành trình liên tục: mở khóa nguồn lực → tăng tốc → hội nhập sâu → đổi chất mô hình."
    },
    {
      start: 23.5 * 60,
      end: 25 * 60,
      time: "23:30–25:00",
      member: "BUFFER",
      title: "Dự phòng và hard stop",
      objective: "Bù thời gian chuyển người, thao tác hoặc một sự cố kỹ thuật ngắn.",
      live: "Nếu lỗi quá 15 giây, dừng thao tác và dùng màn Báo cáo dự phòng.",
      interaction: "Nếu không phát sinh lỗi, kết thúc sớm thay vì thêm ý mới.",
      close: "24:30 nói câu kết; 25:00 dừng tuyệt đối."
    }
  ];
  let presentationClock = {
    remaining: PRESENTATION_SECONDS,
    running: false,
    intervalId: null,
    deadline: null
  };

  function loadProgress() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!stored || stored.schemaVersion !== SCHEMA_VERSION || stored.contentVersion !== CONTENT.version) {
        return defaultProgress();
      }

      return sanitizeProgress(stored);
    } catch (_error) {
      return defaultProgress();
    }
  }

  function sanitizeProgress(stored) {
    const fallback = defaultProgress();
    const isRecord = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
    const rawCompleted = Array.isArray(stored.completedEraIds) ? stored.completedEraIds : [];
    const completedEraIds = [];

    for (const era of CONTENT.eras) {
      if (!rawCompleted.includes(era.id)) break;
      completedEraIds.push(era.id);
    }

    const unlockedEraIds = [CONTENT.eras[0].id];
    completedEraIds.forEach((eraId) => {
      const era = getEra(eraId);
      if (!unlockedEraIds.includes(era.id)) unlockedEraIds.push(era.id);
      const nextEra = CONTENT.eras[era.order + 1];
      if (nextEra && !unlockedEraIds.includes(nextEra.id)) unlockedEraIds.push(nextEra.id);
    });

    const visitedHotspots = {};
    if (isRecord(stored.visitedHotspots)) {
      CONTENT.eras.forEach((era) => {
        const rawVisited = stored.visitedHotspots[era.id];
        if (!Array.isArray(rawVisited)) return;
        visitedHotspots[era.id] = unique(rawVisited.filter((id) => era.hotspots.some((hotspot) => hotspot.id === id)));
      });
    }

    const puzzleResults = {};
    if (isRecord(stored.puzzleResults)) {
      CONTENT.eras.forEach((era) => {
        const result = stored.puzzleResults[era.id];
        if (!isRecord(result)) return;
        puzzleResults[era.id] = {
          attempts: Number.isFinite(result.attempts) ? Math.max(0, Math.floor(result.attempts)) : 0,
          hintsUsed: Number.isFinite(result.hintsUsed) ? Math.max(0, Math.floor(result.hintsUsed)) : 0,
          resolved: Boolean(result.resolved),
          assisted: Boolean(result.assisted),
          bestScore: Number.isFinite(result.bestScore) ? Math.max(0, Math.min(100, Math.round(result.bestScore))) : 0
        };
      });
    }

    let finalResult = null;
    if (completedEraIds.length === CONTENT.eras.length && isRecord(stored.finalResult) && isRecord(stored.finalResult.assignments)) {
      const assignments = {};
      CONTENT.finalChallenge.items.forEach((item) => {
        const answer = stored.finalResult.assignments[item.id];
        if (CONTENT.finalChallenge.categories.some((category) => category.id === answer)) assignments[item.id] = answer;
      });
      if (Object.keys(assignments).length === CONTENT.finalChallenge.items.length) {
        const correct = CONTENT.finalChallenge.items.filter((item) => assignments[item.id] === item.answer).length;
        finalResult = {
          correct,
          total: CONTENT.finalChallenge.items.length,
          score: Math.round((correct / CONTENT.finalChallenge.items.length) * 100),
          assignments,
          submittedAt: Number.isFinite(stored.finalResult.submittedAt) ? stored.finalResult.submittedAt : Date.now()
        };
      }
    }

    const route = isRecord(stored.route) ? { screen: stored.route.screen, eraId: stored.route.eraId || null } : fallback.route;
    const simpleScreens = new Set(["home", "hub"]);
    if (["era", "puzzle"].includes(route.screen)) {
      const era = getEra(route.eraId);
      if (!era || !unlockedEraIds.includes(era.id)) Object.assign(route, fallback.route);
      else if (route.screen === "puzzle" && !era.hotspots.every((hotspot) => (visitedHotspots[era.id] || []).includes(hotspot.id))) route.screen = "era";
    } else if (route.screen === "final" && completedEraIds.length !== CONTENT.eras.length) {
      Object.assign(route, { screen: "hub", eraId: null });
    } else if (route.screen === "report" && !finalResult) {
      Object.assign(route, { screen: "hub", eraId: null });
    } else if (!simpleScreens.has(route.screen) && !["era", "puzzle", "final", "report"].includes(route.screen)) {
      Object.assign(route, fallback.route);
    }

    return {
      ...fallback,
      route,
      unlockedEraIds,
      completedEraIds,
      visitedHotspots,
      puzzleResults,
      journalUnlocked: completedEraIds,
      finalResult,
      startedAt: Number.isFinite(stored.startedAt) ? stored.startedAt : fallback.startedAt,
      updatedAt: Number.isFinite(stored.updatedAt) ? stored.updatedAt : fallback.updatedAt
    };
  }

  function persist() {
    state.updatedAt = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_error) {
      showToast("Trình duyệt đang chặn lưu tiến độ. Bạn vẫn có thể chơi trong phiên này.");
    }
  }

  function dispatch(action, payload = {}) {
    const previousScreen = state.route.screen;

    switch (action) {
      case "START":
      case "RESUME":
        state.route = { screen: "hub", eraId: null };
        view.overlay = null;
        break;

      case "GO_HOME":
        state.route = { screen: "home", eraId: null };
        view.overlay = null;
        break;

      case "GO_HUB":
        state.route = { screen: "hub", eraId: null };
        view.overlay = null;
        view.puzzleDraft = null;
        view.puzzleSession = null;
        break;

      case "OPEN_ERA": {
        const era = getEra(payload.eraId);
        if (!era || !state.unlockedEraIds.includes(era.id)) {
          showToast("Hồ sơ này chưa được giải mã.");
          return;
        }
        state.route = { screen: "era", eraId: era.id };
        view.overlay = null;
        view.puzzleDraft = null;
        view.puzzleSession = null;
        break;
      }

      case "OPEN_HOTSPOT": {
        const era = getCurrentEra();
        const hotspot = era && era.hotspots.find((item) => item.id === payload.hotspotId);
        if (!era || !hotspot) return;
        view.overlay = { type: "hotspot", eraId: era.id, hotspotId: hotspot.id };
        break;
      }

      case "COLLECT_HOTSPOT": {
        const era = getEra(payload.eraId);
        const hotspot = era && era.hotspots.find((item) => item.id === payload.hotspotId);
        if (!era || !hotspot) return;
        const visited = new Set(state.visitedHotspots[era.id] || []);
        visited.add(hotspot.id);
        state.visitedHotspots[era.id] = [...visited];
        view.overlay = null;
        showToast(`Đã lưu chứng cứ: ${hotspot.title}`);
        break;
      }

      case "CLOSE_OVERLAY":
        view.overlay = null;
        break;

      case "OPEN_JOURNAL":
        view.overlay = { type: "journal" };
        break;

      case "OPEN_SOURCES":
        view.overlay = { type: "sources" };
        break;

      case "OPEN_HELP":
        view.overlay = { type: "help" };
        break;

      case "OPEN_PRESENTER":
        view.overlay = { type: "presenter" };
        break;

      case "TOGGLE_PRESENTATION_TIMER":
        presentationClock.running ? pausePresentationClock() : startPresentationClock();
        break;

      case "RESET_PRESENTATION_TIMER":
        resetPresentationClock();
        break;

      case "ASK_RESET":
        view.overlay = { type: "reset" };
        break;

      case "RESET_PROGRESS":
        state = defaultProgress();
        view = {
          ...view,
          overlay: null,
          puzzleDraft: null,
          puzzleSession: null,
          finalDraft: null,
          selectedClassifyId: null,
          selectedFinalId: null
        };
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (_error) {
          // State trong bộ nhớ vẫn được reset nếu localStorage không khả dụng.
        }
        showToast("Đã tạo hành trình mới.");
        break;

      case "START_PUZZLE": {
        const era = getCurrentEra();
        if (!era) return;
        if (!hasCollectedAll(era)) {
          showToast("Hãy thu thập đủ ba chứng cứ trước khi mở thử thách.");
          return;
        }
        state.route = { screen: "puzzle", eraId: era.id };
        view.puzzleDraft = createPuzzleDraft(era.puzzle);
        view.puzzleSession = { attempts: 0, hintsUsed: 0 };
        view.overlay = null;
        view.selectedClassifyId = null;
        break;
      }

      case "MOVE_ORDER":
        moveOrderItem(payload.itemId, Number(payload.direction));
        break;

      case "SELECT_MATCH_LEFT":
        if (view.puzzleDraft) view.puzzleDraft.selectedLeft = payload.itemId;
        break;

      case "SELECT_MATCH_RIGHT":
        assignMatch(payload.itemId);
        break;

      case "TOGGLE_EVIDENCE":
        toggleEvidence(payload.itemId);
        break;

      case "SELECT_CLASSIFY_ITEM":
        view.selectedClassifyId = payload.itemId;
        break;

      case "ASSIGN_CLASSIFY":
        assignClassification(payload.categoryId, false);
        break;

      case "RESET_PUZZLE": {
        const era = getCurrentEra();
        if (era) {
          view.puzzleDraft = createPuzzleDraft(era.puzzle);
          view.selectedClassifyId = null;
        }
        break;
      }

      case "SHOW_HINT":
        useHint();
        break;

      case "SUBMIT_PUZZLE":
        submitPuzzle();
        break;

      case "REVEAL_PUZZLE":
        resolvePuzzleWithGuide();
        break;

      case "CONTINUE_FEEDBACK":
        if (payload.resolved === "true") {
          state.route = { screen: "hub", eraId: null };
          view.puzzleDraft = null;
          view.puzzleSession = null;
        }
        view.overlay = null;
        break;

      case "OPEN_FINAL":
        if (!allErasCompleted()) {
          showToast("Hoàn thành bốn hồ sơ để mở thử thách tổng hợp.");
          return;
        }
        state.route = { screen: "final", eraId: null };
        view.finalDraft = { assignments: {} };
        view.selectedFinalId = null;
        view.overlay = null;
        break;

      case "SELECT_FINAL_ITEM":
        view.selectedFinalId = payload.itemId;
        break;

      case "ASSIGN_FINAL":
        assignClassification(payload.categoryId, true);
        break;

      case "RESET_FINAL":
        view.finalDraft = { assignments: {} };
        view.selectedFinalId = null;
        break;

      case "SUBMIT_FINAL":
        submitFinal();
        break;

      case "REPLAY_FINAL":
        state.route = { screen: "final", eraId: null };
        view.finalDraft = { assignments: {} };
        view.selectedFinalId = null;
        break;

      case "REVIEW_WEAKEST": {
        const eraId = getWeakestEraId();
        state.route = { screen: "era", eraId };
        view.overlay = null;
        break;
      }

      default:
        return;
    }

    persist();
    render();

    if (previousScreen !== state.route.screen) {
      window.requestAnimationFrame(() => root.focus({ preventScroll: true }));
      view.pendingFocus = null;
    } else if (!view.overlay && view.pendingFocus) {
      const focusSnapshot = view.pendingFocus;
      const selector = focusSelector(focusSnapshot);
      window.requestAnimationFrame(() => {
        let target = document.querySelector(selector);
        if (target?.disabled && focusSnapshot.itemId) {
          target = document.querySelector(`[data-item-id="${focusSnapshot.itemId}"]:not(:disabled)`);
        }
        if (!target || target.disabled) target = root;
        target?.focus({ preventScroll: true });
        if (view.pendingFocus === focusSnapshot) view.pendingFocus = null;
      });
    } else if (!view.overlay && action === "CLOSE_OVERLAY") {
      window.requestAnimationFrame(() => root.focus({ preventScroll: true }));
    }
  }

  function getEra(eraId) {
    return CONTENT.eras.find((era) => era.id === eraId);
  }

  function getCurrentEra() {
    return getEra(state.route.eraId);
  }

  function allErasCompleted() {
    return CONTENT.eras.every((era) => state.completedEraIds.includes(era.id));
  }

  function hasCollectedAll(era) {
    const visited = state.visitedHotspots[era.id] || [];
    return era.hotspots.every((hotspot) => visited.includes(hotspot.id));
  }

  function createPuzzleDraft(puzzle) {
    if (puzzle.type === "order") {
      const ids = puzzle.items.map((item) => item.id);
      return { type: "order", order: ids.length > 1 ? [...ids].reverse() : ids };
    }
    if (puzzle.type === "match") {
      return { type: "match", matches: {}, selectedLeft: null };
    }
    if (puzzle.type === "evidence") {
      return { type: "evidence", selected: [] };
    }
    return { type: "classify", assignments: {} };
  }

  function moveOrderItem(itemId, direction) {
    if (!view.puzzleDraft || view.puzzleDraft.type !== "order") return;
    const order = [...view.puzzleDraft.order];
    const currentIndex = order.indexOf(itemId);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= order.length) return;
    [order[currentIndex], order[nextIndex]] = [order[nextIndex], order[currentIndex]];
    view.puzzleDraft.order = order;
  }

  function assignMatch(rightId) {
    if (!view.puzzleDraft || view.puzzleDraft.type !== "match" || !view.puzzleDraft.selectedLeft) {
      showToast("Chọn một nguồn lực ở cột trái trước.");
      return;
    }
    Object.keys(view.puzzleDraft.matches).forEach((leftId) => {
      if (view.puzzleDraft.matches[leftId] === rightId) delete view.puzzleDraft.matches[leftId];
    });
    view.puzzleDraft.matches[view.puzzleDraft.selectedLeft] = rightId;
    view.puzzleDraft.selectedLeft = null;
  }

  function toggleEvidence(itemId) {
    if (!view.puzzleDraft || view.puzzleDraft.type !== "evidence") return;
    const selected = new Set(view.puzzleDraft.selected);
    const limit = getCurrentEra()?.puzzle.answer.length || 3;
    if (selected.has(itemId)) selected.delete(itemId);
    else if (selected.size >= limit) {
      showToast(`Chỉ chọn ${limit} chứng cứ. Hãy bỏ một thẻ trước khi đổi lựa chọn.`);
      return;
    } else selected.add(itemId);
    view.puzzleDraft.selected = [...selected];
  }

  function assignClassification(categoryId, isFinal) {
    const draft = isFinal ? view.finalDraft : view.puzzleDraft;
    const selectedId = isFinal ? view.selectedFinalId : view.selectedClassifyId;
    if (!draft || !selectedId) {
      showToast("Chọn một thẻ trước khi phân loại.");
      return;
    }
    draft.assignments[selectedId] = categoryId;
    if (isFinal) view.selectedFinalId = null;
    else view.selectedClassifyId = null;
  }

  function currentPuzzleResult(eraId) {
    return state.puzzleResults[eraId] || { attempts: 0, hintsUsed: 0, resolved: false, bestScore: 0 };
  }

  function currentPuzzleSession() {
    if (!view.puzzleSession) view.puzzleSession = { attempts: 0, hintsUsed: 0 };
    return view.puzzleSession;
  }

  function useHint() {
    const era = getCurrentEra();
    if (!era) return;
    const result = currentPuzzleResult(era.id);
    const session = currentPuzzleSession();
    if (session.hintsUsed >= era.puzzle.hints.length) {
      showToast("Bạn đã mở toàn bộ gợi ý của hồ sơ này.");
      return;
    }
    session.hintsUsed += 1;
    result.hintsUsed = (result.hintsUsed || 0) + 1;
    state.puzzleResults[era.id] = result;
    view.overlay = {
      type: "hint",
      title: `Gợi ý ${session.hintsUsed}/${era.puzzle.hints.length}`,
      body: era.puzzle.hints[session.hintsUsed - 1]
    };
  }

  function puzzleIsComplete(puzzle, draft) {
    if (!draft) return false;
    if (puzzle.type === "order") return draft.order.length === puzzle.items.length;
    if (puzzle.type === "match") return Object.keys(draft.matches).length === puzzle.left.length;
    if (puzzle.type === "evidence") return draft.selected.length === puzzle.answer.length;
    return Object.keys(draft.assignments).length === puzzle.items.length;
  }

  function puzzleIsCorrect(puzzle, draft) {
    if (puzzle.type === "order") return arraysEqual(draft.order, puzzle.answer);
    if (puzzle.type === "match") {
      return Object.keys(puzzle.answer).every((key) => draft.matches[key] === puzzle.answer[key]);
    }
    if (puzzle.type === "evidence") {
      return arraysEqual([...draft.selected].sort(), [...puzzle.answer].sort());
    }
    return puzzle.items.every((item) => draft.assignments[item.id] === item.answer);
  }

  function submitPuzzle() {
    const era = getCurrentEra();
    if (!era || !puzzleIsComplete(era.puzzle, view.puzzleDraft)) {
      showToast("Hãy hoàn tất các lựa chọn trước khi kiểm tra hồ sơ.");
      return;
    }

    const previous = currentPuzzleResult(era.id);
    const session = currentPuzzleSession();
    session.attempts += 1;
    const result = { ...previous, attempts: previous.attempts + 1 };
    const correct = puzzleIsCorrect(era.puzzle, view.puzzleDraft);

    if (correct) {
      const score = Math.max(55, 100 - (session.attempts - 1) * 15 - session.hintsUsed * 8);
      result.resolved = true;
      result.assisted = false;
      result.bestScore = Math.max(result.bestScore || 0, score);
      completeEra(era, result);
      view.overlay = {
        type: "feedback",
        tone: "success",
        resolved: true,
        title: "Lập luận đã khớp",
        body: era.puzzle.explanation,
        score
      };
    } else {
      result.resolved = previous.resolved;
      result.assisted = previous.assisted;
      state.puzzleResults[era.id] = result;
      view.overlay = {
        type: "feedback",
        tone: "warning",
        resolved: false,
        title: "Hồ sơ còn một mắt xích sai",
        body: getWrongFeedback(era.puzzle, session.attempts),
        canReveal: session.attempts >= 3
      };
    }
  }

  function resolvePuzzleWithGuide() {
    const era = getCurrentEra();
    if (!era) return;
    const previous = currentPuzzleResult(era.id);
    const result = {
      ...previous,
      resolved: true,
      assisted: previous.bestScore > 45 ? previous.assisted : true,
      bestScore: Math.max(previous.bestScore || 0, 45)
    };
    completeEra(era, result);
    view.overlay = {
      type: "feedback",
      tone: "guided",
      resolved: true,
      title: "Đã mở bản hướng dẫn",
      body: era.puzzle.explanation,
      score: 45,
      showSolution: true,
      eraId: era.id
    };
  }

  function completeEra(era, result) {
    state.puzzleResults[era.id] = result;
    state.completedEraIds = unique([...state.completedEraIds, era.id]);
    state.journalUnlocked = unique([...state.journalUnlocked, era.id]);
    const nextEra = CONTENT.eras[era.order + 1];
    if (nextEra) state.unlockedEraIds = unique([...state.unlockedEraIds, nextEra.id]);
  }

  function getWrongFeedback(puzzle, attempts) {
    if (attempts === 1) return "Đọc lại quan hệ nguyên nhân – kết quả. Game chưa trừ quyền thử lại.";
    if (attempts === 2) return "Bạn có thể mở gợi ý để thu hẹp lựa chọn trước lần tiếp theo.";
    return "Bạn có thể thử lại hoặc mở bản hướng dẫn để tiếp tục với mức thông thạo thấp hơn.";
  }

  function submitFinal() {
    const items = CONTENT.finalChallenge.items;
    if (!view.finalDraft || Object.keys(view.finalDraft.assignments).length !== items.length) {
      showToast("Hãy phân loại đủ tám thẻ trước khi nộp báo cáo.");
      return;
    }
    const correct = items.filter((item) => view.finalDraft.assignments[item.id] === item.answer).length;
    state.finalResult = {
      correct,
      total: items.length,
      score: Math.round((correct / items.length) * 100),
      assignments: { ...view.finalDraft.assignments },
      submittedAt: Date.now()
    };
    state.route = { screen: "report", eraId: null };
    view.selectedFinalId = null;
  }

  function arraysEqual(first, second) {
    return first.length === second.length && first.every((item, index) => item === second[index]);
  }

  function unique(items) {
    return [...new Set(items)];
  }

  function getOverallScore() {
    const eraScores = CONTENT.eras.map((era) => currentPuzzleResult(era.id).bestScore || 0);
    const eraAverage = eraScores.reduce((sum, score) => sum + score, 0) / CONTENT.eras.length;
    const finalScore = state.finalResult ? state.finalResult.score : 0;
    return Math.round(eraAverage * 0.65 + finalScore * 0.35);
  }

  function getWeakestEraId() {
    return [...CONTENT.eras].sort(
      (a, b) => (currentPuzzleResult(a.id).bestScore || 0) - (currentPuzzleResult(b.id).bestScore || 0)
    )[0].id;
  }

  function render() {
    updateChrome();

    if (state.route.screen === "home") root.innerHTML = renderHome();
    else if (state.route.screen === "hub") root.innerHTML = renderHub();
    else if (state.route.screen === "era") root.innerHTML = renderEra(getCurrentEra());
    else if (state.route.screen === "puzzle") root.innerHTML = renderPuzzle(getCurrentEra());
    else if (state.route.screen === "final") root.innerHTML = renderFinal();
    else if (state.route.screen === "report") root.innerHTML = renderReport();
    else root.innerHTML = renderHome();

    renderOverlay();
    view.lastScreen = state.route.screen;
  }

  function updateChrome() {
    const completed = state.completedEraIds.length;
    const screenNames = {
      home: "Kho lưu trữ quốc gia",
      hub: "Bản đồ hồ sơ",
      era: getCurrentEra() ? `${getCurrentEra().period} · ${getCurrentEra().title}` : "Hồ sơ",
      puzzle: getCurrentEra() ? `Thử thách · ${getCurrentEra().title}` : "Thử thách",
      final: "Thử thách tổng hợp",
      report: "Báo cáo hành trình"
    };
    routeLabel.textContent = screenNames[state.route.screen] || "Hồ sơ Đổi mới";
    routeProgress.style.width = `${(completed / CONTENT.eras.length) * 100}%`;
    routeCount.textContent = `${completed} / ${CONTENT.eras.length}`;
    document.body.dataset.screen = state.route.screen;
  }

  function eraVisualStyle(era) {
    const artwork = era.artwork ? `url('${era.artwork}')` : "none";
    return `--accent: ${era.accent}; --scene-base: ${era.sceneBase}; --scene-art: ${artwork}`;
  }

  function renderHome() {
    const hasProgress = state.completedEraIds.length > 0 || Object.keys(state.visitedHotspots).length > 0;
    return `
      <section class="home-screen">
        <div class="home-screen__content">
          <p class="eyebrow"><span></span> Trải nghiệm học tập cá nhân · Nhóm 7</p>
          <h1>Điều tra hành trình<br /><em>Đổi mới Việt Nam</em></h1>
          <p class="home-screen__lede">Bốn giai đoạn. Mười hai chứng cứ. Một câu hỏi lớn: Việt Nam đã chuyển từ mở khóa sức sản xuất sang một mô hình công nghiệp hóa hiện đại như thế nào?</p>
          <div class="home-screen__actions">
            <button class="button button--primary button--large" type="button" data-action="${hasProgress ? "resume" : "start"}">
              ${hasProgress ? "Tiếp tục hồ sơ" : "Bắt đầu điều tra"}
              <span aria-hidden="true">→</span>
            </button>
            <button class="button button--ghost" type="button" data-action="open-presenter">Kịch bản 25 phút</button>
            ${hasProgress ? '<button class="button button--ghost" type="button" data-action="ask-reset">Chơi lại từ đầu</button>' : ""}
          </div>
          <div class="home-screen__meta" aria-label="Thông tin trò chơi">
            <span><b>04</b> hồ sơ lịch sử</span>
            <span><b>18–22'</b> tự học</span>
            <span><b>25:00</b> hard stop</span>
            <span><b>Auto</b> lưu tiến độ</span>
          </div>
        </div>

        <div class="home-screen__visual">
          <div class="home-art-grid" aria-label="Bốn giai đoạn của hành trình">
            ${CONTENT.eras.map((era) => `
              <div class="home-art-panel" style="${eraVisualStyle(era)}" role="img" aria-label="${era.artworkAlt}">
                <span>${era.period}</span>
                <b>${era.number}</b>
                <small>${era.title}</small>
              </div>
            `).join("")}
          </div>

          <aside class="brief-card">
            <div class="brief-card__stamp">25:00 · 04 NGƯỜI</div>
            <p class="micro-label">Kịch bản thuyết trình</p>
            <h2>Mỗi người làm chủ một chặng</h2>
            <ol>
              <li><span>01</span> Thành viên 1 · Mở vấn đề + 1986–1995</li>
              <li><span>02</span> Thành viên 2 · 1996–2006</li>
              <li><span>03</span> Thành viên 3 · 2007–2020</li>
              <li><span>04</span> Thành viên 4 · 2021–2026 + kết luận</li>
            </ol>
            <button class="text-link" type="button" data-action="open-presenter">Mở đồng hồ và cue trình bày <span aria-hidden="true">→</span></button>
            <div class="brief-card__boundary">
              <strong>Nhịp an toàn</strong>
              <p>23:30 nội dung chính + 01:30 dự phòng. Mỗi thành viên có một chặng 05:30.</p>
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  function renderHub() {
    const completed = state.completedEraIds.length;
    const finalUnlocked = allErasCompleted();
    return `
      <section class="hub-screen page-frame">
        <header class="page-heading hub-heading">
          <div>
            <p class="eyebrow"><span></span> Kho hồ sơ / Chương 6</p>
            <h1>Bản đồ bốn<br />chặng chuyển đổi</h1>
          </div>
          <div class="progress-dial" style="--progress: ${(completed / CONTENT.eras.length) * 100}%">
            <div><strong>${completed}</strong><span>/ 4 hồ sơ</span></div>
          </div>
          <p class="page-heading__note">Mỗi hồ sơ chỉ mở khi chặng trước đã được giải mã. Không có giới hạn thời gian và không có game over.</p>
        </header>

        <div class="timeline-rail" aria-label="Bốn giai đoạn lịch sử">
          ${CONTENT.eras.map((era) => renderEraCard(era)).join("")}
        </div>

        <section class="capstone-card ${finalUnlocked ? "is-unlocked" : "is-locked"}">
          <div class="capstone-card__number">Ω</div>
          <div>
            <p class="micro-label">Thử thách tổng hợp</p>
            <h2>Giải mã mô hình phát triển</h2>
            <p>Phân biệt CNH truyền thống và CNH hiện đại bằng tám đặc trưng cốt lõi.</p>
          </div>
          <div class="capstone-card__status">
            <span>${finalUnlocked ? "Đã mở khóa" : `Còn ${CONTENT.eras.length - completed} hồ sơ`}</span>
            <button class="button ${finalUnlocked ? "button--primary" : "button--disabled"}" type="button" data-action="open-final" ${finalUnlocked ? "" : "disabled"}>
              ${state.finalResult ? "Làm lại" : "Bắt đầu"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </section>
    `;
  }

  function renderEraCard(era) {
    const unlocked = state.unlockedEraIds.includes(era.id);
    const completed = state.completedEraIds.includes(era.id);
    const visited = (state.visitedHotspots[era.id] || []).length;
    const status = completed ? "Đã giải mã" : unlocked ? `${visited}/3 chứng cứ` : "Đang khóa";
    return `
      <article class="era-card ${unlocked ? "is-unlocked" : "is-locked"} ${completed ? "is-complete" : ""}" style="${eraVisualStyle(era)}">
        <div class="era-card__line" aria-hidden="true"><span></span></div>
        <div class="era-card__visual" role="img" aria-label="${era.artworkAlt}">
          <span class="era-card__number">${era.number}</span>
          <span class="era-card__state">${completed ? "✓" : unlocked ? "●" : "×"}</span>
        </div>
        <div class="era-card__body">
          <p class="era-card__period">${era.period}</p>
          <h2>${era.title}</h2>
          <p>${era.kicker}</p>
          <div class="era-card__footer">
            <span>${status}</span>
            <button class="round-action" type="button" data-action="open-era" data-era-id="${era.id}" ${unlocked ? "" : "disabled"} aria-label="${unlocked ? `Mở hồ sơ ${era.title}` : `Hồ sơ ${era.title} đang khóa`}">
              ${unlocked ? "→" : "⌁"}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderEra(era) {
    if (!era) return renderHub();
    const visited = state.visitedHotspots[era.id] || [];
    const complete = state.completedEraIds.includes(era.id);
    const ready = hasCollectedAll(era);
    const result = currentPuzzleResult(era.id);
    return `
      <section class="era-screen" style="${eraVisualStyle(era)}">
        <div class="era-scene-panel">
          <div class="era-scene-panel__top">
            <button class="text-button" type="button" data-action="go-hub"><span aria-hidden="true">←</span> Bản đồ hồ sơ</button>
            <span class="scene-index">HỒ SƠ ${era.number} / 04</span>
          </div>

          <div class="era-scene" aria-label="Bản đồ chứng cứ giai đoạn ${era.period}. ${era.artworkAlt}">
            <div class="era-scene__wash" aria-hidden="true"></div>
            <div class="era-scene__caption">
              <p>${era.period}</p>
              <h1>${era.title}</h1>
              <span>${era.kicker}</span>
            </div>
            ${era.hotspots.map((hotspot, index) => renderHotspotButton(hotspot, index, visited.includes(hotspot.id))).join("")}
            <div class="era-scene__coordinates" aria-hidden="true">VN / ${era.period.replace("–", "-")} / CH06</div>
          </div>

          <div class="mobile-evidence-list" aria-label="Danh sách điểm chứng cứ">
            ${era.hotspots.map((hotspot, index) => `
              <button type="button" class="mobile-evidence ${visited.includes(hotspot.id) ? "is-visited" : ""}" data-action="open-hotspot" data-hotspot-id="${hotspot.id}" data-focus-key="mobile-${hotspot.id}">
                <span>0${index + 1}</span><b>${hotspot.title}</b><i>${visited.includes(hotspot.id) ? "Đã đọc" : "Mở"}</i>
              </button>
            `).join("")}
          </div>
        </div>

        <aside class="case-panel">
          <header class="case-panel__header">
            <p class="micro-label">Nhiệm vụ hiện tại</p>
            <h2>${era.mission}</h2>
          </header>

          <div class="evidence-counter">
            <div>
              <span>Chứng cứ đã thu thập</span>
              <strong>${visited.length}<small>/03</small></strong>
            </div>
            <div class="evidence-counter__marks" aria-hidden="true">
              ${era.hotspots.map((hotspot) => `<span class="${visited.includes(hotspot.id) ? "is-active" : ""}"></span>`).join("")}
            </div>
          </div>

          <div class="evidence-stack">
            ${era.hotspots.map((hotspot, index) => `
              <button type="button" class="evidence-slip ${visited.includes(hotspot.id) ? "is-collected" : ""}" data-action="open-hotspot" data-hotspot-id="${hotspot.id}" data-focus-key="slip-${hotspot.id}">
                <span class="evidence-slip__index">0${index + 1}</span>
                <span class="evidence-slip__copy">
                  <small>${hotspot.type}</small>
                  <b>${visited.includes(hotspot.id) ? hotspot.title : "Nội dung chưa mở"}</b>
                </span>
                <span class="evidence-slip__status">${visited.includes(hotspot.id) ? "✓" : "+"}</span>
              </button>
            `).join("")}
          </div>

          <div class="case-panel__action">
            ${complete ? `<p class="resolved-label"><span>✓</span> Hồ sơ đã giải mã · ${result.bestScore} điểm</p>` : `<p>${ready ? "Đã đủ chứng cứ. Puzzle đang chờ." : "Mở đủ ba điểm để kích hoạt puzzle."}</p>`}
            <button class="button ${ready ? "button--primary" : "button--disabled"}" type="button" data-action="start-puzzle" ${ready ? "" : "disabled"}>
              ${complete ? "Ôn lại puzzle" : "Mở thử thách"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </aside>
      </section>
    `;
  }

  function renderHotspotButton(hotspot, index, visited) {
    return `
      <button
        class="map-hotspot ${visited ? "is-visited" : ""}"
        type="button"
        style="--x: ${hotspot.x}%; --y: ${hotspot.y}%"
        data-action="open-hotspot"
        data-hotspot-id="${hotspot.id}"
        data-focus-key="map-${hotspot.id}"
        aria-label="${visited ? "Đọc lại" : "Mở"} chứng cứ ${index + 1}: ${hotspot.title}"
      >
        <span class="map-hotspot__pulse" aria-hidden="true"></span>
        <span class="map-hotspot__core">0${index + 1}</span>
        <span class="map-hotspot__label">${hotspot.type}</span>
      </button>
    `;
  }

  function renderPuzzle(era) {
    if (!era) return renderHub();
    if (!view.puzzleDraft) view.puzzleDraft = createPuzzleDraft(era.puzzle);
    const result = currentPuzzleResult(era.id);
    const session = currentPuzzleSession();
    const hintAvailable = session.attempts >= 1 || session.hintsUsed > 0;
    return `
      <section class="puzzle-screen page-frame" style="--accent: ${era.accent}">
        <header class="puzzle-heading">
          <button class="text-button" type="button" data-action="open-era" data-era-id="${era.id}"><span aria-hidden="true">←</span> Quay lại hồ sơ</button>
          <div class="puzzle-heading__meta"><span>THỬ THÁCH ${era.number}</span><span>${era.period}</span></div>
          <h1>${era.puzzle.title}</h1>
          <p>${era.puzzle.prompt}</p>
        </header>

        <div class="puzzle-workbench">
          ${renderPuzzleBoard(era.puzzle)}
        </div>

        <footer class="puzzle-footer">
          <div class="attempt-readout">
            <span>Lần thử</span>
            <strong>${session.attempts + 1}</strong>
            <small>Tổng: ${result.attempts}</small>
          </div>
          <div class="puzzle-footer__actions">
            <button class="button button--ghost" type="button" data-action="reset-puzzle">Làm lại lựa chọn</button>
            ${hintAvailable ? `<button class="button button--soft" type="button" data-action="show-hint">Gợi ý ${Math.min(session.hintsUsed + 1, era.puzzle.hints.length)}/${era.puzzle.hints.length}</button>` : ""}
            <button class="button button--primary" type="button" data-action="submit-puzzle">Kiểm tra hồ sơ <span aria-hidden="true">→</span></button>
          </div>
        </footer>
      </section>
    `;
  }

  function renderPuzzleBoard(puzzle) {
    if (puzzle.type === "order") return renderOrderPuzzle(puzzle);
    if (puzzle.type === "match") return renderMatchPuzzle(puzzle);
    if (puzzle.type === "evidence") return renderEvidencePuzzle(puzzle);
    return renderClassifyPuzzle(puzzle, false);
  }

  function renderOrderPuzzle(puzzle) {
    return `
      <div class="order-board">
        <div class="board-instruction"><span>01</span><p>Đầu chuỗi<br /><small>Nguyên nhân</small></p></div>
        <ol class="order-list">
          ${view.puzzleDraft.order.map((itemId, index) => {
            const item = puzzle.items.find((candidate) => candidate.id === itemId);
            return `
              <li class="order-card">
                <span class="order-card__index">${String(index + 1).padStart(2, "0")}</span>
                <p>${item.text}</p>
                <div class="order-card__controls">
                  <button type="button" data-action="move-order" data-item-id="${item.id}" data-direction="-1" ${index === 0 ? "disabled" : ""} aria-label="Đưa thẻ lên">↑</button>
                  <button type="button" data-action="move-order" data-item-id="${item.id}" data-direction="1" ${index === view.puzzleDraft.order.length - 1 ? "disabled" : ""} aria-label="Đưa thẻ xuống">↓</button>
                </div>
              </li>
            `;
          }).join("")}
        </ol>
        <div class="board-instruction board-instruction--end"><span>04</span><p>Cuối chuỗi<br /><small>Kết quả mở đầu</small></p></div>
      </div>
    `;
  }

  function renderMatchPuzzle(puzzle) {
    const matches = view.puzzleDraft.matches;
    return `
      <div class="match-board">
        <section class="match-column">
          <p class="micro-label">A · Nguồn lực / điều kiện</p>
          ${puzzle.left.map((item, index) => `
            <button class="match-card ${view.puzzleDraft.selectedLeft === item.id ? "is-selected" : ""} ${matches[item.id] ? "is-matched" : ""}" type="button" data-action="select-match-left" data-item-id="${item.id}" aria-pressed="${view.puzzleDraft.selectedLeft === item.id}">
              <span>A${index + 1}</span><b>${item.text}</b><i>${matches[item.id] ? "Đã nối" : "Chọn"}</i>
            </button>
          `).join("")}
        </section>
        <div class="match-bridge" aria-hidden="true"><span></span><b>→</b><span></span></div>
        <section class="match-column">
          <p class="micro-label">B · Tác động phù hợp</p>
          ${puzzle.right.map((item, index) => {
            const matchedLeft = Object.keys(matches).find((leftId) => matches[leftId] === item.id);
            return `
              <button class="match-card match-card--right ${matchedLeft ? "is-matched" : ""}" type="button" data-action="select-match-right" data-item-id="${item.id}" aria-pressed="${Boolean(matchedLeft)}">
                <span>B${index + 1}</span><b>${item.text}</b><i>${matchedLeft ? `↔ ${puzzle.left.find((left) => left.id === matchedLeft).text}` : "Nối"}</i>
              </button>
            `;
          }).join("")}
        </section>
      </div>
    `;
  }

  function renderEvidencePuzzle(puzzle) {
    const selected = new Set(view.puzzleDraft.selected);
    return `
      <div class="evidence-board">
        <div class="thesis-card">
          <p class="micro-label">Luận đề cần chứng minh</p>
          <blockquote>“Hội nhập vừa mở cơ hội, vừa tạo sức ép; nó không tự động bảo đảm nâng chất CNH–HĐH.”</blockquote>
          <span>Chọn đúng 03 / 05 chứng cứ</span>
        </div>
        <div class="evidence-options">
          ${puzzle.items.map((item, index) => `
            <button class="evidence-option ${selected.has(item.id) ? "is-selected" : ""}" type="button" data-action="toggle-evidence" data-item-id="${item.id}" aria-pressed="${selected.has(item.id)}">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <p>${item.text}</p>
              <i>${selected.has(item.id) ? "Đã chọn" : "Chọn"}</i>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderClassifyPuzzle(puzzle, isFinal) {
    const draft = isFinal ? view.finalDraft : view.puzzleDraft;
    const selectedId = isFinal ? view.selectedFinalId : view.selectedClassifyId;
    const assignments = draft ? draft.assignments : {};
    const actionSelect = isFinal ? "select-final-item" : "select-classify-item";
    const actionAssign = isFinal ? "assign-final" : "assign-classify";
    const assignedCount = Object.keys(assignments).length;

    return `
      <div class="classify-board ${isFinal ? "classify-board--final" : ""}">
        <section class="classification-deck">
          <div class="classification-deck__heading">
            <p class="micro-label">Thẻ chờ phân loại</p>
            <span>${assignedCount}/${puzzle.items.length} đã xếp</span>
          </div>
          <div class="classification-cards">
            ${puzzle.items.map((item, index) => `
              <button class="classification-card ${selectedId === item.id ? "is-selected" : ""} ${assignments[item.id] ? "is-assigned" : ""}" type="button" data-action="${actionSelect}" data-item-id="${item.id}" aria-pressed="${selectedId === item.id}">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <p>${item.text}</p>
                <i>${assignments[item.id] ? puzzle.categories.find((category) => category.id === assignments[item.id]).label : "Chọn thẻ"}</i>
              </button>
            `).join("")}
          </div>
        </section>
        <section class="classification-zones">
          ${puzzle.categories.map((category, index) => `
            <button class="classification-zone" type="button" data-action="${actionAssign}" data-category-id="${category.id}">
              <span class="classification-zone__letter">${String.fromCharCode(65 + index)}</span>
              <span class="classification-zone__title"><b>${category.label}</b>${category.note ? `<small>${category.note}</small>` : ""}</span>
              <span class="classification-zone__count">${Object.values(assignments).filter((value) => value === category.id).length}</span>
              <span class="classification-zone__drop">${selectedId ? "Đặt thẻ vào đây →" : "Chọn một thẻ trước"}</span>
            </button>
          `).join("")}
        </section>
      </div>
    `;
  }

  function renderFinal() {
    if (!view.finalDraft) view.finalDraft = { assignments: {} };
    return `
      <section class="final-screen page-frame">
        <header class="final-heading">
          <div>
            <button class="text-button" type="button" data-action="go-hub"><span aria-hidden="true">←</span> Bản đồ hồ sơ</button>
            <p class="eyebrow"><span></span> Chặng cuối / Bài tổng hợp</p>
            <h1>${CONTENT.finalChallenge.title}</h1>
          </div>
          <p>${CONTENT.finalChallenge.prompt}</p>
        </header>
        <div class="puzzle-workbench final-workbench">
          ${renderClassifyPuzzle(CONTENT.finalChallenge, true)}
        </div>
        <footer class="puzzle-footer">
          <div class="attempt-readout"><span>Hồ sơ nền</span><strong>4</strong><small>Đã giải mã</small></div>
          <div class="puzzle-footer__actions">
            <button class="button button--ghost" type="button" data-action="reset-final">Xóa lựa chọn</button>
            <button class="button button--primary" type="button" data-action="submit-final">Nộp báo cáo <span aria-hidden="true">→</span></button>
          </div>
        </footer>
      </section>
    `;
  }

  function renderReport() {
    const overall = getOverallScore();
    const rank = overall >= 90 ? "Nhà chiến lược" : overall >= 75 ? "Điều tra viên sắc bén" : overall >= 60 ? "Người kết nối chứng cứ" : "Người học bền bỉ";
    const final = state.finalResult || { correct: 0, total: 8, score: 0 };
    return `
      <section class="report-screen page-frame">
        <div class="report-hero">
          <div class="report-hero__seal" style="--score: ${overall * 3.6}deg">
            <div><strong>${overall}</strong><span>/100</span></div>
          </div>
          <div class="report-hero__copy">
            <p class="eyebrow"><span></span> Báo cáo hành trình · Nhóm 7</p>
            <h1>${rank}</h1>
            <p>Bạn đã đi qua bốn bước chuyển: mở khóa thể chế, tăng tốc bằng nguồn lực hội nhập, nhận diện hai mặt của mở cửa và hướng tới mô hình tự chủ – giá trị cao – xanh.</p>
            <div class="report-hero__actions">
              <button class="button button--primary" type="button" data-action="open-journal">Mở sổ tay ôn tập</button>
              <button class="button button--ghost" type="button" data-action="review-weakest">Ôn hồ sơ yếu nhất</button>
            </div>
          </div>
        </div>

        <div class="report-grid">
          <section class="report-panel report-panel--wide">
            <div class="report-panel__heading"><p class="micro-label">Mức thông thạo từng hồ sơ</p><span>65% tổng điểm</span></div>
            <div class="mastery-list">
              ${CONTENT.eras.map((era) => {
                const result = currentPuzzleResult(era.id);
                return `
                  <div class="mastery-row" style="--accent: ${era.accent}; --mastery: ${result.bestScore || 0}%">
                    <span>${era.number}</span><div><b>${era.title}</b><small>${result.attempts || 0} lần thử${result.assisted ? " · có hướng dẫn" : ""}</small></div><i>${result.bestScore || 0}</i><em><span></span></em>
                  </div>
                `;
              }).join("")}
            </div>
          </section>

          <section class="report-panel">
            <div class="report-panel__heading"><p class="micro-label">Bài tổng hợp</p><span>35% tổng điểm</span></div>
            <div class="capstone-result"><strong>${final.correct}/${final.total}</strong><span>thẻ chính xác</span><b>${final.score}%</b></div>
            <button class="text-link" type="button" data-action="replay-final">Làm lại bài tổng hợp <span aria-hidden="true">→</span></button>
          </section>

          <section class="report-panel">
            <div class="report-panel__heading"><p class="micro-label">Kết luận cốt lõi</p></div>
            <blockquote>${CONTENT.finalChallenge.explanation}</blockquote>
            <button class="text-link" type="button" data-action="open-sources">Kiểm tra nguồn học thuật <span aria-hidden="true">→</span></button>
          </section>

          <section class="report-panel report-panel--answers">
            <div class="report-panel__heading"><p class="micro-label">Đối chiếu tám thẻ tổng hợp</p><span>${final.correct}/${final.total} chính xác</span></div>
            <div class="answer-review">
              ${CONTENT.finalChallenge.items.map((item, index) => {
                const userAnswer = state.finalResult?.assignments?.[item.id];
                const correct = userAnswer === item.answer;
                const correctLabel = CONTENT.finalChallenge.categories.find((category) => category.id === item.answer).label;
                const userLabel = CONTENT.finalChallenge.categories.find((category) => category.id === userAnswer)?.label || "Chưa chọn";
                return `
                  <article class="answer-review__item ${correct ? "is-correct" : "is-wrong"}">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <p>${item.text}</p>
                    <div><b>${correct ? "✓" : "×"} ${userLabel}</b>${correct ? "" : `<small>Đáp án: ${correctLabel}</small>`}</div>
                    ${item.sourceId ? renderSourceChip(item.sourceId) : ""}
                  </article>
                `;
              }).join("")}
            </div>
          </section>
        </div>

        <footer class="report-footer">
          <span>Tiến độ đã được lưu trên thiết bị này.</span>
          <button class="button button--ghost" type="button" data-action="go-hub">Về bản đồ hồ sơ</button>
          <button class="button button--soft" type="button" data-action="ask-reset">Tạo hành trình mới</button>
        </footer>
      </section>
    `;
  }

  function renderOverlay() {
    if (!view.overlay) {
      overlayRoot.innerHTML = "";
      document.body.classList.remove("has-overlay");
      if (appShell) appShell.inert = false;
      return;
    }

    document.body.classList.add("has-overlay");
    if (appShell) appShell.inert = true;
    const overlay = view.overlay;
    let body = "";

    if (overlay.type === "hotspot") body = renderHotspotOverlay(overlay);
    else if (overlay.type === "journal") body = renderJournalOverlay();
    else if (overlay.type === "sources") body = renderSourcesOverlay();
    else if (overlay.type === "help") body = renderHelpOverlay();
    else if (overlay.type === "presenter") body = renderPresenterOverlay();
    else if (overlay.type === "hint") body = renderSimpleOverlay("Gợi ý chiến lược", overlay.title, overlay.body, "Đã hiểu");
    else if (overlay.type === "feedback") body = renderFeedbackOverlay(overlay);
    else if (overlay.type === "reset") body = renderResetOverlay();

    overlayRoot.innerHTML = `
      <div class="overlay-backdrop" data-action="close-overlay"></div>
      <section class="overlay-panel overlay-panel--${overlay.type}" role="dialog" aria-modal="true" aria-labelledby="overlay-title">
        ${body}
      </section>
    `;

    window.requestAnimationFrame(() => {
      if (overlay.type === "presenter") updatePresenterClockUI();
      const target = overlayRoot.querySelector("[data-autofocus], button, a[href]");
      if (target) target.focus({ preventScroll: true });
    });
  }

  function renderOverlayClose() {
    return '<button class="overlay-close" type="button" data-action="close-overlay" data-autofocus aria-label="Đóng cửa sổ">×</button>';
  }

  function renderHotspotOverlay(overlay) {
    const era = getEra(overlay.eraId);
    const hotspot = era.hotspots.find((item) => item.id === overlay.hotspotId);
    return `
      ${renderOverlayClose()}
      <div class="evidence-detail" style="${eraVisualStyle(era)}">
        <div class="evidence-detail__visual" role="img" aria-label="${era.artworkAlt}">
          <span>${era.period}</span>
          <b>${era.number}.${String(era.hotspots.indexOf(hotspot) + 1).padStart(2, "0")}</b>
        </div>
        <div class="evidence-detail__content">
          <p class="eyebrow"><span></span> ${hotspot.type} / ${era.period}</p>
          <h2 id="overlay-title">${hotspot.title}</h2>
          <p class="evidence-detail__lead">${hotspot.lead}</p>
          <p>${hotspot.body}</p>
          <blockquote><span>Điểm cần nhớ</span>${hotspot.takeaway}</blockquote>
          <div class="citation-row">
            <span>Nguồn kiểm chứng</span>
            <div>${hotspot.sourceIds.map((sourceId) => renderSourceChip(sourceId)).join("")}</div>
          </div>
          <button class="button button--primary" type="button" data-action="collect-hotspot" data-era-id="${era.id}" data-hotspot-id="${hotspot.id}">
            ${(state.visitedHotspots[era.id] || []).includes(hotspot.id) ? "Đã lưu · Đóng" : "Đưa vào hồ sơ"} <span aria-hidden="true">✓</span>
          </button>
        </div>
      </div>
    `;
  }

  function renderSourceChip(sourceId) {
    const source = CONTENT.sources[sourceId];
    if (!source) return "";
    if (source.url) return `<a class="source-chip" href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label} ↗</a>`;
    return `<span class="source-chip">${source.label}</span>`;
  }

  function renderJournalOverlay() {
    const unlocked = CONTENT.eras.filter((era) => state.journalUnlocked.includes(era.id));
    return `
      ${renderOverlayClose()}
      <div class="drawer-heading">
        <p class="eyebrow"><span></span> Sổ tay học tập</p>
        <h2 id="overlay-title">Sổ tay lập luận</h2>
        <p>Mỗi trang chỉ mở khi puzzle của giai đoạn tương ứng đã được giải.</p>
      </div>
      <div class="journal-list">
        ${unlocked.length ? unlocked.map((era) => `
          <article class="journal-entry" style="--accent: ${era.accent}">
            <header><span>${era.number}</span><div><small>${era.period}</small><h3>${era.title}</h3></div><b>${currentPuzzleResult(era.id).bestScore}</b></header>
            <blockquote>${era.journal.thesis}</blockquote>
            <div class="journal-entry__columns">
              <div><p class="micro-label">Thành tựu / chuyển biến</p><ul>${era.journal.achievements.map((item) => `<li>${item}</li>`).join("")}</ul></div>
              <div><p class="micro-label">Giới hạn / thách thức</p><ul>${era.journal.limitations.map((item) => `<li>${item}</li>`).join("")}</ul></div>
            </div>
            <button class="text-link" type="button" data-action="open-era" data-era-id="${era.id}">Mở lại bản đồ <span aria-hidden="true">→</span></button>
          </article>
        `).join("") : `
          <div class="empty-state"><span>⌁</span><h3>Sổ tay đang trống</h3><p>Giải puzzle đầu tiên để lưu luận điểm cốt lõi.</p></div>
        `}
      </div>
    `;
  }

  function renderSourcesOverlay() {
    const sources = Object.values(CONTENT.sources);
    const groups = [...new Set(sources.map((source) => source.group))];
    return `
      ${renderOverlayClose()}
      <div class="drawer-heading">
        <p class="eyebrow"><span></span> Minh bạch học thuật</p>
        <h2 id="overlay-title">Nguồn & AI Usage</h2>
        <p>Nội dung chính bám Session 24–29 của Chương 6; số liệu và mốc lịch sử được đối chiếu bằng nguồn chính thống. Bốn chặng là cách phân kỳ sư phạm của game, không phải một phân kỳ lịch sử chính thức.</p>
      </div>
      <div class="source-layout">
        <div class="source-groups">
          ${groups.map((group) => `
            <section class="source-group">
              <p class="micro-label">${group}</p>
              ${sources.filter((source) => source.group === group).map((source) => `
                ${source.url ? `<a class="source-row" href="${source.url}" target="_blank" rel="noopener noreferrer">` : '<div class="source-row">'}
                  <span>↗</span><div><b>${source.label}</b><p>${source.detail}</p></div>
                ${source.url ? "</a>" : "</div>"}
              `).join("")}
            </section>
          `).join("")}
        </div>
        <aside class="ai-usage">
          <p class="micro-label">Phụ lục AI Usage</p>
          <h3>AI là công cụ hỗ trợ, không thay thế người học.</h3>
          <dl>
            <div><dt>Công cụ</dt><dd>OpenAI Codex.</dd></div>
            <div><dt>Mục đích</dt><dd>Phân tích tài liệu, đề xuất flow tự học, hỗ trợ code và rà lỗi kỹ thuật.</dd></div>
            <div><dt>Prompt chính</dt><dd>“Tham khảo scope MLN111, đề xuất game cá nhân cho Chương 6”; “Triển khai lại MLN122, tránh trùng phạm vi nhóm khác”.</dd></div>
            <div><dt>Đầu ra AI</dt><dd>Bản nháp cấu trúc game, diễn giải chứng cứ, puzzle, HTML/CSS/JavaScript.</dd></div>
            <div><dt>Phần nhóm</dt><dd>Chốt yêu cầu, cung cấp học liệu, đối chiếu nguồn, chỉnh nội dung và chịu trách nhiệm bản nộp cuối.</dd></div>
          </dl>
          <div class="ai-usage__commitment"><span>✓</span><p>Nhóm cam kết đối chiếu nội dung AI với bài giảng và nguồn chính thống trước khi nộp.</p></div>
        </aside>
      </div>
    `;
  }

  function renderHelpOverlay() {
    return `
      ${renderOverlayClose()}
      <div class="drawer-heading">
        <p class="eyebrow"><span></span> Hướng dẫn thực địa</p>
        <h2 id="overlay-title">Cách chơi</h2>
        <p>Game được thiết kế để một người tự mở, tự học và quay lại ôn bất cứ lúc nào.</p>
      </div>
      <div class="help-grid">
        <article><span>01</span><h3>Thu thập</h3><p>Mở ba hotspot trên bản đồ. Mỗi hotspot là một bối cảnh, dấu mốc hoặc đánh giá.</p></article>
        <article><span>02</span><h3>Giải mã</h3><p>Hoàn thành puzzle. Sai không kết thúc game; gợi ý xuất hiện sau lần thử đầu.</p></article>
        <article><span>03</span><h3>Ôn tập</h3><p>Luận điểm, thành tựu và giới hạn được lưu tự động vào Sổ tay.</p></article>
      </div>
      <div class="shortcut-table">
        <p class="micro-label">Phím tắt</p>
        <div><kbd>H</kbd><span>Bản đồ hồ sơ</span><kbd>J</kbd><span>Sổ tay</span></div>
        <div><kbd>P</kbd><span>Kịch bản 25 phút</span><kbd>F</kbd><span>Toàn màn hình</span></div>
        <div><kbd>?</kbd><span>Hướng dẫn</span><kbd>Esc</kbd><span>Đóng cửa sổ</span></div>
        <div><kbd>Tab</kbd><span>Di chuyển điều khiển</span><kbd>Space</kbd><span>Kích hoạt nút</span></div>
      </div>
    `;
  }

  function renderPresenterOverlay() {
    const activeIndex = getPresentationStageIndex();
    return `
      ${renderOverlayClose()}
      <div class="presenter-layout">
        <header class="presenter-heading">
          <div>
            <p class="eyebrow"><span></span> Chế độ trình bày · Nhóm 7 · 04 người</p>
            <h2 id="overlay-title">Kịch bản khóa ở 25:00</h2>
            <p>23:30 nội dung chính · 01:30 dự phòng · Sau đó là 20 phút phản biện riêng.</p>
          </div>
          <div class="presentation-clock" id="presentation-clock">
            <span class="micro-label">Thời gian còn lại</span>
            <strong id="presenter-time" role="timer">${formatPresentationTime(presentationClock.remaining)}</strong>
            <p id="presenter-current-label">${PRESENTATION_STAGES[activeIndex].member} · ${PRESENTATION_STAGES[activeIndex].title}</p>
            <div class="presentation-clock__cue"><span>Thao tác lúc này</span><b id="presenter-current-cue">${PRESENTATION_STAGES[activeIndex].live}</b></div>
            <div class="presentation-clock__track" aria-hidden="true"><span id="presenter-progress"></span></div>
            <div class="presentation-clock__actions">
              <button class="button button--primary" type="button" data-action="toggle-presentation-timer">
                <span id="presenter-toggle-label">${presentationClock.running ? "Tạm dừng" : presentationClock.remaining <= 0 ? "Chạy lại" : presentationClock.remaining === PRESENTATION_SECONDS ? "Bắt đầu" : "Tiếp tục"}</span>
              </button>
              <button class="button button--ghost" type="button" data-action="reset-presentation-timer">Đặt lại 25:00</button>
            </div>
            <small>Đóng bảng này để thao tác game; đồng hồ vẫn chạy trên thanh công cụ.</small>
          </div>
        </header>

        <aside class="presenter-preflight">
          <span>TRƯỚC GIỜ TRÌNH BÀY</span>
          <p>Chơi hoàn tất một lượt trên máy trình chiếu để mở sẵn 4 hồ sơ và Báo cáo. Mở toàn màn hình, tắt thông báo, chuẩn bị ảnh chụp màn Báo cáo làm phương án dự phòng.</p>
        </aside>

        <div class="presentation-runway" aria-label="Timeline thuyết trình 25 phút">
          ${PRESENTATION_STAGES.map((stage, index) => `
            <article class="presentation-stage ${index === activeIndex ? "is-active" : ""}" data-presentation-stage="${index}">
              <div class="presentation-stage__rail"><span>${stage.time}</span><b>${stage.member}</b></div>
              <div class="presentation-stage__body">
                <header><h3>${stage.title}</h3><span>${formatPresentationTime(stage.end - stage.start)}</span></header>
                <p><b>Mục tiêu</b>${stage.objective}</p>
                <p><b>Live</b>${stage.live}</p>
                <p><b>Tương tác</b>${stage.interaction}</p>
                <blockquote><span>Câu chốt</span>${stage.close}</blockquote>
              </div>
            </article>
          `).join("")}
        </div>

        <footer class="presenter-footer">
          <b>Quy tắc cắt khi chậm</b>
          <span>Bỏ thao tác trước, không bỏ luận điểm.</span>
          <span>Lỗi quá 15 giây → chuyển sang Báo cáo dự phòng.</span>
          <span>24:30 nói câu kết · 25:00 dừng.</span>
        </footer>
      </div>
    `;
  }

  function renderSimpleOverlay(eyebrow, title, body, buttonLabel) {
    return `
      ${renderOverlayClose()}
      <div class="simple-dialog">
        <p class="eyebrow"><span></span> ${eyebrow}</p>
        <h2 id="overlay-title">${title}</h2>
        <p>${body}</p>
        <button class="button button--primary" type="button" data-action="close-overlay">${buttonLabel}</button>
      </div>
    `;
  }

  function renderFeedbackOverlay(feedback) {
    return `
      ${renderOverlayClose()}
      <div class="feedback-dialog feedback-dialog--${feedback.tone}">
        <div class="feedback-dialog__icon">${feedback.resolved ? "✓" : "!"}</div>
        <p class="micro-label">${feedback.resolved ? "Hồ sơ đã cập nhật" : "Cần đối chiếu lại"}</p>
        <h2 id="overlay-title">${feedback.title}</h2>
        <p>${feedback.body}</p>
        ${feedback.showSolution ? renderSolutionGuide(getEra(feedback.eraId).puzzle) : ""}
        ${feedback.score ? `<div class="feedback-score"><span>Mức thông thạo</span><strong>${feedback.score}</strong><small>/100</small></div>` : ""}
        <div class="feedback-dialog__actions">
          ${!feedback.resolved ? '<button class="button button--primary" type="button" data-action="continue-feedback" data-resolved="false">Thử lại</button>' : '<button class="button button--primary" type="button" data-action="continue-feedback" data-resolved="true">Về bản đồ <span aria-hidden="true">→</span></button>'}
          ${!feedback.resolved ? '<button class="button button--soft" type="button" data-action="show-hint">Mở gợi ý</button>' : ""}
          ${feedback.canReveal ? '<button class="button button--ghost" type="button" data-action="reveal-puzzle">Xem hướng dẫn & tiếp tục</button>' : ""}
        </div>
      </div>
    `;
  }

  function renderSolutionGuide(puzzle) {
    let rows = [];
    if (puzzle.type === "order") {
      rows = puzzle.answer.map((itemId, index) => `${index + 1}. ${puzzle.items.find((item) => item.id === itemId).text}`);
    } else if (puzzle.type === "match") {
      rows = puzzle.left.map((left) => `${left.text} → ${puzzle.right.find((right) => right.id === puzzle.answer[left.id]).text}`);
    } else if (puzzle.type === "evidence") {
      rows = puzzle.answer.map((itemId) => puzzle.items.find((item) => item.id === itemId).text);
    } else {
      rows = puzzle.categories.map((category) => `${category.label}: ${puzzle.items.filter((item) => item.answer === category.id).map((item) => item.text).join("; ")}`);
    }
    return `<div class="solution-guide"><span>Đáp án có hướng dẫn</span><ol>${rows.map((row) => `<li>${row}</li>`).join("")}</ol></div>`;
  }

  function renderResetOverlay() {
    return `
      ${renderOverlayClose()}
      <div class="simple-dialog simple-dialog--danger">
        <p class="eyebrow"><span></span> Tạo hành trình mới</p>
        <h2 id="overlay-title">Xóa tiến độ hiện tại?</h2>
        <p>Bốn hồ sơ, điểm puzzle và sổ tay trên thiết bị này sẽ trở về trạng thái ban đầu.</p>
        <div class="dialog-actions">
          <button class="button button--ghost" type="button" data-action="close-overlay">Giữ tiến độ</button>
          <button class="button button--danger" type="button" data-action="reset-progress">Xóa và chơi lại</button>
        </div>
      </div>
    `;
  }

  function showToast(message) {
    if (!toastRegion) return;
    window.clearTimeout(toastTimer);
    toastRegion.textContent = message;
    toastRegion.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toastRegion.classList.remove("is-visible"), 3000);
  }

  function formatPresentationTime(seconds) {
    const safeSeconds = Math.max(0, Math.ceil(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    const remainder = safeSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }

  function getPresentationStageIndex() {
    const elapsed = PRESENTATION_SECONDS - presentationClock.remaining;
    const index = PRESENTATION_STAGES.findIndex((stage) => elapsed < stage.end);
    return index === -1 ? PRESENTATION_STAGES.length - 1 : index;
  }

  function syncPresentationRemaining() {
    if (!presentationClock.running || !presentationClock.deadline) return;
    presentationClock.remaining = Math.max(0, Math.ceil((presentationClock.deadline - Date.now()) / 1000));
  }

  function startPresentationClock() {
    if (presentationClock.running) return;
    if (presentationClock.remaining <= 0) presentationClock.remaining = PRESENTATION_SECONDS;
    presentationClock.running = true;
    presentationClock.deadline = Date.now() + presentationClock.remaining * 1000;
    presentationClock.intervalId = window.setInterval(() => {
      syncPresentationRemaining();
      updatePresenterClockUI();
      if (presentationClock.remaining <= 0) {
        pausePresentationClock();
        showToast("25:00 · Hard stop. Chuyển sang phần phản biện.");
      }
    }, 250);
    updatePresenterClockUI();
  }

  function pausePresentationClock() {
    syncPresentationRemaining();
    if (presentationClock.intervalId) window.clearInterval(presentationClock.intervalId);
    presentationClock.running = false;
    presentationClock.intervalId = null;
    presentationClock.deadline = null;
    updatePresenterClockUI();
  }

  function resetPresentationClock() {
    pausePresentationClock();
    presentationClock.remaining = PRESENTATION_SECONDS;
    updatePresenterClockUI();
  }

  function updatePresenterClockUI() {
    const activeIndex = getPresentationStageIndex();
    const currentStage = PRESENTATION_STAGES[activeIndex];
    const elapsed = PRESENTATION_SECONDS - presentationClock.remaining;
    const progress = Math.min(100, Math.max(0, (elapsed / PRESENTATION_SECONDS) * 100));
    const formatted = formatPresentationTime(presentationClock.remaining);
    const clock = document.querySelector("#presentation-clock");
    const time = document.querySelector("#presenter-time");
    const progressBar = document.querySelector("#presenter-progress");
    const currentLabel = document.querySelector("#presenter-current-label");
    const currentCue = document.querySelector("#presenter-current-cue");
    const toggleLabel = document.querySelector("#presenter-toggle-label");
    const toggleButton = document.querySelector('[data-action="toggle-presentation-timer"]');
    const miniTime = document.querySelector("#presentation-mini-time");
    const presenterButton = document.querySelector(".presenter-button");

    if (time) {
      time.textContent = formatted;
      time.setAttribute("aria-label", `Còn ${formatted}`);
    }
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (currentLabel) currentLabel.textContent = `${currentStage.member} · ${currentStage.title}`;
    if (currentCue) currentCue.textContent = currentStage.live;
    if (toggleLabel) {
      toggleLabel.textContent = presentationClock.running
        ? "Tạm dừng"
        : presentationClock.remaining <= 0
          ? "Chạy lại"
          : presentationClock.remaining === PRESENTATION_SECONDS
            ? "Bắt đầu"
            : "Tiếp tục";
    }
    if (toggleButton) toggleButton.setAttribute("aria-pressed", String(presentationClock.running));
    if (miniTime) miniTime.textContent = formatted;
    if (presenterButton) {
      presenterButton.classList.toggle("has-timing", presentationClock.running || presentationClock.remaining < PRESENTATION_SECONDS);
      presenterButton.classList.toggle("is-running", presentationClock.running);
      presenterButton.title = presentationClock.running ? `Đang trình bày · còn ${formatted} (P)` : "Kịch bản 25 phút (P)";
    }
    if (clock) {
      clock.classList.toggle("is-running", presentationClock.running);
      clock.classList.toggle("is-warning", presentationClock.remaining <= 5.5 * 60 && presentationClock.remaining > 90);
      clock.classList.toggle("is-critical", presentationClock.remaining <= 90);
    }

    overlayRoot.querySelectorAll("[data-presentation-stage]").forEach((element) => {
      const index = Number(element.dataset.presentationStage);
      element.classList.toggle("is-active", index === activeIndex);
      element.classList.toggle("is-past", index < activeIndex);
      if (index === activeIndex) element.setAttribute("aria-current", "step");
      else element.removeAttribute("aria-current");
    });
  }

  function focusSelector(snapshot) {
    let selector = `[data-action="${snapshot.action}"]`;
    ["itemId", "direction", "categoryId", "hotspotId", "eraId", "focusKey"].forEach((key) => {
      if (snapshot[key] !== undefined) {
        const attribute = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        selector += `[data-${attribute}="${snapshot[key]}"]`;
      }
    });
    return selector;
  }

  function trapOverlayFocus(event) {
    const focusable = [...overlayRoot.querySelectorAll('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !overlayRoot.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !overlayRoot.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => showToast("Trình duyệt không cho phép chế độ toàn màn hình."));
    } else {
      document.exitFullscreen?.();
    }
  }

  function handleAction(target) {
    const action = target.dataset.action;
    const payload = { ...target.dataset };
    const actionMap = {
      start: "START",
      resume: "RESUME",
      "go-home": "GO_HOME",
      "go-hub": "GO_HUB",
      "open-era": "OPEN_ERA",
      "open-hotspot": "OPEN_HOTSPOT",
      "collect-hotspot": "COLLECT_HOTSPOT",
      "close-overlay": "CLOSE_OVERLAY",
      "open-journal": "OPEN_JOURNAL",
      "open-sources": "OPEN_SOURCES",
      "open-help": "OPEN_HELP",
      "open-presenter": "OPEN_PRESENTER",
      "toggle-presentation-timer": "TOGGLE_PRESENTATION_TIMER",
      "reset-presentation-timer": "RESET_PRESENTATION_TIMER",
      "ask-reset": "ASK_RESET",
      "reset-progress": "RESET_PROGRESS",
      "start-puzzle": "START_PUZZLE",
      "move-order": "MOVE_ORDER",
      "select-match-left": "SELECT_MATCH_LEFT",
      "select-match-right": "SELECT_MATCH_RIGHT",
      "toggle-evidence": "TOGGLE_EVIDENCE",
      "select-classify-item": "SELECT_CLASSIFY_ITEM",
      "assign-classify": "ASSIGN_CLASSIFY",
      "reset-puzzle": "RESET_PUZZLE",
      "show-hint": "SHOW_HINT",
      "submit-puzzle": "SUBMIT_PUZZLE",
      "reveal-puzzle": "REVEAL_PUZZLE",
      "continue-feedback": "CONTINUE_FEEDBACK",
      "open-final": "OPEN_FINAL",
      "select-final-item": "SELECT_FINAL_ITEM",
      "assign-final": "ASSIGN_FINAL",
      "reset-final": "RESET_FINAL",
      "submit-final": "SUBMIT_FINAL",
      "replay-final": "REPLAY_FINAL",
      "review-weakest": "REVIEW_WEAKEST"
    };

    if (action === "toggle-fullscreen") {
      toggleFullscreen();
      return;
    }
    if (actionMap[action]) dispatch(actionMap[action], payload);
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target || target.disabled) return;
    if (!view.overlay) {
      view.pendingFocus = {
        action: target.dataset.action,
        itemId: target.dataset.itemId,
        direction: target.dataset.direction,
        categoryId: target.dataset.categoryId,
        hotspotId: target.dataset.hotspotId,
        eraId: target.dataset.eraId,
        focusKey: target.dataset.focusKey
      };
    }
    handleAction(target);
  });

  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select")) return;
    if (event.key === "Tab" && view.overlay) {
      trapOverlayFocus(event);
      return;
    }
    if (event.key === "Escape" && view.overlay) {
      event.preventDefault();
      dispatch("CLOSE_OVERLAY");
      return;
    }
    if (event.key.toLowerCase() === "h" && !event.ctrlKey && !event.metaKey) dispatch("GO_HUB");
    else if (event.key.toLowerCase() === "j" && !event.ctrlKey && !event.metaKey) dispatch("OPEN_JOURNAL");
    else if (event.key.toLowerCase() === "p" && !event.ctrlKey && !event.metaKey) dispatch("OPEN_PRESENTER");
    else if (event.key.toLowerCase() === "f" && !event.ctrlKey && !event.metaKey) toggleFullscreen();
    else if (event.key === "?") dispatch("OPEN_HELP");
  });

  render();
  updatePresenterClockUI();
})();
