.. code-block:: shell 
   :copyable: true

   resource "mongodbatlas_database_user" "admin_user" {
     project_id = "6698000acf48197e089e4085"
     username = "adminUser"
     password = "securePassword"  # Use a secure password
     auth_database_name = "admin"

     roles {
       role_name     = "atlasAdmin"  # Admin role for the cluster
       database_name = "admin"
     }

     roles {
       role_name     = "readWriteAnyDatabase"  # Project member rights
       database_name = "admin"
     }
   }
