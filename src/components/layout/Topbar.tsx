"use client"

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Topbar: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#1c1c1e",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Inventory Management
        </Typography>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
