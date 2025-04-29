import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DiaryList from "../components/DiaryList";
import NewEntryForm from "../components/NewEntryForm";
import { fetchEntries, createEntry } from "../services/api";
import "../styles/index.css";
import axios from "axios";

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchAllEntries();
  }, []);

  const fetchAllEntries = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get("http://localhost:5000/api/diary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllEntries(response.data);
    } catch (error) {
      console.error("Error fetching all entries:", error);
    }
  };

  const handleSearch = async ({ search, tag, location }) => {
    if (!search && !tag && !location) {
      setIsSearching(false);
      setEntries([]);
      return;
    }

    try {
      const token = localStorage.getItem("jwt");
      const params = {};
      if (search) params.search = search;
      if (tag) params.tag = tag;
      if (location) params.location = location;

      const response = await axios.get("http://localhost:5000/api/diary", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setEntries(response.data);
      setIsSearching(true);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setEntries([]);
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
      await fetchAllEntries(); 
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const entriesToDisplay = isSearching ? entries : allEntries; 

  return (
    <div style={styles.container}>
      <Header onSearch={handleSearch} onClear={handleClearSearch} />
      
      <div style={isFormOpen ? styles.blurredContent : styles.content}>
        <DiaryList entries={entriesToDisplay} isSearching={isSearching} />
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
