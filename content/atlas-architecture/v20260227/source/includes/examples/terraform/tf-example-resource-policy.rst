.. code-block::
   :copyable: true

   resource "mongodbatlas_resource_policy" "restrict_cloud_provider" {
     org_id = var.org_id
     name   = "restrict-cloud-provider"
     policies = [
       {
         body = <<EOF
           forbid (
               principal,
               action == ResourcePolicy::Action::"cluster.modify",
               resource
           )
           unless
             { context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::"<cloud provider name>"] };
         EOF
       },
     ]
   }

   resource "mongodbatlas_resource_policy" "forbid_project_access_anywhere" {
     org_id = var.org_id
     name   = "forbid-project-access-anywhere"
     policies = [
       {
         body = <<EOF
           forbid (
               principal,
               action == ResourcePolicy::Action::"project.ipAccessList.modify",
               resource
           )
           when {context.project.ipAccessList.contains(ip("0.0.0.0/0"))};
       EOF
       },
     ]
   }

   resource "mongodbatlas_resource_policy" "restrict_cluster_size: {
       org_id = var.org_id
       name   = "restrict-cluster-size"
       policies = [
           {
               // restrict cluster size to a minimum of M30 and a maximum of M60
               body = <<EOF
                  forbid (
                      principal,
                      action == ResourcePolicy::Action::"cluster.modify",
                      resource
                  )
                  when {
                      (context.cluster has minGeneralClassInstanceSizeValue && context.cluster.minGeneralClassInstanceSizeValue < 30) 
                      || (context.cluster has maxGeneralClassInstanceSizeValue && context.cluster.maxGeneralClassInstanceSize > 60)
                  };
               EOF
           },
       ]
   }

   resource "mongodbatlas_resource_policy" "prevent-modifications-private-endpoints" {
     org_id = var.org_id
     name   = "prevent-modifications-private-endpoints"
     policies = [
       {
         body = <<EOF
           forbid (
               principal,
               action == ResourcePolicy::Action::"privateEndpoint.modify",
               resource
           )
           when {context.project.privateEndpoints == [
                   \"aws:<VPC_ENDPOINT_ID>", 
                   \"azure:<PRIVATE_ENDPOINT_RESOURCE_ID>:<PRIVATE_ENDPOINT_IP_ADDRESS>", 
                   \"gcp:<GCP_PROJECT_ID>:<VPC_NAME>"
               ]};
           EOF
       },
     ]
   }
