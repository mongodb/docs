cmake_minimum_required (VERSION 3.15)
project (builder_basic LANGUAGES CXX)

# specify a source_dir which is out-of-tree from this project, so also specify bin_dir
add_subdirectory (/<path-to-mongo-cxx-driver-sources> ./build/mongo-cxx-driver)

add_executable (view_and_value /<path-to-mongo-cxx-driver-sources>/examples/bsoncxx/view_and_value.cpp)

# we need target_include_directories because view_and_value.cpp refers to a common example header
target_include_directories (view_and_value PRIVATE /<path-to-mongo-cxx-driver-sources>)
# no mongo:: namespace prefix, since the targets are use directly without installation
target_link_libraries (view_and_value PRIVATE bsoncxx_shared)
