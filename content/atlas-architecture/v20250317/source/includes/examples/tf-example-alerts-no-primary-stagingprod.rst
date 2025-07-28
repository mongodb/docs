.. code-block:: 
   :copyable: true

   resource "mongodbatlas_alert_configuration" "test_alert_notification" {
     project_id = var.atlas_project_id
     event_type = "NO_PRIMARY"
     enabled    = true

     notification {
       type_name     = "PROMETHEUS"
       integration_id = mongodbatlas_third_party_integration.test_datadog.id # ID of the Atlas Prometheus integration
     }

     notification {
       type_name     = "DATADOG"
       integration_id = mongodbatlas_third_party_integration.test_prometheus.id # ID of the Atlas Datadog integration
     }

     matcher {
       field_name = "REPLICA_SET_NAME"
       operator   = "EQUALS"
      value      = "myReplSet"
     }

     threshold_config {
       operator    = "GREATER_THAN"
       threshold   = 5
       units       = "MINUTES"
     }
   }