import { useEffect, useState } from "react";
import "./styles/app.css";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

function App() {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser({ username: savedUser });
      }
    }
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  if (result) {
    return (
      <Result
        user={user}
        result={result}
        onRestart={() => setResult(null)}
      />
    );
  }

  return <Quiz user={user} setResult={setResult} />;
}

export default App;
