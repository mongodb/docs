The following query uses the operator to query the ``plot`` field of
the ``sample_mflix.movies`` collection. The query includes a:

- :pipeline:`$limit` stage to limit the output to 5 results
- :pipeline:`$project` stage to exclude all fields except ``title``
  and ``plot``

.. include:: /includes/partial-match-tutorial/facts/fts-partial-match-autocomplete-query-desc.rst

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Pipeline Stage
     - Query

   * - ``$search``
     - .. code-block:: javascript

          {
            "index": "default",
            "autocomplete": {
              "path": "plot",
              "query": "new purchase",
              "tokenOrder": "any",
              "fuzzy": {
                "maxEdits": 2,
                "prefixLength": 1,
                "maxExpansions": 256
              }
            },
            "highlight": {
              "path": "plot"
            }
          }

   * - ``$limit``
     - .. code-block:: javascript

          5

   * - ``$project``
     - .. code-block:: javascript

          {
            "_id": 0,
            "title": 1,
            "plot": 1,
            "highlights": { "$meta": "searchHighlights" }
          }

If you enabled :guilabel:`Auto Preview`, |compass| displays the
following documents next to the ``$project`` pipeline stage:

.. literalinclude:: /includes/query/operators-collectors/autocomplete/code-snippets/output/autocomplete-query-shell-compass-results.js
   :language: javascript
   :linenos:
