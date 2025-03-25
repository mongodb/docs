.. procedure:: 
   :style: normal 

   .. step:: Create a ``.json`` file and define the changes to the index in the file. 

      Your index definition should resemble the following format:

      .. literalinclude:: /includes/avs/index-management/update-index/edit-index-acli.json  
         :language: json
         :copyable: true 
         :linenos:

   .. step:: Replace the following placeholder values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<name-of-database>``
           - Database that contains the collection for which you want to create the index.

         * - ``<name-of-collection>``
           - Collection for which you want to create the index.

         * - ``<index-name>``
           - Name of your index. If you omit the index name, {+avs+} names the index ``vector_index``.

         * - ``<number-of-dimensions>``
           - Number of vector dimensions that {+avs+} enforces at index-time and query-time.

         * - ``<field-to-index>``
           - Vector and filter fields to index.

   .. step:: Run the following command to update the index.

      .. code-block:: shell 
         :copyable: true
      
         atlas clusters search indexes update <indexId> --clusterName [cluster_name] --file [vector-_index].json

      In the command, replace the following placeholder values:
      
      - ``cluster_name`` - the name of the |service| {+cluster+} that
        contains the collection for which you want to update the index.
      - ``vector_index`` - the name of the |json| file that contains the
        modified index definition for the {+avs+} index.

      To learn more about the command syntax and parameters, see the
      {+atlas-cli+} documentation for the :atlascli:`atlas clusters
      search indexes update </command/atlas-clusters-search-indexes-update/>`
      command.
