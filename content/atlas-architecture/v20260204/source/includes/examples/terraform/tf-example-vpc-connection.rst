.. code-block::
   :copyable: true

   # Define your application VPC
   resource "aws_default_vpc" "default" {
     tags = {
       Name = "Default VPC"
     }
   }

   # Create the peering connection request
   resource "mongodbatlas_network_peering" "mongo_peer" {
     accepter_region_name   = "us-east-2"
     project_id             = local.project_id
     container_id           = one(values(mongodbatlas_advanced_cluster.test.container_id))
     provider_name          = "AWS"
     route_table_cidr_block = "172.31.0.0/16"
     vpc_id                 = aws_default_vpc.default.id
     aws_account_id         = local.AWS_ACCOUNT_ID
   }

   # Accept the connection 
   resource "aws_vpc_peering_connection_accepter" "aws_peer" {
     vpc_peering_connection_id = mongodbatlas_network_peering.mongo_peer.connection_id
     auto_accept               = true

     tags = {
       Side = "Accepter"
     }
   }
