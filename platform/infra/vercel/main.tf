locals {
  # microfrontends.json stays the single list of apps: adding an app there is
  # all it takes to get its Vercel project, env vars, and group membership.
  # Removing one is blocked by prevent_destroy; see the README.
  microfrontends = jsondecode(file("${path.module}/../../docs-site/microfrontends.json"))
  apps           = local.microfrontends.applications

  default_apps = [for name, app in local.apps : name if try(app.routing, null) == null]
  # Not one(): it errors before the group's precondition can report the count.
  default_app_name = try(local.default_apps[0], "")
  member_apps      = { for name, app in local.apps : name => app if name != local.default_app_name }
}

resource "vercel_project" "app" {
  for_each = local.apps

  name           = each.key
  framework      = "nextjs"
  root_directory = "platform/docs-site"
  git_repository = {
    type = "github"
    repo = var.git_repo
  }

  # Leave UI-configured deployment protection alone until it is modelled here.
  manage_deployment_protection = false

  lifecycle {
    prevent_destroy = true
  }
}

import {
  for_each = var.import_ids
  to       = vercel_project.app[each.key]
  id       = each.value
}

resource "vercel_project_environment_variable" "docs_project" {
  for_each = local.apps

  project_id = vercel_project.app[each.key].id
  key        = "DOCS_PROJECT"
  value      = each.key
  target     = ["production", "preview", "development"]
  sensitive  = false
}

import {
  for_each = var.env_var_import_ids
  to       = vercel_project_environment_variable.docs_project[each.key]
  id       = "${var.import_ids[each.key]}/${each.value}"
}

resource "vercel_microfrontend_group" "docs" {
  name = var.group_name
  default_app = {
    project_id = vercel_project.app[local.default_app_name].id
  }

  lifecycle {
    prevent_destroy = true

    precondition {
      condition     = length(local.default_apps) == 1
      error_message = "microfrontends.json must have exactly one app without routing (the default app); found ${length(local.default_apps)}."
    }
  }
}

import {
  for_each = var.group_import_id == null ? toset([]) : toset([var.group_import_id])
  to       = vercel_microfrontend_group.docs
  id       = each.value
}

resource "vercel_microfrontend_group_membership" "app" {
  for_each = local.member_apps

  project_id             = vercel_project.app[each.key].id
  microfrontend_group_id = vercel_microfrontend_group.docs.id
}

import {
  for_each = var.group_import_id == null ? {} : { for name, id in var.import_ids : name => id if contains(keys(local.member_apps), name) }
  to       = vercel_microfrontend_group_membership.app[each.key]
  id       = "${var.group_import_id}/${each.value}"
}
