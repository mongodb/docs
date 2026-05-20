.. code-block::
   :copyable: true

   # MongoDB Atlas Provider Authentication Variables
   # Legacy API key authentication (backward compatibility)
   variable "mongodbatlas_public_key" {
     type        = string
     description = "MongoDB Atlas API public key"
     sensitive   = true
   }
   
   variable "mongodbatlas_private_key" {
     type        = string
     description = "MongoDB Atlas API private key"
     sensitive   = true
   }
   
   # Recommended: Service account authentication
   variable "mongodb_service_account_id" {
     type        = string
     description = "MongoDB service account ID for authentication"
     sensitive   = true
     default     = null
   }
   
   variable "mongodb_service_account_key_file" {
     type        = string
     description = "Path to MongoDB service account private key file"
     sensitive   = true
     default     = null
   }

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

   # Atlas Group Name
   variable "atlas_group_name" {
     type        = string
     description = "Atlas Group Name"
   }
