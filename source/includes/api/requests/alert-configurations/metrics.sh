curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{PROJECT-ID}/alertConfigs" \
     --header "Content-Type: application/json" \
     --data '
       {
         "eventTypeName" : "OUTSIDE_METRIC_THRESHOLD",
         "enabled" : true,
         "metricThreshold" : {
           "metricName" : "DISK_PARTITION_SPACE_USED_DATA",
           "mode" : "AVERAGE",
           "operator" : "GREATER_THAN",
           "threshold" : 90.0,
           "units" : "RAW"
         },
         "notifications" : [ {
           "delayMin" : 0,
           "emailEnabled" : true,
           "intervalMin" : 60,
           "roles" : [ "GROUP_OWNER" ],
           "smsEnabled" : false,
           "typeName" : "GROUP"
         } ],
         "typeName" : "HOST_METRIC"
       }'
