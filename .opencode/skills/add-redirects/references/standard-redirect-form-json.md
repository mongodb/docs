```json
{
    "source": "/docs/<slug>/<old-dir>/:path*",
    "destination": "/docs/<target-slug>/<new-dir>/:path*",
    "statusCode": 301
}
```

Do not add `"force": true` — it is only needed when the source file still exists on the filesystem, which should not be the case for renamed or deleted pages. Match the indentation style of neighboring entries.