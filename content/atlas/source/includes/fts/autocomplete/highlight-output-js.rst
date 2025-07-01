.. tabs::

   .. tab:: edgeGram
      :tabid: edgeGram

      .. code-block:: javascript
         :copyable: false
         :linenos:

         '{
            "title":"Gertie the Dinosaur",
            "score":6.0822906494140625,
            "highlights":[{
              "score":0.9227690100669861,
              "path":"title",
              "texts":[{"value":"Gertie the Dinosaur","type":"hit"}]}]}'
         '{
            "title":"Germany Year Zero",
            "score":6.0822906494140625,
            "highlights":[{
              "score":0.9180012345314026,
              "path":"title",
              "texts":[{"value":"Germany Year Zero","type":"hit"}]}]}'
         '{
            "title":"Germany in Autumn",
            "score":6.0822906494140625,
            "highlights":[{
              "score":0.9180012345314026,
              "path":"title",
              "texts":[{"value":"Germany in Autumn","type":"hit"}]}]}'
         '{
            "title":"Germany Pale Mother",
            "score":6.0822906494140625,
            "highlights":[{
              "score":0.9227690100669861,
              "path":"title",
              "texts":[{"value":"Germany Pale Mother","type":"hit"}]}]}'
         '{
            "title":"Gerhard Richter - Painting",
            "score":6.0822906494140625,
            "highlights":[{
              "score":0.9386774897575378,
              "path":"title",
              "texts":[{"value":"Gerhard Richter - Painting","type":"hit"}]}]}'

      Atlas Search returns these results because the characters ``ger``
      appear at the left side of a word in all the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.

   .. tab:: rightEdgeGram
      :tabid: rightEdgeGram

      .. code-block:: javascript
         :copyable: false
         :linenos:

         '{
            "title":"South Park: Bigger Longer & Uncut",
            "score":4.7550506591796875,
            "highlights":[{
              "score":0.6177878975868225,
              "path":"title",
              "texts":[{"value":"South Park: Bigger Longer","type":"hit"},{"value":" & Uncut","type":"text"}]}]}'
         '{
            "title":"Roger Dodger",
            "score":4.568849563598633,
            "highlights":[{
              "score":0.905626654624939,
              "path":"title",
              "texts":[{"value":"Roger Dodger","type":"hit"}]}]}'
         '{
            "title":"The Jazz Singer",
            "score":4.520683288574219,
            "highlights":[{
              "score":0.9131305813789368,
              "path":"title",
              "texts":[{"value":"The Jazz Singer","type":"hit"}]}]}'
         '{
            "title":"Love and Anger",
            "score":4.520683288574219,
            "highlights":[{
              "score":0.9106559753417969,
              "path":"title",
              "texts":[{"value":"Love and Anger","type":"hit"}]}]}'
         '{
            "title":"Save the Tiger",
            "score":4.520683288574219,
            "highlights":[{
              "score":0.9106559753417969,
              "path":"title",
              "texts":[{"value":"Save the Tiger","type":"hit"}]}]}'

      Atlas Search returns these results because the characters ``ger``
      appear at the right side of a word in all the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.

   .. tab:: nGram
      :tabid: nGram

      .. code-block:: javascript
         :copyable: false
         :linenos:

         '{
            "title":"South Park: Bigger Longer & Uncut",
            "score":4.371164321899414,
            "highlights":[{
              "score":0.38510727882385254,
              "path":"title",
              "texts":[{"value":"South Park: Bigger Longer & Uncut","type":"hit"}]}]}'
         '{
            "title":"Bigger Stronger Faster*",
            "score":4.3067307472229,
            "highlights":[{
              "score":0.5282801985740662,
              "path":"title",
              "texts":[{"value":"Bigger Stronger Faster","type":"hit"},{"value":"*","type":"text"}]}]}'
         '{
            "title":"The Toxic Avenger Part II",
            "score":4.26673698425293,
            "highlights":[{
              "score":0.5984020829200745,
              "path":"title",
              "texts":[{"value":"The Toxic Avenger Part II","type":"hit"}]}]}'
         '{
            "title":"When a Stranger Calls Back",
            "score":4.26673698425293,
            "highlights":[{
              "score":0.6008684039115906,
              "path":"title",
              "texts":[{"value":"When a Stranger Calls Back","type":"hit"}]}]}'
         '{
            "title":"Carol Channing: Larger Than Life",
            "score":4.26673698425293,
            "highlights":[{
              "score":0.6154072880744934,
              "path":"title",
              "texts":[{"value":"Carol Channing: Larger Than Life","type":"hit"}]}]}'

      Atlas Search returns these results because the characters
      ``ger`` appear at different positions in the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.
