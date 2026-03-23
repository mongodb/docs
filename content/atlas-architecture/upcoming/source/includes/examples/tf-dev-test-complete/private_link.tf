resource "mongodbatlas_privatelink_endpoint" "test" {
  project_id    = "<project-id>"
  provider_name = "AWS"
  region        = "US_EAST_1"

  timeouts {
    create = "30m"
    delete = "20m"
  }
}