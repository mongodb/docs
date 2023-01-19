.. tabs::

   .. tab:: edgeGram
      :tabid: edgeGram

      .. code-block:: python
         :copyable: false
         :linenos:

         {
           'highlights': [{
             'path': 'title', 
             'score': 0.9227690100669861, 
             'texts': [{'type': 'hit', 'value': 'Gertie the Dinosaur'}]}], 
           'score': 6.085907459259033, 
           'title': 'Gertie the Dinosaur'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.9180012345314026, 
             'texts': [{'type': 'hit', 'value': 'Germany Year Zero'}]}],
           'score': 6.085907459259033, 
           'title': 'Germany Year Zero'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.9180012345314026, 
             'texts': [{'type': 'hit', 'value': 'Germany in Autumn'}]}],
           'score': 6.085907459259033, 
           'title': 'Germany in Autumn'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.9227690100669861,
             'texts': [{'type': 'hit', 'value': 'Germany Pale Mother'}]}],
           'score': 6.085907459259033, 
           'title': 'Germany Pale Mother'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.9386774897575378,
             'texts': [{'type': 'hit', 'value': 'Gerhard Richter - Painting'}]}], 
           'score': 6.085907459259033, 
           'title': 'Gerhard Richter - Painting'}

      Atlas Search returns these results because the characters ``ger``
      appear at the left side of a word in all the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.

   .. tab:: rightEdgeGram
      :tabid: rightEdgeGram

      .. code-block:: python
         :copyable: false
         :linenos:

         {
           'highlights': [{
             'path': 'title', 
             'score': 0.6177878975868225, 
             'texts': [{'type': 'hit', 'value': 'South Park: Bigger Longer'}, {'type': 'text', 'value': ' & Uncut'}]}], 
           'score': 4.807340621948242, 
           'title': 'South Park: Bigger Longer & Uncut'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.905626654624939,
             'texts': [{'type': 'hit', 'value': 'Roger Dodger'}]}],
           'score': 4.6073713302612305, 
           'title': 'Roger Dodger'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.9131305813789368,
             'texts': [{'type': 'hit', 'value': 'The Jazz Singer'}]}],
           'score': 4.577486038208008, 
           'title': 'The Jazz Singer'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.9106559753417969, 
             'texts': [{'type': 'hit', 'value': 'Love and Anger'}]}], 
           'score': 4.577486038208008, 
           'title': 'Love and Anger'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.9106559753417969,
             'texts': [{'type': 'hit', 'value': 'Save the Tiger'}]}],
           'score': 4.577486038208008, 
           'title': 'Save the Tiger'}

      Atlas Search returns these results because the characters ``ger``
      appear at the right side of a word in all the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.

   .. tab:: nGram
      :tabid: nGram

      .. code-block:: python
         :copyable: false
         :linenos:

         {
           'highlights': [{
             'path': 'title', 
             'score': 0.38510727882385254, 
             'texts': [{'type': 'hit', 'value': 'South Park: Bigger Longer & Uncut'}]}], 
           'score': 4.365298748016357, 
           'title': 'South Park: Bigger Longer & Uncut'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.5282801985740662, 
             'texts':[{'type': 'hit', 'value': 'Bigger Stronger Faster'}, {'type': 'text', 'value': '*'}]}], 
           'score': 4.300583839416504, 
           'title': 'Bigger Stronger Faster*'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.5984020829200745, 
             'texts': [{'type': 'hit', 'value': 'The Toxic Avenger Part II'}]}],
           'score': 4.2650651931762695, 
           'title': 'The Toxic Avenger Part II'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.6008684039115906, 
             'texts': [{'type': 'hit', 'value': 'When a Stranger Calls Back'}]}],
           'score': 4.2650651931762695, 
           'title': 'When a Stranger Calls Back'}
         {
           'highlights': [{
             'path': 'title', 
             'score': 0.6154072880744934, 
             'texts': [{'type': 'hit', 'value': 'Carol Channing: Larger Than Life'}]}], 
           'score': 4.2650651931762695, 
           'title': 'Carol Channing: Larger Than Life'}

      Atlas Search returns these results because the characters
      ``ger`` appear at different positions in the titles. Atlas Search
      matches a highlight ``hit`` more coarsely to your query terms when
      a highlighted path is referenced only in the autocomplete
      operators of the highlighted query.
