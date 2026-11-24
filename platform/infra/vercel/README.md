# Vercel infrastructure (POC)

Terraform for the docs app on Vercel. Terraform creates and owns a single Vercel project for the ISR app in `platform/docs-web`, its stable domain, and its links to the team's shared environment variables.

Nothing here is adopted from existing Vercel resources. Project settings changed by hand in the Vercel UI are overwritten on the next apply, or lost the next time the project is recreated. Make the change in Terraform instead.

> **Do not apply yet.** `platform/docs-web` does not build on Vercel until it is adapted from Netlify Blobs to Vercel.

> **POC only.** State is local (`terraform.tfstate`, gitignored). Do not apply this against shared projects until a remote backend with locking is configured; a second person applying from a clean checkout would try to create the project again.

## Environment variables

- **Project variables** that only this project needs are defined in `main.tf`.
- **Team shared variables** (such as the CodeArtifact credentials) are created and edited in the Vercel dashboard under the team's settings. Terraform never sees their values; it only links each one to the project. List each one in `local.shared_env_vars` in `main.tf` with the exact targets it has in the dashboard, or the lookup fails.

To add a shared variable, create it in the dashboard, add its name and targets to `local.shared_env_vars`, and apply. If a shared variable listed there is renamed or deleted in the dashboard, the plan fails until `main.tf` is updated.

## Domain

The project gets a fixed domain, `var.domain` (`mongodb-docs.vercel.app`), so it survives a teardown and rebuild. It is the origin the production proxy forwards `/docs/*` to.

Vercel assigns the domain to production deployments only, so it serves nothing until the project has one.

## Prerequisites

- Terraform 1.9 or later (`brew install hashicorp/tap/terraform`; Homebrew core's `terraform` is stuck at 1.5.7).
- A Vercel API token with access to the team, exported as `VERCEL_API_TOKEN`.
- The Vercel GitHub app installed on the team with access to `10gen/docs-mongodb-internal`.
- No existing Vercel project named `var.project_name` (`mongodb-docs`). Project names are unique per team.

## Configuration

Every input has a default, so no `terraform.tfvars` file is needed. To override one, for example to point at a different team while testing, put it in a `terraform.tfvars` file (gitignored) or export it as `TF_VAR_<name>`.

## Running

Always review a plan before applying:

```sh
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

## Tearing down

`terraform destroy` deletes the project and releases its domain. Applying again rebuilds it from scratch and reclaims the same domain, unless another Vercel account claimed it in between.

## Before going to production

- [ ] Add `platform/docs-web/vercel.json`, and make sure its deployment settings let `main` deploy.
- [ ] Set `git_repository.production_branch` on `vercel_project.app` in `main.tf` to the branch that should produce production deployments, rather than relying on the repository default.
- [ ] Configure a remote state backend with locking, and move `plan`/`apply` into CI.
- [ ] Point the production proxy's `/docs/*` origin at the project's domain.
