mongosync \
   --cluster0 "mongodb://clusterAdmin:superSecret@clusterOne01.fancyCorp.com:20020,clusterOne02.fancyCorp.com:20020,clusterOne03.fancyCorp.com:20020/admin?tls=true" \
   --cluster1 "mongodb://clusterAdmin:superSecret@cluster2Name.abc123.mongodb.net/admin?tls=true"
