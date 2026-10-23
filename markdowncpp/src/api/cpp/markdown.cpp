#include "markdown.hpp"
#include <string>

std::string MarkDown::identifyTag(const std::string& text)
{
    int idTag = 0;
    bool isBold = false;
    std::string content;
    bool readingText = false;

    for (char c : text) {
        if (!readingText && c == '#') {
            idTag++;
        }
        else if (!readingText && c == '!') {
            isBold = true;
        }
        else if (!readingText && c == ' ') {
            readingText = true;
        }
        else {
            readingText = true;
            content.push_back(c);
        }
    }

    if (isBold) {
        content = "<b>" + content + "</b>";
    }

    if (idTag == 1) {
        content = "<h1>" + content + "</h1>";
    }
    else if (idTag == 2) {
        content = "<h2>" + content + "</h2>";
    }
    else if (idTag == 3) {
        content = "<h3>" + content + "</h3>";
    }

    return content;
}