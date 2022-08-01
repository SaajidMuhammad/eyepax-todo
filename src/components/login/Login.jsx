import React, { useState } from "react";
import "./Login.css";

const USER_CREDENTIALS = {
  USERNAME: "admin",
  PASSWORD: "admin",
};

const Login = ({ setIsLogged }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const onClickLogin = () => {
    if (
      username === USER_CREDENTIALS.USERNAME &&
      password === USER_CREDENTIALS.PASSWORD
    ) {
      setIsLogged(true);
      sessionStorage.setItem("user-authenticated", true);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="brand-logo">
        <img
          src="https://eyepax.com/wp-content/uploads/2021/12/Eyepax-d-Logo300x100.png"
          alt=""
        />
      </div>
      <div className="form-wrapper">
        <div className="input-wrapper">
          <label htmlFor="">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsError(false);
            }}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsError(false);
            }}
          />
        </div>

        {isError && (
          <div className="error-message">Incorrect username or password</div>
        )}

        <button
          className="login-button"
          onClick={() => {
            onClickLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
