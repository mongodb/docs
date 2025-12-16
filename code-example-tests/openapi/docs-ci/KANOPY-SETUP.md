# Kanopy Cronjob Setup for OpenAPI Tests

## Overview

This is a **Proof of Concept (PoC)** for running the OpenAPI test suite as a daily Kubernetes cronjob using MongoDB's internal **Kanopy** platform (Drone + Kubernetes).

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Drone CI (at repo root)                                    │
│  ├─ Detects changes to code-example-tests/openapi/**        │
│  ├─ Runs tests                                              │
│  ├─ Builds Docker image                                     │
│  └─ Deploys to Kanopy (Kubernetes)                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Kanopy (Kubernetes) - docs namespace                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  CronJob: openapi-tests                               │  │
│  │  Schedule: Daily at 9am UTC                           │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  Pod runs: npm test                             │  │  │
│  │  │  - Fetches OpenAPI spec                         │  │  │
│  │  │  - Validates against live endpoints             │  │  │
│  │  │  - Reports success/failure                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Files Structure

```
docs-mongodb-internal/
├── .drone.yml                             # Root Drone config (multiple pipelines)
│   └── openapi-tests-build/deploy         # Pipeline (this PoC)
│
└── code-example-tests/openapi/
    ├── Dockerfile                          # Container image definition
    ├── cronjobs.yml                        # Kubernetes CronJob config (Helm values)
    ├── docs-ci/
    |   ├──DEPLOYMENT.md                    # Deployment documentation
    |   └── KANOPY-SETUP.md                 # This file
    ├── package.json                        # Node.js dependencies
    ├── jest.config.cjs                     # Jest configuration
    └── tests/
        └── status.test.js                  # OpenAPI validation tests
```

## How It Works

### 1. Drone Pipelines (`.drone.yml` at repo root)

The root `.drone.yml` contains **4 pipelines** for the OpenAPI tests:

#### Pipeline 1: `openapi-tests-build`
- **Triggers**: Push to `main` branch, changes to `code-example-tests/openapi/**`
- **Steps**:
  1. Run `npm test` to validate tests pass
  2. Build Docker image using `Dockerfile`
  3. Push to ECR
  4. Tag with git SHA and `latest`

#### Pipeline 2: `openapi-tests-deploy`
- **Depends on**: `openapi-tests-build`
- **Steps**:
  1. Deploy to Kanopy using Helm
  2. Uses `cronjobs.yml` for configuration
  3. Creates/updates CronJob in `docs` namespace

### 2. Kubernetes CronJob (`cronjobs.yml`)

Defines the scheduled job:
- **Schedule**: `0 9 * * *` (daily at 9am UTC)
- **Command**: `npm test`
- **Resources**: 100m CPU, 256Mi memory
- **History**: Keeps last 3 successful and 3 failed jobs

### 3. Docker Image (`Dockerfile`)

Containerizes the test suite:
- Based on `node:20-alpine`
- Installs dependencies with `npm ci`
- Runs as non-root user
- Executes `npm test` on startup

## Key Differences from GitHub Actions

| Aspect | GitHub Actions | Kanopy (Drone + K8s) |
|--------|----------------|----------------------|
| **Hosting** | GitHub's infrastructure | MongoDB's Kubernetes cluster |
| **Scheduling** | GitHub's scheduler | Kubernetes CronJob |
| **Secrets** | GitHub Secrets | Kubernetes Secrets |
| **Monitoring** | GitHub UI | Kubernetes/Kanopy UI |
| **Cost** | Included with GitHub | Internal infrastructure |
| **Control** | Limited | Full control over resources |

## Deployment

### Prerequisites

- Drone CI configured for the repo
- ECR access secrets configured in Drone:
  - `ecr_access_key`
  - `ecr_secret_key`
  - `kubernetes_token`
- Access to Kanopy/Kubernetes cluster

## Monitoring

### View CronJob Status

```bash
# Get cronjob details
kubectl get cronjob openapi-tests -n docs

# View recent job runs
kubectl get jobs -n docs -l cronjob=openapi-tests --sort-by=.metadata.creationTimestamp

# View pods from recent runs
kubectl get pods -n docs -l job-name -o wide | grep openapi-tests
```

### View Logs

```bash
# Get the most recent job
LATEST_JOB=$(kubectl get jobs -n docs -l cronjob=openapi-tests \
  --sort-by=.metadata.creationTimestamp \
  -o jsonpath='{.items[-1].metadata.name}')

# View logs
kubectl logs -n docs job/$LATEST_JOB

# Follow logs in real-time (if running)
kubectl logs -n docs job/$LATEST_JOB -f
```

### Manually Trigger a Run

```bash
# Create a one-off job from the cronjob
kubectl create job --from=cronjob/openapi-tests manual-test-$(date +%s) -n docs

# Watch it run
kubectl get jobs -n docs -w
```

## Troubleshooting

### Pipeline Not Triggering

**Issue**: Drone doesn't run when you push changes

**Solutions**:
1. Check the `paths` trigger in `.drone.yml` - ensure your changes match
2. Verify the branch is `main` (or add your branch to the trigger)
3. Check Drone UI for any errors

### Build Fails

**Issue**: Docker build fails in Drone

**Solutions**:
1. Test the build locally:
   ```bash
   cd code-example-tests/openapi
   docker build -t openapi-tests:local .
   ```
2. Check the Dockerfile paths are correct
3. Ensure all dependencies are in `package.json`

### Deploy Fails

**Issue**: Helm deployment fails

**Solutions**:
1. Check Kubernetes secrets are configured
2. Verify the namespace exists: `kubectl get namespace docs`
3. Check Helm chart version is available
4. Review Drone logs for specific error

### CronJob Not Running

**Issue**: CronJob exists but doesn't execute

**Solutions**:
1. Check if suspended: `kubectl get cronjob openapi-tests -n docs -o yaml | grep suspend`
2. Verify the schedule is correct
3. Check pod logs for errors
4. Manually trigger to test: `kubectl create job --from=cronjob/openapi-tests test-run -n docs`
