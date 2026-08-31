db.getSiblingDB("sample_mflix_changes").db_changes.find(
   {},
   { _id: 0, clusterTime: 1, ns: 1, operationType: 1, fullDocument: 1 }
)
