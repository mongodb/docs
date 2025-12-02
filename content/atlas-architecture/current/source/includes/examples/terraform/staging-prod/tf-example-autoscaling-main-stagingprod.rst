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
     replication_specs = [
       {
         region_configs = [
           {
             electable_specs = {
               instance_size = var.cluster_instance_size_name
               node_count    = 3
             }
             analytics_specs = {
               instance_size = var.cluster_instance_size_name
               node_count    = 1
             }
             auto_scaling = {
               disk_gb_enabled = var.auto_scaling_disk_gb_enabled
               compute_enabled = var.auto_scaling_compute_enabled
               compute_max_instance_size = var.compute_max_instance_size
             }
             priority      = 7
             provider_name = var.cloud_provider
             region_name   = var.atlas_region
           }
         ]
       }
     ]
     
     # MongoDB recommends enabling auto-scaling
     # When auto-scaling is enabled, Atlas may change the instance size, and this lifecycle
     # block prevents Terraform from reverting Atlas auto-scaling changes
     # that modify instance size back to the original configured value
     lifecycle {
       ignore_changes = [
         replication_specs[0].region_configs[0].electable_specs.instance_size,
         replication_specs[0].region_configs[0].electable_specs.disk_size_gb,
         replication_specs[0].region_configs[0].analytics_specs.instance_size
       ]
     }
   }

   # Outputs to Display
   output "atlas_cluster_connection_string" { value = mongodbatlas_advanced_cluster.atlas-cluster.connection_strings.standard_srv }
   output "project_name"      { value = mongodbatlas_project.atlas-project.name }
