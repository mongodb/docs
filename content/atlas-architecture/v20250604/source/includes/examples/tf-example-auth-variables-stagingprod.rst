.. code-block:: 

   # Azure Variables

   variable "token_audience" {
     type        = string
     default     = "https://management.azure.com/"
     description = "Used as resource when getting the access token. See more in the [Azure documentation](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token#get-a-token-using-http)"
   }

   # MongoDB Atlas variables

   variable "org_id" {
     type        = string
     description = "MongoDB Atlas Organization ID"
   }

   variable "project_id" {
     type        = string
     description = "MongoDB Atlas Project ID"
   }

   variable "project_name" {
     type        = string
     description = "MongoDB Atlas Project Name"
   }

   variable "connection_strings" {
     type        = list(string)
     description = "MongoDB Atlas Cluster Standard Connection Strings"
   }

