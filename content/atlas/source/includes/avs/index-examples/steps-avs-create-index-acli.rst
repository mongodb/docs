.. procedure:: 
   :style: normal 

   .. step:: Create a ``.json`` file and define the index in the file. 

      Your index definition should resemble the following format:

      .. literalinclude:: /includes/avs/index-management/create-index/create-index-acli.json  
         :language: json
         :copyable: true 
         :linenos:

      .. example:: 

         Create a file named ``vector-index.json``.

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

      .. example:: 

         Copy and paste the following index definition into the
         ``vector-index.json`` file. The following index definition
         indexes the ``plot_embedding`` field as the ``vector`` type
         and the ``genres`` and ``year`` fields as the ``filter`` type
         in an {+avs+} index. The ``plot_embedding`` field contains
         embeddings created using OpenAI's ``text-embedding-ada-002``
         embeddings model. The index definition specifies ``1536``
         vector dimensions and measures similarity using ``dotProduct``
         function. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition indexes only the vector
               embeddings field for performing vector search.
                  
               .. literalinclude:: /includes/avs/index-management/create-index/basic-example-acli.json 
                  :language: json
                  :copyable:
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               This index definition indexes the following fields: 
         
               - A string field (``genres``) and a numeric field (``year``)
                 for pre-filtering the data. 
               - The vector embeddings field (``plot_embedding``) for
                 performing vector search against pre-filtered data.

               .. literalinclude:: /includes/avs/index-management/create-index/filter-example-acli.json 
                  :language: json
                  :copyable:
                  :linenos:

   .. step:: Run the following command to create the index.

      .. code-block:: shell 
         :copyable: true
      
         atlas clusters search indexes create --clusterName [cluster_name] --file [vector_index].json

      In the command, replace the following placeholder values:
      
      - ``cluster_name`` is the name of the |service| {+cluster+} that
        contains the collection for which you want to create the index.
      - ``vector_index`` is the name of the |json| file that contains the
        index definition for the {+avs+} index.

      .. example:: 

         .. code-block:: shell 
            :copyable: true
      
            atlas clusters search indexes create --clusterName [cluster_name] --file vector-index.json

      To learn more about the command syntax and parameters, see the
      {+atlas-cli+} documentation for the :atlascli:`atlas clusters search
      indexes create </command/atlas-clusters-search-indexes-create/>`
      command.
