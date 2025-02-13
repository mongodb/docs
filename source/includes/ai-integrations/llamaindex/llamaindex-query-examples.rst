.. tabs::

   .. tab:: Basic Semantic Search
      :tabid: semantic-search

      This example performs a basic semantic search for the
      string ``MongoDB Atlas security`` and returns a 
      list of documents ranked by :ref:`relevance score <scoring-ref>`. 
      It also specifies the following:

      - {+avs+} as a `retriever 
        <https://docs.llamaindex.ai/en/stable/module_guides/querying/retriever/>`__
        to perform semantic search.
      - The  ``similarity_top_k`` parameter to return 
        only the three most relevant documents.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            retriever = vector_store_index.as_retriever(similarity_top_k=3)
            nodes = retriever.retrieve("MongoDB Atlas security")  

            for node in nodes:
                print(node)
         
         .. output:: 
            :language: JSON

            Node ID: 8a743e7c-4d28-4f7c-9c64-1033523a767d
            Text: MongoD B Atlas provides: •Security f eatures to protect access
            to your data •Built in replication for always-on availability ,
            tolerating complete data center failure •Backups and point in time
            recovery to protect against data corruption •Fine-grained monitoring
            to let you know when to scale.
            Score:  0.935

            Node ID: 5904c51b-ac96-4a2f-818e-35c85af4b624
            Text: MongoD B Atlas f eatures e xtensive capabilities to def end,
            detect, and control access to MongoD B, off ering among the most
            complete security controls of any modern database: •User Rights
            Management.User Rights Management. Control access to sensitive data
            using industry standard mec hanisms for authentication and
            authorization at the database ...
            Score:  0.932

            Node ID: cb71a615-2f69-47b3-87e7-3373ff476fd6
            Text: Protect data in motion over the network and at rest in
            persistent storage To ensure a secure system right out of the b ox,
            authentication and I P Address whitelisting are automatically enabled.
            Review the security section of the MongoD B Atlas documentation to
            learn more ab out eac h of the security features discussed below .
            Score:  0.930

   .. tab:: Semantic Search with Filtering
      :tabid: semantic-search-filter

      You can also pre-filter your data by using a match expression
      that compares the indexed field with boolean, number, or 
      string values. You must index any metadata fields that you want to 
      filter by as the ``filter`` type. To learn more, see 
      :ref:`avs-types-vector-search`.

      .. note:: 

         You specified the ``metadata.page_label`` field as a filter 
         when you :ref:`created the index <llamaindex-create-index>`
         for this tutorial.

      This example performs a semantic search for the
      string ``MongoDB Atlas security`` and returns a 
      list of documents ranked by :ref:`relevance score <scoring-ref>`. 
      It also specifies the following:

      - {+avs+} as a `retriever 
        <https://docs.llamaindex.ai/en/stable/module_guides/querying/retriever/>`__
        to perform semantic search.
      - The  ``similarity_top_k`` parameter to return 
        only the three most relevant documents.
      - A filter on the ``metadata.page_label`` field 
        so that {+avs+} searches for documents appearing on page 17 only.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

            # Specify metadata filters
            metadata_filters = MetadataFilters(
               filters=[ExactMatchFilter(key="metadata.page_label", value="17")]
            )
            retriever = vector_store_index.as_retriever(similarity_top_k=3, filters=metadata_filters)
            nodes = retriever.retrieve("MongoDB Atlas security")

            for node in nodes:
                print(node)

         .. output:: 
            :language: JSON

            Node ID: bd82d311-e70b-4d00-aab9-56b84ad16e3d
            Text: Integrating MongoD B with External Monitoring S olutions The
            MongoD B Atlas AP I provides integration with e xternal management
            frameworks through programmatic access to automation f eatures and
            alerts. APM Integration Many operations teams use Application P
            erformance Monitoring (AP M) platforms to gain global oversight of 15
            Score:  0.911

            Node ID: c24f0bdd-d84e-4214-aceb-aa2cbd362819
            Text: If the MongoD B cluster e xperiences a failure, the most
            recentbackup is only moments behind, minimizing e xposure to data
            loss. In additional, MongoD B Atlas includes queryable bac kups, which
            allows you to perform queries against e xisting snapshots to more
            easily restore data at the document/ object level. Queryable bac kups
            allow you to acco...
            Score:  0.911

            Node ID: 642f08a3-f9b7-427b-81ce-00c1574eea01
            Text: In the vast majority of cases, MongoD B Atlas bac kups delivers
            the simplest, saf est, and most efficient bac kup solution. mongodump
            is useful when data needs to be exported to another system, when a
            local bac kup is needed, or when just a subset of the data needs to be
            backed up.
            Score:  0.909
