import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DiaryList from "../components/DiaryList";
import NewEntryForm from "../components/NewEntryForm";
import { fetchEntries, createEntry } from "../services/api";
import "../styles/index.css";

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await fetchEntries();
      setEntries(data);
    } catch (error) {
      console.error("Error loading entries:", error);
    }
  };

  const handleNewEntryClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveEntry = async (newEntry) => {
    try {
      await createEntry(newEntry);
      setIsFormOpen(false);
      // Refresh the list after saving
      loadEntries();
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={isFormOpen ? styles.blurredContent : styles.content}>
        <DiaryList entries={entries} />
        <button style={styles.newEntryButton} onClick={handleNewEntryClick}>+</button>
      </div>

      {isFormOpen && <NewEntryForm onClose={handleCloseForm} onSave={handleSaveEntry} />}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    minWidth: "100vw",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: "2rem",
    flexGrow: 1,
  },
  blurredContent: {
    padding: "2rem",
    filter: "blur(0.25rem)",
    pointerEvents: "none",
    userSelect: "none",
    flexGrow: 1,
  },
  newEntryButton: {
    all: "unset",
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    width: "4rem",
    height: "4rem",
    fontSize: "2rem",
    borderRadius: "50%",
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: "4rem",
    cursor: "pointer",
    boxShadow: "0 0.125rem 0.3125rem rgba(0,0,0,0.3)",
  },
};

export default Dashboard;