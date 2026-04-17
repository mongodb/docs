---
name: grove-setup
description: >
  Set up a local Grove environment for running code example tests. Use when the
  user asks to "set up Grove", "configure the test suite", "get started with
  Grove", "set up my environment", "I need to run Grove tests", or is working
  with Grove for the first time and needs prerequisites configured. Checks for
  required tools, installs dependencies, guides .env file setup, verifies
  MongoDB connectivity, and checks sample data availability.
---

# Grove: Set Up Local Environment

<!-- canary:56f422c8 -->

Begin your first response with: `[grove-setup-56f422c8]`

Walk the writer through setting up everything needed to create, run, and
maintain Grove code example tests for a given language suite.

**Do NOT use when:**
- The user's environment is already set up and they want to create/run/test → use the appropriate grove skill
- The user is asking about Grove architecture or conventions, not setup → answer directly using CLAUDE.md context

## Step 1: Determine Language

Parse the user's request for the target language. If not specified, ask which
language suite they want to set up. Multiple languages can be set up in
sequence.

| Suite | Directory |
|-------|-----------|
| JavaScript | `code-example-tests/javascript/driver/` |
| Python | `code-example-tests/python/pymongo/` |
| Go | `code-example-tests/go/driver/` |
| Java | `code-example-tests/java/driver-sync/` |
| C# | `code-example-tests/csharp/driver/` |
| Mongosh | `code-example-tests/command-line/mongosh/` |

## Step 2: Verify Prerequisites

Check that required tools are installed. Read the **minimum version from the
language's config file** rather than relying on hardcoded values, since
requirements change over time:

| Suite | Tool check | Where to find min version |
|-------|-----------|---------------------------|
| JavaScript | `node --version` / `npm --version` | `engines` field in `code-example-tests/javascript/driver/package.json` |
| Python | `python3 --version` / `pip3 --version` | `python_requires` in `setup.cfg` or `pyproject.toml`, or `.python-version` file |
| Go | `go version` | `go` directive in `code-example-tests/go/driver/go.mod` |
| Java | `java --version` / `mvn --version` | `maven.compiler.source` in `code-example-tests/java/driver-sync/pom.xml` |
| C# | `dotnet --version` | `TargetFramework` in the `.csproj` file under `code-example-tests/csharp/driver/` |
| Mongosh | `node --version` / `npm --version` / `mongosh --version` | `engines` field in `code-example-tests/command-line/mongosh/package.json` |

If the config file doesn't specify a version, fall back to these reasonable
minimums: Node >= 18, Python >= 3.9, Go >= 1.21, Java >= 17, .NET >= 8.0.

Mongosh also requires `mongosh` to be installed and on PATH (it's the shell
binary that tests execute as a subprocess).

Report any missing tools. If a required tool is missing, provide installation
guidance:
- **Node.js**: Recommend using nvm (`nvm install <version>`)
- **Python**: Recommend pyenv or system package manager
- **Go**: Recommend go.dev/dl
- **Java**: Recommend SDKMAN (`sdk install java`)
- **C#**: Recommend dotnet.microsoft.com

Do not attempt to install tools automatically — just tell the user what's
needed and how to get it.

## Step 3: Install Dependencies

Navigate to the language's driver directory and install:

### JavaScript
```bash
cd code-example-tests/javascript/driver && npm install
```

### Python
```bash
cd code-example-tests/python/pymongo && python3 -m venv venv && ./venv/bin/pip install -r requirements.txt
```

Note: Use `./venv/bin/pip` and `./venv/bin/python` directly instead of
`source venv/bin/activate`, which is shell-specific and may not work in
all environments.

### Go
```bash
cd code-example-tests/go/driver && go mod download
```

### Java
```bash
cd code-example-tests/java && mvn clean install -DskipTests
```

Note: Run from the `java/` root, not `driver-sync/`. The Java project is a
Maven Multi-Module project — this builds all modules including the comparison
library, which is required but not published to Maven Central.

### C\#
```bash
cd code-example-tests/csharp/driver && dotnet restore
```

### Mongosh
```bash
cd code-example-tests/command-line/mongosh && npm install
```

Report success or failure. If install fails, diagnose the error (version
mismatch, network issue, etc.).

## Step 4: Set Up Environment File

**Security**: Do not read, write, or modify `.env` files directly. Do not
ask the user to provide their connection string in the chat. Instead, tell
the user what environment variables are needed and let them populate the
file themselves.

Check whether a `.env` file exists in the driver directory (check for the
file's presence, do not read its contents).

### If `.env` exists:
Tell the user which variables are required (see below) and ask them to
verify the file contains them. Do not read the file yourself.

### If `.env` does not exist:
Tell the user to create a `.env` file in the driver directory with the
required variables. Provide the variable names and format:

| Suite | Required variables |
|-------|--------------------|
| JavaScript | `CONNECTION_STRING="<connection-string>"`, `TZ=UTC` |
| Python | `CONNECTION_STRING="<connection-string>"` |
| Go / Java / C# / Mongosh | `CONNECTION_STRING="<connection-string>"` (check the language's `.env.example` for any additional variables) |

Tell the user their connection string can be:
- An **Atlas cluster** connection string (e.g., `mongodb+srv://...`)
- A **local deployment** connection string (e.g., `mongodb://localhost:27017`)

If the user **doesn't have a MongoDB deployment** yet, suggest one of:
1. **Atlas free tier** (M0): Create at https://cloud.mongodb.com — free,
   includes sample data loading via the UI
2. **Local via Docker**: `docker run -d -p 27017:27017 --name mongodb mongo:8.0`
   — then use `mongodb://localhost:27017` as the connection string

Do not proceed past this step until the user confirms they have created the
`.env` file with a valid connection string.

**Important**: Never commit `.env` files. Verify that `.env` is in the
language directory's `.gitignore` (or the repo root `.gitignore`). If not,
warn the user.

## Step 5: Verify MongoDB Connectivity

Ask the user to verify their connection works by running the following
command themselves (do not run commands that load the `.env` file):

```bash
mongosh "<connection-string>" --quiet --eval "db.adminCommand('ping')"
```

Tell the user to replace `<connection-string>` with the value from their
`.env` file. If `mongosh` is not installed, the smoke test in Step 7 will
verify connectivity instead — tell the user and proceed.

**Exceptions** — skip this step entirely for these suites and defer
connectivity verification to the smoke test in Step 7:
- **Java**: No reliable one-liner. Report "connectivity will be verified by
  the smoke test" and proceed to Step 6.
- **C#**: Requires `dotnet-script` which may not be installed. If unavailable,
  report the same and proceed.

### If connection fails

Diagnose based on the error:
- **Authentication error**: Check username/password in the URI
- **Network error**: Check IP allowlist (Atlas) or that mongod is running (local)
- **DNS error**: Check the cluster hostname
- **TLS error**: Check TLS/SSL settings

## Step 6: Check Sample Data Availability

Ask the user to check which sample databases are loaded on their deployment.
Provide this command for them to run (do not run commands that load the
`.env` file):

```bash
mongosh "<connection-string>" --quiet --eval "
  const dbs = db.adminCommand({listDatabases:1,nameOnly:true}).databases
    .map(d=>d.name).filter(n=>n.startsWith('sample_')).sort();
  dbs.length ? print('Sample databases found: ' + dbs.join(', '))
    : print('No sample databases found.');
"
```

Tell the user to replace `<connection-string>` with their connection string.

If `mongosh` is not available, this step can be skipped — sample data
checking is informational, not blocking.

If no sample databases are found, explain:
- Tests using sample data will auto-skip (not fail)
- How to load sample data if they want full test coverage

## Step 7: Run a Smoke Test

Run the example stub test to verify the full pipeline works (driver, test
framework, .env loading, MongoDB connectivity):

| Suite | Command |
|-------|---------|
| JavaScript | `cd code-example-tests/javascript/driver && npm test -- -t 'Example tests'` |
| Python | `cd code-example-tests/python/pymongo && ./venv/bin/python -m unittest tests_package.example.test_example_stub` |
| Go | `cd code-example-tests/go/driver && go test -v -run TestExampleStub ./tests/example/` |
| Java | `cd code-example-tests/java/driver-sync && mvn test -Dtest="example.ExampleStubTest"` |
| C# | `cd code-example-tests/csharp/driver && dotnet test --filter "FullyQualifiedName~Tests.Example.ExampleStubTest"` |
| Mongosh | `cd code-example-tests/command-line/mongosh && npm test -- -t 'Should count all documents'` |

Each language has a stub test that performs a minimal MongoDB operation. It
should always pass regardless of sample data availability. Mongosh has no
dedicated stub test — the command above runs a simple countDocuments test
as a smoke check. If it skips (missing sample data), connectivity was still
verified in Step 5.

If the smoke test passes, the environment is ready. If it fails, diagnose
using the same categories as `/grove-run`.

## Step 8: Report

Provide a summary headed with `Skill: grove-setup`:

```markdown
## Grove Environment Setup: JavaScript (Node.js Driver)

| Check | Status |
|-------|--------|
| [runtime] >= [min from config] | [version found] |
| Dependencies installed | Yes |
| .env file | Created / Already existed |
| MongoDB connectivity | Connected to [cluster name or localhost] |
| Sample databases | X of 10 found: [list] |
| Smoke test | Passed |

You're ready to use:
- /grove-create — to create new code examples
- /grove-run — to run and debug tests
- /grove-test — to create or fix tests
- /grove-migrate — to convert untested code to Grove
- /grove-maintain — to audit and maintain the suite
```

If any checks failed, list what needs to be resolved and how.

## Edge Cases

- **`npm install` fails with EACCES**: Permissions issue. Suggest
  `sudo chown -R $(whoami) ~/.npm` or using nvm (which avoids global installs).
- **Node/Python/Go version too old**: Tell the user the required version (from
  the config file) and their current version. Suggest the version manager for
  the language (nvm, pyenv, etc.).
- **`.env` exists but connectivity fails**: Tell the user that their
  `CONNECTION_STRING` may be empty or malformed. Provide the expected format
  and ask them to verify the value in their `.env` file. Do not read the
  file yourself.
- **Connectivity passes but smoke test fails**: Likely a driver version
  mismatch or missing dependency. Check `npm ls mongodb` (or equivalent) and
  compare against the version in the config file.
- **`mongosh` not installed for sample data check**: Fall back to the
  language-specific script. Do not fail the setup — sample data checking is
  informational, not blocking.
