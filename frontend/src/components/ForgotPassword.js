import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [forgorPasswordData, setForgotPasswordData] = useState({
    username: "",
    newPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForgotPasswordData({
      ...forgorPasswordData,
      [e.target.name]: e.target.value,
    });
  };
  const handleForgotPassword = async () => {
    setError("")
    if (!forgorPasswordData?.username || !forgorPasswordData?.newPassword) {
      setError("required username or password");
      return;
    }
    await axios
      .post("http://localhost:8080/auth/forgot-password", forgorPasswordData)
      .then((res) => {
        // console.log("data",res.data.status);
        if(res?.data?.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        // console.log("error", err.response.data.message);
        setError(err.response.data.message)
      });
  };

  return (
    <div>
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Forgot Password</div>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={forgorPasswordData?.username}
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
            value={forgorPasswordData?.newPassword}
            type="password"
            name="newPassword"
            placeholder="Enter your password here"
            onChange={(e) => handleChange(e)}
            className="inputBox"
          />
        </div>
        <br />
        {error && <div className="errorLabel">{error}</div>}
        <div className="inputContainer">
          <button className="login-btn" onClick={handleForgotPassword}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
