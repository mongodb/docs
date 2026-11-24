locals {
  # Team shared environment variables, keyed by name, with the exact targets
  # they have in the Vercel dashboard. Values are managed in the dashboard;
  # Terraform only links each one to the project.
  shared_env_vars = {
    NPM_AWS_KEY    = ["production", "preview"]
    NPM_AWS_SECRET = ["production", "preview"]
  }
}

resource "vercel_project" "app" {
  name           = var.project_name
  framework      = "nextjs"
  root_directory = var.root_directory
  node_version   = "24.x"
  git_repository = {
    type = "github"
    repo = var.git_repo
  }

  vercel_authentication = {
    deployment_type = "standard_protection_new"
  }
}

resource "vercel_project_domain" "app" {
  project_id = vercel_project.app.id
  domain     = var.domain
}

data "vercel_shared_environment_variable" "shared" {
  for_each = local.shared_env_vars

  key    = each.key
  target = each.value
}

resource "vercel_shared_environment_variable_project_link" "app" {
  for_each = local.shared_env_vars

  shared_environment_variable_id = data.vercel_shared_environment_variable.shared[each.key].id
  project_id                     = vercel_project.app.id
}
