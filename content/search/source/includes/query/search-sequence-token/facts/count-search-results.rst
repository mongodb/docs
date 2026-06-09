To count search results during pagination, run a separate
:pipeline:`$searchMeta` query with the :ref:`count <count-ref>` option.
This returns a metadata document that contains the total count of
documents matching your search criteria.

The following sample query gets the total number of documents with the
term ``summer`` in the ``title`` field:

.. io-code-block::
   :copyable: true

   .. input:: 
      :language: json
      :emphasize-lines: 9-12

      db.movies.aggregate([
        {
          "$searchMeta": {
            "index": "pagination-tutorial",
            "text": {
              "path": "title",
              "query": "summer"
            },
            "count": {
               "type": "lowerBound",
               "threshold": 5000
            }
          }
        }
      ])

   .. output::
      :language: json
      :visible: false

      [ { count: { lowerBound: Long("65") } } ]