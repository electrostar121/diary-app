import React, { useContext } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Login() {
  const { login } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    try {
      const response = await api.post("/auth/google", { credential });

      if (response.data.token) {
        login(response.data.token, response.data.user);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <div>
      <h1>Welcome to ThoughtStream</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default Login;
