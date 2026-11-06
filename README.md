# Fireplace ad

## Run locally

Open [preview.html](./preview.html) through a local server, for example:

```text
python -m http.server
```

Then visit `http://localhost:8000/preview.html`.

## Current implementation

- `top.html`, `left.html`, and `right.html` are standalone production creatives.
- `preview.html` composes them in independent iframes using the reference
  coordinate system (`1684 x 1018`).
- The preview synchronizes the iframe timelines with `postMessage`.
- The “Show design overlay” control displays `design/layout.png` at 50%
  opacity for alignment checks.
- Standalone creatives auto-start without depending on `preview.html`.
- The full creative uses the configured `clickTag` for clickout behavior.

## Production payload

The shipped creatives use the three cropped background files:

- `assets/top/bg.jpg`
- `assets/left/bg.jpg`
- `assets/right/bg.jpg`

The shared `styles.css` and `ad.js` files are loaded by all three HTML
creatives. The JPEG backgrounds were recompressed at quality 85 without
changing their dimensions, preserving the existing crop and seam geometry.

The measured production file list is:

```text
top.html
left.html
right.html
styles.css
ad.js
assets/top/bg.jpg
assets/top/hl.png
assets/left/bg.jpg
assets/left/logo.png
assets/left/hl.png
assets/right/bg.jpg
assets/right/logo.png
assets/right/hl.png
assets/box.png
assets/cta.png
```

This list totals 1,494,524 bytes (1.43 MiB), below the 3 MB limit. The
`design/layout.png` debug reference and unused `assets/bg-big.jpg` are not
part of the production package.

## AI note

The preview was initially built with a `1680 x 1225` stage, which did not
match the supplied `1684 x 1018` design reference. I found the issue by
comparing the actual view with the debug overlay enabled: the reference was
shifted and vertically clipped. I fixed it by using the reference dimensions
as the preview coordinate system, positioning each iframe at the measured
reference offsets, and scaling each creative to its design bounds.

## Known limitation

The debug overlay intentionally shows the reference on top of the build, so
content appears doubled when artwork differs. This is expected during visual
comparison and the overlay is not part of the production creatives.
