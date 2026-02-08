# Deployment Guide: Oh My Professors MVP

This project is built with Next.js 14+ (App Router) and Tailwind CSS v4. It is optimized for deployment on **Vercel**.

## Prerequisites

- A [Vercel account](https://vercel.com/signup).
- [Node.js](https://nodejs.org/) installed on your machine.

## 1. Install Vercel CLI

If you haven't installed the Vercel CLI yet, run:

```bash
npm i -g vercel
```

## 2. Deploy to Vercel

### Option A: Via CLI (Recommended for MVP)

1. Open your terminal in the project root (`/ohmyprofessors_web`).
2. Run the deployment command:
   ```bash
   vercel
   ```
3. Follow the prompts:
   - **Log in**: If not logged in, it will open a browser window.
   - **Set up and deploy?**: Yes
   - **Which scope?**: Choose your personal/team scope.
   - **Link to existing project?**: No
   - **Project Name**: `ohmyprofessors-web` (or your choice)
   - **Directory**: `./`
   - **Override settings?**: No (The CLI will automatically detect Next.js settings).

4. Once the preview deployment is finished, you can deploy to production:
   ```bash
   vercel --prod
   ```

### Option B: Via GitHub (Continuous Deployment)

1. Push your code to a GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your repository.
4. Vercel will automatically detect Next.js and deploy your project on every push to `main`.

## 3. Environment Variables

For this MVP, no environment variables are strictly required. However, if you add an email service (like Resend or SendGrid) for the "Join Beta" form later, you should add them in the Vercel Dashboard under **Project Settings > Environment Variables**.

## 4. Troubleshooting

- **Tailwind v4 Issues**: Ensure your build environment uses Node.js 18+. Vercel uses recent Node versions by default.
- **Build Fails**: Run `npm run build` locally to check for any TypeScript or Linting errors before deploying.
