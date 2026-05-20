# AWS only
resource "mongodbatlas_cloud_provider_access_setup" "setup_only" {
  # Conditionally create this resource if the provider is "AWS"
  count = var.cloud_provider == "AWS" ? 1 : 0
  project_id    = var.atlas_project_id
  provider_name = "AWS"
}

resource "mongodbatlas_cloud_provider_access_authorization" "auth_role" {
  # Conditionally create this resource if the provider is "AWS"
  count = var.cloud_provider == "AWS" ? 1 : 0
  project_id = var.atlas_project_id
  role_id    = mongodbatlas_cloud_provider_access_setup.setup_only[0].role_id

  aws {
    iam_assumed_role_arn = aws_iam_role.test_role.arn
  }
}

resource "mongodbatlas_encryption_at_rest" "aws_test" {
  # Conditionally create this resource if the provider is "AWS"
  count = var.cloud_provider == "AWS" ? 1 : 0
  project_id = var.atlas_project_id

  aws_kms_config {
    enabled                = true
    customer_master_key_id = "<CMK ID>"
    region                 = var.atlas_region
    role_id                = mongodbatlas_cloud_provider_access_authorization.auth_role[0].role_id
  }
}

data "mongodbatlas_encryption_at_rest" "aws_test" {
  project_id = mongodbatlas_encryption_at_rest.aws_test[0].project_id
}

output "is_aws_kms_encryption_at_rest_valid" {
  value = data.mongodbatlas_encryption_at_rest.aws_test.aws_kms_config.valid
}

# Azure only
 resource "mongodbatlas_encryption_at_rest" "azure_test" {
  # Conditionally create this resource if the provider is "Azure"
  count = var.cloud_provider == "Azure" ? 1 : 0
  project_id = var.atlas_project_id

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

data "mongodbatlas_encryption_at_rest" "azure_test" {
  project_id = mongodbatlas_encryption_at_rest.azure_test[0].project_id
}

output "is_azure_encryption_at_rest_valid" {
  value = data.mongodbatlas_encryption_at_rest.azure_test.azure_key_vault_config.valid
}

# GCP only
resource "mongodbatlas_encryption_at_rest" "gcp_test" {
  # Conditionally create this resource if the provider is "GCP"
  count = var.cloud_provider == "GCP" ? 1 : 0
  project_id = var.atlas_project_id

  google_cloud_kms_config {
    enabled                 = true
    service_account_key     = "{\"type\": \"service_account\",\"project_id\": \"my-project-common-0\",\"private_key_id\": \"e120598ea4f88249469fcdd75a9a785c1bb3\",\"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEuwIBA(truncated)SfecnS0mT94D9\\n-----END PRIVATE KEY-----\\n\",\"client_email\": \"my-email-kms-0@my-project-common-0.iam.gserviceaccount.com\",\"client_id\": \"10180967717292066\",\"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\"token_uri\": \"https://accounts.google.com/o/oauth2/token\",\"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/my-email-kms-0%40my-project-common-0.iam.gserviceaccount.com\"}"
    key_version_resource_id = "projects/my-project-common-0/locations/us-east4/keyRings/my-key-ring-0/cryptoKeys/my-key-0/cryptoKeyVersions/1"
  }
}