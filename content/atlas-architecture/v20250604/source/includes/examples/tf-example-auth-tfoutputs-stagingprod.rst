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
      value       = "mongodb+srv://${local.test_user_username}:${local.test_user_password}@${replace(mongodbatlas_advanced_cluster.this.connection_strings[0].standard_srv, "mongodb+srv://", "")}/?retryWrites=true"
      sensitive   = true
      description = "Useful for connecting to the database from Compass or other tool to validate data"
    }

    output "user_oidc_conn_string" {
      value       = local.mongodb_oidc_uri
      sensitive   = true
      description = "Useful to see the format of the OIDC connection string"
    }