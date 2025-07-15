cmake_minimum_required (VERSION 3.15)
project (builder_basic LANGUAGES CXX)

find_package (bsoncxx 4.0 REQUIRED)

add_executable (view_and_value /<path-to-mongo-cxx-driver-sources>/examples/bsoncxx/view_and_value.cpp)

# we need target_include_directories because view_and_value.cpp refers to a common example header
target_include_directories (view_and_value PRIVATE /<path-to-mongo-cxx-driver-sources>)
target_link_libraries (view_and_value PRIVATE mongo::bsoncxx_shared)
