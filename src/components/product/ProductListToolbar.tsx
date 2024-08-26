import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ScannerIcon from "@mui/icons-material/QrCodeScanner";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ProductListToolbarProps {
  onSearch: (searchTerm: string) => void;
  onAddProduct: () => void;
}

const ProductListToolbar: React.FC<ProductListToolbarProps> = ({
  onSearch,
  onAddProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
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
      {/* <IconButton sx={{ color: '#39DB7D', marginLeft: '16px', backgroundColor: '#2C2C2E', padding: '8px' }}>
        <ScannerIcon />
      </IconButton> */}
      <IconButton
        sx={{
          color: "#39DB7D",
          marginLeft: "8px",
          backgroundColor: "#2C2C2E",
          padding: "8px",
        }}
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
      >
        <ViewModuleIcon />
      </IconButton>
      <IconButton
        sx={{
          color: "#39DB7D",
          marginLeft: "8px",
          backgroundColor: "#2C2C2E",
          padding: "8px",
        }}
      >
        <MoreVertIcon />
      </IconButton>
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
    </Box>
  );
};

export default ProductListToolbar;
