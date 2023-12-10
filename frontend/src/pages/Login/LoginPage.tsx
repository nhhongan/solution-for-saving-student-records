import React, { useState, useContext } from "react";
import "./LoginPage.css";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitLogin = async () => {
    const user = {
      username: username,
      password: password,
    };
    await axios
      .post(process.env.API_ENDPOINt+"/token" as string, user)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch((err) => {
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
