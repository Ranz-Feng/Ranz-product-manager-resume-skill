# Acceptance Checklist

## Content Gate

- Target role is visible in the first viewport.
- Core projects answer why, how, result, and ownership.
- Strongest and most relevant evidence appears first.
- Metrics are source-backed and use consistent definitions.
- Team outcomes and personal responsibilities are distinguishable.
- No placeholders remain except fields the user explicitly wants blank.
- Links and dates are valid or intentionally empty.

## Layout Gate

- Output has the agreed A4 page count, normally two pages.
- No text, image, border, or page number clips or overlaps.
- No heading is stranded from the content it introduces.
- Core project blocks do not break incoherently across pages.
- Each page normally uses about 70%-85% of its usable height; treat this as a density warning range, not a reason to pad weak content.
- Body text remains comfortably readable when printed at 100% scale.
- Hierarchy is clear without decorative card stacking or excessive colors.

## Typography Gate

- English and numbers resolve to Georgia or an approved fallback.
- Chinese resolves to PingFang SC, Hiragino Sans GB, Microsoft YaHei, or another approved CJK font.
- Chinese headings do not accidentally inherit an unsuitable Latin serif face.
- Letter spacing is zero and Chinese-English spacing is consistent.
- Font weights and baselines do not visibly jump within mixed-language lines.

## Avatar Gate

- Circular edge is clean, with no seam, horizontal cut line, or white strip.
- Head top, face, and enough shoulder context remain visible.
- Crop is adjusted through image scale and position rather than circle enlargement alone.
- Avatar does not crowd the name, links, or contact lines.
- Image source remains resolvable after moving or printing the HTML.

## Print Gate

- Automated QA reports the expected number of `.page` elements.
- Automated QA reports no page overflow.
- Every rendered page screenshot has been visually inspected.
- Target-browser print preview has been checked when browser parity matters.
- Recommended settings are communicated: A4, margins none, scale 100%, background graphics on, headers and footers off.
- Verification statement names the browser actually tested; Chrome validation must not be reported as Safari validation.

## Delivery Gate

- Original source remains unchanged.
- Editable HTML and required local assets are delivered together.
- Any unresolved metric, missing link, or unverified browser behavior is stated plainly.
