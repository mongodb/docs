.. code-block:: shell 
   :copyable: true 

   # Add the MongoDB Atlas Provider  
   terraform {    
     required_providers {    
       mongodbatlas = {    
         source  = "mongodb/mongodbatlas"    
         version = "~> 2.2"    
       }    
     }    
     required_version = ">= 1.0"
   }  
  
   # Configure the MongoDB Atlas Provider  
   provider "mongodbatlas" {    
     # Legacy API key authentication (backward compatibility)
     public_key  = var.mongodbatlas_public_key    
     private_key = var.mongodbatlas_private_key    
     
     # Recommended: Service account authentication
     # Uncomment and configure the following for service account auth:
     # service_account_id = var.mongodb_service_account_id
     # private_key_file   = var.mongodb_service_account_key_file
   }  
  
   # Create a Project  
   resource "mongodbatlas_project" "this" {    
     org_id = var.atlas_org_id    
     name   = var.atlas_project_name    
   }  
  
   # Create an Atlas Advanced Cluster  
   resource "mongodbatlas_advanced_cluster" "atlas-cluster" {    
     project_id             = mongodbatlas_project.atlas-project.id    
     name                   = "ClusterPortalProd"    
     cluster_type           = "REPLICASET"    
     mongo_db_major_version = "8.0"    
    
     replication_specs = [
       {
         region_configs = [
           {    
             electable_specs = {    
               instance_size = "M10"    
               node_count    = 1    
             }    
             provider_name = "AWS"    
             priority      = 7    
             region_name   = "US_WEST_1"    
           }    
         ]
       }
     ]    
    
     # Advanced configuration  
     backup_enabled         = true    
     pit_enabled            = true    
     version_release_system = "LTS"    
   }  
  
   # Create comprehensive auditing configuration to capture all possible audit events  
   resource "mongodbatlas_auditing" "atlas-auditing" {    
     project_id = mongodbatlas_project.atlas-project.id    
    
     # Comprehensive audit filter to capture all possible audit events  
     audit_filter = jsonencode({    
       "$or" = [    
         # Capture all authentication events    
         {    
           "atype" = {    
             "$in" = [    
               "authenticate",    
               "authCheck",    
               "logout"    
             ]    
           }    
         },    
         # Capture all authorization events    
         {    
           "atype" = "authCheck"    
         },    
         # Capture all CRUD operations    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               # Read operations    
               "find",    
               "getMore",    
               "count",    
               "distinct",    
               "aggregate",    
               "group",    
               "mapReduce",    
               "geoNear",    
               "geoSearch",    
               "parallelCollectionScan",    
               "eval",    
               "getLastError",    
               "getPrevError",    
               "resetError",    
               # Write operations    
               "insert",    
               "update",    
               "delete",    
               "findAndModify",    
               "save",    
               # Index operations    
               "createIndexes",    
               "dropIndexes",    
               "listIndexes",    
               "reIndex",    
               # Collection operations    
               "create",    
               "drop",    
               "listCollections",    
               "collMod",    
               "convertToCapped",    
               "emptycapped",    
               "renameCollection",    
               # Database operations    
               "dropDatabase",    
               "listDatabases",    
               "copydb",    
               "clone",    
               # GridFS operations    
               "filemd5"    
             ]    
           }    
         },    
         # Capture all DDL (Data Definition Language) operations    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               "create",    
               "drop",    
               "createIndexes",    
               "dropIndexes",    
               "collMod",    
               "renameCollection",    
               "dropDatabase",    
               "createCollection",    
               "dropCollection"    
             ]    
           }    
         },    
         # Capture all user and role management operations    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               "createUser",    
               "dropUser",    
               "dropAllUsersFromDatabase",    
               "updateUser",    
               "grantRolesToUser",    
               "revokeRolesFromUser",    
               "createRole",    
               "updateRole",    
               "dropRole",    
               "dropAllRolesFromDatabase",    
               "grantRolesToRole",    
               "revokeRolesFromRole",    
               "grantPrivilegesToRole",    
               "revokePrivilegesFromRole"    
             ]
           }    
         },
         # Capture replica set operations    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               "replSetGetStatus",    
               "replSetInitiate",    
               "replSetReconfig",    
               "replSetStepDown",    
               "replSetSyncFrom",    
               "replSetFreeze",    
               "replSetMaintenance",    
               "replSetGetConfig"    
             ]    
           }    
         },    
         # Capture sharding operations    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               "shardCollection",    
               "addShard",    
               "removeShard",    
               "movePrimary",    
               "enableSharding",    
               "split",    
               "moveChunk",    
               "mergeChunks"    
             ]    
           }    
         },    
         # Capture administrative operations    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               "shutdown",    
               "fsync",    
               "getParameter",    
               "setParameter",    
               "serverStatus",    
               "dbStats",    
               "collStats",    
               "currentOp",    
               "killOp",    
               "listCommands",    
               "buildInfo",    
               "hostInfo",    
               "connectionStatus",    
               "getCmdLineOpts",    
               "logRotate",    
               "planCacheClear",    
               "planCacheListFilters",    
               "planCacheSetFilter",    
               "planCacheClearFilters"    
             ]    
           }    
         },    
         # Capture diagnostic operations    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               "explain",    
               "profile",    
               "validate",    
               "dbHash",    
               "ping",    
               "ismaster",    
               "isMaster",    
               "hello"    
             ]    
           }    
         },    
         # Capture connection and session events    
         {    
           "atype" = {    
             "$in" = [    
               "createSession",    
               "endSession",    
               "refreshSession"    
             ]    
           }    
         },    
         # Capture transaction events    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               "abortTransaction",    
               "commitTransaction",    
               "startTransaction"    
             ]    
           }    
         },    
         # Capture change stream events    
         {    
           "atype" = "authCheck",    
           "param.command" = {    
             "$in" = [    
               "aggregate"    
             ]    
           },    
           "param.pipeline" = {    
             "$elemMatch" = {    
               "$changeStream" = {    
                 "$exists" = true    
               }    
             }    
           }    
         }    
       ]    
     })    
    
     # Enable comprehensive auditing settings  
     audit_authorization_success = true # Audit both successful and failed operations    
     enabled                     = true # Enable auditing    
   }  
  
   # Variables  
   variable "mongodbatlas_public_key" {    
     default     = ""    
     description = "MongoDB Atlas Public Key"    
     type        = string    
     sensitive   = true    
   }  
  
   variable "mongodbatlas_private_key" {    
     default     = ""    
     description = "MongoDB Atlas Private Key"    
     type        = string    
     sensitive   = true    
   }  
  
   variable "atlas_org_id" {    
     default     = ""    
     description = "MongoDB Atlas Organization ID"    
     type        = string    
   }  
  
   variable "atlas_project_name" {    
     description = "MongoDB Atlas Project Name"    
     type        = string    
     default     = "Atlas Auditing Example"    
   }  
  
   # Outputs  
   output "cluster_connection_string" {    
     description = "Connection string for the Atlas cluster"    
     value       = mongodbatlas_advanced_cluster.atlas-cluster.connection_strings[0].standard_srv    
     sensitive   = true    
   }  
  
   output "cluster_id" {    
     description = "Atlas cluster ID"    
     value       = mongodbatlas_advanced_cluster.atlas-cluster.cluster_id    
   }  
  
   output "project_id" {    
     description = "Atlas project ID"    
     value       = mongodbatlas_project.atlas-project.id    
   }  
  
   output "auditing_enabled" {    
     description = "Whether auditing is enabled"    
     value       = mongodbatlas_auditing.atlas-auditing.enabled    
   }  
