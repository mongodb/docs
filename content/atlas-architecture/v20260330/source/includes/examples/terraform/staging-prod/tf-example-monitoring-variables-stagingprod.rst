.. code-block::
   :copyable: true

   variable "atlas_org_id" {
     type        = string
     description = "MongoDB Atlas Organization ID"
   }
   variable "atlas_project_name" {
     type        = string
     description = "The MongoDB Atlas Project Name"
   }
   variable "atlas_project_id" {
     description = "MongoDB Atlas project id"
     type        = string
   }
   variable "atlas_cluster_name" {
     description = "MongoDB Atlas Cluster Name"
     default     = "datadog-test-cluster"
     type        = string
   }
   variable "datadog_api_key" {
     description = "Datadog api key"
    type        = string
   }
   variable "datadog_region" {
     description = "Datadog region"
     default     = "US5"
     type        = string
   }
   variable "prometheus_user_name" {
     type        = string
     description = "The Prometheus User Name"
     default     = "puser"
   }
   variable "prometheus_password" {
     type        = string
     description = "The Prometheus Password"
    default     = "ppassword"
   }