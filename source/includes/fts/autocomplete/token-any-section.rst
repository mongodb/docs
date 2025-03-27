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
                 tokenOrder: "any"
               }
             }
           }
         ]

   .. tab::
      :tabid: shell

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst
  
      .. literalinclude:: /includes/fts/autocomplete/token-any-shell.js
         :language: js
         :dedent:

   .. tab::
      :tabid: compass

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. include:: /includes/fts/autocomplete/token-any.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-any.cs
         :language: csharp
         :dedent:

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-any.go
         :language: go
         :dedent:

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-any.java
         :language: java
         :dedent:

   .. tab:: 
      :tabid: kotlin-coroutine

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-any.kt
         :language: kotlin
         :dedent:

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-any.js
         :language: js
         :dedent:

   .. tab::
      :tabid: python

      .. include:: /includes/fts/facts/fact-fts-autocomplete-limit-project-stages-token-order.rst

      .. literalinclude:: /includes/fts/autocomplete/token-any.py
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

               SCORE: 21.18158721923828  _id:  “573a139af29313caabcf0b12”
                 plot: "Humberto Fuentes is a wealthy doctor whose wife has recently died. In …"
                 genres: Array
                 runtime: 127
                 ...
                 title: "Men with Guns"

               SCORE: 21.18158721923828  _id:  “573a13a4f29313caabd1287f”
                 plot: "Paul Gross stars as the leader of a recently reunited curling team fro…"
                 genres: Array
                 runtime: 102
                 ...
                 title: "Men with Brooms"

               SCORE: 19.015962600708008  _id:  “573a1391f29313caabcd93a3”
                 plot: "Navy divers clear the torpedo tube of a sunken submarine."
                 genres: Array
                 runtime: 77
                 ...
                 title: "Men Without Women"

               SCORE: 11.215812683105469  _id:  “573a13b8f29313caabd4bcbf”
                 plot: "A graduate student (Nicholson) copes with a recent breakup by conducti…"
                 genres: Array
                 runtime: 80
                 ...
                 title: "Brief Interviews with Hideous Men"

               SCORE: 10.668076515197754  _id:  “573a13c9f29313caabd7ba99”
                 plot: "The women of a remote Latin American town are forced to pick up the pi…""
                 genres: Array
                 runtime: 87
                 ...
                 title: "Without Men"

               SCORE: 10.106664657592773  _id:  “573a13c8f29313caabd77ab6”
                 plot: "Against the tumultuous backdrop of Iran's 1953 CIA-backed coup d'ètat,…"
                 genres: Array
                 runtime: 95
                 ...
                 title: "Women Without Men"

               SCORE: 7.458737373352051  _id:  “573a1398f29313caabce9a19”
                 plot: "A man's wife leaves him to take up with an artist, so the man responds…"
                 genres: Array
                 runtime: 99
                 ...
                 title: "Men..."

               SCORE: 7.405402183532715  _id:  “573a13f2f29313caabdde0b4”
                 plot: "Men and Chicken is a black comedy about two outcast brothers, who by g…"
                 genres: Array
                 runtime: 104
                 ...
                 title: "Men & Chicken"

               SCORE: 7.2005205154418945  _id:  “573a1394f29313caabce06c3”
                 plot: "During the Korean War, a battle worn Lt. and his platoon behind enemy …"
                 genres: Array
                 runtime: 102
                 ...
                 title: "Men in War"

               SCORE: 7.2005205154418945  _id:  “573a1399f29313caabcec167”
                 plot: "A mother of two sons finds life considerably difficult on her own afte…"
                 genres: Array
                 runtime: 115
                 ...
                 title: "Men Don't Leave"

         .. tab:: rightEdgeGram
            :tabid: rightEdgeGram

            .. code-block::
               :copyable: false

               SCORE: 19.302995681762695  _id:  “573a139af29313caabcf0b12”
                 plot: "Humberto Fuentes is a wealthy doctor whose wife has recently died. In …"
                 genres: Array
                 runtime: 127
                 ...
                 title: "Men with Guns"

               SCORE: 19.302995681762695  _id:  “573a13a4f29313caabd1287f”
                 plot: "Paul Gross stars as the leader of a recently reunited curling team fro…"
                 genres: Array
                 runtime: 102
                 ...
                 title: "Men with Brooms"

               SCORE: 13.835155487060547  _id:  “573a1399f29313caabcee64e”
                 plot: "A thief's son cons his father into spending more time with him."
                 genres: Array
                 runtime: 109
                 ...
                 title: "Getting Even with Dad"

               SCORE: 13.309324264526367  _id:  “573a13cdf29313caabd844f5”
                 plot: "Since his beloved violin was broken, Nasser Ali Khan, one of the most …"
                 genres: Array
                 runtime: 93
                 ...
                 title: "Chicken with Plums"

               SCORE: 12.078420639038086  _id:  “573a13b8f29313caabd4bcbf”
                 plot: "A graduate student (Nicholson) copes with a recent breakup by conducti…"
                 genres: Array
                 runtime: 80
                 ...
                 title: "Brief Interviews with Hideous Men"

               SCORE: 10.180097579956055  _id:  “573a13b2f29313caabd3ab9b”
                 fullplot: "A man runs into a woman at a wedding. They start to flirt and talk and…"
                 imdb: Object
                 year: 2005
                 ...
                 title: "Conversations with Other Women"

               SCORE: 7.147367477416992  _id:  “573a1398f29313caabce9a19”
                 plot: "A man's wife leaves him to take up with an artist, so the man responds…"
                 genres: Array
                 runtime: 99
                 ...
                 title: "Men..."

               SCORE: 7.054648399353027  _id:  “573a1394f29313caabcde7cc”
                 plot: "Paralized war vet tries to adjust to the world without the use of his …"
                 genres: Array
                 runtime: 85
                 ...
                 title: "The Men"

               SCORE: 7.054648399353027  _id:  “573a1399f29313caabced53c”
                 plot: "Bitter about being double-crossed by the women he loved, (and with the…"
                 genres: Array
                 runtime: 105
                 ...
                 title: "Simple Men"

               SCORE: 7.054648399353027  _id:  “573a139af29313caabcf0f51”
                 fullplot: "In a world where both Mutants and Humans fear each other, Marie, bette…"
                 imdb: Object
                 year: 2000
                 ...
                 title: "X-Men"

         .. tab:: nGram
            :tabid: nGram

            .. code-block::
               :copyable: false

               SCORE: 16.18875503540039 _id:  “573a1391f29313caabcd93a3”
                 plot: "Navy divers clear the torpedo tube of a sunken submarine."
                 genres: Array
                 runtime: 77
                 ...
                 title: "Men Without Women"

               SCORE: 15.995916366577148  _id:  “573a139af29313caabcf0b12”
                 plot: "Humberto Fuentes is a wealthy doctor whose wife has recently died. In …"
                 genres: Array
                 runtime: 127
                 ...
                 title: "Men with Guns"

               SCORE: 15.995916366577148  _id:  “573a13a4f29313caabd1287f”
                 plot: "Paul Gross stars as the leader of a recently reunited curling team fro…"
                 genres: Array
                 runtime: 102
                 ...
                 title: "Men with Brooms"

               SCORE: 15.642412185668945  _id:  “573a13c8f29313caabd77ab6”
                 plot: "Against the tumultuous backdrop of Iran's 1953 CIA-backed coup d'ètat,…"
                 genres: Array
                 runtime: 95
                 ...
                 title: "Women Without Men"

               SCORE: 8.15120792388916  _id:  “573a13b8f29313caabd4bcbf”
                 plot: "A graduate student (Nicholson) copes with a recent breakup by conducti…"
                 genres: Array
                 runtime: 80
                 ...
                 title: "Brief Interviews with Hideous Men"

               SCORE: 8.118724822998047  _id:  “573a13b2f29313caabd3ab9b”
                 fullplot: "A man runs into a woman at a wedding. They start to flirt and talk and…"
                 imdb: Object
                 year: 2005
                 ...
                 title: "Conversations with Other Women"

               SCORE: 8.048237800598145  _id:  “573a13a5f29313caabd138ca”
                 plot: "This documentary, first shown on the Turner Classic Movies cable chann…"
                 genres: Array
                 runtime: 56
                 ...
                 title: "Without Lying Down: Frances Marion and the Power of Women in Hollywood"

               SCORE: 7.620831489562988  _id:  “573a13c9f29313caabd7ba99”
                 plot: "The women of a remote Latin American town are forced to pick up the pi…""
                 genres: Array
                 runtime: 87
                 ...
                 title: "Without Men"

               SCORE: 4.35431432723999  _id:  “573a1393f29313caabcdcd9d”
                 plot: "A young Canadian nurse (Betsy) comes to the West Indies to care for Je…"
                 genres: Array
                 runtime: 69
                 ...
                 title: "I Walked with a Zombie"

               SCORE: 4.35431432723999  _id:  “573a1393f29313caabcdd9c7”
                 plot: "Political intrigue and psychological drama run parallel. The queen is …"
                 genres: Array
                 runtime: 93
                 ...
                 title: "The Eagle with Two Heads"

      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst

   .. tab::
      :tabid: shell

      .. include:: /includes/fts/autocomplete/token-any-output-shell-and-compass.rst

   .. tab::
      :tabid: compass

      .. include:: /includes/fts/autocomplete/token-any-output-shell-and-compass.rst

   .. tab:: 
      :tabid: csharp

      .. include:: /includes/fts/autocomplete/token-any-output-cs.rst

   .. tab:: 
      :tabid: go

      .. include:: /includes/fts/autocomplete/token-any-output-go.rst

   .. tab:: 
      :tabid: java-sync 

      .. include:: /includes/fts/autocomplete/token-any-output-java.rst

   .. tab:: 
      :tabid: kotlin-coroutine

      .. include:: /includes/fts/autocomplete/token-any-output-kotlin.rst

   .. tab::
      :tabid: nodejs

      .. include:: /includes/fts/autocomplete/token-any-output-js.rst

   .. tab::
      :tabid: python

      .. include:: /includes/fts/autocomplete/token-any-output-py.rst
