.. code-block:: 
   :copyable: true 

   # Connection string to use in this configuration
   locals {
     mongodb_uri = var.connection_strings[0]
   }

   # Atlas organization details to use in the configuration
   data "mongodbatlas_federated_settings" "this" {
     org_id = var.org_id
     name   = var.project_name
     project_id = var.project_id
   }

   # Configure an identity provider for federated authentication
   resource "mongodbatlas_federated_settings_identity_provider" "oidc" {
     federation_settings_id = data.mongodbatlas_federated_settings.this.id
     audience               = var.token_audience
     authorization_type     = "USER"
     description            = "oidc-for-azure"
     # e.g. "https://sts.windows.net/91405384-d71e-47f5-92dd-759e272cdc1c/"
     issuer_uri = "https://sts.windows.net/${azurerm_user_assigned_identity.this.tenant_id}/"
     idp_type   = "WORKLOAD"
     name       = "OIDC-for-azure"
     protocol   = "OIDC"
     # groups_claim = null
     user_claim = "sub"
   }

   resource "mongodbatlas_federated_settings_org_config" "this" {
     federation_settings_id            = data.mongodbatlas_federated_settings.this.id
     org_id                            = var.org_id
     domain_restriction_enabled        = false
     domain_allow_list                 = []
     data_access_identity_provider_ids = [mongodbatlas_federated_settings_identity_provider.oidc.idp_id]
   }
