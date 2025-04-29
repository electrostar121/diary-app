import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import WeatherWidget from "../components/WeatherWidget";

function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header style={styles.header}>
      <h1>ThoughtStream 📝</h1>
      <WeatherWidget/>
      {user && (
        <div style={styles.userInfo}>
          <img src={user.picture} alt="Profile" style={styles.avatar} />
          <span style={styles.name}>{user.name}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    padding: "10px 20px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
  },
  name: {
    fontWeight: "bold",
  },
  logoutButton: {
    padding: "6px 12px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }
};

export default Header;
