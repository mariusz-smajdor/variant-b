# Implementation decisions

- Used plain HTML, shared CSS, and shared modern JavaScript; no animation
  library or bundler is shipped.
- Kept `top.html`, `left.html`, and `right.html` as separate production
  creatives, with `preview.html` as a development-only composition.
- Used the supplied per-part cropped backgrounds instead of `assets/bg-big.jpg`
  so each delivered creative is self-contained and the total payload stays
  below 3 MB.
- Rendered the supplied 2x artwork at 50% through the creative dimensions and
  shared layer styles.
- Used `transform` and `opacity` for animation, with Web Animations API
  feature detection and a final-state fallback for unsupported browsers.
- Coordinated preview iframe starts with `postMessage`; standalone creatives
  start independently.
- Kept `design/layout.png` and `assets/bg-big.jpg` out of the production file
  list. The design image is used only by the preview overlay.
- Recompressed the three cropped JPEG backgrounds at quality 85 without
  changing their dimensions or crop geometry.
