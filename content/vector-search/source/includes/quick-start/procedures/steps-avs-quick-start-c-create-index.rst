.. procedure:: 
   :style: normal 

   .. step:: Install the MongoDB C Driver.

      For detailed installation instructions, refer
      to the `MongoDB C Driver documentation
      <https://www.mongodb.com/docs/languages/c/c-driver/current/libmongoc/tutorials/obtaining-libraries/>`__.

   .. step:: Create a new directory called ``query-quick-start``.

      .. code-block:: bash

         mkdir query-quick-start

   .. step:: Enter the directory, and create a ``CMakeLists.txt`` file.

      .. code-block:: bash

         cd query-quick-start
         touch CMakeLists.txt
         
      Copy and paste the following lines into the ``CMakeLists.txt`` file:

      .. include:: /includes/pipeline-stage/vectorSearch/code-snippets/c/cmakelists-txt-c.rst

   .. step:: Define the index.

      Create a file named ``vector_index.c``. Copy and paste the following
      code into the file.

      .. literalinclude:: /includes/quick-start/code-snippets/c/basic-example.c
         :language: c
         :copyable: true
         :caption: vector_index.c
         :emphasize-lines: 16
         :linenos:

      .. include:: /includes/quick-start/facts/avs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify the ``<connectionString>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Create and enter the ``/build`` directory:

      .. code-block:: bash

         mkdir build && cd build

   .. step:: Prepare the project.

      .. code-block:: bash

         cmake ../

   .. step:: Build the app.

      .. code-block:: bash

         cmake --build .

   .. step:: Execute the app to create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            ./atlas-vector-search-quick-start

         .. output:: /includes/quick-start/code-snippets/shell/create-index-output.sh
            :language: sh
            :linenos:
