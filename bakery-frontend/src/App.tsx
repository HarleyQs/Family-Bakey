import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("...Loading");
  useEffect(() => {
    axios.get("api/health").then((res) => setMsg(res.data));
  }, []);

  return <h1 className="text 2xl p-4">Api says: {msg}</h1>;
}

export default App;
