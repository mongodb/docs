.. procedure:: 
  :style: normal

  .. step:: Construct your vector search query.

    .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst

    a. Create a file named ``atlas-vector-search-quick-start.c`` and 
       copy and paste the following sample query into the file:

       .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query.c
          :language: c
          :caption: atlas-vector-search-quick-start.c
          :emphasize-lines: 24
          :linenos: 

       .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst

  .. step:: Specify the ``<connection-string>``.

    .. include:: /includes/steps-connection-string-drivers-hidden.rst

  .. step:: Update CMake for your project.

    a. Replace the ``vector_index.c`` file name in your ``CMakeLists.txt``
       file with your new ``atlas-vector-search-quick-start.c`` filename.

    #. Navigate to the ``/build`` directory, and prepare the project.

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

       .. output:: /includes/avs/pipeline-stage-examples/basic-query-c-output.js
            :language: js
            :linenos:
