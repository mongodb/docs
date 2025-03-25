.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      you must create an {+avs+} index on your
      collection.

      Complete the following steps to create an index on the
      ``sample_airbnb.listingsAndReviews`` collection that specifies the 
      ``embeddings`` field as the :ref:`vector
      <avs-types-vector-search>` type 
      and the similarity measure as ``euclidean``.

      a. Create a file named named ``create-index.go`` and paste the following code.

         .. literalinclude:: /includes/avs/tutorial/create-index-existing-data.go
            :language: go
            :copyable:
            :caption: create-index.go

      #. Replace the ``<dimensions>`` placeholder value with ``1024`` if you
         used the open-source model and ``1536`` if you used the model from
         OpenAI.
    
      #. Save the file, then run the following command:

         .. io-code-block::
            :copyable: true
            
            .. input::
            
               go run create-index.go

            .. output::

               2024/10/10 10:03:12 Creating the index.
               2024/10/10 10:03:13 Polling to confirm successful index creation.
               2024/10/10 10:03:44 Name of Index Created: vector_index

      .. note::
         
         .. include:: /includes/fact-index-build-initial-sync.rst
            
      To learn more, see :ref:`avs-create-index`.

   .. step:: Create embeddings for vector search queries and run a query. 
      
      a. Create a file named named ``vector-query.go`` and paste the following code.

         .. include:: /includes/avs/tutorial/avs-run-query-description.rst

         .. tabs::
            :hidden:

            .. tab:: Open-Source
               :tabid: open-source
         
               .. literalinclude:: /includes/avs/tutorial/vector-query-existing-open-source.go
                  :language: go
                  :copyable:
                  :caption: vector-query.go

            .. tab:: OpenAI
               :tabid: openai

               .. literalinclude:: /includes/avs/tutorial/vector-query-existing-openai.go
                  :language: go
                  :copyable:
                  :caption: vector-query.go

      #. Save the file, then run the following command:
         
         .. tabs:: 
            :hidden:

            .. tab:: Open-Source
               :tabid: open-source
       
               .. io-code-block:: 
                  :copyable: true 
                  
                  .. input:: 

                     go run vector-query.go

                  .. output:: /includes/avs/tutorial/output-existing-open-source-go.sh
                     :language: shell               

            .. tab:: OpenAI
               :tabid: openai

               .. io-code-block:: 
                  :copyable: true 
                  
                  .. input:: 

                     go run vector-query.go

                  .. output:: /includes/avs/tutorial/output-existing-openai-go.sh
                     :language: shell
