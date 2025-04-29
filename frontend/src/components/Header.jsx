import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from '@mui/material/Button';
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import WeatherWidget from "../components/WeatherWidget";

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterBy, setFilterBy] = React.useState("");
  const [entries, setEntries] = React.useState([]);
  const tagOptions = ["Food", "Travel", "Technology", "Health"];
  const locationOptions = ["New York", "Los Angeles", "Chicago", "Miami"];
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  
  
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { token } = useContext(AuthContext);


  const handleSearch = async () => {
    try {
    
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedTag) params.tag = selectedTag;
      if (selectedLocation) params.location = selectedLocation;
  
      console.log("Token being sent:", token);

      const response = await axios.get("http://localhost:5000/api/diary", {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log("Entries:", response.data);
  
      setEntries(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };


  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {user && user.name}'s Secret Diary 😮
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </Search>
          <WeatherWidget/>
          <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSearch}
              sx={{ ml: 2 }}
            >
              Search
            </Button>

          <Autocomplete
            disablePortal
            id="tag-filter"
            options={tagOptions}
            sx={{ width: 150, ml: 2 }}
            value={selectedTag}
            onChange={(event, newValue) => {
              setSelectedTag(newValue || "");
            }}
            renderInput={(params) => <TextField {...params} label="Tag" />}
            freeSolo
          />

          <Autocomplete
            disablePortal
            id="location-filter"
            options={locationOptions}
            sx={{ width: 150, ml: 2 }}
            value={selectedLocation}
            onChange={(event, newValue) => {
              setSelectedLocation(newValue || "");
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
            freeSolo
          />

          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={user.name} src={user.picture} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>{user.name}</MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
