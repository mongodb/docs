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

      a. Create a file named ``CreateIndex.java`` and paste the following code:

         .. literalinclude:: /includes/avs/tutorial/CreateIndexExistingData.java
            :language: java
            :caption: CreateIndex.java
            :emphasize-lines: 40

      #. Replace the ``<dimensions>`` placeholder value with the appropriate
         variable for the model you used:

         - ``dimensionsHuggingFaceModel``: ``1024`` dimensions (open-source)
         - ``dimensionsOpenAiModel``: ``1536`` dimensions
    
         .. note::

            The number of dimensions is determined by the model used to generate
            the embeddings. If you are using a different model,
            ensure that you pass the correct value to ``numDimensions``.
            See also the :ref:`choose-embedding-model` section.

      #. Save and run the file. The output resembles:

         .. literalinclude:: /includes/avs/tutorial/output-vector-index-creation.sh
            :language: shell

      .. note::
         
         .. include:: /includes/fact-index-build-initial-sync.rst
            
      To learn more, see :ref:`avs-create-index`.

   .. step:: Create embeddings for vector search queries and run a query. 
      
      a. Create a file named named ``VectorQuery.java`` and paste the following code.

         .. include:: /includes/avs/tutorial/avs-run-query-description.rst

         .. literalinclude:: /includes/avs/tutorial/VectorQueryExisting.java
            :language: java
            :caption: VectorQuery.java

      #. Save and run the file. The output resembles one of the following,
         depending on the model you used:

         .. tabs:: 
            :hidden:

            .. tab:: Open-Source
               :tabid: open-source
       
               .. literalinclude:: /includes/avs/tutorial/output-existing-open-source-java.sh
                  :language: shell

            .. tab:: OpenAI
               :tabid: openai

               .. literalinclude:: /includes/avs/tutorial/output-existing-openai-java.sh
                  :language: shell
