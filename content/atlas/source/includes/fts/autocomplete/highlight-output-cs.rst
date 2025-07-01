.. tabs::

   .. tab:: edgeGram
      :tabid: edgeGram

      .. code-block:: json
         :copyable: false
         :linenos:

         { "title" : "Gertie the Dinosaur", "highlights" : [{ "path" : "title", "score" : 0.92276901006698608, "texts" : [{ "type" : "Hit", "value" : "Gertie the Dinosaur" }] }], "score" : 6.0822906494140625 }
         { "title" : "Germany Year Zero", "highlights" : [{ "path" : "title", "score" : 0.91800123453140259, "texts" : [{ "type" : "Hit", "value" : "Germany Year Zero" }] }], "score" : 6.0822906494140625 }
         { "title" : "Germany in Autumn", "highlights" : [{ "path" : "title", "score" : 0.91800123453140259, "texts" : [{ "type" : "Hit", "value" : "Germany in Autumn" }] }], "score" : 6.0822906494140625 }
         { "title" : "Germany Pale Mother", "highlights" : [{ "path" : "title", "score" : 0.92276901006698608, "texts" : [{ "type" : "Hit", "value" : "Germany Pale Mother" }] }], "score" : 6.0822906494140625 }
         { "title" : "Gerhard Richter - Painting", "highlights" : [{ "path" : "title", "score" : 0.93867748975753784, "texts" : [{ "type" : "Hit", "value" : "Gerhard Richter - Painting" }] }], "score" : 6.0822906494140625 }

      Atlas Search returns these results because the characters ``ger``
      appear at the left side of a word in all the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.

   .. tab:: rightEdgeGram
      :tabid: rightEdgeGram

      .. code-block:: json
         :copyable: false
         :linenos:

         { "title" : "South Park: Bigger Longer & Uncut", "highlights" : [{ "path" : "title", "score" : 0.61778789758682251, "texts" : [{ "type" : "Hit", "value" : "South Park: Bigger Longer" }, { "type" : "Text", "value" : " & Uncut" }] }], "score" : 4.7550506591796875 }
         { "title" : "Roger Dodger", "highlights" : [{ "path" : "title", "score" : 0.90562665462493896, "texts" : [{ "type" : "Hit", "value" : "Roger Dodger" }] }], "score" : 4.5688495635986328 }
         { "title" : "The Jazz Singer", "highlights" : [{ "path" : "title", "score" : 0.91313058137893677, "texts" : [{ "type" : "Hit", "value" : "The Jazz Singer" }] }], "score" : 4.5206832885742188 }
         { "title" : "Love and Anger", "highlights" : [{ "path" : "title", "score" : 0.91065597534179688, "texts" : [{ "type" : "Hit", "value" : "Love and Anger" }] }], "score" : 4.5206832885742188 }
         { "title" : "Save the Tiger", "highlights" : [{ "path" : "title", "score" : 0.91065597534179688, "texts" : [{ "type" : "Hit", "value" : "Save the Tiger" }] }], "score" : 4.5206832885742188 }

      Atlas Search returns these results because the characters ``ger``
      appear at the right side of a word in all the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.

   .. tab:: nGram
      :tabid: nGram

      .. code-block:: json
         :copyable: false
         :linenos:

         { "title" : "South Park: Bigger Longer & Uncut", "highlights" : [{ "path" : "title", "score" : 0.38510727882385254, "texts" : [{ "type" : "Hit", "value" : "South Park: Bigger Longer & Uncut" }] }], "score" : 4.3711643218994141 }
         { "title" : "Bigger Stronger Faster*", "highlights" : [{ "path" : "title", "score" : 0.52828019857406616, "texts" : [{ "type" : "Hit", "value" : "Bigger Stronger Faster" }, { "type" : "Text", "value" : "*" }] }], "score" : 4.3067307472229004 }
         { "title" : "The Toxic Avenger Part II", "highlights" : [{ "path" : "title", "score" : 0.59840208292007446, "texts" : [{ "type" : "Hit", "value" : "The Toxic Avenger Part II" }] }], "score" : 4.2667369842529297 }
         { "title" : "When a Stranger Calls Back", "highlights" : [{ "path" : "title", "score" : 0.60086840391159058, "texts" : [{ "type" : "Hit", "value" : "When a Stranger Calls Back" }] }], "score" : 4.2667369842529297 }
         { "title" : "Carol Channing: Larger Than Life", "highlights" : [{ "path" : "title", "score" : 0.61540728807449341, "texts" : [{ "type" : "Hit", "value" : "Carol Channing: Larger Than Life" }] }], "score" : 4.2667369842529297 }
       
      Atlas Search returns these results because the characters
      ``ger`` appear at different positions in the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.
