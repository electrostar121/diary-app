import React, { useContext } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from "../context/AuthContext";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif", alignItems: "center" }}>
        ThoughtStream
      </Typography>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </Box>
  );
}

export default Login;
