# Desktop portfolio

React + TypeScript + Vite + Tailwind CSS 4 starter inspired by your reference.

## Run

Use Node.js 22 LTS or newer.

```sh
npm install
npm run dev
```

Open the URL Vite prints. Build with `npm run build`.

## Customize

- Put your original portrait in `public/wallpaper.jpg`; the gradient works until you add it.
- Edit projects, biography, contact links, and folder previews in `src/App.tsx`.
- Replace generic GitHub links for Spotify and KPI with exact repository URLs.
- Add LinkedIn and resume links. Put the PDF in `public/resume.pdf` and link to `/resume.pdf`.
- Replace thumbnail text with `<img src="/project.jpg" alt="Project screenshot" />`; put images in `public/`.
- For image hover previews, replace each preview span's text with an image and style it to fill the card.

Tailwind is configured via the Vite plugin and `@import "tailwindcss"`. General utilities are demonstrated in the contact window. Custom CSS in `src/index.css` controls folder geometry and animations; migrate layout styles to utility classes as you extend the starter.

Hover or keyboard focus fans out preview cards. Click/tap opens a centered window. Close with Escape, the red close button, or clicking outside. Native dialog handles modal focus management. Mobile and reduced-motion support are included.

This starter uses one modal window at a time. Dragging, resizing, and multiple windows are not implemented.
