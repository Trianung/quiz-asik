import { useState } from "react";
import USERS from "../data/users";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setError("Username atau password salah");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username }));
    onLogin({ username });
  };

  return (
    <div className="container">
      <h1>Quiz Asik</h1>
      <h3>Silahkan Login</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submitHandler}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
