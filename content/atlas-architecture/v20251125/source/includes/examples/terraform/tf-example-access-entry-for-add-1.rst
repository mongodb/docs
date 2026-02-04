.. code-block::
   :copyable: true

   # Add an entry to your IP Access List
   resource "mongodbatlas_access_list_api_key" "address_1" {
     org_id = "<org-id>"
     ip_address = "2.3.4.5"
     api_key_id = "a29120e123cd"
   }
