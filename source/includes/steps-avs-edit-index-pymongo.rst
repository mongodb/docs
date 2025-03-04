.. procedure:: 
   :style: normal 

   .. step:: Create the ``.py`` file and define the index changes in the file.

      ..
         NOTE: If you edit this Python file, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/edit-indexes.ipynb

      .. literalinclude:: /includes/avs-examples/index-management/update-index/edit_index.py  
         :language: python
         :copyable: true 
         :linenos: 

      To learn more, see the `update_search_index() <https://pymongo.readthedocs.io/en/4.7.1/api/pymongo/collection.html#pymongo.collection.Collection.update_search_index>`__
      method. 

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - |service| connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want to create the index.

         * - ``<collectionName>``
           - Collection for which you want to create the index.

         * - ``<indexName>``
           - Bame of your index. If you omit the index name, |fts| names the index ``vector_index``.

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

         * - ``<fieldToIndex>``
           - Vector and filter fields to index.

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         python <file-name>.py
