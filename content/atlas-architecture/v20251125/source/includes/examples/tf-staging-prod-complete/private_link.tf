# AWS ONLY - Create a Private Link
resource "mongodbatlas_privatelink_endpoint" "aws_test" {
  # Conditionally create this resource if the provider is "AWS"
  count = var.cloud_provider == "AWS" ? 1 : 0 
  project_id = mongodbatlas_project.atlas-project.id
  provider_name = "AWS"
  region        = "US_EAST_1"

  timeouts {
    create = "30m"
    delete = "20m"
  }
}

# AZURE ONLY - Create a Private Link
resource "mongodbatlas_privatelink_endpoint" "azure_test" {
  # Conditionally create this resource if the provider is "AZURE"
  count = var.cloud_provider == "AZURE" ? 1 : 0
  project_id = mongodbatlas_project.atlas-project.id
  provider_name = "AZURE"
  region        = "US_EAST_1"

  timeouts {
    create = "30m"
    delete = "20m"
  }
}