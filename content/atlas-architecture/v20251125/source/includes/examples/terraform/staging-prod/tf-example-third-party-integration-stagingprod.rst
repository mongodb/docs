.. code-block:: shell 
   :copyable: true 

   resource "mongodbatlas_third_party_integration" "test_datadog" {
     project_id = var.atlas_project_id
     type = "DATADOG"
     api_key = var.datadog_api_key
     region = var.datadog_region
   }

   resource "mongodbatlas_third_party_integration" "test_prometheus" {
     project_id        = var.atlas_project_id
     type              = "PROMETHEUS"
     user_name         = var.prometheus_user_name
     password          = var.prometheus_password
     service_discovery = "http"
     enabled           = true
   }

   output "datadog.id" { value = mongodbatlas_third_party_integration.test_datadog.id }  
   output "prometheus.id" { value = mongodbatlas_third_party_integration.test_prometheus.id }
