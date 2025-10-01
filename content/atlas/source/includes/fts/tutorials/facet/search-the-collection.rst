Search the Collection 
---------------------

You can use :ref:`fts-facet-ref` in queries that use the 
:pipeline:`$search` and :pipeline:`$searchMeta` stages. In this 
section, you will connect to your cluster and the run the sample query 
against the ``sample_mflix.movies`` collection using the 
:pipeline:`$searchMeta` or :pipeline:`$search` stage to group the
``genre`` and ``year`` fields into buckets. To optimize performance: 

- Use :pipeline:`$searchMeta` stage if you only need the ``facet`` metadata. 
- Use :pipeline:`$search` stage if you want to retrieve both the query
  results and the ``facet`` metadata. 