.. code-block:: console

   cmake_minimum_required(VERSION 3.30)

   project(query_quick_start)

   set(CMAKE_CXX_STANDARD 17)

   # You must use mongocxx driver version 3.11.0 or later to
   # create a vector index.
   find_package(mongocxx REQUIRED)
   find_package(bsoncxx REQUIRED)

   add_executable(query_quick_start
     vector_index.cpp
   )

   target_link_libraries(query_quick_start PRIVATE mongo::mongocxx_shared)
   target_link_libraries(query_quick_start PRIVATE mongo::bsoncxx_shared)
