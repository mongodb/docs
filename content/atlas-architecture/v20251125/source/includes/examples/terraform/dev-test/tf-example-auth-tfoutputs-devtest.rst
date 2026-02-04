.. code-block:: 

   output "vm_fqdn" {
     value       = azurerm_public_ip.vm-public-ip.fqdn
     description = "Fully Qualified Domain Name (FQDN) of the Virtual Machine (VM)"
   }

   output "ssh_connection_string" {
     value       = "ssh ${var.vm_admin_username}@${azurerm_public_ip.vm-public-ip.fqdn}"
     description = "Useful for connecting to the instance"
   }

   output "user_test_conn_string" {
     value       = "mongodb+srv://${var.user[0]}:<password>@${replace(local.mongodb_uri, "mongodb+srv://", "")}/?retryWrites=true"
     description = "Connection string for testing regular database user access"
     sensitive   = true
   }

   output "user_oidc_conn_string" {
     value       = "mongodb+srv://${mongodbatlas_database_user.oidc.username}:<OIDCToken>@${replace(local.mongodb_uri, "mongodb+srv://", "")}/?authMechanism=MONGODB-OIDC&retryWrites=true"
     description = "Connection string for OIDC-authenticated user"
     sensitive   = true
   }
    