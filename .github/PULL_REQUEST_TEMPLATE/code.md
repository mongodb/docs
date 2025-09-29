# Code Examples Tests Pull Request
Jira: <https://jira.mongodb.org/browse/DOCSP-NNNNN>
<!-- Add staging link if applicable -->

<!-- Provide a clear and concise description of the changes -->

### Languages
<!-- Check all languages affected by this PR -->
- [ ] C# (`/code-example-tests/csharp/` - see [README](/code-example-tests/csharp/driver/README.md))
- [ ] Go/driver (`/code-example-tests/go/driver/` - see [README](/code-example-tests/go/driver/README.md))
- [ ] Go/sdk (`/code-example-tests/go/atlas-sdk/` - see [INTERNAL_README](/code-example-tests/go/atlas-sdk/INTERNAL_README.md))
- [ ] Java (`/code-example-tests/java/` - see [README](/code-example-tests/java/driver-sync/README.md))
- [ ] JavaScript (`/code-example-tests/javascript/` - see [README](/code-example-tests/javascript/driver/README.md))
- [ ] Python (`/code-example-tests/python/` - see [README](/code-example-tests/python/pymongo/README.md))
- [ ] cli/mongosh
  (`/code-example-tests/command-line/mongosh/` - see [README](/code-example-tests/command-line/mongosh/README.md))

### Change Type
<!-- Check all that apply -->
- [ ] New/updated code examples and tests - Adding and modifying
  example files and corresponding tests
- [ ] Test infrastructure - Changes to test utilities,
  configuration, or CI (includes unit tests)
- [ ] Documentation - Updates to README files or specifications

## Self-Review Checklist
See also [Code Examples Tests README](../../../code-example-tests/README.md)
- [ ] All code examples compile/run without errors
- [ ] All new examples have corresponding tests
- [ ] No hardcoded secrets - uses environment variables for connection
  configuration
- [ ] Follows [code examples](https://www.mongodb.com/docs/meta/style-guide/style/code-examples)
  style guidelines

## External Review Checklist
- [ ] Technical accuracy - Code examples demonstrate correct MongoDB usage
- [ ] Documentation readiness - Examples are suitable for inclusion in documentation
- [ ] Test reliability - Tests exists and accurately validate example behavior
- [ ] Test infrastructure - Changes comply with project standards
  (including naming, file structure, etc.)

