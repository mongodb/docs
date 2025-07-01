.. procedure:: 
   :style: normal 

   .. step:: Gather the following information.

      .. list-table:: 
         :stub-columns: 1 

         * - ``<indexId>``
           - The unique identifier of the index to delete.

         * - ``<clusterName>``
           - The name of the |service| {+cluster+}.

         * - ``<projectId>``
           - The unique identifier of the project.

   .. step:: Run the command to delete the index.

      .. code-block:: shell 
         :copyable: true
      
         atlas clusters search indexes delete <indexId> [options]

      In the command, replace the ``indexId`` placeholder value with the
      unique identifier of the index to delete. 

      To learn more about the command syntax and parameters, see the
      {+atlas-cli+} documentation for the :atlascli:`atlas clusters search
      indexes delete </command/atlas-clusters-search-indexes-delete/>`
      command.
