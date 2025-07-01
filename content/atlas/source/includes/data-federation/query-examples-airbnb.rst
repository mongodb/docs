Find the number of AirBnB offerings with ``3`` bedrooms and a high review score:

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos:

      db.listingsAndReviews.aggregate([{$match: {"bedrooms" : 3, "review_scores.review_scores_rating": {$gt: 79}} }, {$count: "numProperties"}])

   .. output:: 
      :language: json
      :linenos:

      { 
         "numProperties" : 295 
      }

Find properties with ``3`` bedrooms and include only the ``name`` and ``bedrooms`` fields in the results. Sort the returned documents by customer review rating. Limit the number of documents returned to ``5``:

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos:

      db.listingsAndReviews.find({"bedrooms": 3}, {"name": 1, "bedrooms": 1}).sort({review_scores_rating: -1}).limit(5)

   .. output:: 
      :language: json
      :linenos:

      [
        {
          _id: '20045679',
          name: 'House Near Espinho/Santa Maria Feira',
          bedrooms: Long("3")
        },
        {
          _id: '19760228',
          name: 'Apartment Salva - 3 bedroom in Poble Sec',
          bedrooms: Long("3")
        },
        {
          _id: '19768051',
          name: 'Ultra Modern Pool House Maroubra',
          bedrooms: Long("3")
        },
        {
          _id: '19877706',
          name: 'Big 3 Bedroom Garden Level Apartment Near Subway',
          bedrooms: Long("3")
        },
        {
          _id: '6291063',
          name: 'Beautiful Tropical Oasis near beach in Kailua',
          bedrooms: Long("3")
        }
      ]
