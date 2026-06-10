.. code-block::
   :copyable: true

   # Create a Project
   module "atlas_project" {
     source  = "terraform-mongodbatlas-modules/project/mongodbatlas"
     version = "~> 0.2"

     org_id = var.atlas_org_id
     name   = var.atlas_project_name
   }
   
   # Create an Atlas Advanced Cluster 
   resource "mongodbatlas_advanced_cluster" "atlas-cluster" {
     project_id = module.atlas_project.id
     name = "ClusterPortalProd"
     cluster_type = "REPLICASET"
     mongo_db_major_version = var.mongodb_version
     # MongoDB recommends enabling auto-scaling
     # When auto-scaling is enabled, Atlas may change the instance size, and this use_effective_fields
     # block prevents Terraform from reverting Atlas auto-scaling changes
     use_effective_fields = true
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
     
   }

   # Outputs to Display
   output "atlas_cluster_connection_string" { value = mongodbatlas_advanced_cluster.atlas-cluster.connection_strings.standard_srv }
   output "project_name"      { value = var.atlas_project_name }
