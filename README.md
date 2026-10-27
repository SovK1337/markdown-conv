# Markdown Converter

A small full-stack Markdown-to-HTML conversion project. It combines a
React interface with a C++ HTTP API built using Crow. The current
converter is a learning-stage implementation with a deliberately limited
set of Markdown-like rules; it is not a complete CommonMark parser.

## What it does

The web interface lets you enter text, send it to the backend, inspect
the returned HTML, copy the HTML to the clipboard, and view a rendered
preview.

The current C++ conversion logic recognizes a small set of markers:

-   `#`, `##` and `###` at the beginning of the input are converted to
    HTML heading tags (`<h1>`, `<h2>` and `<h3>`).
-   `!` at the beginning of the input marks the text as bold and wraps
    it in `<b>` tags.
-   A heading marker and the bold marker can be combined, for example
    `#! Hello`, to produce a heading containing bold text.

These rules are implemented by a custom character-by-character parser in
`markdown.cpp`. The implementation currently processes the submitted
input as a single string; it does not yet implement full Markdown
syntax, multi-line block parsing, links, lists, code fences, or other
standard Markdown features.

## How it works

1.  The user enters text in the React interface.
2.  The frontend sends a JSON `POST` request with a `text` field to the
    `/markdown` endpoint.
3.  The Crow server reads the JSON body and passes the text to the
    `MarkDown::identifyTag()` function.
4.  The C++ converter returns an HTML string.
5.  The API responds with JSON containing the `html_output` field.
6.  The frontend displays the HTML source and a rendered preview, and
    provides a button to copy the HTML.

The backend returns an error message if the request body cannot be
parsed as JSON or does not contain the `text` field.

## Technologies

### Frontend

-   **React 19** --- builds the interactive user interface.
-   **TypeScript** --- adds static typing to the frontend.
-   **Vite** --- development server and frontend build tooling.
-   **Oxlint** --- JavaScript/TypeScript linting.

### Backend

-   **C++20** --- implements the conversion logic and HTTP service.
-   **Crow** --- provides the HTTP server, routing, request handling,
    and JSON support.
-   **CMake 3.20+** --- configures the C++ build and links the Crow
    target.

Express and CORS are required, although the conversion endpoint implemented in the C++
source is provided by Crow.

## Project structure

``` text
Markdown-conv/
└── markdowncpp/
    ├── src/
    │   ├── App.tsx                 # React interface and API request
    │   └── api/
    │       └── cpp/
    │           ├── crowapi.cpp     # Crow HTTP endpoint
    │           ├── markdown.cpp    # Conversion rules
    │           └── markdown.hpp    # Converter declaration
    ├── package.json                # Frontend dependencies and scripts
    ├── vite.config.ts               # Vite configuration
    └── CMakeLists.txt               # C++ build configuration
```

## Requirements

-   Node.js and npm
-   A C++20-compatible compiler
-   CMake 3.20 or newer
-   Crow available as a CMake package (`CrowConfig.cmake`)

## Running the frontend

From the `markdowncpp` directory:

``` bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

To create a production frontend build:

``` bash
npm run build
```

To run the linter:

``` bash
npm run lint
```

## Building the C++ backend

From the `markdowncpp` directory, configure and build with CMake:

``` bash
cmake -S . -B build
cmake --build build
```

Run the generated `markdown_conv` executable from the build output
directory appropriate to your compiler and platform.

The C++ source currently configures Crow to listen on port `7313`.

## API

### `POST /markdown`

Accepts a JSON request:

``` json
{
  "text": "# Hello, world!"
}
```

Successful response:

``` json
{
  "html_output": "<h1>Hello, world!</h1>"
}
```

The exact output depends on the markers recognized by the current
parser. For example, `! This text will be bold.` produces
`<b>This text will be bold.</b>`.

## Scope

This project demonstrates a basic React-to-C++ integration: a browser
interface sends text to an HTTP endpoint, the backend applies custom
conversion rules, and the result is returned as JSON. The parser is
intentionally simple at this stage and should not be treated as a
standards-compliant Markdown converter.
This project is more a proof-of-concept and I will utilize the knowledge obtained here for other, more complex, projects.
