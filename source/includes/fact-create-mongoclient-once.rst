Don't define a new ``MongoClient`` object each time you invoke your
function. Doing so causes the driver to create a new database
connection with each function call. This can be expensive and
can result in your application exceeding database connection limits.
When you define a new ``MongoClient``, you should:

1. Create the ``MongoClient`` object once.
2. Store the object so your function can reuse the ``MongoClient`` 
   across function invocations.