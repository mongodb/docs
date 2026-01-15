.. procedure:: 
   :style: normal 

   .. step:: Connect to the cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. example:: 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell
              
               use sample_mflix 

            .. output:: 
              :language: shell 

              switched to db sample_mflix

   .. step:: Create the index using the ``db.collection.createSearchIndex()`` method. 

      a. Define the index in the ``db.collection.createSearchIndex()`` method
      
         The :method:`db.collection.createSearchIndex()` method has the
         following syntax:   

         .. code-block:: shell 
            :copyable: true 
            :linenos: 

            db.<collectionName>.createSearchIndex(
            "<index-name>",
            "vectorSearch", //index type
            {
               fields: [
                  {
                  "type": "autoEmbed",
                  "modality": "text",
                  "path": "<field-to-index>",
                  "model": "<embedding-model>",
                  },
                  {
                  "type": "filter",
                  "path": "<field-to-index>"
                  },
                  ...
               ]
            });

      #. Replace the following placeholder values in your index definition:

         .. list-table:: 
            :widths: 20 80 
            :stub-columns: 1

            * - ``<collectionName>``
              - Name of the collection. 

            * - ``<index-name>``
              - Name of the index.      

            * - ``<field-to-index>``
              - Name of the field to index.

            * - ``<embedding-model>``
              - |voyage| embedding model to use for generating embeddings.

      #. Run the ``db.collection.createSearchIndex()`` method.

      .. example:: 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               .. include:: /includes/avs/tutorial/auto-embed-basic-example-description.rst

               .. literalinclude:: /includes/avs/index-management/create-index/basic-auto-embed-example.sh
                  :language: shell
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: filter
      
               .. include:: /includes/avs/tutorial/auto-embed-filter-example-description.rst

               .. literalinclude:: /includes/avs/index-management/create-index/filter-auto-embed-example.sh
                  :language: shell
                  :copyable: true 
                  :linenos: