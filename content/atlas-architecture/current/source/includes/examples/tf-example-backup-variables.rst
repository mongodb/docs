.. code-block:: yaml

   variable "org_id" {
     description = "Atlas organization ID"
     type        = string
   }

   variable "project_name" {
     description = "Atlas project name"
     type        = string
   }

   variable "cluster_name" {
     description = "Atlas Cluster Name"
     type        = string
   }

   variable "point_in_time_utc_seconds" {
     description = "PIT in UTC"
     default     = 0
     type        = number
   }

