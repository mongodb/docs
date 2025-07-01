.. code-block::
   :copyable: false
   :linenos: 

   [{
      count: { lowerBound: Long("5") },
      facet: {
         titleFacet: {
         buckets: [
            { _id: 'Gravity', count: Long("3") },
            { _id: 'Defying Gravity', count: Long("1") },
            { _id: 'Laws of Gravity', count: Long("1") }
         ]
         }
      }
   }]
