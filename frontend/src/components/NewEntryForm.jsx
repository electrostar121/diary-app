import React, { useState, useEffect } from "react";
import "../styles/index.css";
import getGeolocation from "../services/location";
import { motion, AnimatePresence } from "framer-motion";

function NewEntryForm({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getGeolocation();
        setLocation(data.city + ", " + data.country);
      } catch (err) {
        setError(err);
      }
    };
  
    fetchLocation();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      "title": title,
      "content": content,
      "reflection": "",
      "tags": tags.split(",").map(function(item) {return item.trim().toLowerCase();}).filter(function(item){if(item === ""){return false}else{return true};}),
      "location": location
    }
    onSave(entry);
    setTitle("");
    setContent("");
    setLocation("");
    setTags("");
  };

  return (
    <AnimatePresence>
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
        <h2>New Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            required
          ></textarea>
          <input
            type="text"
            placeholder="City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Tags (comma seperated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={styles.input}
          />
          <div style={styles.actions}>
            <button className="save-button" type="submit" style={styles.saveButton}>Save</button>
            <button className="cancel-button" type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
}

const styles = {
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
  input: {
    width: "100%",
    marginBottom: "0.625rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "0.25rem",
    padding: "0.625rem",
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif"
  },
  textarea: {
    width: "100%",
    height: "9.375rem",
    marginBottom: "0.625rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "0.25rem",
    padding: "0.625rem",
    resize: "none",
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  saveButton: {
    backgroundColor: "limegreen",
    color: "#fff",
    cursor: "pointer",
    padding: "0.625rem 1.25rem",
    border: "none",
    borderRadius: "0.25rem",
  },
  cancelButton: {
    backgroundColor: "red",
    color: "#fff",
    cursor: "pointer",
    padding: "0.625rem 1.25rem",
    border: "none",
    borderRadius: "0.25rem",
  },
};


export default NewEntryForm;