# AWS ONLY - Enable BYOK encryption
resource "mongodbatlas_cloud_provider_access_setup" "aws_setup_only" {
  # Conditionally create this resource if the provider is "AWS"
  count = var.cloud_provider == "AWS" ? 1 : 0
  project_id = mongodbatlas_project.atlas-project.id
  provider_name = "AWS"
}

# AWS ONLY - Enable BYOK encryption
# For IAM roles and Azure assigned identities, you must create the 
# role or identity and declare the variable before you use this 
# Terraform resource
resource "mongodbatlas_cloud_provider_access_authorization" "aws_auth_role" {
  # conditionally create this resource if the provider is "AWS"
  count = var.cloud_provider == "AWS" ? 1 : 0
  project_id = mongodbatlas_project.atlas-project.id
  role_id    = mongodbatlas_cloud_provider_access_setup.aws_setup_only[0].role_id

   aws {
     iam_assumed_role_arn = aws_iam_role.test_role.arn
   }
}

# AWS ONLY - Enable BYOK encryption
# For KMS keys, you must create the 
# key and declare the variable before you use this 
# Terraform resource
resource "mongodbatlas_encryption_at_rest" "aws_test" {
  # conditionally create this resource if the provider is "AWS"
  count = var.cloud_provider == "AWS" ? 1 : 0
  project_id = mongodbatlas_project.atlas-project.id

  aws_kms_config {
    enabled                = true
    customer_master_key_id = "<Your KMS key>"
    region                 = var.atlas_region
    role_id                = mongodbatlas_cloud_provider_access_authorization.aws_auth_role[0].role_id
  }
}

data "mongodbatlas_encryption_at_rest" "test" {
  project_id = mongodbatlas_project.atlas-project.id
}

# AZURE ONLY - Enable BYOK encryption
resource "mongodbatlas_encryption_at_rest" "azure_test" {
  # conditionally create this resource if the provider is "AZURE"
  count = var.cloud_provider == "AZURE" ? 1 : 0
  project_id = mongodbatlas_project.atlas-project.id

  azure_key_vault_config {
    enabled           = true
    azure_environment = "AZURE"

    tenant_id       = var.azure_tenant_id
    subscription_id = var.azure_subscription_id
    client_id       = var.azure_client_id
    secret          = var.azure_client_secret

    resource_group_name = var.azure_resource_group_name
    key_vault_name      = var.azure_key_vault_name
    key_identifier      = var.azure_key_identifier
  }
}

# GCP ONLY - Enable BYOK encryption
resource "mongodbatlas_encryption_at_rest" "gcp_test" {
  # conditionally create this resource if the provider is "GCP"
  count = var.cloud_provider == "GCP" ? 1 : 0
  project_id = mongodbatlas_project.atlas-project.id

  google_cloud_kms_config {
    enabled                 = true
    service_account_key     = "{\"type\": \"service_account\",\"project_id\": \"my-project-common-0\",\"private_key_id\": \"e120598ea4f88249469fcdd75a9a785c1bb3\",\"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEuwIBA(truncated)SfecnS0mT94D9\\n-----END PRIVATE KEY-----\\n\",\"client_email\": \"my-email-kms-0@my-project-common-0.iam.gserviceaccount.com\",\"client_id\": \"10180967717292066\",\"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\"token_uri\": \"https://accounts.google.com/o/oauth2/token\",\"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/my-email-kms-0%40my-project-common-0.iam.gserviceaccount.com\"}"
    key_version_resource_id = "projects/my-project-common-0/locations/us-east4/keyRings/my-key-ring-0/cryptoKeys/my-key-0/cryptoKeyVersions/1"
  }
}