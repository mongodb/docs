.. procedure:: 
   :style: normal 

   .. step:: Set the environment variables. 

      a. To set the environment variables for use in the subsequent steps
         in this procedure, copy the following, uncomment the variables,
         replace the placeholder values with your deployment details,
         and then load the environment variables:

         .. literalinclude:: /includes/code-examples/search/08-search-sharded-query-usage/env_variables.sh
            :language: shell
            :copyable: true
            :linenos:

      #. To connect using the TLS-enabled connection strings defined in
         the ``env_variables.sh`` file, ensure that the CA certificate
         referenced by ``MDB_TLS_CA_CONFIGMAP`` is available so that
         the ``mongosh`` client can verify the server's TLS certificate.

   .. step:: Deploy a pod for MongoDB client tools.

      Deploy a pod named ``mongodb-tools`` to run MongoDB client
      tools like ``mongosh`` and ``mongorestore`` from within the |k8s|
      cluster. Running a pod inside the cluster simplifies connectivity
      to MongoDB without needing to expose the database externally.

      The following command deploys a pod that runs a MongoDB server
      image, which ships with ``mongosh``, and mounts the CA
      certificate from the ``MDB_TLS_CA_CONFIGMAP`` ConfigMap at
      ``/tls``. The pod is kept running with a ``sleep infinity``
      command so that you can use ``kubectl exec`` to run MongoDB
      client tools against your actual cluster.

      .. literalinclude:: /includes/code-examples/search/08-search-sharded-query-usage/code_snippets/08_0410_run_mongodb_tools_pod.sh
         :language: shell 
         :copyable: true 
         :linenos: 

   .. step:: Import the sample data and shard the collection. 

      Import the ``sample_mflix`` database, which contains the following
      collections: 

      .. list-table::
         :widths: 30 70
         :header-rows: 1

         * - Collection Name
           - Description

         * - ``comments``
           - Contains comments associated with specific movies.

         * - ``embedded_movies``
           - Contains details on movies in the ``Western``, 
             ``Action``, and ``Fantasy`` genres from the ``movies``
             collection with the following additional fields: 

             - ``plot_embedding_voyage_3_large`` - Contains 2048d embeddings
               created from the ``plot`` field using |voyage|'s
               ``voyage-3-large`` embedding model and converted to
               ``binData`` for efficient storage and retrieval.  

             - ``plot_embedding`` - Contains 1536d embeddings created from the
               ``plot`` field using OpenAI's ``text-embedding-ada-002``
               embedding model and converted to ``binData`` for efficient
               storage and retrieval. 

         * - ``movies``
           - Contains movie information, including release year, director,
             and reviews.

         * - ``sessions``
           - Metadata field. Contains users'
             `JSON Web Tokens <https://en.wikipedia.org/wiki/JSON_Web_Token>`__.

         * - ``theaters``
           - Contains locations of movie theaters.

         * - ``users``
           - Contains user information.

      The following command uses the admin connection string to:
      
      a. Download the ``sample_mflix`` archive.
      #. Load the collection using ``mongorestore``.
      #. Enable sharding on the ``sample_mflix`` database.
      #. Create a hashed index on ``movies._id``.
      #. Shard the ``movies`` collection.

      .. literalinclude:: /includes/code-examples/search/08-search-sharded-query-usage/code_snippets/08_0420_import_sample_data.sh
         :language: shell 
         :copyable: true 
         :linenos: 

   .. step:: Create an index. 

      You can create a |text-search| or a |vector-search| index. You
      must create a |text-search| index to run :pipeline:`$search` and
      :pipeline:`$searchMeta` queries, and |vector-search| index to run
      :pipeline:`$vectorSearch` queries. 
      
      - |text-search| provides flexible index definitions that support
        dynamic and static field mappings, various analyzers (standard,
        language-specific, custom), and features like synonyms and
        faceted search. To learn more, see :ref:`fts-define-index`.
      - |vector-search| provides simple index definition that supports
        querying vector embeddings in your data based on semantic 
        similarity by using :abbr:`ANN (Approximate Nearest Neighbor)` 
        and :abbr:`ENN (Exact Nearest Neighbor)` search algorithm. To 
        learn more, see :ref:`Define Vector Search Index 
        <avs-types-vector-search>`. 

      a. Copy, paste, and run the following command in your terminal to
         create a |text-search| or a |vector-search| index. 
        
         The command uses ``kubectl exec`` to run ``mongosh`` in the
         ``mongodb-tools`` pod using the user connection string and
         calls ``createSearchIndex()`` to create the index. |k8s-op-short|
         creates the indexes through ``mongos`` and automatically
         distributes them to each shard's ``mongot`` instance through
         the `Envoy proxy <https://www.envoyproxy.io/>`__, an L7 load 
         balancer that the operator manages automatically.
      
         .. collapsible:: 
            :heading: Search Index
            :expanded: false

            The following command creates a |text-search| index named
            ``default`` with dynamic mappings on the ``movies``
            collection. :ref:`Dynamic mapping <fts-dynamic-mappings>` 
            automatically indexes all dynamically indexable field types.

            .. literalinclude:: /includes/code-examples/search/08-search-sharded-query-usage/code_snippets/08_0430_create_search_index.sh
               :language: shell 
               :copyable: true 
               :linenos:

         .. collapsible:: 
            :heading: Vector Search Index
            :expanded: false
      
            The following command creates a |vector-search| index named
            ``vector_index`` on the ``plot_embedding_voyage_3_large``
            field with ``2048`` vector dimensions in the ``embedded_movies`` 
            collection for running :abbr:`ANN (Approximate Nearest Neighbor)` 
            queries. 

            .. literalinclude:: /includes/code-examples/search/08-search-sharded-query-usage/code_snippets/08_0435_create_vector_search_index.sh
               :language: shell 
               :copyable: true 
               :linenos:

      #. Verify that the index creation succeeded. 

         Run the following command to retrieve the list of indexes for the collection.

         .. collapsible:: 
            :heading: Search Index 
            :expanded: false

            .. literalinclude:: /includes/code-examples/search/03-search-query-usage/code_snippets/03_0444_list_search_indexes.sh
               :language: shell 
               :copyable: true 
               :linenos:

         .. collapsible:: 
            :heading: Vector Search Index 
            :expanded: false

            .. literalinclude:: /includes/code-examples/search/03-search-query-usage/code_snippets/03_0445_list_vector_search_indexes.sh
               :language: shell 
               :copyable: true 
               :linenos:

   .. step:: Query the data using the index. 

      After the index creation is successful, you can run |text-search|
      or |vector-search| queries using the index. You can also combine
      |text-search| with |vector-search|. To learn more about running
      |text-search| queries, see :ref:`fts-define-query`. To learn more
      about |vector-search| queries, see :ref:`return-vector-search-results`. 

      The following script defines the aggregation pipeline query
      criteria and uses the ``kubectl exec`` command to load ``mongosh``
      to execute the query. 

      .. collapsible:: 
         :heading: Search Query
         :expanded: false

         The following query searches the ``plot`` field for movie
         plots that contain the term ``drama adventure``. It excludes movies
         in the ``comedy`` and ``romance`` genres. 

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: /includes/code-examples/search/08-search-sharded-query-usage/code_snippets/08_0450_execute_search_query.sh
               :language: shell 
               :linenos:

            .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/08_0450_execute_search_query.out
               :language: shell
               :linenos:

      .. collapsible:: 
         :heading: Vector Search Query
         :expanded: false

         The following query searches the
         ``plot_embedding_voyage_3_large`` field using 2048 dimension 
         vector embeddings for the string ``time travel``, generated
         using Voyage AI's ``voyage-3-large`` model. 

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: /includes/code-examples/search/08-search-sharded-query-usage/code_snippets/08_0455_execute_vector_search_query.sh
               :language: shell 
               :linenos:

            .. output:: /includes/code-examples/outputs/test_kind_search_external_sharded_managed_lb_snippets/08_0455_execute_vector_search_query.out
               :language: shell
               :linenos:
