Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.
 
 
------------------------------------------------------------------------
 
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create
 
Terraform will perform the following actions:
 
  # mongodbatlas_cluster.my_cluster will be created
  + resource "mongodbatlas_cluster" "my_cluster" {
      + advanced_configuration       = (known after apply)
      + auto_scaling_disk_gb_enabled = false
      + backing_provider_name        = "AWS"
      + backup_enabled               = false
      + bi_connector                 = (known after apply)
      + cluster_id                   = (known after apply)
      + cluster_type                 = (known after apply)
      + connection_strings           = (known after apply)
      + disk_size_gb                 = 2
      + encryption_at_rest_provider  = (known after apply)
      + id                           = (known after apply)
      + mongo_db_major_version       = "4.2"
      + mongo_db_version             = (known after apply)
      + mongo_uri                    = (known after apply)
      + mongo_uri_updated            = (known after apply)
      + mongo_uri_with_options       = (known after apply)
      + name                         = "atlasClusterName"
      + num_shards                   = 1
      + paused                       = (known after apply)
      + pit_enabled                  = (known after apply)
      + project_id                   = (known after apply)
      + provider_backup_enabled      = false
      + provider_disk_iops           = (known after apply)
      + provider_disk_type_name      = (known after apply)
      + provider_encrypt_ebs_volume  = (known after apply)
      + provider_instance_size_name  = "M2"
      + provider_name                = "TENANT"
      + provider_region_name         = "providerRegionName"
      + provider_volume_type         = (known after apply)
      + replication_factor           = (known after apply)
      + snapshot_backup_policy       = (known after apply)
      + srv_address                  = (known after apply)
      + state_name                   = (known after apply)
 
      + labels {
          + key   = (known after apply)
          + value = (known after apply)
        }
 
      + replication_specs {
          + id         = (known after apply)
          + num_shards = (known after apply)
          + zone_name  = (known after apply)
 
          + regions_config {
              + analytics_nodes = (known after apply)
              + electable_nodes = (known after apply)
              + priority        = (known after apply)
              + read_only_nodes = (known after apply)
              + region_name     = (known after apply)
            }
        }
    }
 
  # mongodbatlas_database_user.my_user will be created
  + resource "mongodbatlas_database_user" "my_user" {
      + auth_database_name = "admin"
      + id                 = (known after apply)
      + password           = (sensitive value)
      + project_id         = (known after apply)
      + username           = "jww"
      + x509_type          = "NONE"
 
      + labels {
          + key   = (known after apply)
          + value = (known after apply)
        }
 
      + roles {
          + collection_name = (known after apply)
          + database_name   = "admin"
          + role_name       = "atlasAdmin"
        }
    }
 
  # mongodbatlas_project.my_project will be created
  + resource "mongodbatlas_project" "my_project" {
      + cluster_count = (known after apply)
      + created       = (known after apply)
      + id            = (known after apply)
      + name          = "atlasProjectName"
      + org_id        = "5d3716bfcf09a21576d7983e"
    }
 
  # mongodbatlas_project_ip_whitelist.my_ipaddress will be created
  + resource "mongodbatlas_project_ip_whitelist" "my_ipaddress" {
      + aws_security_group = (known after apply)
      + cidr_block         = (known after apply)
      + comment            = "My IP Address"
      + id                 = (known after apply)
      + ip_address         = "204.210.139.18"
      + project_id         = (known after apply)
    }
 
Plan: 4 to add, 0 to change, 0 to destroy.
 
------------------------------------------------------------------------
 
Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.