"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

interface TopbarProps {
  onMenuClick: () => void; // Prop to handle menu click
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#1c1c1e",
      }}
    >
      <Toolbar>
        {/* Menu button for mobile view */}
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        
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
