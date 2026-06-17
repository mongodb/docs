.. code-block::
   :copyable: true

   module "atlas_gcp" {
     source     = "terraform-mongodbatlas-modules/atlas-gcp/mongodbatlas"
     version    = "~> 0.2"
     project_id = var.atlas_project_id

     encryption = {
       enabled = true
       create_kms_key = {
         enabled         = true
         location        = "us-east4"
         rotation_period = "7776000s"
       }
     }
   }
