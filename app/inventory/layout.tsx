import React from "react";
import { Box } from "@mui/material";

import Sidebar from "../../src/components/layout/Sidebar";
import Topbar from "../../src/components/layout/Topbar";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}
      >
        {children}
      </Box>
    </Box>
  );
}
