.. procedure:: 
   :style: normal 

   .. step:: Create a file called ``create-index.go`` and define the index in the file.

      .. literalinclude:: /includes/avs/index-management/create-index/create-auto-embed-index.go
         :language: go
         :copyable: true 
         :linenos:

      .. note:: Programmatic Index Creation
      
         The MongoDB Go driver supports programmatic {+avs+} index management starting
         in v1.16.0, but the preceding code shows the syntax for the v2.x driver.

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<connection-string>``
           - Cluster connection string. To learn more, see :ref:`connect-via-driver`.

         * - ``<database-name>``
           - Database that contains the collection for which you want to create the index.

         * - ``<collection-name>``
           - Collection for which you want to create the index.

         * - ``<index-name>``
           - Name of your index. If you omit the index name, defaults to ``vector_index``.

         * - ``<embedding-model>``
           - Name of the |voyage| embedding model to use for generating embeddings.

         * - ``<field-to-index>``
           - Vector and filter fields to index.

      .. example::

         Copy and paste the following into the ``create-index.go`` file
         and replace the ``<connection-string>`` placeholder value. The
         following index definition indexes the ``fullplot`` field
         as the ``autoEmbed`` type and the ``genres`` and ``year`` fields
         as the ``filter`` type in a {+avs+} index. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               The following index definition enables automated embedding vector search
               for the ``fullplot`` text field. 

               .. literalinclude:: /includes/avs/index-management/create-index/basic-auto-embed-example.go
                  :language: go
                  :copyable: true
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               This index definition indexes the following fields: 
      
               - String field (``genres``) and numeric field (``year``)
                 for pre-filtering the data
               - Text field (``fullplot``) for automated embedding 
                 vector search

               .. literalinclude:: /includes/avs/index-management/create-index/filter-auto-embed-example.go
                  :language: go
                  :copyable: true
                  :linenos:

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         go run create-index.go
