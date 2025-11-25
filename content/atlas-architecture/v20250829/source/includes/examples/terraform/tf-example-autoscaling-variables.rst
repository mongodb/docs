.. code-block::
   :copyable: true

   # Atlas Organization ID 
   variable "atlas_org_id" {
     type        = string
     description = "Atlas Organization ID"
   }
   
   # Atlas Project Name
   variable "atlas_project_name" {
     type        = string
     description = "Atlas Project Name"
   }
   
   # Atlas Project Environment
   variable "environment" {
     type        = string
     description = "The environment to be built"
   }
   
   # Cluster Instance Size Name 
   variable "cluster_instance_size_name" {
     type        = string
     description = "Cluster instance size name"
   }
   
   # Cloud Provider to Host Atlas Cluster
   variable "cloud_provider" {
     type        = string
     description = "AWS or GCP or Azure"
   }
   
   # Atlas Region
   variable "atlas_region" {
     type        = string
     description = "Atlas region where resources will be created"
   }
   
   # MongoDB Version 
   variable "mongodb_version" {
     type        = string
     description = "MongoDB Version"
   }

   # Storage Auto-scaling Enablement Flag
   variable "auto_scaling_disk_gb" {
     type        = boolean
     description = "Flag that specifies whether disk auto-scaling is enabled"
   }

   # Compute Auto-scaling Enablement Flag
   variable "auto_scaling_compute" {
     type        = boolean
     description = "Flag that specifies whether cluster tier auto-scaling is enabled"
   }

   # Disk Size in GB
   variable "disk_size_gb" {
     type        = int
     description = "Disk Size in GB"
   }