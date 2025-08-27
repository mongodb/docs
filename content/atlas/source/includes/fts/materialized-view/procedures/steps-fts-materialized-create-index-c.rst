.. procedure::
   :style: normal

   .. step:: Define the index.

      Create a ``create_index.c`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/materialized-view/create-index-example.c
         :caption: create_index.c
         :language: c
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Modify your ``CMakeLists.txt`` file

      Edit the ``CMakeLists.txt`` file created in the previous section
      to resemble the following code:

      .. code-block:: c
         :caption: CMakeLists.txt

         cmake_minimum_required(VERSION 3.11)
         project(search-materialized-view LANGUAGES C)
         add_executable (index.out create_index.c)
         find_package(mongoc <version> REQUIRED)
         target_link_libraries(index.out mongoc::mongoc)

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

            Index created!
