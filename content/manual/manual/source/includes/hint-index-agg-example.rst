The ``movies`` collection in the ``sample_mflix`` database contains documents 
similar to these:

.. code-block:: javascript
   :copyable: false

   { 
      title: "The Shawshank Redemption", 
      year: 1994, rated: "R", 
      imdb: { rating: 9.3, votes: 1513145, id: 111161 }
   },
   { 
      title: "The Godfather", 
      year: 1972, 
      rated: "R", 
      imdb: { rating: 9.2, votes: 1038358, id: 68646 }
   },
   { 
      title: "The Dark Knight",
      year: 2008, rated: "PG-13", 
      imdb: { rating: 9, votes: 1495351, id: 468569 }
   },
   { 
      title: "Forrest Gump",
      year: 1994, 
      rated: "PG-13", 
      imdb: { rating: 8.8, votes: 1087227, id: 109830 }
   }

Assume the following indexes exist on the ``movies`` collection:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/hint/apply-index-one.snippet.agg-year-index.js
   :language: javascript
   :category: usage example

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/hint/apply-index-two.snippet.agg-rated-index.js
   :language: javascript
   :category: usage example

The following aggregation operation includes the ``hint`` option to
force the usage of the specified index:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/hint/run-pipeline.snippet.agg-hint.js
   :language: javascript
   :category: usage example