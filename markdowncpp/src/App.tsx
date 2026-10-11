export default function App() {
  return (
    <div
      className="div_input"
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
        className="input_container"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >

        <input
          type="text"
          id="textbox_input"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "0.9rem 1rem",
            border: "2px solid #ddd",
            borderRadius: "12px",
            outline: "none",
            fontSize: "1rem",
            color: "#333",
            background: "#f8f9fa",
            transition: "all 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea";
            e.target.style.background = "#fff";
            e.target.style.boxShadow =
              "0 0 0 4px rgba(102, 126, 234, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ddd";
            e.target.style.background = "#f8f9fa";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>
    </div>
  );
}