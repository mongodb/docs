.. code-block::
   :copyable: true

   resource "mongodbatlas_alert_configuration" "test_replication_lag_alert" {
     project_id = var.atlas_project_id
     event_type = "OUTSIDE_METRIC_THRESHOLD"
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

     metric_threshold_config {
       metric_name = "OPLOG_SLAVE_LAG_MASTER_TIME"
       operator    = "GREATER_THAN"
       threshold   = 1
       units       = "HOURS"
     }
   }