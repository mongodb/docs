cmake_minimum_required(VERSION 3.25)

project(examples-local)

set(CMAKE_CXX_STANDARD 17)

Include(FetchContent)

FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        v3.5.0 # or a later release
)
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/realm/realm-cpp.git
  GIT_TAG        v1.0.0
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples-local
  close-realm.cpp
  compact.cpp
  crud.cpp
  filter-data.cpp
  logger.cpp
  notifications.cpp
  realm-files.cpp
  relationships.cpp
  supported-types.cpp
  threading.cpp
)

set(USE_EXAMPLE_MAIN 1)

target_link_libraries(examples-local PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-local PRIVATE cpprealm)
