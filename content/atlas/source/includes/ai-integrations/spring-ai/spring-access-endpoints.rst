.. procedure::
   :style: normal

   .. step:: Run the application.
      
      Build and run your application by using your IDE tools. If you are using
      default settings, your application runs locally on port ``8080``.

   .. step:: Access endpoints from within your terminal.
      
      After you confirm that your application is running, run the following
      command in your terminal to access the ``add`` endpoint, which converts the
      sample data to vector embeddings and inserts the embeddings in |service|:

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: bash

            curl -X GET http://localhost:8080/tutorial/add

         .. output:: 
            :language: none
            :visible: false

            Documents added successfully!

      .. tip:: 

         After accessing the endpoint, if you're using |service|, you can verify your vector embeddings
         by navigating to the ``springai_test.vector_store`` namespace
         :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`.

      Then, run the following
      command in your terminal to access the ``search`` endpoint to
      perform the semantic search:

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: bash

            curl -X GET http://localhost:8080/tutorial/search

         .. output:: 
            :language: none
            :visible: false

            [{"content":"For a natural lawn, selection of the right grass type
            suitable for your climate is crucial. Balanced watering, generally 1 to
            1.5 inches per week, is important; overwatering invites disease. Opt for
            organic fertilizers over synthetic versions to provide necessary
            nutrients and improve soil structure. Regular lawn aeration helps root
            growth and prevents soil compaction. Practice natural pest control and
            consider overseeding to maintain a dense sward, which naturally combats
            weeds and
            pest.","metadata":{"type":"post","author":"B"}},{"content":"Proper tuber
            planting involves site selection, proper timing, and exceptional care.
            Choose spots with well-drained soil and adequate sun exposure. Tubers
            are generally planted in spring, but depending on the plant, timing
            varies. Always plant with the eyes facing upward at a depth two to three
            times the tuber's height. Ensure 4 inch spacing between small tubers,
            expand to 12 inches for large ones. Adequate moisture is needed, yet do
            not overwater. Mulching can help preserve moisture and prevent weed
            growth.","metadata":{"type":"post","author":"A"}}]
