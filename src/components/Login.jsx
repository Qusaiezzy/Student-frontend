import { useState } from "react";
import axios from "axios";
import loging from "../Styling/Login.css"
function Login() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        rollNumber: Number(rollNumber),
        password: Number(password),
      });

      if (res.data.success) {
        setMsg("Login successful!");
        localStorage.setItem("user", rollNumber);
         setRollNumber("");
      setPassword("");
        if (res.data.role === "admin") {
          console.log("✅ Logged in as ADMIN → redirect to upload page");
        } else if (res.data.role === "user") {
          console.log("✅ Logged in as USER → redirect to marks page");
        } else {
          console.log(" Logged in but role not defined");
        }

      } else {
        setMsg(res.data.message || "Invalid login");
       
      }

    } catch (error) {
      console.error("❌ Login Error:", error);
      setMsg("Server error");
    }
  };

  return (
    <div class="loginMain">
      <h2>Simple Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="number"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />

        <input
          type="number"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}

export default Login;
