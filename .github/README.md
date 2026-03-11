# MongoDB Documentation

This repository contains the MongoDB documentation, accessible at https://www.mongodb.com/docs/


## Contribute

The MongoDB Documentation Project is governed by the terms of the [MongoDB Contributor Agreement](https://www.mongodb.com/legal/contributor-agreement).

To contribute to the documentation, 

- If you have not done so already, please sign the [MongoDB Contributor Agreement](https://www.mongodb.com/legal/contributor-agreement).

- Fork this repository on GitHub and issue a pull request. 


## Report Issues

To file issues or requests regarding the documentation, use the "Rate this page" feedback widget on the right side of docs pages and leave a comment.


## Automation Tools (`.github/` directory)

The `.github/` folder contains documentation automation tools. Follow these conventions:

### Structure Guidelines

```
.github/
├── lint-docs/          # Doc linters (flat structure)
│   ├── seo-lint-cli.ts
│   ├── seo-lint-rules.ts
│   ├── 404-lint-cli.ts
│   ├── package.json
│   └── tsconfig.json
├── typo-fixer/         # Typo fixer bot
├── ai-reviewer/        # AI style reviewer
├── cspell/             # Spell checking config
└── workflows/          # GitHub Actions
```

### Naming Conventions

1. **Flat structure over nesting**: Put related files directly in one folder rather than creating subfolders
2. **Prefix file names**: Use prefixes like `seo-lint-`, `404-lint-` for better IDE tab visibility
3. **Single package.json**: Each tool folder should have one shared `package.json`

### Adding New Tools

When creating new automation tools:
- Create a folder at `.github/<tool-name>/`
- Use descriptive file prefixes (e.g., `tool-name-cli.ts`, `tool-name-rules.ts`)
- Include `package.json`, `tsconfig.json`, and a brief README


## License

All documentation is available under the terms of a [Creative Commons License](https://creativecommons.org/licenses/by-nc-sa/3.0/).
