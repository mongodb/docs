# Define the MongoDB Atlas Provider
terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "~> 2.2"
    }
  }
  required_version = ">= 1.0"
  # To see which versions are supported by the MongoDB Atlas Provider, see the
  # following link:
  # https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs#hashicorp-terraform-versionhttpswwwterraformiodownloadshtml-compatibility-matrix
}

# Configure the MongoDB Atlas Provider
provider "mongodbatlas" {
  # Legacy API key authentication (backward compatibility)
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
  
  # Recommended: Service account authentication
  # Uncomment and configure the following for service account auth:
  # service_account_id = var.mongodb_service_account_id
  # private_key_file   = var.mongodb_service_account_key_file
}
