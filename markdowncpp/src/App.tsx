import { useState } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConvert(){
    try{
      const response = await fetch(
        "http://localhost:3215/markdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputText,
          })
        }
      )
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setHtmlOutput(data.html_output);
    }
    catch(err){
      console.error(err);
    }
  }

return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "2.5rem",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1>Markdown Converter</h1>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your Markdown here..."
          rows={6}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "1rem",
            border: "2px solid #ddd",
            borderRadius: "12px",
            fontSize: "1rem",
            color: "#333",
            background: "#f8f9fa",
            resize: "vertical",
          }}
        />

        <button
          onClick={handleConvert}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "1rem",
            padding: "0.9rem",
            border: "none",
            borderRadius: "12px",
            background: "#667eea",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Converting..." : "Convert Markdown"}
        </button>

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {htmlOutput !== "" && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Converted HTML</h2>

            <div
              style={{
                padding: "1rem",
                borderRadius: "12px",
                background: "#f1f3f5",
                color: "#222",
                overflowWrap: "anywhere",
              }}
              dangerouslySetInnerHTML={{
                __html: htmlOutput,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}