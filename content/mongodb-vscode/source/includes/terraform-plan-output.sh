Terraform used the selected providers to generate the following execution
plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # mongodbatlas_advanced_cluster.my_cluster will be created
  + resource "mongodbatlas_advanced_cluster" "my_cluster" {
      + advanced_configuration                                 = (known after apply)
      + backup_enabled                                         = (known after apply)
      + bi_connector_config                                    = (known after apply)
      + cluster_id                                             = (known after apply)
      + cluster_type                                           = "REPLICASET"
      + config_server_management_mode                          = (known after apply)
      + config_server_type                                     = (known after apply)
      + connection_strings                                     = (known after apply)
      + create_date                                            = (known after apply)
      + delete_on_create_timeout                               = true
      + encryption_at_rest_provider                           = (known after apply)
      + global_cluster_self_managed_sharding                   = (known after apply)
      + mongo_db_major_version                                 = (known after apply)
      + mongo_db_version                                       = (known after apply)
      + name                                                   = "atlasClusterName"
      + paused                                                 = (known after apply)
      + pit_enabled                                           = (known after apply)
      + project_id                                             = (known after apply)
      + redact_client_log_data                                 = (known after apply)
      + replica_set_scaling_strategy                           = (known after apply)
      + replication_specs                                      = [
          + {
              + container_id   = (known after apply)
              + external_id    = (known after apply)
              + region_configs = [
                  + {
                      + analytics_auto_scaling = (known after apply)
                      + analytics_specs        = (known after apply)
                      + auto_scaling           = (known after apply)
                      + backing_provider_name  = "AWS"
                      + electable_specs        = (known after apply)
                      + priority               = 7
                      + provider_name          = "FLEX"
                      + read_only_specs        = (known after apply)
                      + region_name            = "US_EAST_1"
                    },
                ]
              + zone_id        = (known after apply)
              + zone_name      = (known after apply)
            },
        ]
      + root_cert_type                                         = (known after apply)
      + state_name                                             = (known after apply)
      + termination_protection_enabled                         = (known after apply)
      + use_aws_time_based_snapshot_copy_for_fast_initial_sync = (known after apply)
      + version_release_system                                 = (known after apply)
    }

  # mongodbatlas_database_user.my_user will be created
  + resource "mongodbatlas_database_user" "my_user" {
      + auth_database_name = "admin"
      + aws_iam_type       = "NONE"
      + id                 = (known after apply)
      + ldap_auth_type     = "NONE"
      + oidc_auth_type     = "NONE"
      + password           = (sensitive value)
      + password_wo        = (write-only attribute)
      + project_id         = (known after apply)
      + username           = "myUser"
      + x509_type          = "NONE"

      + roles {
          + database_name = "admin"
          + role_name     = "atlasAdmin"
        }
    }

  # mongodbatlas_project.my_project will be created
  + resource "mongodbatlas_project" "my_project" {
      + cluster_count                                           = (known after apply)
      + created                                                 = (known after apply)
      + id                                                      = (known after apply)
      + ip_addresses                                            = (known after apply)
      + is_cluster_ai_assistant_enabled                         = (known after apply)
      + is_collect_database_specifics_statistics_enabled        = (known after apply)
      + is_data_explorer_enabled                                = (known after apply)
      + is_data_explorer_gen_ai_features_enabled                = (known after apply)
      + is_data_explorer_gen_ai_sample_document_passing_enabled = (known after apply)
      + is_extended_storage_sizes_enabled                       = (known after apply)
      + is_native_reranking_enabled                             = (known after apply)
      + is_performance_advisor_enabled                          = (known after apply)
      + is_realtime_performance_panel_enabled                   = (known after apply)
      + is_schema_advisor_enabled                               = (known after apply)
      + is_slow_operation_thresholding_enabled                  = (known after apply)
      + name                                                    = "atlasProjectName"
      + org_id                                                  = "5d3716bfcf09a21576d7983e"
      + region_usage_restrictions                               = (known after apply)
      + with_default_alerts_settings                            = true
    }

  # mongodbatlas_project_ip_access_list.my_ipaddress will be created
  + resource "mongodbatlas_project_ip_access_list" "my_ipaddress" {
      + aws_security_group = (known after apply)
      + cidr_block         = (known after apply)
      + comment            = "My IP Address"
      + id                 = (known after apply)
      + ip_address         = "203.0.113.10"
      + project_id         = (known after apply)
    }

Plan: 4 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + connection_strings = (known after apply)

─────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't
guarantee to take exactly these actions if you run "terraform apply" now.
