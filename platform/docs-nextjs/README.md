# MongoDB Docs on Next.js

Docs-Nextjs is a [Next.js](https://nextjs.org) application using app router features. It is the designated site to serve all MDB Documentation through an ISR pipeline.

## Page generation strategy

- Pregenerated pages are built at deploy time and immediately available (SSG)
- All other ISR pages are built on first request, then cached and revalidated per your revalidate setting
- All ISR pages follow the same ISR revalidation schedule (at least how it's setup currently)

## Installation

### Prereq - Node

This project uses node as specified in the `.nvmrc` file.
Use the above file with `nvm install` and `nvm use`.

We will also use pnpm as the under the platform/ repository.
Install with `npm install -g pnpm`

### Compatibility
This project uses Next.js@15 with React@18 to ensure compatibility with LeafyGreen components.

### PNPM

Use `pnpm install` to install dependencies. This means that you will need to explicitly
define dependent packages within each project, without a package.lock.json.


### Env files
Create a `.env` file using the .env.sample file provided

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Developing

### Product Updates Page
If you would like to test Aha! integration, grab the CONTENTSTACK_WEBHOOK_TOKEN value from Netlify env config.

### Styling Conventions
Next.js supports module [css](https://nextjs.org/docs/app/getting-started/css#css-modules)/[scss](https://nextjs.org/docs/app/guides/sass) out of the box. It is preferred to use css/scss modules for layouts and server side components that do not have to hydrate on the client side.

We develop components based off [LeafyGreen's UI Library](https://github.com/mongodb/leafygreen-ui). These are based off the [Emotion library](https://emotion.sh/docs/introduction) and should use the convention of `className` with styling. 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

This application is deployed on Netlify at [Docs on Next](https://app.netlify.com/projects/docs-on-nextjs/overview). Branch and preview deploys can be managed via the UI, under [Project Configuration -> Build & Deploy](https://app.netlify.com/projects/docs-on-nextjs/configuration/deploys#content).
