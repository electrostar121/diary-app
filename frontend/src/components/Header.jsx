import React, { useState,  useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Autocomplete,
  TextField,
  Button,
  Menu,
  MenuItem,
  Box,
  Avatar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune"; 
import { styled, alpha } from "@mui/material/styles";
import WeatherWidget from "../components/WeatherWidget";
import { AuthContext } from "../context/AuthContext";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": { width: "20ch" },
    },
  },
}));

function Header({ onSearch, onClear }) {
  const { user, logout } = useContext(AuthContext);
  const [auth, setAuth] = React.useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null); // For Filter menu
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const tagOptions = ["Food", "Travel", "Technology", "Health"];
  const locationOptions = ["New York", "Los Angeles", "Chicago", "Miami"];

  const handleSearchClick = () => {
    onSearch({
      search: searchQuery,
      tag: selectedTag,
      location: selectedLocation,
    });
    setIsSearching(true);
  };

  const handleClearClick = () => {
    setSearchQuery("");
    setSelectedTag("");
    setSelectedLocation("");
    onClear();
    setIsSearching(false);
  };

  const handleClose = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

 
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            { user && user.name}'s Secret Diary 😲
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}

            />
          </Search>

          <IconButton onClick={handleFilterClick} color="inherit" sx={{ ml: 1 }}>
            <TuneIcon />
          </IconButton>


                      {isSearching && (
              <Button
                onClick={handleClearClick}
                variant="outlined"
                size="medium"
                sx={{
                  ml: 1,
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                Clear
              </Button>
            )}
          <WeatherWidget />

           {/* User Avatar and Menu */}
          {user && (
            <Box>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                sx={{ alignSelf: { xs: "center", sm: "auto" } }}
              >
                <Avatar alt={user.name} src={user.picture} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={userAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(userAnchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>{user.name}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem disableRipple>
          <Box
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
          <Autocomplete
            disablePortal
            options={tagOptions}
            sx={{ width: 200 }}
            value={selectedTag}
            onChange={(e, newValue) => setSelectedTag(newValue || "")}
            onInputChange={(e, newInputValue) => setSelectedTag(newInputValue)}
            renderInput={(params) => <TextField {...params} label="Tag" />}
            freeSolo
          />
          </Box>
        </MenuItem>

        <MenuItem disableRipple>
        <Box
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
          <Autocomplete
            disablePortal
            options={locationOptions}
            sx={{ width: 200 }}
            value={selectedLocation}
            onChange={(e, newValue) => setSelectedLocation(newValue || "")}
            onInputChange={(e, newInputValue) => setSelectedLocation(newInputValue)}
            renderInput={(params) => <TextField {...params} label="Location" />}
            freeSolo
          />
          </Box>
        </MenuItem>

        <MenuItem>
          <Button
            onClick={() => {
              handleSearchClick();
              handleFilterClose();
            }}
            variant="contained"
            size="small"
          >
            Apply
          </Button>
        </MenuItem>
      </Menu>

     
    </>
  );
}

export default Header;
