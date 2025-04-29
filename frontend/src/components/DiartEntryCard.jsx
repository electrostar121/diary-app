import React from "react";

function DiaryEntryCard({ entry }) {
  return (
    <div style={styles.card}>
      <h3>{entry.title}</h3>
      <p style={styles.contentPreview}>{entry.content}</p>
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
  contentPreview: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    maxHeight: "4.5em",
  },
};

export default DiaryEntryCard;