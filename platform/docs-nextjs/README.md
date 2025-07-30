# MongoDB Docs on Next.js

Docs-Nextjs is a [Next.js](https://nextjs.org) application using app router features. It is the designated site to serve all MDB Documentation through an SSR pipeline.

## Installation

### Prereq - Node

This project uses node as specified in the `.nvmrc` file.


### Compatiblity
This project uses Next.js@15 with React@18 to ensure compatiblity with LeafyGreen components.

### NPM

Use `npm install` to install dependencies


### Env files
Create a `.env` file using the .env.sample file provided

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Developing

### Styling Conventions
Next.js supports module [css](https://nextjs.org/docs/app/getting-started/css#css-modules)/[scss](https://nextjs.org/docs/app/guides/sass) out of the box. It is preferred to use css/scss modules for layouts and server side components that do not have to hydrate on the client side.

We develop components based off [LeafyGreen's UI Library](https://github.com/mongodb/leafygreen-ui). These are based off the [Emotion library](https://emotion.sh/docs/introduction) and should use the convention of `className` with styling. 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
