# MongoDB Docs on Next.js

Docs-Nextjs is a [Next.js](https://nextjs.org) application using app router features. It is the designated site to serve all MDB Documentation through an ISR pipeline.

## Page generation strategy

- Pregenerated pages are built at deploy time and immediately available (SSG)
- All other ISR pages are built on first request, then cached and revalidated per your revalidate setting
- All ISR pages follow the same ISR revalidation schedule (at least how it's setup currently)

## Developing

`turborepo` is used to orchestrate tasks in this monorepo. It is recommended to run commands from the root of the `platform` directory, as opposed to directly from this directory. You can do this however if you need to bypass the additional checks that `turborepo` will perform. In addition to linting/tests, `turbo` is also ensuring the TOC gets built.

### Product Updates Page
If you would like to test Aha! integration, grab the CONTENTSTACK_WEBHOOK_TOKEN value from Netlify env config.

### Styling Conventions
Next.js supports module [css](https://nextjs.org/docs/app/getting-started/css#css-modules)/[scss](https://nextjs.org/docs/app/guides/sass) out of the box. It is preferred to use css/scss modules for layouts and server side components that do not have to hydrate on the client side.

We develop components based off [LeafyGreen's UI Library](https://github.com/mongodb/leafygreen-ui). These are based off the [Emotion library](https://emotion.sh/docs/introduction) and should use the convention of `className` with styling. 

## Deploy on Netlify

This application is deployed on Netlify at [Docs on Next](https://app.netlify.com/projects/docs-on-nextjs/overview). Branch and preview deploys can be managed via the UI, under [Project Configuration -> Build & Deploy](https://app.netlify.com/projects/docs-on-nextjs/configuration/deploys#content).
