import React, { useState } from "react";
import "./LoginPage.css";
import { logIn } from "api";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitLogin = async () => {
    await logIn("/auth/token", username, password)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          // Navigate to home page using React Router
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err);
        console.error(err);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitLogin();
  };

  return (
    <main id="login-container">
      <div className="login">
        <div className="logo">
          <h3>UniLife</h3>
        </div>
        <div className="text">
          <h2>Welcome,</h2>
          <h3>Log in to continue!</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" id="form-username">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group" id="form-password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button id="submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
