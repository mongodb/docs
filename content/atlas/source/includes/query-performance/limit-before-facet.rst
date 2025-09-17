Use ``$limit`` Before ``$facet``
--------------------------------

Using a :pipeline:`$limit` aggregation pipeline stage after a
:pipeline:`$facet` aggregation pipeline stage might negatively impact query performance. To avoid
performance bottlenecks, use :pipeline:`$limit` before
:pipeline:`$facet`.  

.. example:: 

   .. code-block:: json 
      :copyable: false 

      {
        {
          "$search": {...}
        },
        { "$limit": 20 },
        {
          "$facet": {
            "results": [],
            "totalCount": $$SEARCH_META
          }
        }
      }

For a demonstration, see the following examples: 

- :ref:`Metadata and Search Results Example <fts-facet-egs>` 
- :ref:`Facet Example <fts-count-aggregation-variable>`