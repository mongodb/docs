# Create a Project
resource "mongodbatlas_project" "atlas-project" {
  org_id = var.atlas_org_id
  name = var.atlas_project_name
}

# Create an Atlas Advanced Cluster
resource "mongodbatlas_advanced_cluster" "atlas-cluster" {
  project_id = var.atlas_project_id
  name = "ClusterPortalDev"
  cluster_type = "REPLICASET"
  mongo_db_major_version = var.mongodb_version
  replication_specs {
    region_configs {
      electable_specs {
        instance_size = var.cluster_instance_size_name
        node_count    = 3
      }
      priority      = 7
      provider_name = var.cloud_provider
      region_name   = var.atlas_region
    }
  }
  tags {
    key   = "BU"
    value = "ConsumerProducts"
  }
  tags {
    key   = "TeamName"
    value = "TeamA"
  }
  tags {
    key   = "AppName"
    value = "ProductManagementApp"
  }
  tags {
    key   = "Env"
    value = "Test"
  }
  tags {
    key   = "Version"
    value = "8.0"
  }
  tags {
    key   = "Email"
    value = "marissa@acme.com"
  }
}

# Outputs to Display
output "atlas_cluster_connection_string" { value = mongodbatlas_advanced_cluster.atlas-cluster.connection_strings.0.standard_srv }
output "project_name"      { value = mongodbatlas_project.atlas-project.name }

resource "mongodbatlas_alert_configuration" "test" {
  project_id = var.atlas_project_id
  event_type = "REPLICATION_OPLOG_WINDOW_RUNNING_OUT"
  enabled    = true

  notification {
    type_name     = "GROUP"
    interval_min  = 10
    delay_min     = 0
    sms_enabled   = false
    email_enabled = true
    roles         = ["GROUP_CLUSTER_MANAGER"]
  }

  matcher {
    field_name = "CLUSTER_NAME"
    operator   = "EQUALS"
    value      = "myCluster"
  }

  threshold_config {
    operator    = "LESS_THAN"
    threshold   = 1
    units       = "HOURS"
  }
}

# Add an entry to your IP Access List
resource "mongodbatlas_access_list_api_key" "address_1" {
  org_id = var.atlas_org_id
  ip_address = "2.3.4.5"
  api_key_id = "a29120e123cd"
}

# Add an Atlas user with username and password authentication
locals {
  test_user_password = random_password.password.result
}

# Generates 12 characters long random password without special characters
resource "random_password" "password" {
  length  = 12
  special = false
}

resource "mongodbatlas_database_user" "user1" {
  username           = var.user[0]
  password           = local.test_user_password
  project_id         = var.atlas_project_id
  auth_database_name = "admin"

  roles {
    role_name     = "readWriteAny"
    database_name = var.database_name[0]
  }
}

# Set up an OIDC federated identity provider in Atlas
# Connection string to use in this configuration
locals {
  mongodb_uri = var.connection_strings[0]
}

# Fetch MongoDB Atlas Federated Settings
data "mongodbatlas_federated_settings" "this" {
  org_id = var.atlas_org_id
}

# Configure an identity provider for federated authentication
resource "mongodbatlas_federated_settings_identity_provider" "oidc" {
  federation_settings_id = data.mongodbatlas_federated_settings.this.id
  associated_domains     = var.trusted_domains
  audience               = var.token_audience
  authorization_type     = "USER"
  description            = "OIDC Identity Provider for Azure AD"

  # Replace with actual Azure Tenant ID
  issuer_uri = "https://sts.windows.net/${data.azurerm_client_config.current.tenant_id}/"

  idp_type   = "WORKFORCE"
  name       = "OIDC-for-azure"
  protocol   = "OIDC"
  user_claim = "sub" # Claim to extract the user's principal identity
}

resource "mongodbatlas_federated_settings_org_config" "this" {
  federation_settings_id            = data.mongodbatlas_federated_settings.this.id
  org_id                            = var.atlas_org_id
  domain_restriction_enabled        = false
  domain_allow_list                 = []
  data_access_identity_provider_ids = [mongodbatlas_federated_settings_identity_provider.oidc.idp_id]
}

# Create an OIDC-authenticated Database User
resource "mongodbatlas_database_user" "oidc" {
  project_id         = var.atlas_project_id
  username           = "${mongodbatlas_federated_settings_identity_provider.oidc.idp_id}/${data.azurerm_client_config.current.client_id}"
  oidc_auth_type     = "USER"
  auth_database_name = "$external" # Required when using OIDC for USER authentication

  roles {
    role_name     = "atlasAdmin"
    database_name = "admin"
  }
}

# Azure-specific data source needed for Tenant ID and Client ID
data "azurerm_client_config" "current" {}

resource "mongodbatlas_database_user" "admin_user" {
  project_id = var.atlas_project_id
  username = "<admin username>"
  password = "<admin password>"
  auth_database_name = "admin"

  roles {
    role_name     = "atlasAdmin"
    database_name = "admin"
  }

  roles {
    role_name     = "readWriteAnyDatabase"
    database_name = "admin"
  }
}