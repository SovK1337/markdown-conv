cmake_minimum_required(VERSION 3.20)

project(markdown_conv LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Crow CONFIG REQUIRED)

add_executable(markdown_conv
    src/api/cpp/crowapi.cpp
    src/api/cpp/markdown.cpp
)

target_link_libraries(markdown_conv PRIVATE Crow::Crow)