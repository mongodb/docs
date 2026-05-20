.. code-block::
   :copyable: true

   module "atlas_aws" {
     source     = "terraform-mongodbatlas-modules/atlas-aws/mongodbatlas"
     version    = "~> 0.3"
     project_id = var.atlas_project_id

     encryption = {
       enabled = true
       create_kms_key = {
         enabled             = true
         alias               = "alias/atlas-encryption"
         enable_key_rotation = true
       }
     }
   }
