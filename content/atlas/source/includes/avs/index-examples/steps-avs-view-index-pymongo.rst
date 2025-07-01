.. procedure:: 
   :style: normal 

   .. step:: Create a ``.py`` file and use the ``list_search_indexes()`` method to retrieve the indexes for the collection.

      ..
         NOTE: If you edit this Python file, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/manage-indexes/view-indexes.ipynb

      .. literalinclude:: /includes/avs/index-management/return-index/get-index.py  
         :language: python
         :copyable: true 
         :linenos: 

      To learn more, see the `list_search_indexes() <https://pymongo.readthedocs.io/en/4.7.1/api/pymongo/collection.html#pymongo.collection.Collection.list_search_indexes>`__
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

   .. step:: Run the following command to retrieve the indexes.

      .. code-block:: shell

         python <file-name>.py
