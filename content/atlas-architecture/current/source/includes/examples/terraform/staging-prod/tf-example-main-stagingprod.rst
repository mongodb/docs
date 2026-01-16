.. code-block::
   :copyable: true

   # Create a Group to Assign to Project 
   resource "mongodbatlas_team" "project_group" {
     org_id = var.atlas_org_id
     name   = var.atlas_group_name
     usernames = [
       "user1@example.com",
       "user2@example.com"
     ]
   }

   # Create a Project
   resource "mongodbatlas_project" "atlas-project" {
     org_id = var.atlas_org_id
     name = var.atlas_project_name
   }

   # Assign the team to project with specific roles
   resource "mongodbatlas_team_project_assignment" "project_team" {
     project_id = mongodbatlas_project.atlas-project.id
     team_id    = mongodbatlas_team.project_group.team_id
     role_names = ["GROUP_READ_ONLY", "GROUP_CLUSTER_MANAGER"]
   }
   
   # Create an Atlas Advanced Cluster 
   resource "mongodbatlas_advanced_cluster" "atlas-cluster" {
     project_id = mongodbatlas_project.atlas-project.id
     name = "ClusterPortalProd"
     cluster_type = "REPLICASET"
     mongo_db_major_version = var.mongodb_version
     use_effective_fields = true
     replication_specs = [
       {
         region_configs = [
           {
             electable_specs = {
               instance_size = var.cluster_instance_size_name
               node_count    = 3
               disk_size_gb  = var.disk_size_gb
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
     tags = {
       BU       = "ConsumerProducts"
       TeamName = "TeamA"
       AppName  = "ProductManagementApp"
       Env      = "Production"
       Version  = "8.0"
      Email    = "marissa@example.com"
     }
   }

   # Outputs to Display
   output "atlas_cluster_connection_string" { value = mongodbatlas_advanced_cluster.atlas-cluster.connection_strings.standard_srv }
   output "project_name"      { value = mongodbatlas_project.atlas-project.name }

.. note::

   To create a multi-region cluster, specify each region in its own ``region_configs`` 
   object and nest them in the ``replication_specs`` object, as shown in the 
   following example:

.. code-block::

   replication_specs = [
     {
       region_configs = [
         {
           electable_specs = {
             instance_size = "M10"
             node_count    = 2
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
           provider_name = "GCP"
           priority      = 6
           region_name   = "WESTERN_US"
         }
       ]
     }
   ]
