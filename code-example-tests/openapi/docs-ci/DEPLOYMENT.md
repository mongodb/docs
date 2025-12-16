# OpenAPI Test Suite - Daily Cronjob Deployment

## Overview

This directory contains a daily cronjob that validates OpenAPI specifications against live API endpoints using Jest and [OASprey](https://github.com/grove-platform/OASprey).

The cronjob runs **daily at 9am UTC** to ensure the OpenAPI specs remain accurate and the APIs continue to work as documented.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Kubernetes CronJob (Daily at 9am UTC)                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Docker Container (Node.js 20)                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  1. Fetch OpenAPI spec from remote URL          │  │  │
│  │  │  2. Run Jest tests against live endpoints       │  │  │
│  │  │  3. Validate responses match spec               │  │  │
│  │  │  4. Exit with success/failure code              │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Files

- **`Dockerfile`** - Builds the Docker image with Node.js and test dependencies
- **`cronjobs.yml`** - Kubernetes CronJob configuration (Helm values)
- **`.drone.yml`** - Drone CI/CD pipeline for building and deploying
- **`tests/status.test.js`** - Jest tests that validate the Atlas Status API

## Deployment

### Prerequisites

- Access to MongoDB's Kubernetes cluster (Kanopy)
- Drone CI configured for the repository
- ECR access for Docker image storage

### Automatic Deployment (via Drone)

When you push changes to the `main` branch that affect files in `code-example-tests/openapi/`:

1. **Test Pipeline** runs:
   - Installs dependencies
   - Runs the test suite
   - Fails if tests don't pass

2. **Build Pipeline** runs:
   - Builds Docker image
   - Pushes to ECR
   - Tags with git commit SHA and `latest`

3. **Deploy Pipeline** runs:
   - Deploys to Kubernetes using Helm
   - Updates the cronjob with the new image

### Manual Deployment

If you need to deploy manually:

```bash
# 1. Build the Docker image locally
cd /path/to/docs-mongodb-internal/code-example-tests/openapi
docker build -t openapi-tests:local .

# 2. Test the image locally
docker run --rm openapi-tests:local

# 3. Deploy using Helm (requires kubectl access)
helm upgrade --install openapi-tests mongodb/cronjobs \
  --namespace docs \
  --values cronjobs.yml \
  --set image.repository=ecr_repository \
  --set image.tag=latest
```

## Monitoring

### Check Cronjob Status

```bash
# View the cronjob
kubectl get cronjob openapi-validation -n docs

# View recent job runs
kubectl get jobs -n docs -l cronjob=openapi-validation --sort-by=.metadata.creationTimestamp

# View pods from recent runs
kubectl get pods -n docs -l job-name=openapi-validation-<timestamp>
```

### View Logs

```bash
# Get the most recent job
LATEST_JOB=$(kubectl get jobs -n docs -l cronjob=openapi-validation --sort-by=.metadata.creationTimestamp -o jsonpath='{.items[-1].metadata.name}')

# View logs from the job
kubectl logs -n docs job/$LATEST_JOB

# Follow logs in real-time (if job is running)
kubectl logs -n docs job/$LATEST_JOB -f
```

### Expected Output

**Successful run:**
```
PASS tests/status.test.js
  OpenAPI spec to fetch Atlas status should work
    ✓ should match the get summary schema (234ms)
    ✓ should match the get status schema (123ms)
    ✓ should match the get components schema (156ms)
    ✓ should match the get unresolved incidents schema (189ms)
    ✓ should match the get all incidents schema (201ms)
    ✓ should match the get upcoming scheduled maintenances schema (178ms)
    ✓ should match the get active scheduled maintenances schema (145ms)
    ✓ should match the get all scheduled maintenances schema (167ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
```

**Failed run (spec mismatch):**
```
FAIL tests/status.test.js
  OpenAPI spec to fetch Atlas status should work
    ✕ should match the get summary schema (234ms)

  ● OpenAPI spec to fetch Atlas status should work › should match the get summary schema

    expect(received).toSatisfyApiSpec()

    Expected response to satisfy the OpenAPI spec, but it didn't.
    
    Response body property 'status.description' is not defined in the spec
```

## Troubleshooting

### Job Keeps Failing

1. **Check the logs** to see the specific error:
   ```bash
   kubectl logs -n docs job/$LATEST_JOB
   ```

2. **Common issues:**
   - **Network timeout**: API endpoint is down or slow
   - **Spec mismatch**: API response doesn't match OpenAPI spec
   - **Missing dependencies**: Docker image build issue

3. **Test locally** to reproduce:
   ```bash
   cd /path/to/docs-mongodb-internal/code-example-tests/openapi
   npm install
   npm test
   ```

### Manually Trigger a Run

To run the job immediately (outside the schedule):

```bash
kubectl create job --from=cronjob/openapi-validation manual-run-$(date +%s) -n docs
```

### Suspend the Cronjob

If you need to temporarily stop the cronjob:

```bash
# Suspend
kubectl patch cronjob openapi-validation -n docs -p '{"spec":{"suspend":true}}'

# Resume
kubectl patch cronjob openapi-validation -n docs -p '{"spec":{"suspend":false}}'
```

### Update the Schedule

To change when the job runs, edit `cronjobs.yml`:

```yaml
cronJobs:
  - name: openapi-validation
    schedule: "0 9 * * *"  # Change this cron expression
```

Then commit and push to trigger a deployment.

## Schedule Details

**Current schedule:** `0 9 * * *` (Daily at 9am UTC)

**Cron format:** `minute hour day month weekday`

**Common schedules:**
- `0 9 * * *` - Daily at 9am UTC
- `0 */6 * * *` - Every 6 hours
- `0 9 * * 1` - Every Monday at 9am UTC
- `0 9 1 * *` - First day of each month at 9am UTC

## Adding New Tests

To add tests for additional OpenAPI specs:

1. **Create a new test file** in `tests/`:
   ```javascript
   // tests/my-api.test.js
   import loadSpec from 'oasprey';
   import axios from 'axios';

   const baseURL = "https://api.example.com/";

   let spec;
   beforeAll(async () => {
       const response = await axios.get("https://example.com/openapi.json");
       spec = loadSpec(response.data);
   });

   describe("My API tests", () => {
       it("should match the schema", async () => {
           const res = await axios.get(baseURL + 'endpoint');
           expect(res.status).toEqual(200);
           expect(res).toSatisfyApiSpec();
       });
   });
   ```

2. **Test locally:**
   ```bash
   npm test
   ```

3. **Commit and push** - the cronjob will automatically include the new tests

## Related Documentation

- [OASprey Documentation](https://github.com/grove-platform/OASprey)
- [Jest Documentation](https://jestjs.io/)
- [Kubernetes CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)
- [Helm Charts](https://helm.sh/docs/)
