.. tabs::

   .. tab:: Basic Semantic Search
      :tabid: semantic-search

      .. procedure::
         :style: normal

         .. step:: Add the following code to your main function and save the file.

            Semantic search retrieves information that is meaningfully related
            to a query. The following code uses the ``SimilaritySearch()``
            method to perform a semantic search for the string ``"Prevent
            weeds"`` and limits the results to the first document.

            .. code-block:: go

               // Performs basic semantic search
               docs, err := store.SimilaritySearch(context.Background(), "Prevent weeds", 1)
               if err != nil {
                  fmt.Println("Error performing search:", err)
               }
               fmt.Println("Semantic Search Results:", docs)

         .. step:: Run the following command to execute the query.

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: sh

                  go run main.go

               .. output::
                  :language: json
                  :visible: false

                  Semantic Search Results: [{For a natural lawn, selection of
                  the right grass type suitable for your climate is crucial.
                  Balanced watering, generally 1 to 1.5 inches per week, is
                  important; overwatering invites disease. Opt for organic
                  fertilizers over synthetic versions to provide necessary
                  nutrients and improve soil structure. Regular lawn aeration
                  helps root growth and prevents soil compaction. Practice
                  natural pest control and consider overseeding to maintain a
                  dense sward, which naturally combats weeds and pest.
                  map[author:C type:post] 0.69752026}]
                
   .. tab:: Semantic Search with Filtering
      :tabid: semantic-search-filter

      You can pre-filter your data by using an
      :abbr:`MQL (MongoDB Query Language)` match expression
      that compares the indexed field with boolean, number, or 
      string values. You must index any metadata fields that you want to 
      filter by as the ``filter`` type. To learn more, see 
      :ref:`avs-types-vector-search`.

      .. procedure::
         :style: normal

         .. step:: Add the following code to your main function and save the file. 

            The following code uses the ``SimilaritySearch()`` method to perform
            a semantic search for the string ``"Tulip care"``. It specifies the
            following parameters:

            - The number of documents to return as ``1``.
            - A score threshold of ``0.60``.

            It returns the document that matches the filter ``metadata.type:
            post`` and includes the score threshold.

            .. code-block:: go

               // Performs semantic search with metadata filter
	            filter := map[string]interface{}{
		            "metadata.type": "post",
	            }

               docs, err = store.SimilaritySearch(context.Background(), "Tulip care", 1,
                  vectorstores.WithScoreThreshold(0.60),
		            vectorstores.WithFilters(filter))
               if err != nil {
                  fmt.Println("Error performing search:", err)
               }

	            fmt.Println("Filter Search Results:", docs)

         .. step:: Run the following command to execute the query.

            .. io-code-block::
               :copyable: true
    
               .. input::
                  :language: sh

                  go run main.go

               .. output::
                  :language: json
                  :visible: false

                  Filter Search Results: [{Proper tuber planting involves site
                  selection, proper timing, and exceptional care. Choose spots
                  with well-drained soil and adequate sun exposure. Tubers are
                  generally planted in spring, but depending on the plant,
                  timing varies. Always plant with the eyes facing upward at a
                  depth two to three times the tuber's height. Ensure 4 inch
                  spacing between small tubers, expand to 12 inches for large
                  ones. Adequate moisture is needed, yet do not overwater.
                  Mulching can help preserve moisture and prevent weed growth.
                  map[author:A type:post] 0.64432365}]


