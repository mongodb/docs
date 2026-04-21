# check-blob-meta

Retrieves and prints the metadata (including `hash` and `uploadedAt`) for a single blob in a Netlify Blobs store.

## Prerequisites

- Netlify CLI installed and authenticated (`netlify login`)
- Dependencies installed from the platform workspace root (`pnpm install`)

## Setup

Export the required environment variables:

```bash
export NETLIFY_SITE_ID=<your-site-id>
export NETLIFY_TOKEN=<your-netlify-token>
```

You can find your site ID by running:
```bash
netlify status
```

You can generate a personal access token at https://app.netlify.com/user/applications/personal.

## Usage

Run from `platform/docs-nextjs/`:

```bash
pnpm blobs:check-meta <store> <key>
```

### Example

```bash
pnpm blobs:check-meta DOP-6436-mdx-content "mdx/atlas/api/api-upgrades.mdx"
```

### Output

```json
{
  "etag": "\"f0109f2651feaab6168feff895232b21\"",
  "metadata": {
    "hash": "4fcfcd3f5e7878da5f0f9517b8f918ff12a9392f2fb639af6444fb05a43eafe2",
    "uploadedAt": "2026-04-16T21:36:52.204Z"
  }
}
```

If the blob does not exist, the script prints a message and exits cleanly.
