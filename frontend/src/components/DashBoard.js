import React from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const loggedIn = localStorage.getItem("token");
  if (!loggedIn) {
    console.log("isLogin");
    return <Navigate to="/login" replace={true} />;
  }
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload("");
  };
  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the Dashboard.</div>
      <div className="inputContainer">
        <button className="login-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
