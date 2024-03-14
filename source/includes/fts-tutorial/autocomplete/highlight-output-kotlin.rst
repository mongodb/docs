.. tabs::

   .. tab:: edgeGram
      :tabid: edgeGram

      .. code-block:: none
         :copyable: false
         :linenos:

         Document{{title=Germany in Autumn, score=6.160550117492676, highlights=[Document{{score=0.9180012345314026, path=title, texts=[Document{{value=Germany in Autumn, type=hit}}]}}]}}
         Document{{title=Gertie the Dinosaur, score=6.160550117492676, highlights=[Document{{score=0.9227690100669861, path=title, texts=[Document{{value=Gertie the Dinosaur, type=hit}}]}}]}}
         Document{{title=Germany Pale Mother, score=6.160550117492676, highlights=[Document{{score=0.9227690100669861, path=title, texts=[Document{{value=Germany Pale Mother, type=hit}}]}}]}}
         Document{{title=Geronimo: An American Legend, score=6.096138954162598, highlights=[Document{{score=0.9430088996887207, path=title, texts=[Document{{value=Geronimo: An American, type=hit}}, Document{{value= Legend, type=text}}]}}]}}
         Document{{title=Geri's Game, score=5.900832176208496, highlights=[Document{{score=1.1180211305618286, path=title, texts=[Document{{value=Geri's Game, type=hit}}]}}]}}

      Atlas Search returns these results because the characters ``ger``
      appear at the left side of a word in all the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.

   .. tab:: rightEdgeGram
      :tabid: rightEdgeGram

      .. code-block:: none
         :copyable: false
         :linenos:

         Document{{title=South Park: Bigger Longer & Uncut, score=4.770905017852783, highlights=[Document{{score=0.6177878975868225, path=title, texts=[Document{{value=South Park: Bigger Longer, type=hit}}, Document{{value= & Uncut, type=text}}]}}]}}
         Document{{title=Roger Dodger, score=4.584150791168213, highlights=[Document{{score=0.905626654624939, path=title, texts=[Document{{value=Roger Dodger, type=hit}}]}}]}}
         Document{{title=The Crazy Stranger, score=4.535715103149414, highlights=[Document{{score=0.9203977584838867, path=title, texts=[Document{{value=The Crazy Stranger, type=hit}}]}}]}}
         Document{{title=The Ring Finger, score=4.535715103149414, highlights=[Document{{score=0.9131305813789368, path=title, texts=[Document{{value=The Ring Finger, type=hit}}]}}]}}
         Document{{title=Shoot the Messenger, score=4.535715103149414, highlights=[Document{{score=0.9227690100669861, path=title, texts=[Document{{value=Shoot the Messenger, type=hit}}]}}]}}

      Atlas Search returns these results because the characters ``ger``
      appear at the right side of a word in all the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.

   .. tab:: nGram
      :tabid: nGram

      .. code-block:: none
         :copyable: false
         :linenos:

         Document{{title=South Park: Bigger Longer & Uncut, score=4.395573139190674, highlights=[Document{{score=0.38510727882385254, path=title, texts=[Document{{value=South Park: Bigger Longer & Uncut, type=hit}}]}}]}}
         Document{{title=Bigger Stronger Faster*, score=4.33078145980835, highlights=[Document{{score=0.5282801985740662, path=title, texts=[Document{{value=Bigger Stronger Faster, type=hit}}, Document{{value=*, type=text}}]}}]}}
         Document{{title=The Toxic Avenger Part II, score=4.2905426025390625, highlights=[Document{{score=0.5984020829200745, path=title, texts=[Document{{value=The Toxic Avenger Part II, type=hit}}]}}]}}
         Document{{title=Carol Channing: Larger Than Life, score=4.2905426025390625, highlights=[Document{{score=0.6154072880744934, path=title, texts=[Document{{value=Carol Channing: Larger Than Life, type=hit}}]}}]}}
         Document{{title=When a Stranger Calls Back, score=4.2905426025390625, highlights=[Document{{score=0.6008684039115906, path=title, texts=[Document{{value=When a Stranger Calls Back, type=hit}}]}}]}}

      Atlas Search returns these results because the characters
      ``ger`` appear at different positions in the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.
