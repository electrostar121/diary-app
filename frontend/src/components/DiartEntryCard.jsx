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
  const [editedContent, setEditedContent] = useState(entry.content || "");
  const [reflection, setReflection] = useState(entry.reflection || "");
  const [editedTitle, setEditedTitle] = useState(entry.title || "");
  const [editedTags, setEditedTags] = useState(entry.tags?.join(", ") || "");
  const [editedLocation, setEditedLocation] = useState(entry.weather?.location || "");


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

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };
  
  const handleReflectionChange = (e) => {
    setReflection(e.target.value);
  };

  const handleTitleChange = (e) => setEditedTitle(e.target.value);
  const handleTagsChange = (e) => setEditedTags(e.target.value);
  const handleLocationChange = (e) => setEditedLocation(e.target.value);


  const handleSave = () => {
    const updatedEntry = {
      ...entry,
      title: editedTitle,
      content: editedContent,
      reflection: reflection,
      tags: editedTags.split(",").map(tag => tag.trim()),
      weather: {
        ...entry.weather,
        location: editedLocation,
      },
    };
  
    if (onSaveReflection) {
      onSaveReflection(updatedEntry);
    }
  
    setOpen(false);
    window.location.reload();
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
      <DialogTitle>
      <TextField
        fullWidth
        variant="standard"
        value={editedTitle}
        onChange={handleTitleChange}
        placeholder="Entry Title"
      />
    </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Diary Content</Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Edit your content here..."
            value={editedContent}
            onChange={handleContentChange}
            variant="outlined"
          />
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
            <Typography variant="body1">Location:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={editedLocation}
              onChange={handleLocationChange}
            />
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
            onChange={handleReflectionChange}
            variant="outlined"
          />
        
        </DialogContent>
        <DialogContent dividers>
          <Typography variant="h6">Tags</Typography>
          <TextField
            fullWidth
            value={editedTags}
            onChange={handleTagsChange}
            placeholder="Comma-separated tags"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
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