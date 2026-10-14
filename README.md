# BS.M — Lofi Pixel Portfolio

Single-page professional portfolio for **Benchenina Souhaib Meheni** —
4th-Year Computer Science Student, AI & Applications (ENSTA).

Native **HTML + CSS + JS**, no frameworks. Lofi pixel-art accents
(`Press Start 2P`) paired with modern glassmorphism and clean sans-serif body text.

## Structure

```
Music/Portfolio/
  index.html          # markup: hero, stack, projects, contact, fabs
  style/theme.css     # full theme: dark (default) + creamy-pink light mode
  js/javascript.js    # menu, theme toggle, scroll buttons, typing, tilt
  README.md           # this file
```

## Sections

1. **Hero** — name, title, bio (software, AI, games, data science),
   stats, lofi pixel-scene window + terminal typing effect.
2. **Toolbox** — Python, C/C++, Godot, Flutter, SQL/PostgreSQL,
   MongoDB, Jupyter, pandas/scikit-learn, Git/Linux/Bash.
3. **Projects** — plain vertical boxes, same theme:
   - `01 Little Quest` — Projet Fin Prépa game (PC / Android / Linux)
   - `02 Palette Forge` — hue-shifting pixel palette generator
   - `03 Data Analysis & Databases Suite` — `.ipynb`, SQL, NoSQL
   - `04 TinyMind` — local AI demo (mini-tool)
   - `05 pixelterm` — terminal utility (mini-tool)
4. **Contact / Footer** — `as.benchenina@ensta.edu.dz` mailto button,
   GitHub `https://github.com/Benchenina` (new tab).

## Features

- Dark mode (default, deep indigo) + creamy light-pink mode with
  darker square grid — toggle in top navbar (`🌙/☀️`), persisted
  in `localStorage`, respects `prefers-color-scheme`.
- Floating `▲` / `▼` buttons smooth-scroll all the way to top / bottom.
- Responsive: desktop 2-column hero, tablet single column, mobile
  hamburger menu.
- Vanilla JS only: mobile menu, navbar state, active nav link,
  card tilt (fine pointers), terminal typing, footer year.

## Run

```bash
cd ~/Music/Portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly. For the latest CSS/JS use hard refresh
(`Ctrl+Shift+R`).

## Customize

- Name/title/bio: `index.html` hero block.
- Projects: duplicate an `<article class="card">` in `#cards`.
- Colors: `:root` in `style/theme.css` (dark),
  `html[data-theme="light"]` (light only).
- Behavior: `js/javascript.js` — theme key is `portfolio-theme`.
