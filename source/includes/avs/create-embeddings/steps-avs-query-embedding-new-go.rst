.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      you must create an {+avs+} index on your
      collection.

      Complete the following steps to create an index on the
      ``sample_db.embeddings`` collection that specifies the 
      ``embedding`` field as the :ref:`vector
      <avs-types-vector-search>` type 
      and the similarity measure as ``dotProduct``.

      a. Create a file named named ``create-index.go`` and paste the following code.

         .. literalinclude:: /includes/avs/tutorial/create-index-new-data.go
            :language: go
            :copyable:
            :caption: create-index.go

      #. Replace the ``<dimensions>`` placeholder value with ``1024`` if you
         used the open-source model and ``1536`` if you used the model from
         OpenAI.
    
      #. Save the file, then run the following command:

         .. io-code-block::

            .. input::
               
               go run create-index.go

            .. output::

               2024/10/09 17:38:51 Creating the index.
               2024/10/09 17:38:52 Polling to confirm successful index creation.
               2024/10/09 17:39:22 Name of Index Created: vector_index

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
       
               .. literalinclude:: /includes/avs/tutorial/vector-query-new-open-source.go
                  :language: go
                  :copyable:
                  :caption: vector-query.go

            .. tab:: OpenAI
               :tabid: openai

               .. literalinclude:: /includes/avs/tutorial/vector-query-new-open-ai.go
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

                  .. output:: /includes/avs/tutorial/output-new-open-source-go.sh
                     :language: shell

            .. tab:: OpenAI
               :tabid: openai

               .. io-code-block:: 
                  :copyable: true 
                  
                  .. input:: 

                     go run vector-query.go

                  .. output:: /includes/avs/tutorial/output-new-openai-go.sh
                     :language: shell
