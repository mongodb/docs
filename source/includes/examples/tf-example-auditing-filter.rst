.. code-block:: shell 
   :copyable: true 

   # Create a project
   resource "mongodbatlas_project" "project_test" {
     name   = var.project_name
     org_id = var.org_id
   }

   # Create a cluster with three nodes
   resource "mongodbatlas_advanced_cluster" "cluster_test" {
     project_id   = mongodbatlas_project.project_test.id
     name         = var.cluster_name
     cluster_type = "REPLICASET"

     replication_specs {
       region_configs {
         priority      = 7
         provider_name = "AWS"
         region_name   = "US_EAST_1"
         electable_specs {
           instance_size = "M10"
           node_count    = 3
         }
       }
     }
   }

   # Specify an auditing resource and enable auditing for a project.
   # To configure auditing, specify the unique project ID. If you change
   # this value to a different "project_id", this deletes the current audit
   # settings for the original project.

   # "audit_authorization_success" indicates whether the auditing system
   # captures successful authentication attempts for audit filters using
   # the "atype" : "authCheck" auditing event. Warning! If you set
   # "audit_authorization_success" to "true", this can severely impact
   # cluster performance. Enable this option with caution.

   # "audit_filter" is the JSON-formatted audit filter.
   # "enabled" denotes whether or not the project associated with the
   # specified "{project_id}"" has database auditing enabled. Defaults to "false".

   # Auditing created by API Keys must belong to an existing organization.

   # In addition to arguments listed previously, the following attributes
   # are exported:

   # "configuration_type" denotes the configuration method for the audit filter.
   # Possible values are:
   # - "NONE" - auditing is not configured for the project.
   # - "FILTER_BUILDER" - auditing is configured via the Atlas UI filter builder.
   # - "FILTER_JSON" - auditing is configured via a custom filter in Atlas or API.

   resource "mongodbatlas_auditing" "test" {
        project_id                  = "mongodbatlas_project.project_test.id"
        audit_filter                = "{ 'atype': 'authenticate', 'param': {   'user': 'auditAdmin',   'db': 'admin',   'mechanism': 'SCRAM-SHA-1' }}"
        audit_authorization_success = false
        enabled                     = true
    }