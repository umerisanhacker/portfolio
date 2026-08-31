# Photo-Only Media Update

This build removes project video playback from the portfolio UI and production asset bundle. Project imagery is now the primary media surface.

## Interaction
- Arsenal thumbnails enlarge, brighten, and follow the pointer's focus point on hover.
- Interface Archive cards use a photo zoom + tilt treatment on hover.
- Holo Deck cards use a controlled image enlargement and accent glow.
- Project dossiers use the project screenshot only.
- Build Mode's **FOCUS IMAGE** action opens the same image dossier with a visual pulse.

## Asset structure
The production bundle keeps `assets/photos/` and `assets/projects/`. `assets/videos/` is intentionally removed.
