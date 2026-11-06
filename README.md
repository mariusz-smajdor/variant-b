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
