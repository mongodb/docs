# Create Recommended Indexes 

The performance advisor can recommend indexes, the output of this command can be used 
as an input for the create indexes command, which will create an index in a rolling way fashion.

```bash
mongocli atlas performanceAdvisor suggestedIndexes ls \
  --processName atlas-00-01.gcp.mongodb.net:27017 \
 | awk 'BEGIN{ORS=" ";}{if (NR!=1){split($2,a,"."); print a[1]; print a[2]; for(i=4;i<=NF-1;++i)printf $i} printf"\n"}' \
 | xargs -n3 sh -c 'echo "Creating index db: $1 collection: $2 index: $3"; mongocli atlas clusters indexes create --clusterName slowQueriesDemo --db $1 --collection $2 --key $3' sh 
``` 
