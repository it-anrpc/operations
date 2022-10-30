import React, { useState, useEffect } from "react";
import Layout from "./components/Layout.js";
import Login from "./components/Login";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <Layout />
      <h1>{message}</h1>
      <Login />
    </div>
  );
}

export default App;
