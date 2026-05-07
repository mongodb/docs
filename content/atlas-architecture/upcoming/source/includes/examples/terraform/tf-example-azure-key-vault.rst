.. code-block::
   :copyable: true

   module "atlas_azure" {
     source                   = "terraform-mongodbatlas-modules/atlas-azure/mongodbatlas"
     version                  = "~> 0.3"
     project_id               = var.atlas_project_id
     atlas_azure_app_id       = var.atlas_azure_app_id
     service_principal_id     = var.service_principal_id
     create_service_principal = false

     encryption = {
       enabled        = true
       key_vault_id   = var.azure_key_vault_id
       key_identifier = var.azure_key_identifier
     }
   }
