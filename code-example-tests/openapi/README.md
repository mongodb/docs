# OpenAPI Spec Validation

This project uses [oasprey](https://github.com/grove-platform/OASprey) to
validate our OpenAPI specs against the responses returned when calling the
endpoints.

Currently, this project includes tests for the following specs:

- [Atlas Status API](https://www.mongodb.com/docs/api/doc/cloud-status/)

## Getting Started

### Requirements

- Node.js v18 or newer recommended
- npm

### 1. Install the dependencies

From the root of the `openapi` directory, install dependencies:

```bash
npm install
```

### 2. Run the Tests

```bash
npm test
```

## Use a local or remote OpenAPI spec

Currently, this project uses an OpenAPI spec at a remote URL. It could alternately
work with a local OpenAPI specification. If you'd prefer to work with a local
file, as when you are iterating to correct errors in the OpenAPI spec and
don't want to re-publish between iteration:

1. Remove the `beforeAll` block from the test file
2. Add the following code above the `describe` block:

   ```javascript
   // Load an OpenAPI file (YAML or JSON) into this test file
   loadSpec('path/to/openapi.yml');

   // Write your test
   describe('Your test description here', () => {
   ```

With this code in place, you can update the local OpenAPI spec file and
re-run the tests without regenerating the public spec.
