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