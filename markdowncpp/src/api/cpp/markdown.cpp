#include "markdown.hpp"

#include <string>

std::string MarkDown::identifyTag(const std::string& text)
{
    int identify = 0;
    std::string inpFullSTR;
    bool readingText = false;

    for (auto i : text) {
        if (!readingText && i == '#') {
            identify += 1;
        }
        else if (!readingText && i == ' ') {
            readingText = true;
        }
        else {
            readingText = true;
            inpFullSTR.push_back(i);
        }
    }

    if (identify == 1) {
        return "<h1>" + inpFullSTR + "</h1>";
    }
    else if (identify == 2) {
        return "<h2>" + inpFullSTR + "</h2>";
    }
    else if (identify == 3) {
        return "<h3>" + inpFullSTR + "</h3>";
    }

    return inpFullSTR;
}