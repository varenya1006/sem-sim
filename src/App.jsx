import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL =
  "http://varenya10-sem-app.hf.space/ask";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  async function genResponse() {
    if (!prompt) return;

    setLoading(true);

    try {
      const res = await axios.post(
        API_URL,
        {
          query: prompt,
        }
      );

      setResponse(res.data.answer);
      setDocs(res.data.retrieved_docs);

    } catch (error) {
      console.log(error);
      setResponse("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className={`container ${loading ? "generating" : ""}`}>
      <h1>AI Semantic Search</h1>

      <textarea
        placeholder="Ask something..."
        value={prompt}
        onChange={handleChange}
      />

      <button
        className={loading ? "loading" : ""}
        onClick={genResponse}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="response-box">
        <h2>AI Response</h2>

        <p>{response}</p>

        {docs.length > 0 && (
          <>
            <h2>Retrieved Docs</h2>

            <ul>
              {docs.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
