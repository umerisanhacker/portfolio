# Adding a project

1. Put the landing-page image in `assets/projects/`.
2. Put the project photo in `assets/photos/`.
3. Add the project record to `src/data/siteData.js` under `HOLO_PROJECTS`.
4. Add its case copy under `CASES` if it needs a dossier.
5. Add a live URL only when a real hosted URL exists.
6. Run the asset-integrity check in the browser console if needed.

Recommended names:

- `assets/projects/<project-slug>.jpg`
- `assets/projects/<project-slug>.jpg` (project screenshot)

Do not invent URLs for local/unhosted builds.


## Current media convention

This production build is photo-first. Add the project screenshot under `assets/projects/`; project videos are intentionally not part of the deployed bundle.
