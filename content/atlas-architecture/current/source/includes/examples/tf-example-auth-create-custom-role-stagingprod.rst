.. code-block:: 
   :copyable: true 

   resource "mongodbatlas_custom_db_role" "create_role" {
     project_id = var.project_id
     role_name  = "my_custom_role"

     actions {
       action = "UPDATE"
       resources {
         database_name   = "myDb"
       }
     }
     actions {
       action = "INSERT"
       resources {
         database_name   = "myDb"
       }
     }
     actions {
       action = "REMOVE"
       resources {
         database_name   = "myDb"
       }
     }
   }