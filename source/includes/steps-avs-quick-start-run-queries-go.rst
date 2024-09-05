.. procedure::
   :style: normal

   .. step:: Add the MongoDB Go Driver to your project.

      Run the following commands:

      a. Initialize your Go module:

         .. code-block:: sh
            :copyable: true

            mkdir go-vector-quickstart && cd go-vector-quickstart
            go mod init go-vector-quickstart

      b. Add MongoDB Go as a dependency:

         .. code-block:: sh
            :copyable: true

            go get go.mongodb.org/mongo-driver/mongo

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <golang-quickstart>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlas_vector_search_quick_start.go`` .

      #. Copy and paste the following sample query into the
         ``atlas_vector_search_quick_start.go`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.go
            :language: go
            :linenos:

      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers.rst

   .. step:: Run your query.

      Run the following command to query your collection:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            go run atlas_vector_search_quick_start.go

         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-nodejs-output.js
            :language: js
            :linenos:
