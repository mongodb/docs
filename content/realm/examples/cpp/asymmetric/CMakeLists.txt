cmake_minimum_required(VERSION 3.25)

project(examples-asymmetric)

set(CMAKE_CXX_STANDARD 17)

Include(FetchContent)

FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        v3.5.0
)
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/realm/realm-cpp.git
  GIT_TAG        v1.0.0
)
FetchContent_Declare(
  json
  URL https://github.com/nlohmann/json/releases/download/v3.11.3/json.tar.xz
)

FetchContent_MakeAvailable(Catch2 cpprealm json)

add_executable(examples-asymmetric 
  asymmetric-sync.cpp
)

target_link_libraries(examples-asymmetric PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-asymmetric PRIVATE cpprealm)
target_link_libraries(examples-asymmetric PRIVATE nlohmann_json::nlohmann_json)
