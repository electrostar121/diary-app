import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function DiaryEntryCard({ entry }) {
  return (
    <Card
      sx={{
        maxWidth: "15rem",
        minWidth: "15rem",
        backgroundColor: "#f0f0f0",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {entry.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {entry.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DiaryEntryCard;
