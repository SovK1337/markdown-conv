import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "working" });
});

app.post("/markdown", async (req, res) => {
    try {
        const response = await fetch("http://localhost:7313/markdown", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: req.body.text
            })
        });

        const received = await response.json();

        res.json(received);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Could not connect to the C++ API"
        });
    }
});

app.listen(3215, () => {
    console.log("Express API running on port 3215");
});