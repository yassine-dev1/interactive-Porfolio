# AGENTS.md

## Project
Personal portfolio of Yassine El Jarjini (https://eljarjini.dev). Static site: vanilla HTML/CSS/JS, **no build step, no framework, no bundler**. Hosted on Firebase Hosting (project `interactiveportfolio-4788f`, Spark plan).

- `index.html`: public site.
- `admin.html`: admin studio used to edit the portfolio content.
- `config.js`: Firebase web config (`PORTFOLIO_CONFIG`) and helper `getPortfolioCloudUrl()`.
- Content lives in ONE Firestore document: `portfolio_data/main`, with fields `payload` (stringValue holding the whole portfolio JSON) and `updatedAt` (stringValue, ISO date). It is read and written through the Firestore REST API.
- `resumes/` (CV PDFs), `certifications/` (certificate PDFs), images in the repo.

## Working rules
- Create a new branch for every task (`feature/<short-name>`). Never commit to `main`, never force-push, never run `firebase deploy`: the owner deploys.
- Small, focused commits with clear messages.
- No build tools, no npm dependencies, no frameworks. Extra libraries only via CDN with a pinned version.
- Do not change portfolio content (texts, projects, skills, dates) unless the task says so. If you spot a content mistake, report it instead of fixing it silently.
- Do not translate or restyle the admin UI unless asked.
- Keep existing behaviour that is not part of the task: localStorage cache `portfolio_cache`, BroadcastChannel `portfolio_sync`, FR/EN switching on the public site.
- Never commit secrets (passwords, service account keys, tokens). The Firebase web API key in `config.js` is public by design.

## Security model (important)
- Anything running in the browser can be read and bypassed (a PIN, a flag in localStorage or sessionStorage). Client-side checks are only UX.
- Real authorization is enforced by **Firestore security rules** (`firestore.rules`): public read of `portfolio_data`, write only for the admin's Firebase Auth UID.
- Never write `allow write: if request.auth != null` (anyone can create an account with the public API key) and never `allow write: if true`.
- Never hardcode an admin password anywhere.

## Technical constraints
- A Firestore document is limited to 1 MiB. Never store base64 files (PDF, large images) in `payload`. Prefer repo paths or URLs.
- Firebase Auth ID tokens expire after 1 hour: get the token with `user.getIdToken()` right before each write.
- Local testing: `python -m http.server 8000`, then http://localhost:8000. `localhost` is an authorized Auth domain by default.

## Definition of done
- No console errors on `index.html` and `admin.html`.
- Final message states: files changed, behaviour changed, what could NOT be tested, and the manual steps the owner must do (console settings, deploy commands).
- Never claim something works if it was not run or verified.