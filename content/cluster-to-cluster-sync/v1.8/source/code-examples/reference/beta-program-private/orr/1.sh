./bin/mongosync \
      --cluster0 "mongodb://localhost:27000" \
      --cluster1 "mongodb://localhost:27001" \
      --oplogRolloverResilienceIntervalSeconds 60
