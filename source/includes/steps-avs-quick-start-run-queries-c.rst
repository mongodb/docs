.. procedure:: 
  :style: normal

  .. step:: Install the MongoDB C Driver.

     For detailed installation instructions, refer to the `MongoDB C Driver documentation
     <https://www.mongodb.com/docs/languages/c/c-driver/current/libmongoc/tutorials/obtaining-libraries/installing/#std-label-installing>`__.

  .. step:: Construct your vector search query.

    .. include:: /includes/fact-avs-quick-start-intro.rst

    a. Create a file named ``atlas-vector-search-quick-start.c`` and 
       copy and paste the following sample query into the file:

       .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.c
          :language: c
          :linenos: 

       .. include:: /includes/fact-avs-quick-start-intro-II.rst

  .. step:: Specify the ``<connection-string>``.

    .. include:: /includes/steps-connection-string-drivers.rst

  .. step:: Configure CMake for your project.

    a. In your project directory, create a file named 
       ``CMakeLists.txt`` and copy the following code into the file.
 
       .. include:: /includes/avs-examples/pipeline-stage-examples/cmakelists-txt-c.rst

    #. Create a directory in your project folder called ``build``.

       .. code-block:: bash

          mkdir build

    #. Enter the ``build`` directory and run the ``cmake`` command to create your Makefile.

       .. code-block:: bash

          cd build
          cmake ../

  .. step:: Run your query.
    
    From your ``build`` directory, compile and run the ``atlas-vector-search-quick-start.c`` file.
      
    .. io-code-block::
       :copyable: true

       .. input::
          :language: shell

          cmake --build . 
          ./atlas-vector-search-quick-start

       .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-c-output.js
            :language: js
            :linenos:
