# UMER PORTFOLIO — PRISM NEBULA V6 / MODULAR

The V6 build keeps the existing visual/interaction behavior while separating major concerns into maintainable modules.

## Runtime architecture

- `index.html` — semantic DOM/page shell
- `styles/base.css` — shared foundation
- `styles/theme-polar.css` — Polar Eclipse layer
- `styles/theme-prism.css` — Prism Nebula layer
- `styles/components/hero.css` — circular hero
- `styles/components/holo.css` — Holo Deck
- `styles/components/transmissions.css` — testimonial deck
- `src/data/siteData.js` — project/contact/case data
- `src/core/utils.js` — DOM/math/toast utilities
- `src/core/assetIntegrity.js` — local asset diagnostics
- `src/effects/background.js` — WebGL + canvas atmosphere
- `src/effects/cursor.js` — pointer/hero interactions
- `src/components/holoDeck.js` — project deck component
- `src/components/transmissionDeck.js` — scroll-driven client testimonial component
- `src/main.js` — remaining portfolio runtime and orchestration

All JS is intentionally loaded as classic scripts (rather than ES modules) so the portfolio can still be opened directly from `file://` in a local browser.

Nova-AI and StudyFlow-AI remain local builds without fabricated external URLs.
