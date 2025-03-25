.. procedure:: 
   :style: normal 

   .. step:: Gather the following information.

      .. list-table:: 
         :stub-columns: 1 

         * - ``clusterName``
           - The name of the |service| {+cluster+}.

         * - ``db``
           - The name of the database on the |service| {+cluster+} that
             contains your indexed collection.
         
         * - ``collection``
           - The name of the indexed collection in the database.

         * - ``projectId``
           - The unique identifier of the project.

   .. step:: Run the following command to retrieve the indexes for the collection.

      .. code-block:: shell 
         :copyable: true
      
         atlas clusters search indexes list --clusterName [cluster_name] --db <db-name> --collection <collection-name>

      In the command, replace the following placeholder values:
      
      - ``cluster-name`` - the name of the |service| {+cluster+} that
        contains the indexed collection.
      - ``db-name`` - the name of the database that contains the
        collection for which you want to retrieve the indexes.
      - ``collection-name`` - the name of the collection for which you
        want to retrieve the indexes.  

      To learn more about the command syntax and parameters, see the
      {+atlas-cli+} documentation for the :atlascli:`atlas clusters search
      indexes list </command/atlas-clusters-search-indexes-list/>`
      command.
