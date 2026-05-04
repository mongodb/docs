Starting in MongoDB 8.3, the server is able to parse the full range of all 
representable double precision floating point numbers. This includes *subnormal 
numbers* where the most significant digit has leading zeroes and the exponent 
has the least possible value. For details, see `Subnormal Number 
<https://en.wikipedia.org/wiki/Subnormal_number>`_.

In earlier versions of MongoDB, the server returns an error when you try to 
parse these numbers. The following example raises an error in versions earlier 
than MongoDB 8.3:

.. code-block:: javascript

   db.t.insertOne( { v: "7.08263e-317" } )

   db.t.aggregate([
     {
       $project: {
         converted: {
           $convert: { input: "$v", to: "double" },
         }
       }
      }
   ])

This example fails with an error similar to the following:

.. code-block:: none
   :copyable: false

   MongoServerError[ConversionFailure]: Executor error during aggregate command on namespace: test.t :: 
   caused by :: Failed to parse number '7.08263e-317' in $convert with no onError value: Out of range