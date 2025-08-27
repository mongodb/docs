.. procedure::
   :style: normal

   .. step:: Set up the C project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``search-with-unionwith`` for this project: 

      .. code-block:: shell
         :copyable: true

         mkdir search-with-unionwith
         cd search-with-unionwith

      Add the C driver to your project by following the instructions in the 
      `MongoDB C Driver documentation <https://www.mongodb.com/docs/languages/c/c-driver/current/get-started/>`__.

   .. step:: Define the index.

      Create a ``create_indexes.c`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/search-with-unionwith/create-index-example.c
         :caption: create_indexes.c
         :language: c
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Set up a CMake application

      To configure your application, create a ``CMakeLists.txt`` file in
      your project directory. Then, add the following code to the file:

      .. literalinclude:: /includes/fts/search-with-unionwith/initialize-cmake-c.rst
         :caption: CMakeLists.txt
         :language: txt
         :linenos:
         :copyable:

      The preceding code performs the following actions:
      
      - Configures a C project.
      - Creates a ``index.out`` executable for your application.
      - Finds and requires the C driver. Replace the ``<version>``
        placeholder with your C driver version, such as ``2.0.0``.
      - Links the program to the ``libmongoc`` library.

      .. note::

         In the sample ``CMakeLists.txt`` file, the ``mongoc::mongoc`` target
         points to either the static library or the shared library.
         The library type depends on which one is available and
         whichever type the user specifies in the ``MONGOC_DEFAULT_IMPORTED_LIBRARY_TYPE``
         CMake configuration setting. If you don't set this value and
         both library types are available, ``mongoc::mongoc`` uses
         the static library.

         You can use the ``mongoc::static`` target to explicitly use the 
         static library or the ``mongoc::shared`` target to use the shared
         library.

   .. step:: Create the index.

      In your terminal, run the following commands to build and run this 
      application: 
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cmake -S. -Bcmake-build
            cmake --build cmake-build --target index.out
            ./cmake-build/index.out

         .. output::

            Index created on the companies collection!
            Index created on the inspections collection!
