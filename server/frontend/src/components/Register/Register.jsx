import React, { useState } from "react";
import Header from "../Header/Header";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const register = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${window.location.origin}/djangoapp/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (response.ok && result.status === "UserCreated") {
        setMessage("Registration successful. You can now log in.");
      } else {
        setMessage(result.error || result.message || "Registration failed. Please check your details.");
      }
    } catch (error) {
      setMessage("Unable to reach the registration service. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <main className="register_container">
        <h1 className="header">Register</h1>
        <form className="inputs" onSubmit={register}>
          <label className="input" htmlFor="userName">
            Username
            <input className="input_field" id="userName" name="userName" type="text" placeholder="Username" value={form.userName} onChange={handleChange} required />
          </label>
          <label className="input" htmlFor="password">
            Password
            <input className="input_field" id="password" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </label>
          <label className="input" htmlFor="firstName">
            First name
            <input className="input_field" id="firstName" name="firstName" type="text" placeholder="First name" value={form.firstName} onChange={handleChange} required />
          </label>
          <label className="input" htmlFor="lastName">
            Last name
            <input className="input_field" id="lastName" name="lastName" type="text" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
          </label>
          <label className="input" htmlFor="email">
            Email
            <input className="input_field" id="email" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </label>
          <div className="submit_panel">
            <button className="submit" type="submit">Register</button>
          </div>
          {message && <p role="status" aria-live="polite">{message}</p>}
        </form>
      </main>
    </div>
  );
};

export default Register;
