# Docs Monorepo

### Selecting PR Template 

When creating a pull request, you can automatically populate the description with a template by adding a query parameter to the URL. We provide three templates:

- Platform changes: Use `?template=platform.md`
- Content changes: Use `?template=content.md`
- Drivers changes: Use `?template=drivers.md`
- Cloud Docs changes: Use `?template=cloud.md`

For example:

```curl
https://github.com/example/exampleChanges/compare/test?expand=1&template=template.md
```
