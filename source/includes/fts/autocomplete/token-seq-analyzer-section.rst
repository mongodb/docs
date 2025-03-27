You can search the ``title`` field for movie titles that start with a
term or phrase by indexing the field using the :ref:`keyword analyzer
<ref-keyword-analyzer>`. 

You must index the field using the :ref:`keyword analyzer
<ref-keyword-analyzer>` with the ``edgeGram`` tokenization strategy to
retrieve results for the following sample query. If you index the field
using any other :ref:`built-in analyzers <ref-built-in-analyzers>`,
|fts| doesn't return any results because it doesn't index your text
field as a single term. The ``edgeGram`` tokenization strategy creates
tokens starting at the left side of the words.

You must also set ``foldDiacritics`` to ``true`` to return
case-agnostic results. If you set ``foldDiacritics`` to ``false``, the
letter case of the query term must exactly match the letter case in the
document for |fts| to return any results.

.. code-block:: json
   :emphasize-lines: 13, 16, 17
   
   {
     "mappings": {
       "dynamic": false,
       "fields": {
         "title": [
         {
           "type": "stringFacet"
         },
         {
            "type": "string"
         },
         {
           "foldDiacritics": true,
           "maxGrams": 7,
           "minGrams": 3,
           "analyzer": "lucene.keyword",
           "tokenization": "edgeGram",
           "type": "autocomplete"
         }]
       }
     }
   }

The following query searches for movie titles that start with the term
``Fast &``.

.. tabs-drivers::

   .. tab::
      :tabid: atlas-ui

      Copy and paste the following query into the 
      :guilabel:`Query Editor`, and then click the :guilabel:`Search` 
      button in the :guilabel:`Query Editor`.

      .. code-block:: json

         [
           {
             $search: {
               autocomplete: {
                 path: "title",
                 query: "Fast &",
                 tokenOrder: "sequential"
               }
             }
           }
         ]

   .. tab::
      :tabid: shell

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst
  
      .. literalinclude:: /includes/fts/autocomplete/starts-with-shell.js
         :language: js
         :dedent:

   .. tab::
      :tabid: compass

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. include:: /includes/fts/autocomplete/starts-with.rst

   .. tab:: 
      :tabid: csharp

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/starts-with.cs
         :language: csharp
         :dedent:

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/starts-with.go
         :language: go
         :dedent:

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/starts-with.java
         :language: java
         :dedent:

   .. tab:: 
      :tabid: kotlin-coroutine

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/starts-with.kt
         :language: kotlin
         :dedent:

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/starts-with.js
         :language: js
         :dedent:

   .. tab::
      :tabid: python

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-seq.py
         :language: python
         :dedent:

.. tabs-drivers::

   .. tab::
      :tabid: atlas-ui

      .. code-block::
         :copyable: false

         SCORE: 10.042893409729004  _id:  “573a13bdf29313caabd5929f”
           fullplot: "Heading back to the streets where it all began, two men rejoin two wom…"
           imdb: Object
           year: 2009
           ...
           title: "Fast & Furious"
         
         SCORE: 9.515419006347656  _id:  “573a13d3f29313caabd95cc5”
           fullplot: "Since Dom (Diesel) and Brian's (Walker) Rio heist toppled a kingpin's …"
           imdb: Object
           year: 2013
           ...
           title "Fast & Furious 6"

      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst

   .. tab::
      :tabid: shell

      .. include:: /includes/fts/autocomplete/starts-with-output-shell-and-compass.rst

   .. tab::
      :tabid: compass

      .. include:: /includes/fts/autocomplete/starts-with-output-shell-and-compass.rst

   .. tab:: 
      :tabid: csharp

      .. include:: /includes/fts/autocomplete/starts-with-output-cs.rst

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts/autocomplete/starts-with-output-go.rst

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts/autocomplete/starts-with-output-java.rst

   .. tab:: 
      :tabid: kotlin-coroutine

      .. include:: /includes/fts/autocomplete/starts-with-output-kotlin.rst

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts/autocomplete/starts-with-output-js.rst

   .. tab::
      :tabid: python

      .. include:: /includes/fts/autocomplete/starts-with-output-py.rst
