.. procedure::
   :style: normal

   .. step:: Perform a semantic search.
      
      This code performs a semantic search query for the phrase
      ``"Where do penguins live?"`` and returns the three
      most relevant results. It also prints a score that captures how well
      each result matches the query.

      Add the following code to your ``Main.java`` file:

      .. io-code-block::
         :copyable:
      
         .. input:: /includes/ai-integrations/langchain4j/Main.java
            :language: java
            :start-after: start-query
            :end-before: end-query
            :dedent:
      
         .. output::
            :visible: false
      
            Response: Penguins are flightless seabirds that live almost exclusively below the equator. Some island-dwellers can be found in warmer climates.
            Author: C
            Score: 0.829620897769928
            Response: Patagonia is home to five penguin species - Magellanic, Humboldt, Gentoo, Southern Rockhopper and King.
            Author: B
            Score: 0.7459062337875366
            Response: Emperor penguins are the tallest and heaviest of all penguin species, standing up to 4 feet.
            Author: D
            Score: 0.6908764839172363

   .. step:: (Optional) Perform a semantic search with metadata filtering.

      .. _langchain4j-metadata-filtering:
      
      To perform a search with metadata filtering, you can use classes
      from the ``dev.langchain4j.store.embedding.filter.comparison``
      package. These classes allow you to create filters that compare
      metadata values to specified values to narrow the results returned
      by the search.
      
      This example filters for documents in which the value of the
      ``author`` field is either ``"B"`` or ``"C"``. Then, it performs a
      semantic search query for the phrase ``"Where do penguins live?"``.

      Replace the code that instantiates an ``EmbeddingSearchRequest``
      instance in the preceding step with the following code:

      .. io-code-block::
         :copyable:
      
         .. input:: /includes/ai-integrations/langchain4j/Main.java
            :language: java
            :start-after: start-filtering
            :end-before: end-filtering
            :dedent:
      
         .. output::
            :visible: false
      
            Response: Penguins are flightless seabirds that live almost exclusively below the equator. Some island-dwellers can be found in warmer climates.
            Author: C
            Score: 0.8520907163619995
            Response: Patagonia is home to five penguin species - Magellanic, Humboldt, Gentoo, Southern Rockhopper and King.
            Author: B
            Score: 0.7666836977005005

      To learn more about metadata pre-filtering, see 
      :ref:`vectorSearch-agg-pipeline-filter`.
