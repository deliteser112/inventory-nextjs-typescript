"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Sidebar from "../../src/components/layout/Sidebar";
import Topbar from "../../src/components/layout/Topbar";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    productType: "Retail",
    sortBy: "A-Z",
    stockAlert: "All stock",
    category: "All stock",
    minPrice: "",
    maxPrice: "",
    priceType: "Retail",
  });

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar onMenuClick={handleMenuClick} />
      <Sidebar
        open={isSidebarOpen}
        onClose={handleSidebarClose}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px",
          [theme.breakpoints.down("md")]: { p: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
