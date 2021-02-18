curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request GET "https://cloud.mongodb.com/api/atlas/v1.5/groups/{GROUP-ID}/clusters/basicReplicaSet?pretty=true"
