import React, { useState } from "react";
import "../styles/index.css";
import { motion, AnimatePresence } from "framer-motion";

function NewEntryForm({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle("");
    setContent("");
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
