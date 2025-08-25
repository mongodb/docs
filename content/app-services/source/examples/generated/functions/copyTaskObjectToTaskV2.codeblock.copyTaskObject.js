exports = function (changeEvent) {
  const db = context.services.get("mongodb-atlas").db("ExampleDB");
  const collection = db.collection("Task");
  // If the event type is "invalidate", the next const throws an error.
  // Return early to avoid this.
  if (!changeEvent.documentKey) { return; }
  // The changed document's _id as an integer:
  const changedDocId = changeEvent.documentKey._id;
  // If a document in the Task collection has been deleted, 
  // delete the equivalent object in the TaskV2 collection:
  if (changeEvent.operationType === "delete") {
    const tasksV2Collection = db.collection("TaskV2");
    // Convert the deleted document's _id to a string value 
    // to match TaskV2's schema:
    const deletedDocumentID = changedDocId.toString();
    return tasksV2Collection.deleteOne({ _id: deletedDocumentID })
  }
  // A document in the Task collection has been created, 
  // modified, or replaced, so create a pipeline to handle the change:
  const pipeline = [
    // Find the changed document data in the Task collection:
    { $match: { _id: changeEvent.documentKey._id } },
    {
      // Transform the document by changing the _id field to a string:
      $addFields: {
        _id: { $toString: "$_id" },
      },
    },
    // Insert the document into TaskV2, using the $merge operator 
    // to avoid overwriting the existing data in TaskV2:
    { $merge: "TaskV2" }]
  return collection.aggregate(pipeline);
};
