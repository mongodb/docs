# Vercel infrastructure (POC)

Terraform for the docs microfrontends on Vercel. Terraform creates and owns one Vercel project per app in `platform/docs-site/microfrontends.json`, each with a `DOCS_PROJECT` environment variable, and one microfrontends group that all of them join. The app without `routing` is the group's default app.

Nothing here is adopted from existing Vercel resources. Project settings changed by hand in the Vercel UI are overwritten on the next apply, or lost the next time a project is recreated. Make the change in Terraform instead.

## Environment variables

- **Per-project variables**, whose value differs by app (such as `DOCS_PROJECT`), are defined in `main.tf`.
- **Team shared variables**, whose value is the same for every app (such as the CodeArtifact credentials), are created and edited in the Vercel dashboard under the team's settings. Terraform never sees their values; it only links each one to every project. List each one in `local.shared_env_vars` in `main.tf` with the exact targets it has in the dashboard, or the lookup fails.

To add a shared variable, create it in the dashboard, add its name and targets to `local.shared_env_vars`, and apply. If a shared variable listed there is renamed or deleted in the dashboard, the plan fails until `main.tf` is updated.

## Domain

The default app (`landing`) gets a fixed domain, `DEFAULT_APP_FALLBACK` in `platform/docs-site/scripts/generate-microfrontends.ts`. Terraform reads it from `development.fallback` in the generated `microfrontends.json`, so the domain is set in one place. It is both the fallback for local microfrontends development and the origin the production proxy forwards `/docs/*` to; microfrontends routing on that domain sends each path to the right app.

Vercel assigns the domain to production deployments only, so it serves nothing until `landing` has one.

> **POC only.** State is local (`terraform.tfstate`, gitignored). Do not apply this against shared projects until a remote backend with locking is configured; a second person applying from a clean checkout would try to create every project again.

## Prerequisites

- Terraform 1.9 or later (`brew install hashicorp/tap/terraform`; Homebrew core's `terraform` is stuck at 1.5.7).
- A Vercel API token with access to the team, exported as `VERCEL_API_TOKEN`.
- The Vercel GitHub app installed on the team with access to `10gen/docs-mongodb-internal`.
- No existing Vercel projects named after the apps in `microfrontends.json`, and no existing `docs` microfrontends group. Delete them first; project names are unique per team.

## Configuration

Every input has a default, so no `terraform.tfvars` file is needed. To override one, for example to point at a different team while testing, put it in a `terraform.tfvars` file (gitignored) or export it as `TF_VAR_<name>`.

## Running

Always review a plan before applying:

```sh
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

## Adding and removing apps

`microfrontends.json` is generated; do not edit it by hand. Its routing comes from each app's docset in `platform/versioning`, so adding or retiring a version updates it on the next regeneration. Run `pnpm --filter docs-site check:microfrontends` to confirm the committed file is current.

To add an app, add its content directory to `APPS` in `platform/docs-site/scripts/generate-microfrontends.ts`, run `pnpm --filter docs-site generate:microfrontends`, commit the result, and apply.

Removing an app from `APPS` destroys its Vercel project, including its deployments and domains. Check the plan for `destroy` before applying.

## Tearing down

`terraform destroy` deletes every project and the group, and releases the default app's domain. Applying again rebuilds them from scratch and reclaims the same domain, unless another Vercel account claimed it in between. Child apps get new generated `*.vercel.app` domains, but nothing should point at those directly.

## Before going to production

Deployments are currently limited to POC branches. Before production:

- [ ] Remove the `*vercel*` branch filter from `git.deploymentEnabled` in `platform/docs-site/vercel.json` so that `main` deploys, or replace it with the intended branch list.
- [ ] Set `git_repository.production_branch` on `vercel_project.app` in `main.tf` to the branch that should produce production deployments, rather than relying on the repository default.
- [ ] Configure a remote state backend with locking, and move `plan`/`apply` into CI.
- [ ] Point the production proxy's `/docs/*` origin at the default app's domain.
