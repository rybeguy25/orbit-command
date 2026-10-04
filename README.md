# ORBIT / Deep Space Operations

A deeply unnecessary mission-control interface for spacecraft that do not exist.

Dark observatory aesthetics. Mint-green telemetry. Animated orbits. Four destinations. One ship that cannot find the Wi-Fi. Built as an intentionally over-the-top GitHub showpiece, with actual little interactions behind the impressive facade.

**This is a fictional simulation.** The vessels, missions, distances, velocity, and discoveries are made up. Transit times are game timings, not astronomical predictions. No real spacecraft or live telemetry are connected.

## Take command

- Pick Kepler-186f, Titan, Europa, or Proxima b. The destination planet and flight plan update.
- Launch a nine-second expedition through preparation, departure, cruise, and arrival.
- Follow status changes in the manifest and the transmission log.
- Pause the animated orbits, clear transmissions, or launch again.
- Watch simulated telemetry gently drift while you contemplate your questionable ambitions.

## Run

Use Node.js 18 or later. There are **no npm dependencies** and no build step.

```sh
npm start
```

Open http://localhost:3000. Alternatively, open `index.html` directly in a browser. Optional Google Fonts improve the typography; system fonts work offline.

```sh
npm run check
```

This checks JavaScript syntax. Responsive CSS, keyboard-accessible native controls, reduced-motion support, and a bounded live transmission log are included.

## Deploy

The site is static. Upload `index.html`, `styles.css`, and `app.js` to any static host, or enable GitHub Pages for the root of the main branch. The tiny local server is only for development and is not required for hosting.

## What is actually here?

Vanilla HTML, CSS, and JavaScript. CSS orbital animation and an SVG decorative trend chart. Local state that resets on refresh. No accounts, backend services, analytics, secrets, or real space agency affiliations.

## License

MIT. Go boldly. Bring a pen.
