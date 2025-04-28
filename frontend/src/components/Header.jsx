import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function Header() {
   const { user, logout } = useContext(AuthContext);
   const [auth, setAuth] = React.useState(true);
   const [anchorEl, setAnchorEl] = React.useState(null);
 
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Aiden Dickson's Secret Diary 😮
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* Show the user's name at the top */}
              <MenuItem disabled>{user.name}</MenuItem>
          
              {/* Logout button */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
          
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
 

  // return (
  //   <header style={styles.header}>
  //     <h1>ThoughtStream 📝</h1>
  //     {user && (
  //       <div style={styles.userInfo}>
  //         <img src={user.picture} alt="Profile" style={styles.avatar} />
  //         <span style={styles.name}>{user.name}</span>
  //         <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
  //       </div>
  //     )}
  //   </header>
  // );
}

// const styles = {
//   header: {
//     padding: "10px 20px",
//     backgroundColor: "#4a90e2",
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   userInfo: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },
//   avatar: {
//     width: "35px",
//     height: "35px",
//     borderRadius: "50%",
//   },
//   name: {
//     fontWeight: "bold",
//   },
//   logoutButton: {
//     padding: "6px 12px",
//     backgroundColor: "#ff4d4d",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   }
// };

export default Header;
