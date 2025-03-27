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
                 query: "men with",
                 tokenOrder: "sequential"
               }
             }
           }
         ]

   .. tab::
      :tabid: shell

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst
  
      .. literalinclude:: /includes/fts/autocomplete/token-seq-shell.js
         :language: js
         :dedent:

   .. tab::
      :tabid: compass

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. include:: /includes/fts/autocomplete/token-seq.rst

   .. tab:: 
      :tabid: csharp

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-seq.cs
         :language: csharp
         :dedent:

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-seq.go
         :language: go
         :dedent:

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-seq.java
         :language: java
         :dedent:

   .. tab:: 
      :tabid: kotlin-coroutine

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-seq.kt
         :language: kotlin
         :dedent:

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-seq.js
         :language: js
         :dedent:

   .. tab::
      :tabid: python

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-seq.py
         :language: python
         :dedent:

.. include:: /includes/fts/autocomplete/different-results-note.rst

.. tabs-drivers::

   .. tab::
      :tabid: atlas-ui

      .. tabs::

         .. tab:: edgeGram
            :tabid: edgeGram

            .. code-block::
               :copyable: false

               SCORE: 12.644559860229492  _id:  “573a139af29313caabcf0b12”
                 plot: "Humberto Fuentes is a wealthy doctor whose wife has recently died. In …"
                 genres: Array
                 runtime: 127
                 ...
                 title: "Men with Guns"

               SCORE: 12.644559860229492  _id:  “573a13a4f29313caabd1287f”
                 plot: "Paul Gross stars as the leader of a recently reunited curling team fro…"
                 genres: Array
                 runtime: 102
                 ...
                 title: "Men with Brooms"

               SCORE: 7.997925281524658  _id:  “573a1391f29313caabcd93a3”
                 plot: "Navy divers clear the torpedo tube of a sunken submarine."
                 genres: Array
                 runtime: 77
                 ...
                 title: "Men Without Women"

         .. tab:: rightEdgeGram
            :tabid: rightEdgeGram

            .. code-block::
               :copyable: false

               SCORE: 11.758549690246582  _id:  “573a139af29313caabcf0b12”
                 plot: "Humberto Fuentes is a wealthy doctor whose wife has recently died. In …"
                 genres: Array
                 runtime: 127
                 ...
                 title: "Men with Guns"

               SCORE: 11.758549690246582  _id:  “573a13a4f29313caabd1287f”
                 plot: "Paul Gross stars as the leader of a recently reunited curling team fro…"
                 genres: Array
                 runtime: 102
                 ...
                 title: "Men with Brooms"

               SCORE: 7.70704460144043  _id:  “573a1399f29313caabcee64e”
                 plot: "A thief's son cons his father into spending more time with him."
                 genres: Array
                 runtime: 109
                 ...
                 title: "Getting Even with Dad"

               SCORE: 7.111915588378906  _id:  “573a13cdf29313caabd844f5”
                 plot: "Since his beloved violin was broken, Nasser Ali Khan, one of the most …"
                 genres: Array
                 runtime: 93
                 ...
                 title: "Chicken with Plums"

         .. tab:: nGram
            :tabid: nGram

            .. code-block::
               :copyable: false

               SCORE: 7.928277015686035  _id:  “573a1391f29313caabcd93a3”
                 plot: "Navy divers clear the torpedo tube of a sunken submarine."
                 genres: Array
                 runtime: 77
                 ...
                 title: "Men Without Women"

               SCORE: 7.928277015686035  _id:  “573a139af29313caabcf0b12”
                 plot: "Humberto Fuentes is a wealthy doctor whose wife has recently died. In …"
                 genres: Array
                 runtime: 127
                 ...
                 title: "Men with Guns"

               SCORE: 7.928277015686035  _id:  “573a13a4f29313caabd1287f”
                 plot: "Paul Gross stars as the leader of a recently reunited curling team fro…"
                 genres: Array
                 runtime: 102
                 ...
                 title: "Men with Brooms"

               SCORE: 7.381933212280273  _id:  “573a13c8f29313caabd77ab6”
                 plot: "Against the tumultuous backdrop of Iran's 1953 CIA-backed coup d'ètat,…"
                 genres: Array
                 runtime: 95
                 ...
                 title: "Women Without Men"

      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst

   .. tab::
      :tabid: shell

      .. include:: /includes/fts/autocomplete/token-seq-output-shell-and-compass.rst

   .. tab::
      :tabid: compass

      .. include:: /includes/fts/autocomplete/token-seq-output-shell-and-compass.rst

   .. tab:: 
      :tabid: csharp

      .. include:: /includes/fts/autocomplete/token-seq-output-cs.rst

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts/autocomplete/token-seq-output-go.rst

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts/autocomplete/token-seq-output-java.rst

   .. tab:: 
      :tabid: kotlin-coroutine

      .. include:: /includes/fts/autocomplete/token-seq-output-kotlin.rst

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts/autocomplete/token-seq-output-js.rst

   .. tab::
      :tabid: python

      .. include:: /includes/fts/autocomplete/token-seq-output-py.rst
