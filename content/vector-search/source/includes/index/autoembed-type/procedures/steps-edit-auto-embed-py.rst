.. procedure:: 
   :style: normal 

   .. step:: Create the ``.py`` file and define the index changes in the file.

      .. literalinclude:: /includes/index/autoembed-type/code-snippets/update-index/edit-auto-embed-index.py
         :language: python
         :copyable: true 
         :linenos:

   .. step:: Replace the following values and add or modify other settings in the index definition as needed, then save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection.

         * - ``<collectionName>``
           - Name of the collection for which you want to update the index.

         * - ``<indexName>``
           - Name of your index that you want to update. 

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         python <file-name>.py
