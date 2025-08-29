.. code-block:: 
   :copyable: true

   resource "mongodbatlas_encryption_at_rest" "test" {
    project_id = var.atlas_project_id
  
    azure_key_vault_config {
      enabled           = true
      azure_environment = "AZURE"
  
      tenant_id       = var.azure_tenant_id
      subscription_id = var.azure_subscription_id
      client_id       = var.azure_client_id
      secret          = var.azure_client_secret
  
      resource_group_name = var.azure_resource_group_name
      key_vault_name      = var.azure_key_vault_name
      key_identifier      = var.azure_key_identifier
    }
  }
  
  data "mongodbatlas_encryption_at_rest" "test" {
    project_id = mongodbatlas_encryption_at_rest.test.project_id
  }
  
  output "is_azure_encryption_at_rest_valid" {
    value = data.mongodbatlas_encryption_at_rest.test.azure_key_vault_config.valid
  }
  