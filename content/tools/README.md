# MongoDB Documentation Tools

This directory contains automation tools for maintaining MongoDB documentation. Each subdirectory contains specialized tooling for different aspects of the documentation pipeline.

## Available Tools

### 📋 Atlas CLI Commands TOC Generator (`atlas-cli-commands-toc/`)

**Purpose**: Automatically generates table of contents entries for MongoDB Atlas CLI commands

**Key Features**:
- Fetches commands from `mongodb/mongodb-atlas-cli` and `mongodb/atlas-cli-plugin-kubernetes` repositories
- Git-based processing to avoid API rate limits
- Automatic version constraint detection across 10 CLI versions
- Unified output with 900+ commands properly versioned
- TypeScript type safety with XOR constraint types

**Usage**:
```bash
cd atlas-cli-commands-toc
npm install
npx tsx generate-k8s-cli-commands.ts
npx tsx generate-cli-commands.ts atlascli/v1.46.2
```

**Output**: 
- `../../table-of-contents/docset-data/atlas-cli-commands.ts`
- Copies command files to required documentation directories

## Tool Development Guidelines

### TypeScript Standards
- Use strict TypeScript configuration
- Include proper type definitions for all tools
- Implement error handling for external dependencies (git, APIs)
- Use `tsx` for TypeScript execution in development

### File Organization
```
tools/
├── .gitignore                          # Global ignore patterns
├── README.md                           # This file
└── [tool-name]/                        # Individual tool directory
    ├── README.md                       # Tool-specific documentation
    ├── .gitignore                      # Tool-specific ignores  
    ├── package.json                    # Node.js dependencies
    ├── tsconfig.json                   # TypeScript configuration
    ├── [main-script].ts                # Primary tool script
    ├── [helper-scripts].ts             # Additional functionality
    └── generated-files/                # Tool outputs (gitignored)
```

### Common Dependencies
Most tools use these standard dependencies:
- `tsx` - TypeScript execution engine
- `typescript` - TypeScript compiler  
- `@types/node` - Node.js type definitions

### External Integration Patterns
- **Git Operations**: Use local cloning to avoid API rate limits
- **File Processing**: Process files individually to manage memory
- **Error Handling**: Implement graceful degradation and cleanup
- **Temporary Files**: Use `/tmp` with automatic cleanup

## Adding New Tools

When creating new documentation automation tools:

1. **Create Tool Directory**:
   ```bash
   mkdir content/tools/new-tool-name
   cd content/tools/new-tool-name
   ```

2. **Initialize Node.js Project**:
   ```bash
   npm init -y
   npm install tsx typescript @types/node
   ```

3. **Create TypeScript Config**:
   ```json
   {
     "compilerOptions": {
       "target": "ES2022",
       "module": "ESNext", 
       "moduleResolution": "node",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     }
   }
   ```

4. **Document Tool**:
   - Create comprehensive README.md
   - Include usage examples
   - Document all CLI options
   - Explain integration points

5. **Follow Patterns**:
   - Use existing tools as templates
   - Implement similar error handling
   - Follow naming conventions
   - Include generation summaries

## Maintenance

### Regular Tasks
- Update dependencies in all tool directories: `npm update`
- Review generated file outputs for accuracy
- Update READMEs when adding new features
- Monitor external API/repository changes

### Version Management
- Pin critical dependency versions in package.json
- Test tools with new Node.js versions
- Update TypeScript as needed for new language features
- Coordinate tool updates with documentation releases

## Integration with Documentation Pipeline

These tools integrate with the broader MongoDB documentation system:

- **Table of Contents**: Generate entries for `content/table-of-contents/`
- **Content Directories**: Populate `content/atlas/`, `content/atlas-cli/`, etc.
- **Build System**: Output files are consumed by Snooty and other build tools
- **Version Management**: Tools respect documentation versioning schemes

For questions about tool development or maintenance, consult the documentation team or check existing tool implementations for patterns and best practices.
