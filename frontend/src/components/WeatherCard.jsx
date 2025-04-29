import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/index.css";

function WeatherCard({ onClose, icon, condition, temperature, location }) {
  return (
    <motion.div
      style={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        style={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h2>Weather for: {location}</h2>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather" style={styles.img} />
        <p style={styles.conditionP}>Weather: {condition}</p>
        <p style={styles.temperatureP}>Temperature: {temperature} °F</p>
        <div style={styles.actions}>
          <button className="cancel-button" type="button" onClick={onClose} style={styles.exitButton}>Exit</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  conditionP: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "black"
  },
  temperatureP: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "black"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#cccccc",
    padding: "2rem",
    borderRadius: "0.5rem",
    width: "100%",
    maxWidth: "25rem",
    boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.4)",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  exitButton: {
    backgroundColor: "red",
    color: "#fff",
    cursor: "pointer",
    padding: "0.625rem 1.25rem",
    border: "none",
    borderRadius: "0.25rem",
  },
  img: {
    width: "100",
    height: "100"
  }
};


export default WeatherCard;