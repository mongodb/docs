.. code-block:: console

  cmake_minimum_required(VERSION 3.30)

  project(atlas-vector-search-quick-start)

  # Specify the minimum version for creating a vector index.
  find_package (mongoc-1.0 1.28.0 REQUIRED)

  add_executable(atlas-vector-search-quick-start
    vector_index.c
  )

  target_link_libraries (atlas-vector-search-quick-start PRIVATE mongo::mongoc_shared)
