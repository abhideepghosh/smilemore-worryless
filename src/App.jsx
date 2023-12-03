import { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);
  const apiPath = `https://palm-ai-backend.onrender.com/palmai/prompt`;

  const sendPromptToAI = async () => {
    const response = await fetch(apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();
    const formattedData = data[0].output.split("\n");
    setResult([...result, [prompt], formattedData]);
    console.log(formattedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult([...result, [prompt]]);
    sendPromptToAI();
    setPrompt("");
  };

  useEffect(() => {
    console.log("UseEffect Called");
    document
      .querySelector(".container")
      .scrollIntoView({ behavior: "smooth", block: "end" });
  }, [result]);

  return (
    <>
      <div className="container">
        <h1>Palm AI</h1>
        {result.map((ans, key) => (
          <div key={key} className="prompt-container">
            {ans.map((line, id) => (
              <pre className="message" key={id * 0.1}>
                {line}
              </pre>
            ))}
          </div>
        ))}
      </div>
      <form className="prompt-form" onSubmit={handleSubmit}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          className="prompt-input"
          placeholder="Enter your prompt"
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </>
  );
}

export default App;
