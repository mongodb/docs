.. procedure:: 
   :style: normal 

   .. step:: Create a ``.py`` file and define the index in the file.

      .. tabs:: 

         .. tab:: 
            :tabid: Single Index

            .. literalinclude:: /includes/avs/index-management/create-index/create_auto_embed_index.py  
               :language: python
               :copyable: true 
               :linenos: 

            To learn more, see the `create_search_index() <https://pymongo.readthedocs.io/en/4.7.1/api/pymongo/collection.html#pymongo.collection.Collection.create_search_index>`__
            method. 

         .. tab:: 
            :tabid: Multiple Indexes

            .. literalinclude:: /includes/avs/index-management/create-index/create_auto_embed_indexes.py  
               :language: python
               :copyable: true 
               :linenos: 

            To learn more, see the `create_search_indexes() <https://pymongo.readthedocs.io/en/4.7.1/api/pymongo/collection.html#pymongo.collection.Collection.create_search_indexes>`__ 
            method.

      .. example:: 

         Create a file named ``vector-index.py``.

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want to create the index.

         * - ``<collectionName>``
           - Collection for which you want to create the index.

         * - ``<indexName>``
           - Name for your index.

         * - ``<embeddingModel>``
           - |voyage| embedding model you want {+avs+} to use for automatically 
             generating embeddings.

         * - ``<fieldToIndex>``
           - Name of field to index.

      .. example:: 

         Copy and paste the following into the ``vector-index.py`` and
         replace the ``<connectionString>`` placeholder value. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               .. include:: /includes/avs/tutorial/auto-embed-basic-example-description.rst

               .. literalinclude:: /includes/avs/index-management/create-index/basic-auto-embed-example.py
                  :language: python
                  :copyable: true 
                  :linenos:
                  :caption: vector-index.py

            .. tab:: Filter Example 
               :tabid: filter 

               .. include:: /includes/avs/tutorial/auto-embed-filter-example-description.rst

               .. literalinclude:: /includes/avs/index-management/create-index/filter-auto-embed-example.py
                  :language: python
                  :copyable: true 
                  :linenos:
                  :caption: vector-index.py

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         python <file-name>.py

      .. example:: 

         .. code-block:: shell

            python vector-index.py
