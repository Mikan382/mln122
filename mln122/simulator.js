(function () {
  "use strict";

  const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
  const clone = (value) => ({ ...value });

  function addEffects(metrics, effects) {
    Object.entries(effects || {}).forEach(([key, delta]) => {
      if (typeof metrics[key] !== "number") return;
      metrics[key] = clamp(metrics[key] + Number(delta || 0));
    });
    return metrics;
  }

  function mergeEffects(...effectsList) {
    const merged = {};
    effectsList.forEach((effects) => {
      Object.entries(effects || {}).forEach(([key, value]) => {
        merged[key] = (merged[key] || 0) + Number(value || 0);
      });
    });
    return merged;
  }

  function diff(before, after, order) {
    return Object.fromEntries(order.map((key) => [key, (after[key] || 0) - (before[key] || 0)]));
  }

  function getGauges(metrics) {
    return {
      production: Math.round((metrics.structure + metrics.technology) / 2),
      connection: Math.round(metrics.integration),
      resilience: Math.round((metrics.autonomy + metrics.sustainability) / 2)
    };
  }

  function arrowFor(value) {
    if (value >= 5) return "↑↑";
    if (value >= 1) return "↑";
    if (value <= -5) return "↓↓";
    if (value <= -1) return "↓";
    return "—";
  }

  function requirementMet(requirement, before) {
    if (!requirement) return true;
    return Number(before[requirement.metric] || 0) >= Number(requirement.min || 0);
  }

  function previewChoice(choice, before) {
    const met = requirementMet(choice.requirement, before);
    const penalty = met ? {} : choice.requirement?.penalty;
    const netEffects = mergeEffects(choice.effects, penalty);
    const after = addEffects(clone(before), netEffects);
    return {
      after,
      netEffects,
      gaugeDeltas: diff(getGauges(before), getGauges(after), ["production", "connection", "resilience"]),
      requirementMet: met
    };
  }

  function getDilemmas(era) {
    if (Array.isArray(era?.dilemmas)) return era.dilemmas;
    return era?.dilemma ? [era.dilemma] : [];
  }

  function getChoice(era, dilemmaId, choiceId) {
    const dilemma = getDilemmas(era).find((item) => item.id === dilemmaId);
    if (!dilemma) return null;
    const choice = (dilemma.choices || []).find((item) => item.id === choiceId);
    return choice ? { dilemma, choice } : null;
  }

  function getRecommendedChoice(dilemma) {
    const choices = Array.isArray(dilemma?.choices) ? dilemma.choices : [];
    const recommendedId =
      typeof dilemma?.recommendedChoiceId === "string"
        ? dilemma.recommendedChoiceId
        : typeof dilemma?.recommended === "string"
          ? dilemma.recommended
          : null;

    return (
      choices.find((choice) => choice.recommended === true || choice.verdict === "recommended") ||
      choices.find((choice) => recommendedId && choice.id === recommendedId) ||
      choices.find((choice) => choice.id === "recommended") ||
      choices[0] ||
      null
    );
  }

  function buildSignals(metrics) {
    const signals = [];
    if (metrics.integration - metrics.autonomy >= 15) {
      signals.push({ id: "dependency", tone: "warning", title: "Tăng tốc nhưng phụ thuộc", text: "Kết nối tăng nhanh hơn nội lực." });
    }
    if ((metrics.structure + metrics.technology) / 2 - metrics.sustainability >= 20) {
      signals.push({ id: "brown", tone: "warning", title: "Sản xuất đi trước độ bền", text: "Chi phí chuyển đổi tương lai đang tăng." });
    }
    if (metrics.autonomy - metrics.integration >= 12) {
      signals.push({ id: "closed", tone: "neutral", title: "Nội lực chưa nối ra thị trường", text: "Nguồn lực ngoài chưa được tận dụng đủ." });
    }
    return signals;
  }

  function calculate(content, plans) {
    const metrics = clone(content.initialMetrics);
    const history = [{ eraId: "baseline", label: "Mốc đầu", metrics: clone(metrics), gauges: getGauges(metrics) }];
    const eraResults = {};
    let causalChainOpen = true;

    content.eras.forEach((era) => {
      const beforeEra = clone(metrics);
      const plan = plans?.[era.id] || { decisions: [] };
      const dilemmas = getDilemmas(era);
      const decisions = causalChainOpen && Array.isArray(plan.decisions) ? plan.decisions : [];
      const decisionResults = [];

      if (causalChainOpen) {
        const decisionsByDilemma = new Map();
        decisions.forEach((decision) => {
          const found = getChoice(era, decision?.dilemmaId, decision?.choiceId);
          if (found) decisionsByDilemma.set(found.dilemma.id, found.choice.id);
        });

        dilemmas.forEach((dilemma) => {
          const choiceId = decisionsByDilemma.get(dilemma.id);
          if (!choiceId) return;
          const choice = (dilemma.choices || []).find((item) => item.id === choiceId);
          if (!choice) return;

          const before = clone(metrics);
          const preview = previewChoice(choice, before);
          Object.assign(metrics, preview.after);

          decisionResults.push({
            dilemmaId: dilemma.id,
            choiceId: choice.id,
            dilemma,
            choice,
            before,
            after: clone(metrics),
            netEffects: preview.netEffects,
            gaugeDeltas: preview.gaugeDeltas,
            requirementMet: preview.requirementMet,
            requirementNote: preview.requirementMet ? null : choice.requirement.text
          });
        });
      }

      const complete = dilemmas.length > 0 && decisionResults.length === dilemmas.length;
      const afterEra = clone(metrics);
      eraResults[era.id] = {
        eraId: era.id,
        before: beforeEra,
        after: afterEra,
        beforeGauges: getGauges(beforeEra),
        afterGauges: getGauges(afterEra),
        deltas: diff(beforeEra, afterEra, content.metricOrder),
        gaugeDeltas: diff(
          getGauges(beforeEra),
          getGauges(afterEra),
          content.gaugeOrder || ["production", "connection", "resilience"]
        ),
        decisionResults,
        complete,
        blockedByEarlierEra: !causalChainOpen,
        signals: buildSignals(afterEra)
      };

      if (complete) {
        history.push({ eraId: era.id, label: era.period, metrics: clone(afterEra), gauges: getGauges(afterEra) });
      } else {
        causalChainOpen = false;
      }
    });

    return { metrics: clone(metrics), gauges: getGauges(metrics), history, eraResults, signals: buildSignals(metrics) };
  }

  function getKnowledge(content, plans) {
    let answered = 0;
    let correct = 0;
    content.eras.forEach((era) => {
      const plan = plans?.[era.id];
      if (!plan?.quizSubmitted) return;
      answered += 1;
      if (Number(plan.quizAnswer) === Number(era.checkpoint.answer)) correct += 1;
    });
    return { answered, correct, total: content.eras.length };
  }

  function getProfile(content, simulation) {
    const metrics = simulation.metrics;
    const values = content.metricOrder.map((key) => metrics[key]);
    const spread = Math.max(...values) - Math.min(...values);
    let id = "balanced";

    if (metrics.integration - metrics.autonomy >= 15) id = "dependent-speed";
    else if ((metrics.structure + metrics.technology) / 2 - metrics.sustainability >= 20) id = "brown-industry";
    else if (metrics.autonomy - metrics.integration >= 12) id = "closed-autonomy";
    else if (spread >= 18) id = "uneven";

    return content.endingProfiles.find((profile) => profile.id === id) || content.endingProfiles[0];
  }

  function getDecisionHighlights(content, plans, limit = 4) {
    const highlights = [];
    content.eras.forEach((era) => {
      (plans?.[era.id]?.decisions || []).forEach((decision) => {
        const found = getChoice(era, decision.dilemmaId, decision.choiceId);
        if (!found) return;
        const magnitude = Object.values(found.choice.effects || {}).reduce((sum, value) => sum + Math.abs(value), 0);
        highlights.push({ era: era.period, title: found.choice.title, outcome: found.choice.outcome, magnitude });
      });
    });
    return highlights.sort((a, b) => b.magnitude - a.magnitude).slice(0, limit);
  }

  function createDemoPlans(content) {
    const plans = {};
    content.eras.forEach((era) => {
      const dilemmas = getDilemmas(era);
      const decisions = dilemmas.flatMap((dilemma) => {
        const choice = getRecommendedChoice(dilemma);
        return choice ? [{ dilemmaId: dilemma.id, choiceId: choice.id }] : [];
      });
      const hasCheckpointAnswer = Boolean(
        era.checkpoint && Object.prototype.hasOwnProperty.call(era.checkpoint, "answer")
      );

      plans[era.id] = {
        decisions,
        quizAnswer: hasCheckpointAnswer ? era.checkpoint.answer : null,
        quizSubmitted: hasCheckpointAnswer,
        completed: dilemmas.length > 0 && decisions.length === dilemmas.length && hasCheckpointAnswer
      };
    });
    return plans;
  }

  function formatDelta(value) {
    if (value > 0) return `+${value}`;
    if (value < 0) return String(value);
    return "±0";
  }

  window.MLN122_SIMULATOR = {
    clamp,
    calculate,
    getGauges,
    previewChoice,
    arrowFor,
    getKnowledge,
    getProfile,
    getDecisionHighlights,
    createDemoPlans,
    formatDelta
  };
})();
