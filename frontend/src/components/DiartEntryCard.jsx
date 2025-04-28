import React from "react";

function DiaryEntryCard({ entry }) {
  return (
    <div style={styles.card}>
      <h3>{entry.title}</h3>
      <p>{entry.content}</p>
    </div>
  );
}

const styles = {
  card: {
    padding: "15px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default DiaryEntryCard;