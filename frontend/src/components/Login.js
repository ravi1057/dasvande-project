import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const loggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    setError("")
    if (!loginData?.username || !loginData?.password) {
      setError("required username or password");
      return;
    }
    // console.log("login payload", loginData);
    await axios
      .post("http://localhost:8080/auth/login", loginData)
      .then((res) => {
        // console.log("data",res.data);
        localStorage.setItem('token', res?.data?.accessToken);
        navigate("/")

      })
      .catch((err) => {
        // console.log("error", err.response.data);
        setError(err.response.data)
      });
  };

  if (loggedIn) {
    // console.log("isLogin");
    navigate("/")
  }
  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={loginData?.username}
          placeholder="Enter your email here"
          type="text"
          name="username"
          onChange={(e) => handleChange(e)}
          className="inputBox"
        />
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={loginData?.password}
          type="password"
          name="password"
          placeholder="Enter your password here"
          onChange={(e) => handleChange(e)}
          className="inputBox"
        />
      </div>
      <br />
      {error && <div className="errorLabel">{error}</div>}
      <div className="inputContainer">
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
      <Link to="/forgot-password">Fogot password?</Link>
    </div>
  );
};

export default Login;
