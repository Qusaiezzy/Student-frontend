import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("Logging in...");

    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        rollNumber: Number(rollNumber),
        password: Number(password)
      });

      if (res.data.success) {
        setMsg(" Login successful!");

        // Save in localStorage (for protected routes)
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("rollNumber", res.data.rollNumber);

        setRollNumber("");
        setPassword("");

        if (res.data.role === "admin" || res.data.role === "teacher") {
          navigate("/upload");
        }
        else if (res.data.role === "user") {
          navigate(`/student/${res.data.rollNumber}`);
        }
        else {
          setMsg("Role not recognized");
        }

      } else {
        setMsg(res.data.message || "❌ Invalid login");
      }

    } catch (error) {
      console.error("❌ Login Error:", error);
      setMsg("❌ Server error");
    }
  };

  return (
    <div className="loginMain">
      <h2>Student Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="number"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}

export default Login;
