curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request PATCH "https://cloud.mongodb.com/api/atlas/v1.0/groups/5356823b3794de37132bb7b/clusters/SingleRegionCluster" \
     --data '
       {
         "diskSizeGB": 320,
         "providerSettings": {
           "diskIOPS": 2400,
           "instanceSizeName": "M40",
         },
         "encryptionAtRestProvider": "AWS"
       }'
