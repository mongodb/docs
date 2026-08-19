The following query uses the :pipeline:`$vectorSearch` stage to search
the ``reviews.comments`` field for the string *great location close to 
everything*. The query specifies the following criteria to pre-filter 
the documents for the semantic search:

- Include only documents that have a ``reviews.date`` value greater than or 
  equal to ``2010-01-01``.
- Include only documents that have an ``address.country`` value is *United States*.
- Include only documents that have a ``bedrooms`` value between 2 and 3, inclusive.
- Include only documents that have a ``property_type`` value is either *Apartment* 
  or *House*.

The query also specifies the following options:

- The ``nestedOptions.scoreMode`` option is set to ``avg``. This means that 
  the score for each document is the average of the scores for the nested 
  array elements.
- The ``numCandidates`` option is set to ``100``. This means that the query 
  considers up to 100 nearest neighbors.

The query returns the top 5 results. The :pipeline:`$project` stage 
includes the following fields in the results:

- ``reviews.comments`` 
- ``reviews.date`` 
- ``address.country`` 
- ``bedrooms`` 
- ``property_type`` 
- ``score``: The :ref:`vector search score <vectorSearch-agg-pipeline-score>` 
  for each document in the results.
