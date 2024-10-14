.. code-block::
   :copyable: true

   # Define the MongoDB Atlas Provider
   terraform {
     required_providers {
       mongodbatlas = {
         source = "mongodb/mongodbatlas"
       }
     }
     required_version = ">= 0.13"
   }