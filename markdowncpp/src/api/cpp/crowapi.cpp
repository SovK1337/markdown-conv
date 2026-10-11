#include <crow.h>
#include "markdown.hpp"
#include <string>

int main(){
    crow::SimpleApp app;
    MarkDown mk;

    CROW_ROUTE(app, "/markdown").methods(crow::HTTPMethod::POST)
    ([&mk](const crow::request& req)
        {
            auto body = crow::json::load(req.body);
            if(!body || !body.has("text")){
                return crow::response("Missing 'text'");
            }

            std::string input = body["text"].s();

            std::string html_f = mk.identifyTag(input);

            crow::json::wvalue response;
            response["html_output"] = html_f;

            return crow::response(response);
        });

    std::cout << "Runnning on port 7313" << std::endl;
    
    app.port(7313).multithreaded().run();
}