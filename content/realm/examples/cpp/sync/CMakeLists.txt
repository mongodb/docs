cmake_minimum_required(VERSION 3.25)

project(examples-sync)

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

add_executable(examples-sync 
  app.cpp
  authentication.cpp
  call-function.cpp
  client-reset.cpp
  custom-user-data.cpp
  flexible-sync.cpp
  quick-start.cpp
  sync-errors.cpp
  sync-session.cpp
)

target_link_libraries(examples-sync PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-sync PRIVATE cpprealm)
target_link_libraries(examples-sync PRIVATE nlohmann_json::nlohmann_json)
