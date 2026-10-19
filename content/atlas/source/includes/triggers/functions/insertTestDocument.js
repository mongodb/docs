// Replace YOUR_DATABASE_NAME and YOUR_COLLECTION_NAME with the
// database and collection that the Trigger watches.
use YOUR_DATABASE_NAME

db.YOUR_COLLECTION_NAME.insertOne({
  tutorialTest: "atlas-trigger-s3",
  createdAt: new Date()
})
