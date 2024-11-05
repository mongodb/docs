.. code-block:: 
   :copyable: true 

   variable "user" {
     description = "MongoDB Atlas User"
     type        = list(string)
     default     = ["dbuser1", "dbuser2"]
   }

   variable "database_name" {
     description = "The Database in the cluster"
     type        = list(string)
   }

   variable "org_id" {
     description = "MongoDB Organization ID"
     type        = string
   }

   variable "project_id" {
     description = "MongoDB Atlas Project ID"
     type        = string
   }
