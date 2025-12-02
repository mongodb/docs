.. code-block:: shell 
   :copyable: true 

   locals {
     test_user_password = random_password.password.result
   }

   # Generates 12 characters long random password without special characters
   resource "random_password" "password" {
     length  = 12
     special = false
   }

   resource "mongodbatlas_database_user" "user1" {
     username           = var.user[0]
     password           = local.test_user_password
     project_id         = var.project_id
     auth_database_name = "admin"
     scopes             = var.clusters[0]

     roles {
       role_name     = "readWriteAny"
       database_name = var.database_name[0]
     }
   }

   output "user1" { value = mongodbatlas_database_user.user1.username }
   output "userpwd" { value = mongodbatlas_database_user.user1.password sensitive = true }
