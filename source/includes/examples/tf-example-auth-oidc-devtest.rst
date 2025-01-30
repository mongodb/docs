.. code-block:: 
   :copyable: true 

   # Connection string to use in this configuration
   locals {
     mongodb_uri = var.connection_strings[0]
   }

   # Fetch MongoDB Atlas Federated Settings
   data "mongodbatlas_federated_settings" "this" {
     org_id = var.org_id
   }

   # Configure an identity provider for federated authentication
   resource "mongodbatlas_federated_settings_identity_provider" "oidc" {
     federation_settings_id = data.mongodbatlas_federated_settings.this.id
     associated_domains     = var.trusted_domains
     audience               = var.token_audience
     authorization_type     = "USER"
     description            = "OIDC Identity Provider for Azure AD"
      
     # Replace with actual Azure Tenant ID
     issuer_uri = "https://sts.windows.net/${data.azurerm_client_config.current.tenant_id}/"

     idp_type   = "WORKFORCE"
     name       = "OIDC-for-azure"
     protocol   = "OIDC"
     user_claim = "sub" # Claim to extract the user's principal identity
   }

   resource "mongodbatlas_federated_settings_org_config" "this" {
     federation_settings_id            = data.mongodbatlas_federated_settings.this.id
     org_id                            = var.org_id
     domain_restriction_enabled        = false
     domain_allow_list                 = []
     data_access_identity_provider_ids = [mongodbatlas_federated_settings_identity_provider.oidc.idp_id]
   }

   # Create an OIDC-authenticated Database User
   resource "mongodbatlas_database_user" "oidc" {
     project_id         = var.project_id
     username           = "${mongodbatlas_federated_settings_identity_provider.oidc.idp_id}/${data.azurerm_client_config.current.client_id}"
     oidc_auth_type     = "USER"
     auth_database_name = "$external" # Required when using OIDC for USER authentication

     roles {
       role_name     = "atlasAdmin"
       database_name = "admin"
     }
   }

   # Azure-specific data source needed for Tenant ID and Client ID
   data "azurerm_client_config" "current" {}
