curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{PROJECT-ID}/alertConfigs" \
     --header "Content-Type: application/json" \
     --data '
       {
         "eventTypeName" : "REPLICATION_OPLOG_WINDOW_RUNNING_OUT",
         "enabled" : true,
         "notifications" : [ {
           "delayMin" : 0,
           "emailEnabled" : true,
           "intervalMin" : 60,
           "roles" : [ "GROUP_OWNER" ],
           "smsEnabled" : false,
           "typeName" : "GROUP"
         } ],
         "threshold" : {
           "operator" : "LESS_THAN",
           "threshold" : 1,
           "units" : "HOURS"
         },
         "typeName" : "REPLICA_SET"
       }'
