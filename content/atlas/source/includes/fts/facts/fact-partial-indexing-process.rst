When you create an |product-name| index on a View, the ``mongot`` 
process performs the same tasks as when you create an |product-name| 
index on a regular collection. The ``mongot`` process:

1. Creates |product-name| indexes based on the rules in the index definition for 
   the collection.

#. Monitors change streams for the current state of the documents and 
   indexes for the collections for which you defined the |product-name| 
   indexes.

#. Processes |product-name| queries and returns the document IDs and 
   other search metadata for the matching documents to ``mongod``, 
   which then does a full document lookup and returns the results to the client.

When you create an |product-name| index on a View, the View 
definition is applied during Step 1 and 2, and the transformed 
documents are stored in the |product-name| index on disk.