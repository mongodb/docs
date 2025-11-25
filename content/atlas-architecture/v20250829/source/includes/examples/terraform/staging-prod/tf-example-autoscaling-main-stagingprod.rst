.. code-block::
   :copyable: true

   # Create a Project
   resource "mongodbatlas_project" "atlas-project" {
     org_id = var.atlas_org_id
     name = var.atlas_project_name
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
         analytics_specs {
           instance_size = var.cluster_instance_size_name
           node_count    = 1
         }
         priority      = 7
         provider_name = var.cloud_provider
         region_name   = var.atlas_region
       }
     }
    disk_gb_enabled = var.auto_scaling_disk_gb
    compute_enabled = var.auto_scaling_compute
    lifecycle {
      ignore_changes = var.disk_size_gb
      ignore_changes = var.cluster_instance_size_name
    }
   }

   # Outputs to Display
   output "atlas_cluster_connection_string" { value = mongodbatlas_advanced_cluster.atlas-cluster.connection_strings.0.standard_srv }
   output "project_name"      { value = mongodbatlas_project.atlas-project.name }