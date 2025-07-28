.. code-block:: 
   :copyable: true 

   locals {
    atlas_clusters = {
       "cluster_1" = { name = "m10-aws-1e", region = "US_EAST_1" },
       "cluster_2" = { name = "m10-aws-2e", region = "US_EAST_2" },
     }
   }

   resource "mongodbatlas_project" "atlas-project" {
     org_id = var.org_id
     name   = var.project_name
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
     reference_hour_of_day    = 3  # backup start hour in UTC
     reference_minute_of_hour = 45 # backup start minute in UTC
     restore_window_days      = 7  # Restore window for near-zero RPO

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
       frequency_interval = 12 # backup every 12 hours, accepted values = 1, 2, 4, 6, 8, 12 -> every n hours
       retention_unit     = "days"
       retention_value    = 7  # retain for 7 days
     }
     policy_item_daily {
       frequency_interval = 1 # backup every day, accepted values = 1 -> every 1 day
       retention_unit     = "days"
      retention_value     = 7 # retain for 7 days
     }
     policy_item_weekly {
       frequency_interval = 7 # every Sunday, accepted values = 1 to 7 -> every 1=Monday,2=Tuesday,3=Wednesday,4=Thursday,5=Friday,6=Saturday,7=Sunday day of the week
       retention_unit     = "weeks"
       retention_value    = 4 # retain for 4 weeks
     }
     policy_item_monthly {
       frequency_interval = 28 # accepted values = 1 to 28 -> 1 to 28 every nth day of the month  
       retention_unit  = "months"
       retention_value = 3 # retain for 3 months
     }

     depends_on = [
       mongodbatlas_advanced_cluster.automated_backup_test_cluster
     ]
   }
