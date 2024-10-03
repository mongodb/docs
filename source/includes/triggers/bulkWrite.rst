.. code-block:: javascript

    exports = async function(arg){
        const doc1 = { "name": "velvet elvis", "quantity": 20, "reviews": [] };
        const doc2 = { "name": "mock turtleneck",  "quantity": 30, "reviews": [] };
    
        var collection = context.services.get("mongodb-atlas")
            .db("store")
            .collection("purchases");

        return await collection.bulkWrite(
            [{ insertOne: doc1}, { insertOne: doc2}], 
            {ordered:true});
    };
