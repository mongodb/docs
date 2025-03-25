.. procedure:: 
   :style: normal 

   .. step:: Create the ``.py`` file and use the ``drop_search_index()`` method to delete the index.

      ..
         NOTE: If you edit this Python file, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/delete-indexes.ipynb

      .. literalinclude:: /includes/avs/index-management/delete-index/delete_index.py  
         :language: python
         :copyable: true 
         :linenos: 

      To learn more, see the `drop_search_index() <https://pymongo.readthedocs.io/en/4.7.1/api/pymongo/collection.html#pymongo.collection.Collection.drop_search_index>`__
      method. 

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - The name of the database that contains the collection.

         * - ``<collectionName>``
           - The name of the collection.

         * - ``<indexName>``
           - The name of the index to delete.

   .. step:: Run the following command to delete the index.

      .. code-block:: shell

         python <file-name>.py
