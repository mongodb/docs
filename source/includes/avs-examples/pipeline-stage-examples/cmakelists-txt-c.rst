.. code-block:: console

  cmake_minimum_required(VERSION 3.30)

  project(atlas-vector-search-quick-start)

  # Specify the minimum version you require.
  find_package (mongoc-1.0 1.27.6 REQUIRED)

  add_executable(atlas-vector-search-quick-start
    atlas-vector-search-quick-start.c
  )

  # The "atlas-vector-search-quick-start.c" sample program is shared among four tests.
  target_link_libraries (atlas-vector-search-quick-start PRIVATE mongo::mongoc_shared)
