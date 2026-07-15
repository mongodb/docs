```toml
[[redirects]]
  from = "/docs/<slug>/<old-path>/"
  to = "/docs/<slug>/<new-path>/"
```

Omit both `status` and `force`. Do not add `force = true` — it is only needed when the source file still exists on the filesystem, which should not be the case for renamed or deleted pages. Match the indentation style of neighboring entries.