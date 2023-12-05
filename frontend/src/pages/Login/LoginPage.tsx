import React, { useState, useContext } from 'react';
import './LoginPage.css';
import api from "../../api.js";
import { UserContext } from "../../context/UserContext";


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const submitLogin = async () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify(
            `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
          ),
        };
    
        const response = await fetch("/auth/token", requestOptions);
        const data = await response.json();
    
        if (!response.ok) {
          setErrorMessage(data.detail);
        } else {
          setToken(data.access_token);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitLogin();
    };

    return (
        <main id='login-container'>
            <div className="login">
                <div className='logo'><h3>UniLife</h3></div>
                <div className="text">
                    <h2>Welcome,</h2>
                    <h3>Log in to continue!</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group' id='form-username'>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className='form-group' id='form-password'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button id='submit' type="submit">Login</button>
                </form>
            </div>
        </main>
    );
};

export default LoginPage;
