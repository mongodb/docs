# Create a Group to Assign to Project
resource "mongodbatlas_team" "project_group" {
  org_id = var.atlas_org_id
  name   = var.atlas_group_name
  usernames = ["user1@example.com", "user2@example.com"]
}

# Create a Project
resource "mongodbatlas_project" "atlas-project" {
  org_id = var.atlas_org_id
  name = var.atlas_project_name
  # Assign the Project with Specific Roles
    teams {
      team_id    = mongodbatlas_team.project_group.team_id
      role_names = ["GROUP_READ_ONLY", "GROUP_CLUSTER_MANAGER"]
    }
}

# Create an Atlas Advanced Cluster
resource "mongodbatlas_advanced_cluster" "atlas-cluster" {
  project_id = mongodbatlas_project.atlas-project.id
  name = "ClusterPortalProd"
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
    value = "Production"
  }
  tags {
    key   = "Version"
    value = "8.0"
  }
  tags {
    key   = "Email"
    value = "test@test.com"
  }
}

# Outputs to Display
output "atlas_cluster_connection_string" {
  value = mongodbatlas_advanced_cluster.atlas-cluster.connection_strings.0.standard_srv
}
output "project_name" {
  value = mongodbatlas_project.atlas-project.name
}

# Set up an alert notification by email when there is replication lag
# Greater than 1 hour for more than 5 minutes
resource "mongodbatlas_alert_configuration" "test_replication_lag_alert" {
  project_id = mongodbatlas_project.atlas-project.id
  event_type = "OUTSIDE_METRIC_THRESHOLD"
  enabled    = true
  notification {
    type_name     = "GROUP"
    interval_min  = 5
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

  metric_threshold_config {
    metric_name = "OPLOG_SLAVE_LAG_MASTER_TIME"
    operator    = "GREATER_THAN"
    threshold   = 1
    units       = "HOURS"
  }
}

# Connection string to use in this configuration
locals {
  mongodb_uri = var.connection_strings[0]
}

# Atlas organization details to use in the configuration
data "mongodbatlas_federated_settings" "this" {
  org_id = var.atlas_org_id
}

# Configure an identity provider for federated authentication
# For IAM roles and Azure assigned identities, you must create the 
# role or identity and declare the variable before you use this 
# Terraform resource
resource "mongodbatlas_federated_settings_identity_provider" "oidc" {
  federation_settings_id = data.mongodbatlas_federated_settings.this.id
  audience               = var.token_audience
  authorization_type     = "USER"
  description            = "oidc-for-azure"
  issuer_uri = "https://sts.windows.net/${azurerm_user_assigned_identity.this.tenant_id}/"
  idp_type   = "WORKLOAD"
  name       = "OIDC-for-azure"
  protocol   = "OIDC"
  user_claim = "sub"
}

resource "mongodbatlas_federated_settings_org_config" "this" {
  federation_settings_id            = data.mongodbatlas_federated_settings.this.id
  org_id                            = var.atlas_org_id
  domain_restriction_enabled        = false
  domain_allow_list                 = []
  data_access_identity_provider_ids = [mongodbatlas_federated_settings_identity_provider.oidc.idp_id]
}

# Create an OIDC federated authentication user
# For IAM roles and Azure assigned identities, you must create the 
# role or identity and declare the variable before you use this 
# Terraform resource
resource "mongodbatlas_database_user" "oidc" {
  project_id         = mongodbatlas_project.atlas-project.id
  username           = "${mongodbatlas_federated_settings_identity_provider.oidc.idp_id}/${azurerm_user_assigned_identity.this.principal_id}"
  oidc_auth_type     = "USER"
  auth_database_name = "$external" # required when using OIDC USER authentication
  
  roles {
    role_name     = "atlasAdmin"
    database_name = "admin"
  }
}

# Configure a custom role
resource "mongodbatlas_custom_db_role" "create_role" {
  project_id = mongodbatlas_project.atlas-project.id
  role_name  = "my_custom_role"
  actions {
    action = "UPDATE"
    resources {
      database_name   = "myDb"
    }
  }
  actions {
    action = "INSERT"
    resources {
      database_name   = "myDb"
    }
  }
  actions {
    action = "REMOVE"
    resources {
      database_name   = "myDb"
    }
  }
}

# Enable auditing and create an audit filter for your cluster
resource "mongodbatlas_auditing" "test" {
  project_id = mongodbatlas_project.atlas-project.id
  audit_filter                = "{ 'atype': 'authenticate', 'param': {   'user': 'auditAdmin',   'db': 'admin',   'mechanism': 'SCRAM-SHA-1' }}"
  audit_authorization_success = false
  enabled                     = true
}

# Configure backup schedule
locals {
  atlas_clusters = {
    "cluster_1" = { name = "m10-aws-1e", region = "US_EAST_1" },
    "cluster_2" = { name = "m10-aws-2e", region = "US_EAST_2" },
  }
}

resource "mongodbatlas_advanced_cluster" "automated_backup_test_cluster" {
  for_each     = local.atlas_clusters
  project_id   = mongodbatlas_project.atlas-project.id
  name         = each.value.name
  cluster_type = "REPLICASET"

  replication_specs {
    region_configs {
      electable_specs {
        instance_size = "M10"
        node_count    = 3
      }
      analytics_specs {
        instance_size = "M10"
        node_count    = 1
      }

      provider_name = "AWS"
      region_name   = each.value.region
      priority      = 7
    }
  }

  backup_enabled = true # enable cloud backup snapshots
  pit_enabled    = true
}

resource "mongodbatlas_cloud_backup_schedule" "test" {
  for_each                 = local.atlas_clusters
  project_id               = mongodbatlas_project.atlas-project.id
  cluster_name             = mongodbatlas_advanced_cluster.automated_backup_test_cluster[each.key].name
  reference_hour_of_day    = 3
  reference_minute_of_hour = 45
  restore_window_days      = 4

  copy_settings {
    cloud_provider = "AWS"
    frequencies = ["HOURLY",
      "DAILY",
      "WEEKLY",
      "MONTHLY",
      "YEARLY",
      "ON_DEMAND"]
    region_name        = "US_WEST_1"
    zone_id            = mongodbatlas_advanced_cluster.automated_backup_test_cluster[each.key].replication_specs.*.zone_id[0]
    should_copy_oplogs = true
  }

  policy_item_hourly {
    frequency_interval = 1 #accepted values = 1, 2, 4, 6, 8, 12 -> every n hours
    retention_unit     = "days"
    retention_value    = 4
  }
  policy_item_daily {
    frequency_interval = 1 #accepted values = 1 -> every 1 day
    retention_unit     = "days"
    retention_value    = 4
  }
  policy_item_weekly {
    frequency_interval = 4 # accepted values = 1 to 7 -> every 1=Monday,2=Tuesday,3=Wednesday,4=Thursday,5=Friday,6=Saturday,7=Sunday day of the week
    retention_unit     = "weeks"
    retention_value    = 4
  }
  policy_item_monthly {
    frequency_interval = 5 # accepted values = 1 to 28 -> 1 to 28 every nth day of the month
    # accepted values = 40 -> every last day of the month
    retention_unit  = "months"
    retention_value = 4
  }
  policy_item_yearly {
    frequency_interval = 1 # accepted values = 1 to 12 -> 1st day of nth month
    retention_unit     = "years"
    retention_value    = 4
  }

  depends_on = [
    mongodbatlas_advanced_cluster.automated_backup_test_cluster
  ]
}