.. code-block:: shell

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

   variable "connection_strings" {
     description = "List of MongoDB connection strings to the cluster"
     type        = list(string)
   }

   variable "token_audience" {
     description = "The token audience used by the OIDC identity provider"
     type        = string
     default     = "https://management.azure.com/"  # Example audience
   }

   variable "trusted_domains" {
     description = "List of associated domains to trust"
     type        = list(string)
     default     = ["myOrg.com", "another-trusted-domain.org"] # Example domains
   }
