import React from "react";
import DiaryEntryCard from "./DiartEntryCard"

import { Typography } from "@mui/material";
function DiaryList({ entries, isSearching }) {

  if (entries.length === 0) {
    if (isSearching) {
      return (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No diary entries found 😔
        </Typography>
      );
    } else {
      return (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          You have no diary entries yet. Start writing! 📝
        </Typography>
      );
    }
  }

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
    padding: "20px",
  },
};

export default DiaryList;