.. code-block:: json
   :copyable: false
   :linenos:

   { 
     "count" : {
       "lowerBound" : NumberLong(5),
       "total" : null
     }, 
     "facet" : {
       "titleFacet" : {
         "buckets" : [
           {
             "_id" : "Gravity", 
             "count" : NumberLong(3) 
           }, 
           {
             "_id" : "Defying Gravity", 
             "count" : NumberLong(1)
           },
           {
             "_id" : "Laws of Gravity", 
             "count" : NumberLong(1) 
           }]
       }
     }
   }
      