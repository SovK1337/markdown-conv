import { useState } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3215/markdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setHtmlOutput(data.html_output ?? "");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while converting."
      );
      setHtmlOutput("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.terminal}>
        {/* Window title bar */}
        <header style={styles.titleBar}>
          <div style={styles.windowControls}>
            <span style={{ ...styles.dot, background: "#E06C75" }} />
            <span style={{ ...styles.dot, background: "#E5C07B" }} />
            <span style={{ ...styles.dot, background: "#98C379" }} />
          </div>

          <span style={styles.windowTitle}>markdown-converter</span> 
        </header>

        {/* Main content */}
        <main style={styles.content}>
          <div style={styles.prompt}>
            <span style={styles.promptUser}>dev@workspace</span>
            <span style={styles.muted}>:</span>
            <span style={styles.promptPath}>~/markdown</span>
            <span style={styles.muted}>$</span>
            <span style={styles.command}> convert --interactive</span>
          </div>

          <h1 style={styles.heading}>Markdown Converter</h1>

          <br></br>

          <div style={styles.editor}>
            <div style={styles.lineNumbers}>
              {Array.from(
                { length: Math.max(6, inputText.split("\n").length) },
                (_, i) => (
                  <div key={i}>{String(i + 1).padStart(2, "0")}</div>
                )
              )}
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={"# Hello, world!\n\n! This text will be bold."}
              spellCheck={false}
              aria-label="Markdown input"
              style={styles.textarea}
            />
          </div>

          <div style={styles.editorFooter}>
            <span>{inputText.length} characters</span>
            <span>UTF-8 · Markdown</span>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading || !inputText.trim()}
            style={{
              ...styles.button,
              opacity: loading || !inputText.trim() ? 0.55 : 1,
              cursor:
                loading || !inputText.trim() ? "not-allowed" : "pointer",
            }}
          >
            <span style={styles.buttonIcon}>
              {loading ? "◌" : "›_"}
            </span>
            {loading ? "Processing..." : "Run conversion"}
            <span style={styles.buttonShortcut}>ENTER ↵</span>
          </button>

          {error && (
            <div role="alert" style={styles.error}>
              <span>!</span>
              <span>{error}</span>
            </div>
          )}

          {htmlOutput !== "" && (
            <section style={styles.outputSection}>
              <div style={styles.sectionHeader}>
                <span style={styles.sectionLabel}>02 / OUTPUT</span>
                <span style={styles.outputStatus}>
                  <span style={styles.statusDot} />
                  CONVERSION COMPLETE
                </span>
              </div>

              <div style={styles.outputPanel}>
                <div style={styles.outputToolbar}>
                  <span style={styles.fileName}>output.html</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(htmlOutput)}
                    style={styles.copyButton}
                    type="button"
                  >
                    COPY HTML
                  </button>
                </div>

                <pre style={styles.codeOutput}>{htmlOutput}</pre>
              </div>

              <div style={styles.previewHeader}>
                <span style={styles.sectionLabel}>03 / PREVIEW</span>
                <span style={styles.muted}>Rendered HTML</span>
              </div>

              <div style={styles.preview}>
                <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
              </div>
            </section>
          )}

          <footer style={styles.footer}>
            <span>
              <span style={styles.statusDot} /> API CONNECTION
            </span>
            <span>localhost:3215</span>
            <span>v1.0.0</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background: "#111315",
    color: "#D8DEE9",
    fontFamily:
      "'SFMono-Regular', Consolas, 'Liberation Mono', monospace",
  },

  terminal: {
    width: "100%",
    maxWidth: "780px",
    background: "#191C20",
    border: "1px solid #343940",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
  },

  titleBar: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 18px",
    background: "#22262B",
    borderBottom: "1px solid #343940",
  },

  windowControls: {
    display: "flex",
    gap: "7px",
    alignItems: "center",
  },

  dot: {
    display: "block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },

  windowTitle: {
    fontSize: "12px",
    color: "#A6ADB8",
    letterSpacing: "0.3px",
  },

  version: {
    fontSize: "10px",
    color: "#98C379",
    border: "1px solid #3B5140",
    borderRadius: "4px",
    padding: "4px 6px",
    letterSpacing: "1px",
  },

  content: {
    padding: "clamp(20px, 5vw, 40px)",
  },

  prompt: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
    fontSize: "12px",
    marginBottom: "26px",
  },

  promptUser: {
    color: "#98C379",
  },

  promptPath: {
    color: "#61AFEF",
  },

  muted: {
    color: "#777F8B",
  },

  command: {
    color: "#C9A7E8",
  },

  heading: {
    margin: "0 0 12px",
    color: "#F0F2F5",
    fontFamily: "system-ui, sans-serif",
    fontSize: "clamp(26px, 5vw, 34px)",
    fontWeight: 650,
    letterSpacing: "-1.2px",
  },

  description: {
    margin: "0 0 32px",
    color: "#B0B7C3",
    fontSize: "13px",
    lineHeight: 1.9,
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "12px",
  },

  sectionLabel: {
    color: "#98C379",
    fontSize: "11px",
    letterSpacing: "1.2px",
    fontWeight: 700,
  },

  fileName: {
    color: "#858D98",
    fontSize: "11px",
  },

  editor: {
    display: "flex",
    minHeight: "180px",
    background: "#141619",
    border: "1px solid #343940",
    borderRadius: "7px",
    overflow: "hidden",
  },

  lineNumbers: {
    flexShrink: 0,
    padding: "17px 12px",
    color: "#606874",
    background: "#191C20",
    borderRight: "1px solid #2C3036",
    fontSize: "12px",
    lineHeight: "1.8",
    textAlign: "right",
    userSelect: "none",
  },

  textarea: {
    flex: 1,
    width: "100%",
    minWidth: 0,
    minHeight: "180px",
    boxSizing: "border-box",
    padding: "17px 16px",
    background: "transparent",
    color: "#D8DEE9",
    border: "none",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    fontSize: "13px",
    lineHeight: 1.8,
    caretColor: "#98C379",
  },

  editorFooter: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    padding: "9px 2px 0",
    color: "#737B87",
    fontSize: "10px",
  },

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    marginTop: "24px",
    padding: "14px 16px",
    color: "#171B18",
    background: "#98C379",
    border: "1px solid #A8D18B",
    borderRadius: "6px",
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.2px",
    transition: "opacity 150ms ease",
  },

  buttonIcon: {
    fontSize: "15px",
  },

  buttonShortcut: {
    marginLeft: "auto",
    color: "#34442E",
    fontSize: "10px",
  },

  error: {
    display: "flex",
    gap: "10px",
    marginTop: "16px",
    padding: "12px",
    background: "#2A1C20",
    border: "1px solid #62343B",
    borderRadius: "6px",
    color: "#E6A0A7",
    fontSize: "12px",
    lineHeight: 1.6,
  },

  outputSection: {
    marginTop: "36px",
    paddingTop: "26px",
    borderTop: "1px solid #343940",
  },

  outputStatus: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    color: "#98C379",
    fontSize: "9px",
    letterSpacing: "0.4px",
  },

  statusDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#98C379",
  },

  outputPanel: {
    overflow: "hidden",
    background: "#141619",
    border: "1px solid #343940",
    borderRadius: "7px",
  },

  outputToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    background: "#202328",
    borderBottom: "1px solid #343940",
  },

  copyButton: {
    padding: "5px 8px",
    background: "transparent",
    color: "#98C379",
    border: "1px solid #3B5140",
    borderRadius: "4px",
    fontFamily: "inherit",
    fontSize: "9px",
    cursor: "pointer",
  },

  codeOutput: {
    margin: 0,
    padding: "16px",
    color: "#C9A7E8",
    fontSize: "12px",
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },

  previewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "24px 0 12px",
    fontSize: "11px",
  },

  preview: {
    minHeight: "60px",
    padding: "20px",
    background: "#E8E9E7",
    color: "#25282B",
    borderRadius: "7px",
    fontFamily: "system-ui, sans-serif",
    fontSize: "14px",
    overflowWrap: "anywhere",
  },

  footer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "34px",
    paddingTop: "18px",
    borderTop: "1px solid #343940",
    color: "#737B87",
    fontSize: "10px",
  },
};