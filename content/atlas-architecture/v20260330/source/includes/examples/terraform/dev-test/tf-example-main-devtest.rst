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
             auto_scaling = {
               compute_enabled = true
               compute_scale_down_enabled = true
               compute_max_instance_size = "M60"
               compute_min_instance_size = "M10"
             }
             priority      = 7
             provider_name = var.cloud_provider
             region_name   = var.atlas_region
           }
         ]
       }
     ]
     tags = {
       BU       = "ConsumerProducts"
       TeamName = "TeamA"
       AppName  = "ProductManagementApp"
       Env      = "Test"
       Version  = "8.0"
      Email    = "marissa@example.com"
     }
     
   }
   
   # Outputs to Display
   output "atlas_cluster_connection_string" { value = mongodbatlas_advanced_cluster.atlas-cluster.connection_strings.0.standard_srv }
   output "project_name"      { value = mongodbatlas_project.atlas-project.name }

.. note::

   To create a multi-region cluster, specify each region in its own ``region_configs`` 
   object and nest them in the ``replication_specs`` object. The ``priority`` 
   fields must be defined in descending order and must consist of values 
   between ``7`` and ``1`` as shown in the following example:

.. code-block::

   replication_specs = [
     {
       region_configs = [
         {
           electable_specs = {
             instance_size = "M10"
             node_count    = 2
           }
           auto_scaling = {
             compute_enabled = true
             compute_scale_down_enabled = true
             compute_max_instance_size = "M60"
             compute_min_instance_size = "M10"
           }
           provider_name = "GCP"
           priority      = 7
           region_name   = "NORTH_AMERICA_NORTHEAST_1"
         },
         {
           electable_specs = {
             instance_size = "M10"
             node_count    = 3
           }
           auto_scaling = {
             compute_enabled = true
             compute_scale_down_enabled = true
             compute_max_instance_size = "M60"
             compute_min_instance_size = "M10"
           }
           provider_name = "GCP"
           priority      = 6
           region_name   = "WESTERN_US"
         }
       ]
     }
   ]
   
   
