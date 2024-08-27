"use client";

import React, { useEffect } from "react";
import {
  Drawer,
  List,
  Typography,
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  useMediaQuery,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  filters: any;
  onFilterChange: (newFilters: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  filters,
  onFilterChange,
}) => {  

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    if (!filters.priceType) {
      onFilterChange({ ...filters, priceType: "Retail" });
    }
  }, [filters, onFilterChange]);

  const handleProductTypeChange = (type: string) => {
    onFilterChange({ ...filters, priceType: type });
  };

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    onFilterChange({ ...filters, sortBy: event.target.value as string });
  };

  const handleStockAlertChange = (event: SelectChangeEvent<unknown>) => {
    onFilterChange({ ...filters, stockAlert: event.target.value as string });
  };

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    onFilterChange({ ...filters, category: event.target.value as string });
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, minPrice: event.target.value });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPrice: event.target.value });
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      sx={{
        width: isSmallScreen ? 0 : 340,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 340,
          boxSizing: "border-box",
          backgroundColor: "#1c1c1e",
          color: "#ffffff",
          padding: "16px",
          paddingTop: "72px",
        },
      }}
    >
      <List>
        <Typography variant="h6" gutterBottom>
          Product Type
        </Typography>
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Button
            variant={filters?.priceType === "Retail" ? "contained" : "outlined"}
            sx={{
              borderColor: "#39DB7D",
              color: filters?.priceType === "Retail" ? "#000000" : "#ffffff",
              backgroundColor:
                filters?.priceType === "Retail" ? "#39DB7D" : "transparent",
              width: "48%",
            }}
            onClick={() => handleProductTypeChange("Retail")}
          >
            Retail
          </Button>
          <Button
            variant={
              filters?.priceType === "Wholesale" ? "contained" : "outlined"
            }
            sx={{
              borderColor: "#39DB7D",
              color: filters?.priceType === "Wholesale" ? "#000000" : "#ffffff",
              backgroundColor:
                filters?.priceType === "Wholesale" ? "#39DB7D" : "transparent",
              width: "48%",
            }}
            onClick={() => handleProductTypeChange("Wholesale")}
          >
            Wholesale
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom>
          Sort By
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="sort-by-label">Alphabetical</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            label="Alphabetical"
            value={filters?.sortBy || ""}
            onChange={handleSortChange}
          >
            <MenuItem value="A-Z">A-Z</MenuItem>
            <MenuItem value="Z-A">Z-A</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>
          Stock Alert
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="stock-alert-label">All stock</InputLabel>
          <Select
            labelId="stock-alert-label"
            id="stock-alert-select"
            label="All stock"
            value={filters?.stockAlert || ""}
            onChange={handleStockAlertChange}
          >
            <MenuItem value="All stock">All stock</MenuItem>
            <MenuItem value="Low stock">Low stock</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>
          Category
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">All stock</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            label="All stock"
            value={filters?.category || ""}
            onChange={handleCategoryChange}
          >
            <MenuItem value="All stock">All stock</MenuItem>
            <MenuItem value="Shoes">Shoes</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>
          Price ({filters?.priceType} Price)
        </Typography>
        <TextField
          label={`Minimum price`}
          type="number"
          fullWidth
          margin="normal"
          sx={{ marginBottom: 2 }}
          value={filters?.minPrice || ""}
          onChange={handleMinPriceChange}
        />
        <TextField
          label={`Maximum price`}
          type="number"
          fullWidth
          value={filters?.maxPrice || ""}
          onChange={handleMaxPriceChange}
        />
      </List>
    </Drawer>
  );
};

export default Sidebar;
