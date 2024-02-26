import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      Login
      {/* <Link to="/article">To Article</Link>
      <button onClick={() => navigate("/article")}>Button to Article</button>
      <button onClick={() => navigate("/article?id=101&name=jack")}>
        Button to Article Parameter
      </button> */}
      <button onClick={() => navigate("/article/10086/jack")}>
        Button to Article Parameter2
      </button>
    </div>
  );
};

export default Login;
