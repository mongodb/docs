output "project_ids" {
  value = { for name, project in vercel_project.app : name => project.id }
}

output "microfrontend_group_id" {
  value = vercel_microfrontend_group.docs.id
}
