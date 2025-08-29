# Define the MongoDB Atlas Provider
terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
    }
  }
  required_version = ">= 0.13" # Update to your preferred minimum Terraform CLI version
  # To see which versions are supported by the MongoDB Atlas Provider, see the
  # following link:
  # https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs#hashicorp-terraform-versionhttpswwwterraformiodownloadshtml-compatibility-matrix
}