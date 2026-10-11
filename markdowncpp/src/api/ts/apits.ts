import express from "express";

const app = express();

app.use(express.json);


app.get("/", (req,res) => {
    res.json("working");
})

const response = await fetch("http://localhost:7313/markdown", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        text: "# ex"
    })
});

const received = await response.json();

console.log(received.html_output);