# Vercel infrastructure (POC)

Terraform for the docs microfrontends on Vercel. One Vercel project is created per app in `platform/docs-site/microfrontends.json`, each with a `DOCS_PROJECT` environment variable, and all of them join one microfrontends group. The app without `routing` is the group's default app.

> **POC only.** State is local (`terraform.tfstate`, gitignored). Do not apply this against shared projects until a remote backend with locking is configured; a second person applying from a clean checkout would try to create every project again.

## Prerequisites

- Terraform 1.9 or later.
- A Vercel API token with access to the team, exported as `VERCEL_API_TOKEN`.

## Adopting existing projects

If the projects, environment variables, or group already exist in Vercel, import them instead of creating duplicates. Put the IDs in a `terraform.tfvars` file (gitignored):

```hcl
vercel_team = "team_xxxxxxxxxxxxxxxxxxxxxxxx"

# Project IDs, from each project's Settings page.
import_ids = {
  landing = "prj_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  atlas   = "prj_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  manual  = "prj_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}

# IDs of existing DOCS_PROJECT variables, from the Vercel API:
# GET /v10/projects/{projectId}/env
env_var_import_ids = {
  landing = "xxxxxxxxxxxxxxxx"
  atlas   = "xxxxxxxxxxxxxxxx"
  manual  = "xxxxxxxxxxxxxxxx"
}

# Microfrontends group ID. Setting it also imports the memberships of the
# non-default apps listed in import_ids.
group_import_id = "mfe_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Importing a project adopts all of its settings, but `main.tf` declares only a few of them. Deployment protection is excluded with `manage_deployment_protection = false`. Any other setting that shows up as a change in the first plan must be declared in `main.tf` before applying, or the apply will reset it.

## Running

Always review a plan before applying:

```sh
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

## Adding and removing apps

To add an app, add it to `microfrontends.json` and apply.

Projects and the group have `prevent_destroy`, so removing an app from `microfrontends.json` makes the plan fail. To retire an app, remove its resources from state first, then delete the project in Vercel by hand if it is no longer needed:

```sh
terraform state rm 'vercel_project.app["<app>"]' \
  'vercel_project_environment_variable.docs_project["<app>"]' \
  'vercel_microfrontend_group_membership.app["<app>"]'
```
