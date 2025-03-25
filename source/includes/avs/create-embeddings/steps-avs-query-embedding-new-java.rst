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

      a. Create a file named ``CreateIndex.java`` and paste the following code:

         .. literalinclude:: /includes/avs/tutorial/CreateIndexNewData.java
            :language: java
            :caption: CreateIndex.java
            :emphasize-lines: 39

      #. Replace the ``<dimensions>`` placeholder value with the appropriate
         variable for the model you used:

         - ``dimensionsHuggingFaceModel``: ``1024`` dimensions
           ("mixedbread-ai/mxbai-embed-large-v1" model)
         - ``dimensionsOpenAiModel``: ``1536`` dimensions
           ("text-embedding-3-small" model)
    
         .. note::

            The number of dimensions is determined by the model used to generate
            the embeddings. If you adapt this code to use a different model,
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

         .. literalinclude:: /includes/avs/tutorial/VectorQueryNew.java
            :language: java
            :caption: VectorQuery.java

      #. Save and run the file. The output resembles one of the following,
         depending on the model you used:

         .. tabs:: 
            :hidden:

            .. tab:: Open-Source
               :tabid: open-source

               .. literalinclude:: /includes/avs/tutorial/output-new-open-source-java.sh
                  :language: shell

            .. tab:: OpenAI
               :tabid: openai

               .. literalinclude:: /includes/avs/tutorial/output-new-openai-java.sh
                  :language: shell
