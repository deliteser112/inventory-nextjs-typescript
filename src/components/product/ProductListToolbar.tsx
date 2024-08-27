import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Stack,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

interface ProductListToolbarProps {
  onSearch: (searchTerm: string) => void;
  onToggleView: (viewType: "list" | "card") => void;
}

const ProductListToolbar: React.FC<ProductListToolbarProps> = ({
  onSearch,
  onToggleView,
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleViewToggle = (type: "list" | "card") => {
    onToggleView(type);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
        backgroundColor: "#1C1C1E",
        padding: "8px 16px",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        [theme.breakpoints.down("md")]: {
          display: "block",
        },
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search product..."
        sx={{
          flex: 1,
          backgroundColor: "#2C2C2E",
          borderRadius: "8px",
          input: { color: "#FFFFFF" },
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginBottom: 2,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#7A7A7A" }} />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <IconButton
            sx={{
              color: "#39DB7D",
              marginLeft: "8px",
              backgroundColor: "#2C2C2E",
              padding: "8px",
            }}
            onClick={() => handleViewToggle("list")}
          >
            <ViewListIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "#39DB7D",
              marginLeft: "8px",
              backgroundColor: "#2C2C2E",
              padding: "8px",
            }}
            onClick={() => handleViewToggle("card")}
          >
            <ViewModuleIcon />
          </IconButton>
        </Box>

        <Link href="/inventory/add-product" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#39DB7D",
              color: "#000000",
              marginLeft: "16px",
              padding: "8px 24px",
              borderRadius: "8px",
            }}
            startIcon={<AddIcon />}
          >
            Add Product
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default ProductListToolbar;
