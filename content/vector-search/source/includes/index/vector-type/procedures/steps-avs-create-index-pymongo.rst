.. procedure:: 
   :style: normal 

   .. step:: Create a ``.py`` file and define the index in the file.

      .. tabs:: 

         .. tab:: 
            :tabid: Single Index

            .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/python/create_index.py
               :language: python
               :copyable: true 
               :linenos: 

            To learn more, see the `create_search_index() <https://pymongo.readthedocs.io/en/4.7.1/api/pymongo/collection.html#pymongo.collection.Collection.create_search_index>`__
            method. 

         .. tab:: 
            :tabid: Multiple Indexes

            .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/python/create-indexes.py
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
           - Name of your index. If you omit the index name, 
             defaults to ``vector_index``.

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

      .. example:: 

         Copy and paste the following into the ``vector-index.py`` and
         replace the ``<connectionString>`` placeholder value. The following index
         definition indexes the ``plot_embedding_voyage_3_large`` field as the
         ``vector`` type and the ``genres`` and ``year`` fields as the
         ``filter`` type in a {+avs+} index. The ``plot_embedding_voyage_3_large``
         field contains embeddings created using |voyage|'s
         ``voyage-3-large`` embedding model. The index
         definition specifies ``2048`` vector dimensions and measures
         similarity using ``dotProduct`` function. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               .. cta-banner::
                  :url: https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-basic.ipynb
                  :icon: Code

                  Work with a runnable version of this example as a :github:`Python notebook <mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-basic.ipynb>`.

               The following index definition indexes only the vector
               embeddings field (``plot_embedding_voyage_3_large``) using 
               the default indexing method, |hnsw|, for performing
               vector search.

               .. NOTE: If you edit this Python file, also update the Jupyter Notebook at https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-basic.ipynb

               .. literalinclude:: /includes/quick-start/code-snippets/python/basic-example.py
                  :language: python
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               .. cta-banner::
                  :url: https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-filter.ipynb
                  :icon: Code

                  Work with a runnable version of this example as a :github:`Python notebook <mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-filter.ipynb>`.

               This index definition indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                 using the |hnsw| indexing method for
                 performing vector search against pre-filtered data.

               .. NOTE: If you edit this Python file, also update the Jupyter Notebook at https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-filter.ipynb

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/python/filter-example.py
                  :language: python
                  :copyable: true 
                  :linenos:

            .. tab:: Flat Example 
               :tabid: flat

               .. cta-banner::
                  :url: https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-filter.ipynb
                  :icon: Code

                  Work with a runnable version of this example as a :github:`Python notebook <mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-filter.ipynb>`.

               This index definition indexes the following fields: 
      
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding_voyage_3_large``) 
                 using the ``flat`` indexing method for
                 performing vector search against pre-filtered data.

               .. NOTE: If you edit this Python file, also update the Jupyter Notebook at https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/create-indexes-filter.ipynb

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/python/flat-example.py
                  :language: python
                  :copyable: true 
                  :linenos:

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         python <file-name>.py

      .. example:: 

         .. code-block:: shell

            python vector-index.py
