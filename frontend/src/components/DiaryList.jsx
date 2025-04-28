import React from "react";
import DiaryEntryCard from "./DiartEntryCard"

function DiaryList({ entries }) {
  return (
    <div style={styles.list}>
      {entries.map((entry) => (
        <DiaryEntryCard key={entry._id} entry={entry} />
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  },
};

export default DiaryList;