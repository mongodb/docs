output "project_ids" {
  value = { for name, project in vercel_project.app : name => project.id }
}

output "default_app_domain" {
  value = vercel_project_domain.default_app.domain
}

output "microfrontend_group_id" {
  value = vercel_microfrontend_group.docs.id
}
