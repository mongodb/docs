a. Install the MongoDB C Driver.

   For detailed installation instructions, refer
   to the `MongoDB C Driver documentation
   <https://www.mongodb.com/docs/languages/c/c-driver/current/libmongoc/tutorials/obtaining-libraries/>`__.

#. Create a new directory called ``query-quick-start``.

   .. code-block:: bash

      mkdir query-quick-start

#. Enter the directory, and create a ``CMakeLists.txt`` file.

   .. code-block:: bash

      cd query-quick-start
      touch CMakeLists.txt
      
   Copy and paste the following lines into the ``CMakeLists.txt`` file:

   .. include:: /includes/avs/pipeline-stage-examples/cmakelists-txt-c.rst

#. Define the index.

   Create a file named ``vector_index.c``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example.c
      :language: c
      :copyable: true
      :caption: vector_index.c
      :emphasize-lines: 16
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Create and enter the ``/build`` directory:

   .. code-block:: bash

      mkdir build && cd build

#. Prepare the project.

   .. code-block:: bash

      cmake ../

#. Build the app.

   .. code-block:: bash

      cmake --build .

#. Execute the app to create the index.

   .. io-code-block::
      :copyable: true

      .. input::
         :language: bash

         ./atlas-vector-search-quick-start

      .. output:: /includes/avs/index-management/create-index/create-index-output.sh
         :language: sh
         :linenos:
