import React from "react";
import DiaryEntryCard from "./DiartEntryCard";
import { updateEntry } from "../services/api";

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
        <DiaryEntryCard key={entry._id} entry={entry} onSaveReflection={async (updatedEntry)  =>  {
          const data = await updateEntry(updatedEntry);
        }}/>
      ))}
    </div>
  );
}
const styles = {
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
};

export default DiaryList;
