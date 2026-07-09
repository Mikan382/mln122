---
name: design-taste-frontend
description: Anti-slop frontend skill for premium game interfaces. Stronger layout, typography, motion, and spacing instead of boilerplate-looking UIs.
---

# tasteskill: Anti-Slop Frontend Skill (Adapted for MLN122)

> Applied to game UI: strategy map, card-based interactions, data visualization.
> Every rule below is **contextual**. First read the brief, then pull only what fits.

## Design Read
"Reading this as: Educational strategy game for university classroom presentation, with a premium dark-mode / glassmorphism language, leaning toward vanilla CSS + custom animations + modern typography."

## Dials
- DESIGN_VARIANCE: 7 (Premium game feel, not generic)
- MOTION_INTENSITY: 6 (Smooth transitions, not distracting during presentation)
- VISUAL_DENSITY: 5 (Game UI with stats + map + cards)

## Typography
- Display / Headlines: Outfit 700-900, tracking-tight
- Body: Inter 400-500, max-width 65ch
- Mono: JetBrains Mono for stats/numbers
- NEVER use Inter as display font - use Outfit
- No serif fonts

## Color Calibration
- Base: Zinc/Slate dark palette (not pure black)
- Max 1 accent per era (Gold for Bao Cấp, Blue for Đổi Mới, Red for Hội nhập, Purple for 4.0)
- No AI-purple gradients as default
- No generic glassmorphism on everything
- Tinted shadows (match background hue)

## Layout
- Anti-center bias: Game layout should be asymmetric (map left, sidebar right)
- Cards: Use only when elevation communicates hierarchy
- One corner-radius scale: 12-16px for cards, 8px for buttons/inputs
- Grid over flex-math for map zones

## Motion
- Micro-interactions: scale(0.98) on :active for buttons
- Stats bars: smooth cubic-bezier transitions
- Zone upgrades: particle/glow effects
- Era transitions: dramatic but not distracting
- NO infinite-loop animations except for critical alerts

## Image Strategy
- Generate era-specific background images (cinematic, not stock)
- Real photography, not div-based fake illustrations
- Each era has distinct visual identity through background imagery

## Anti-Slop Checklist
- [ ] No generic AI-purple gradients
- [ ] No centered-everything layout
- [ ] No placeholder images or emoji-only visuals
- [ ] Buttons have proper contrast and tactile feedback
- [ ] Typography hierarchy is clear (3 levels max)
- [ ] Color is consistent within each era
- [ ] Responsive: works on projector AND phone
