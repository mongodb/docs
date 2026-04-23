.. procedure:: 
   :style: normal 

   .. step:: Create a ``.py`` file and use the ``list_search_indexes()`` method to retrieve the indexes for the collection.

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Your cluster connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - The name of the database that contains the collection.

         * - ``<collectionName>``
           - The name of the collection.

   .. step:: Run the following command to retrieve the indexes.

      .. code-block:: shell

         python <file-name>.py
