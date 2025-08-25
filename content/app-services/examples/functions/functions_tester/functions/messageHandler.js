exports = function(changeEvent) {
    const {fullDocument} = changeEvent;
    
    // ... Process the document here ...
    const someResult = "approved";
    
    // Update the document with the result
    const collection = context.services.get("mongodb-atlas").db("triggerExample").collection("messages");
    return collection.updateOne({ _id: fullDocument._id, needsTriggerResponse: false, result: someResult });
};
