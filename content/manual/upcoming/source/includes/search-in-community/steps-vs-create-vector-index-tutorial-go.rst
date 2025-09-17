.. procedure::
   :style: normal

   .. step:: Initialize your Go module.

      .. code-block:: sh
         :copyable: true

         mkdir go-vector-quickstart && cd go-vector-quickstart
         go mod init go-vector-quickstart

   .. step:: Add the Go Driver as a dependency in your project.

      .. code-block:: sh

         go get go.mongodb.org/mongo-driver/v2/mongo

      For more detailed installation instructions, see the
      `MongoDB Go Driver documentation <https://www.mongodb.com/docs/drivers/go/current/>`__.

   .. step:: Define your index in a new file.

      This example uses a file named ``vector-index.go`` with the following
      index definition:

      .. literalinclude:: /includes/search-in-community/basic-example.go
         :language: go
         :copyable: true
         :caption: vector-index.go
         :emphasize-lines: 18
         :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Create the search index.

      The following code creates the vector index specified in
      ``vector-index.go``. 

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            go run vector-index.go

         .. output::
            :language: console

            2025/03/11 10:46:44 New search index named vector_index is building.
            2025/03/11 10:46:44 Polling to check if the index is ready. This may take up to a minute.
            2025/03/11 10:47:09 vector_index is ready for querying.

   .. step:: Define your vector search query in a new file.

      This example uses a file named ``vector_search_quick_start.go`` with the
      following sample query: 

      .. literalinclude:: /includes/search-in-community/basic-query.go
         :language: go
         :linenos:
         :emphasize-lines: 18

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      Run your query file to search your collection. 

      For example, run the following command to query with the
      ``vector_search_quick_start.go`` file.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            go run vector_search_quick_start.go

         .. output:: /includes/search-in-community/basic-query-nodejs-output.js
            :language: js
            :linenos:

