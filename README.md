# DeutschCoach AI

DeutschCoach AI is a mobile learning app for DTZ A2/B1 preparation with a focus on passing B1.

The project is built with Expo, React Native, TypeScript, and Expo Router. It can be shared quickly as a web app through Vercel without Expo Go or a local Android build.

## Purpose

- Prepare learners realistically for the DTZ exam sections Horen, Lesen, Schreiben, and Sprechen.
- Keep the app architecture scalable for future AI-assisted features, offline support, and cloud-based distribution.
- Provide a fast browser-based MVP that can be shared by link.

## Installation

Requirements:

- Node.js
- pnpm

Install dependencies:

```bash
pnpm install
```

## Start Locally

Start the development server:

```bash
pnpm start
```

For a clean Metro cache:

```bash
pnpm exec expo start -c
```

## Export Web Version

Create a static web build:

```bash
pnpm export:web
```

The exported site is written to `dist/`.

## Deploy Free With GitHub + Vercel

Recommended path:

1. Create a new empty repository on GitHub.
2. Push this project to GitHub.
3. Sign in to Vercel with your GitHub account.
4. Import the GitHub repository in Vercel.
5. Vercel will read [vercel.json](./vercel.json) and build the web app automatically.
6. After the build finishes, Vercel gives you a public URL that you can share immediately.

### Suggested Vercel Settings

- Framework preset: `Other`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm export:web`
- Output directory: `dist`

## Notes

- The app runs in the browser, so an internet connection is needed to open the shared link.
- No Expo Go is required for the shared web version.
- No local Android toolchain is required for Vercel deployment.

## Project Files

- [app.json](./app.json): Expo app configuration
- [package.json](./package.json): dependencies and scripts
- [vercel.json](./vercel.json): Vercel build configuration
