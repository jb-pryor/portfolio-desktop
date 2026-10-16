# Desktop Portfolio

My personal portfolio, built with React and TypeScript and designed to resemble a laptop desktop. Visitors can explore my projects, learn about my background, and find my contact information through interactive folders.

**Live website:** [jbpryor.com](https://jbpryor.com)

## Features

- Desktop interface with Projects, About, and Contact folders
- Animated folder previews with project screenshots, contact icons, and a text-document preview
- Centered windows with scrollable content
- Project screenshots with hover effects and links to available live demos
- Repository links and labels for private or unavailable repositories
- Contact window with a portrait, personal details, and GitHub, LinkedIn, resume, and email links
- Menu bar with a live clock and decorative battery and Wi-Fi indicators
- Custom cursor and JB favicon
- Responsive layouts, keyboard navigation, and reduced-motion support

## Built With

- React
- TypeScript
- Vite
- Tailwind CSS 4
- CSS for custom layouts, folder shapes, and animations
- Vercel for deployment

## Featured Projects

- **Job Tracker:** A full-stack application built with React, TypeScript, FastAPI, and PostgreSQL.
- **Spotify Rewind:** Personalized listening insights using Next.js and the Spotify Web API.
- **KPI Dashboard:** An Angular dashboard built for PLNU’s Director of Institutional Research.
- **Python AST GitHub Action Analyzer:** A developer tool for identifying structural changes in Python code.
- **Infinite Tile Grid Game:** A JavaFX game with scrolling tiles, editing tools, and player physics.
- **C++ Dungeon Crawler:** A Raylib game with combat, enemy tracking, and room transitions.

## Getting Started

Use Node.js 22 LTS or newer.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

Vite writes the production files to `dist/`.

## Project Structure

```text
public/
  projects/       Project screenshots
  wallpaper.jpg   Desktop background
  profile.jpg     Contact portrait
  resume.pdf      Downloadable resume
  cursor.svg      Custom cursor
  favicon.svg     JB favicon

src/
  App.tsx         Components and portfolio content
  index.css       Styles, animations, and responsive layouts
  main.tsx        React entry point

index.html        Page metadata and favicon reference
vite.config.ts    Vite and Tailwind configuration
```

## Updating Content

Project descriptions, image paths, repository links, live-demo URLs, and contact information are defined in `src/App.tsx`.

Static assets are stored in `public/` and referenced from the site root. For example, `public/projects/spotify-rewind.png` is referenced as `/projects/spotify-rewind.png`.

Custom styles and animations are defined in `src/index.css`.

## Window Controls

Click or tap a folder to open its window. Close it using the red close button, the Escape key, or by clicking outside the window.

The interface displays one modal window at a time.

## Deployment

The website is hosted on Vercel at [jbpryor.com](https://jbpryor.com). Updates pushed to the connected production branch trigger a new deployment.
