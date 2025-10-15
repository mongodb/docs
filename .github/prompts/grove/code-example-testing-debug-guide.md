# AI Agent Instructions: Code Example Testing Debug Guide

## 🎯 Quick Decision Framework (READ FIRST)

**Your Mission:** Help technical writers debug code example testing issues while escalating infrastructure problems to the Grove team.

> **Audience:** This guide is written for AI agents (such as Copilot, Augment, etc.) who assist MongoDB technical writers in debugging and maintaining code example tests. Technical writers may also reference this guide, but its instructions are primarily for those providing support.

**When to Help (Writer Issues):**
- ✅ Environment setup problems (missing dependencies, env vars, MongoDB connection)
- ✅ Invalid syntax or missing imports in example files
- ✅ Missing or incorrect output files
- ✅ Forgotten imports in test files
- ✅ Incorrect usage of comparison APIs
- ✅ Basic test framework issues

**When to Escalate (Tooling Issues):**
- 🚨 Comparison utility parsing failures
- 🚨 Missing data type support in comparison libraries
- 🚨 Infrastructure/CI failures
- 🚨 Incomplete comparison implementations
- 🚨 Performance issues with comparison utilities

---

## Overview

This guide helps AI agents assist MongoDB technical writers with debugging issues in the code example test infrastructure located at `/code-example-tests/`. The infrastructure validates that code examples in documentation compile, run, and produce expected output.

## Prerequisites

Before debugging, understand:
1. **Repository structure** from `.github/copilot-instructions.md`
2. **Test project structure**: `examples/`, `tests/`, `utils/` directories per language
3. **Comparison utilities**: How `outputMatchesExampleOutput` and similar functions work
4. **Sample data requirements**: Usage of `describeWithSampleData` and sample databases

## 🗒️ Quick Glossary

- **Comparison utility:** A function (like `outputMatchesExampleOutput`) that checks if example output matches expected results.
- **Ellipsis pattern:** Using `...` in output files to indicate wildcards or variable data.
- **Grove team:** Internal team responsible for maintaining testing infrastructure.
- **describeWithSampleData:** Utility that skips tests if sample data is not present.
## 🔍 Diagnostic Process

### Phase 1: Initial Triage

**Step 1: Identify the Language Project**
```bash
# Determine which language project the writer is working in
ls code-example-tests/
# Common projects: javascript/driver, python/pymongo, java/driver-sync, csharp/driver, go/driver
```

**Step 2: Understand the Current State**
Ask the writer to provide:
- Exact error message(s) they're encountering
- The specific files they're working with (example file, test file, output file)
- What they were trying to accomplish
- Steps they've already taken

**Step 3: Categorize the Issue**
Based on error patterns, determine if this is a writer issue or tooling issue:

**Writer Issue Indicators:**
- Environment variable errors: `CONNECTION_STRING not set`
- Syntax errors in JavaScript/Python/etc. code
- File not found errors for example/output files
- Import/require statement errors
- Basic test failures with clear causes
- Test setup/teardown issues causing state to persist between test cases or test runs

**Tooling Issue Indicators:**
- Comparison utility crashes or unexpected behavior
- Parser errors in output matching utilities
- Infrastructure/CI pipeline failures
- Performance timeouts in comparison functions
- Error messages mentioning internal utility functions
- Comparison utility returning `false` when the return value should be `true` -
  i.e. the writer's code and output are correct, but the utility can't match it correctly

### Phase 2: Writer Issue Resolution

If categorized as a writer issue, guide them through these common scenarios:

#### Environment Setup Issues

**Symptom:** `CONNECTION_STRING environment variable not set` or similar
**Solution:**
1. Check if `.env` file exists in project root
2. Verify environment variable format:
   ```
   CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/
   ```
3. Ensure they have a MongoDB cluster available (Atlas or local)
4. Guide them to restart their test runner after env changes

**Diagnostic Commands:**
```bash
# Check if environment file exists
ls -la .env

# Verify environment variable is set
echo $CONNECTION_STRING

# Test basic connection
node -e "console.log(process.env.CONNECTION_STRING)"
```

#### Missing Dependencies

**Symptom:** Module not found errors, import failures
**Solution:**
1. Check if dependencies are installed:
   ```bash
   # For JavaScript projects
   npm install

   # For Python projects - prefer using venv for Python
   pip install -r requirements.txt

   # For Java projects
   mvn install

   # For C# projects
   dotnet restore
   ```

#### Invalid Example File Syntax

**Symptom:** Compilation errors, syntax errors in example files
**Solution:**
1. Review the example file for common issues:
   - Missing imports/requires
   - Incorrect function exports
   - Hard-coded connection strings (should use `process.env.CONNECTION_STRING`)
   - Missing async/await keywords
   - Improper error handling

**Example Fix:**
```javascript
// ❌ Problematic
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

// ✅ Correct
import { MongoClient } from 'mongodb';
export async function runExample() {
    const uri = process.env.CONNECTION_STRING;
    if (!uri) {
        throw new Error('Set your CONNECTION_STRING environment variable');
    }
    // ... rest of function
}
```

#### Missing or Incorrect Output Files

**Symptom:** `outputMatchesExampleOutput` fails, file not found errors
**Solution:**
1. Help them create the expected output file:
   - Run the example manually and capture output
   - Save to `examples/[topic]/[name]-output.txt`
   - Use ellipsis patterns for variable data:
     ```json
     {
       "_id": "...",
       "title": "Back to the Future",
       "year": 1985
     }
     ```

**Ellipsis Pattern Guide:**
- `"field": "..."` - Matches any value for this field
- `"text": "Prefix..."` - Matches text starting with prefix
- Standalone `...` line - Allows omitted fields globally

#### Forgotten Imports in Test Files

**Symptom:** Test functions not found, import errors
**Solution:**
1. Check test file imports:
   ```javascript
   // Ensure example function is imported
   import { runMyExample } from '../examples/topic/my-example.js';

   // Ensure comparison utility is imported
   import outputMatchesExampleOutput from '../utils/outputMatchesExampleOutput.js';

   // For sample data requirements
   import { describeWithSampleData } from '../utils/sampleDataChecker.js';
   ```

#### Incorrect Comparison API Usage

**Symptom:** Tests fail even when output looks correct
**Solution:**
1. Review comparison function usage:
   ```javascript
   // Basic usage
   const outputMatches = outputMatchesExampleOutput('topic/output.txt', result);

   // With options for variable fields
   const outputMatches = outputMatchesExampleOutput('topic/output.txt', result, {
       comparisonType: 'unordered',
       ignoreFieldValues: ['_id', 'timestamp']
   });
   ```

2. Common mistakes:
   - Wrong file path (check each project for file path resolution details)
   - Not handling arrays vs single objects consistently between example and output
   - Ignoring fields that should use ellipsis patterns instead

### Phase 3: Guided Problem Solving

For writer issues, use this collaborative approach:

1. **Explain the Why:** Help writers understand why the issue occurred
2. **Show the Fix:** Provide specific corrected code
3. **Prevent Recurrence:** Explain patterns to avoid similar issues
4. **Verify Resolution:** Guide them through testing the fix

**Example Teaching Moment:**
```
"The error occurs because the comparison utility expects either both values
to be arrays or both to be objects. Your example returns a single object,
but the test is comparing it as an array. This is common when working with
MongoDB queries that return one result vs many.

Fix: Modify your example to return the object directly, or adjust the test
to handle single objects. Here's the corrected pattern..."
```

### Phase 4: Escalation Procedures

If you determine this is a tooling issue, gather this information for the Grove team:

#### Critical Information to Collect

1. **Environment Details:**
   - Operating system and version
   - Language version (Node.js, Python, Java, etc.)
   - Package/dependency versions

2. **Exact Error Messages:**
   - Full stack traces
   - Console output
   - Log files if available

3. **Reproduction Steps:**
   - Minimal example that reproduces the issue
   - Input data that causes the problem
   - Expected vs actual behavior

4. **Files Involved:**
   - Example file content
   - Test file content
   - Expected output file content
   - Actual output (if available)
### 5. **CI/CD Specifics**
- **Where to Find Logs:**  
  - For GitHub Actions: Go to the “Actions” tab in the repository, find the relevant workflow run, and click “View Logs”.
- **What to Collect:**  
  - Screenshot or copy the relevant failing step.
  - Note the workflow file name (e.g., `.github/workflows/code-examples.yml`).
  - Link to the specific workflow run or build.
#### Escalation Message Template

```markdown
## Code Example Testing Infrastructure Issue

**Summary:** [Brief description of the issue]

**Category:** [Parser/Comparison/Performance/Infrastructure]

**Environment:**
- Language: [JavaScript/Python/Java/C#/Go]
- Version: [Language version]
- OS: [Operating system]

**Error Details:**
```
[Full error message and stack trace]
```

**Reproduction:**
1. [Step 1]
2. [Step 2]
3. [Error occurs]

**Files:**
- Example: `[path/to/example.js]`
- Test: `[path/to/test.js]`
- Output: `[path/to/output.txt]`

**Additional Context:**
[Any other relevant information]

**Writer Impact:**
[How this blocks the writer's work]
```

#### When to Escalate Immediately

- **Parser Crashes:** Comparison utilities throw unexpected errors
- **Performance Issues:** Tests timeout or take extremely long
- **Data Type Issues:** MongoDB data types that have not yet been supported in
  comparison utilities
- **Infrastructure Failures:** CI/CD pipeline problems
- **Library Bugs:** Incorrect comparison behavior that's not user error

### 🗺️ Troubleshooting Flowchart

```mermaid
flowchart TD
    A[Writer presents issue] --> B{Is error environment/syntax/output?}
    B -- Yes --> C[Follow Writer Issue steps]
    B -- No --> D{Is error in infrastructure/comparison/CI?}
    D -- Yes --> E[Escalate to Grove team]
    D -- No --> F[Clarify issue]

## 🛠️ Common Scenarios and Solutions

### Scenario 1: Sample Data Missing

**Writer reports:** "My test is being skipped - sample_mflix not found"

**Response:**
1. This is expected behavior when sample data isn't available
2. Explain `describeWithSampleData` automatically skips when data is missing
3. Guide them to either:
   - Load standard sample data to their test environment & use it (sample_mflix,
     sample_restaurants, etc.)
   - Or accept that tests will skip in environments without sample data
   - Reassure that tests will not skip in CI because the sample data is loaded there

### Scenario 2: Output File Creation

**Writer reports:** "I don't know what to put in the output file"

**Response:**
1. Run their example manually and capture the output
2. Show them how to create the output file with appropriate ellipsis patterns
3. Explain when to use ellipsis vs `ignoreFieldValues`

### Scenario 3: Connection Issues

**Writer reports:** "Getting connection timeout errors"

**Response:**
1. Check environment variables are set correctly
2. Verify MongoDB cluster is accessible
3. Test connection with a simple script
4. Guide them through firewall/network troubleshooting if needed
   a. If using Atlas, have them check IP allow list for the current IP address
   b. If using Docker, ask if the Docker container is running and exposes the
   port expected in the .env file

### Scenario 4: Async/Await Problems

**Writer reports:** "Test fails with Promise rejection"

**Response:**
1. Review their example function for proper async/await usage
2. Check test file is properly awaiting the example function
3. Ensure error handling doesn't swallow important errors

## 📋 Verification Checklist

Before concluding your assistance:

**Writer Issue Resolution:**
- [ ] Issue root cause identified and explained
- [ ] Solution implemented and tested
- [ ] Writer understands why the issue occurred
- [ ] Prevention guidance provided
- [ ] Tests are now passing (or appropriately skipping)

**Tooling Issue Escalation:**
- [ ] Issue correctly categorized as infrastructure problem
- [ ] All required information collected
- [ ] Clear escalation message prepared
- [ ] Writer informed about next steps

## 🎓 Educational Opportunities

Use debugging sessions to teach broader concepts:

1. **Test-Driven Documentation:** How tested code examples improve doc quality
2. **Environment Management:** Best practices for development environments
3. **Error Interpretation:** How to read and understand error messages
4. **Debugging Techniques:** Systematic approaches to problem-solving

## 🚨 Red Flags - Escalate Immediately

These issues always require Grove team attention:

- Comparison utilities crash with segmentation faults
- Performance degradation in comparison functions
- New MongoDB data types not supported
- Inconsistent comparison behavior across similar inputs
- CI pipeline failures that aren't environment-related
- Memory leaks or resource exhaustion in utilities

## Success Metrics

A successful debugging session should result in:

1. **For Writer Issues:** Writer can independently resolve similar issues in the future
2. **For Tooling Issues:** Grove team has all information needed to fix the infrastructure
3. **Learning:** Writer understands the testing infrastructure better
4. **Documentation:** Any gaps in setup instructions are identified

Remember: Your goal is to make writers more effective at creating tested code examples while ensuring infrastructure issues get proper attention from the Grove team.
