import React, { useState } from "react";
import { deleteEntry } from "../services/api";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function DiaryEntryCard({ key, entry, onSaveReflection }) {
  const [open, setOpen] = useState(false);
  const [reflection, setReflection] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    window.location.reload();
  };

  const handleDelete = async () => {
    const response = await deleteEntry(entry);
    window.location.reload();
  };

  const handleChange = (event) => {
    setReflection(event.target.value);
  };

  const handleSave = () => {
    const updatedEntry = {
      ...entry,
      reflection: reflection,
    };
    if (onSaveReflection) {
      onSaveReflection(updatedEntry);
    }
  
    setOpen(false);
  };
  const icon = entry.weather?.icon || "01d"; // fallback to clear sky icon
  const condition = entry.weather?.condition || "Unknown";
  const temperature = entry.weather?.temperature ?? "N/A";
  const weather_location = entry.weather?.location ?? "N/A";

  return (
    <div>
      <Card
        onClick={handleOpen}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          maxWidth: "15rem",
          minWidth: "15rem",
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
          cursor: "pointer", // Makes it feel interactive
          "&:hover": {
            boxShadow: 6,
          },
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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{entry.title}</DialogTitle>
        <DialogContent dividers>
        <Typography variant="h6">Diary Content</Typography>
        <Typography variant="body1" whiteSpace="pre-line">
            {entry.content}
        </Typography>
        </DialogContent>
        <DialogContent dividers>
        <Typography variant="h6" gutterBottom>Weather</Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Weather"
            sx={{
              width: 64,
              height: 64,
            }}
          />
          <Box>
            <Typography variant="body1">Weather: {condition || "UNKNOWN"}</Typography>
            <Typography variant="body1">Temperature: {temperature || "∞"} °F</Typography>
            <Typography variant="body1">Location: {weather_location || "VOID"}</Typography>
          </Box>
        </Box>
      </DialogContent>
        <DialogContent dividers>
        <Typography variant="h6">Reflection</Typography>
        <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder={entry.reflection || "Write your reflection here..."}
            value={reflection || entry.reflection}
            onChange={handleChange}
            variant="outlined"
          />
        <DialogActions>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
        </DialogContent>
        <DialogContent dividers>

          <Typography variant="body2" whiteSpace="pre-line">
            Tags: {entry.tags?.join(", ") || "None"}
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDelete} color="error">
            Delete Entry
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DiaryEntryCard;