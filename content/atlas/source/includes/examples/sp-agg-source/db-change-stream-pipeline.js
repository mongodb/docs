const startAt = new Date(Date.now() - 60 * 1000);

const pipeline = [
   {
      $source: {
         connectionName: "db-change-stream-connection",
         db: "sample_mflix",
         config: {
            startAtOperationTime: startAt
         }
      }
   },
   {
      $merge: {
         into: {
            connectionName: "db-change-stream-connection",
            db: "sample_mflix_changes",
            coll: "db_changes"
         }
      }
   }
];
