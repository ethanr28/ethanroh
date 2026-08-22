# Ethan Roh — Personal Website

A lightweight, responsive personal site built as plain HTML/CSS/JavaScript so it can be deployed anywhere without a build step.

## Preview locally

From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

### Vercel
1. Create a new GitHub repository.
2. Upload these files to the repository root.
3. Import the repository into Vercel.
4. Framework preset: **Other**.
5. No build command is needed.

### GitHub Pages
1. Push these files to a repository.
2. In Settings → Pages, deploy from the `main` branch and root folder.

## Easy content edits

- Main copy and experience entries: `index.html`
- Movies/books/music/travel/sports: the `interests` object at the top of `script.js`
- Colors and spacing: CSS variables at the top of `styles.css`
- Headshot: replace `assets/ethan-roh-headshot.jpg` with another image using the same filename.

## Design notes

- The headshot uses `object-fit: cover` with a fixed portrait aspect ratio, so it will not stretch.
- Bronze/dark-yellow accents are intentionally secondary to the green palette.
- Experience rows expand on click.
- The interests section stays compact until the camera panel is opened, then becomes a click/swipe carousel.
- Scroll reveal animations respect `prefers-reduced-motion`.
