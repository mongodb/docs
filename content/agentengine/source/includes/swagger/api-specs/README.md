# OpenAPI Specs

We maintain checked-in OpenAPI 3.1 specs for every HTTP service in the platform. Keeping these in version control means:

- **Discoverability** — any engineer can understand an API without reading handler code.
- **Contract stability** — reviewers can diff spec changes in PRs, catching accidental breaking changes before they ship.
- **Client generation** — downstream teams can generate typed clients directly from the YAML.
- **Onboarding speed** — new engineers can browse all endpoints in one place before writing a line of code.

## Spec Locations

| Service | Path |
|---------|------|
| API Gateway (external, user-facing) | `docs/api-specs/api-gateway-external/openapi.yaml` |
| API Gateway (internal, all routes) | `docs/api-specs/api-gateway-internal/openapi.yaml` |
| Executor Control Plane | `docs/api-specs/executor-control-plane/openapi.yaml` |
| Guardrails Server | `docs/api-specs/guardrails-server/openapi.yaml` |
| Runner AER | `docs/api-specs/runner-aer/openapi.yaml` |
| Runner Tool Pod | `docs/api-specs/runner-tool/openapi.yaml` |

## Viewing Locally

```bash
./scripts/view-openapi.sh            # starts at http://localhost:8080/swagger/
./scripts/view-openapi.sh --port 9000 # custom port
./scripts/view-openapi.sh stop        # tear down
```

Launches a `swaggerapi/swagger-ui` Docker container with all six specs in a dropdown. No services need to be running.

## Regenerating Specs

### Go services (swaggo/swag annotations)

```bash
# API Gateway — external spec only (excludes Admin routes)
make -C internal/domains/api-gateway swagger

# API Gateway — internal spec (all routes)
make -C internal/domains/api-gateway swagger-internal

# API Gateway — both
make -C internal/domains/api-gateway swagger-all

# Executor Control Plane
make -C executor-control-plane swagger
```

### Python services (FastAPI built-in schema export)

```bash
uv run python scripts/export-openapi.py all
```

Regenerates the Guardrails, AER, and Tool Pod specs in one pass.

## CI Checks

The `swagger-check` job in `.github/workflows/ci.yml` runs on every PR and:

1. Installs `swag v2.0.0-rc5` (pinned for deterministic YAML output).
2. Regenerates all specs.
3. Runs `git diff --exit-code docs/api-specs/*/*.yaml` — fails if any spec drifted from what's checked in.

There is also a Go test — `internal/domains/api-gateway/swagger_route_test.go` — that runs in CI and as a pre-commit hook. It validates bidirectional consistency: every `@Router` annotation must have a matching Gin route registration, and every Gin route must have a matching annotation.

## Fixing Failures

### `swagger-check` fails (spec out of date)

```bash
# Install swag if needed (match the pinned CI version)
go install github.com/swaggo/swag/cmd/swag@v2.0.0-rc5

make -C internal/domains/api-gateway swagger-all
make -C executor-control-plane swagger
uv run python scripts/export-openapi.py all

git add docs/api-specs
git commit -m "docs: regenerate OpenAPI specs"
```

### `TestSwaggerAnnotationsMatchRouteRegistrations` fails

The test output tells you exactly which routes are mismatched:

- **Annotation exists, route does not** — stale `@Router` comment for a deleted/renamed route. Delete or update the annotation.
- **Route exists, annotation does not** — Gin route added without swaggo annotations. Add them:

```go
// @Summary Create a project
// @Tags Projects
// @Param body body CreateProjectRequest true "Request body"
// @Success 201 {object} ProjectResponse
// @Failure 400 {object} ErrorResponse
// @Router /api/v1/projects [post]
func createProjectHandler(...) { ... }
```

After fixing annotations, regenerate the spec and commit both the `.go` changes and the updated `openapi.yaml`.

For full annotation conventions see [`docs/coding-standards.md`](../coding-standards.md) and for API Gateway–specific details see [`docs/api-gateway/README.md`](../api-gateway/README.md).
