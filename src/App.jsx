import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [prompt, setPrompt] = useState(
    "Reply in a funny way to the following prompt: Hello my friend"
  );
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
    setResult([...result, formattedData]);
    console.log(formattedData);
  };

  useEffect(() => {
    sendPromptToAI();
  }, []);

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
    </>
  );
}

export default App;
