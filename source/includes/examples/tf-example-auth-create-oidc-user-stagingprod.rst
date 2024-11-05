.. code-block:: 
   :copyable: true 

   resource "mongodbatlas_database_user" "oidc" {
     project_id         = var.project_id
     username           = "${mongodbatlas_federated_settings_identity_provider.oidc.idp_id}/${azurerm_user_assigned_identity.this.principal_id}"
     oidc_auth_type     = "USER"
     auth_database_name = "$external" # required when using OIDC USER authentication

     roles {
       role_name     = "atlasAdmin"
       database_name = "admin"
     }
   }
