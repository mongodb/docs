When you run your query using the :pipeline:`$search` stage, |fts| 
stores the metadata results in the ``$$SEARCH_META`` variable and 
returns only the search results. You can use the ``$$SEARCH_META`` 
variable in all the supported :manual:`aggregation pipeline stages 
</reference/operator/aggregation-pipeline/>` to view the metadata 
results for your :pipeline:`$search` query.

MongoDB recommends using the ``$$SEARCH_META`` variable only if you 
need both the search results and the metadata results. Otherwise, use 
the: 

- :pipeline:`$search` stage for just the search results.
- :pipeline:`$searchMeta` stage for just the metadata results.
