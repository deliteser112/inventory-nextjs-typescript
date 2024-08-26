// src/components/inventory/StockAdjustmentSidebar.tsx

import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product, InventoryChange } from "../../types/product";

interface StockAdjustmentSidebarProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onSave: (productId: string, change: InventoryChange) => void;
}

const StockAdjustmentSidebar: React.FC<StockAdjustmentSidebarProps> = ({
  product,
  open,
  onClose,
  onSave,
}) => {
  const [adjustmentType, setAdjustmentType] = useState<"quantity" | "value">(
    "quantity"
  );
  const [location, setLocation] = useState("Warehouse • BDG");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [reason, setReason] = useState<string>("Stolen Goods");
  const [quantityAvailable, setQuantityAvailable] = useState<number>(
    product.stock
  );
  const [newQuantity, setNewQuantity] = useState<number>(product.stock);
  const [description, setDescription] = useState<string>("");

  const handleSave = () => {
    const change: InventoryChange = {
      date: new Date().toISOString(),
      changeType:
        adjustmentType === "quantity" ? "adjustment" : "value adjustment",
      quantityChanged: newQuantity - quantityAvailable,
      newQuantity: newQuantity,
      changedBy: "Admin", // Replace with dynamic user data if available
      location,
      description
    };

    onSave(product.id, change);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "400px",
          backgroundColor: "#141E22",
          color: "#FFFFFF",
          padding: "24px",
          paddingTop: 12,
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">New Adjustment</Typography>
        <IconButton onClick={onClose} sx={{ color: "#FFFFFF" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: "#2C2C2E", marginBottom: "16px" }} />

      {/* Product Info */}
      <Box display="flex" alignItems="center" mb={2} sx={{ marginBottom: 4 }}>
        <Box
          component="img"
          sx={{
            width: 60,
            height: 60,
            borderRadius: "8px",
            marginRight: "16px",
          }}
          alt={product.name}
          src={product.image}
        />
        <Box>
          <Typography variant="body2">{product.name}</Typography>
          <Typography variant="body2" color="#7A7A7A">
            {product.productType} • {product.status}
          </Typography>
        </Box>
      </Box>

      <TextField
        label="Location"
        select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      >
        <MenuItem value="Warehouse • BDG">Warehouse • BDG</MenuItem>
        <MenuItem value="Warehouse • JKT">Warehouse • JKT</MenuItem>
        <MenuItem value="Warehouse • MLG">Warehouse • MLG</MenuItem>
        {/* Add more locations as needed */}
      </TextField>

      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Reason"
        select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      >
        <MenuItem value="Stolen Goods">Stolen Goods</MenuItem>
        <MenuItem value="Missing Goods">Missing Goods</MenuItem>
        <MenuItem value="Accident">Accident</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField
        label="Quantity Available"
        type="number"
        value={quantityAvailable}
        onChange={(e) => setQuantityAvailable(Number(e.target.value))}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />

      <TextField
        label="New Quantity"
        type="number"
        value={newQuantity}
        onChange={(e) => setNewQuantity(Number(e.target.value))}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />

      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />

      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default StockAdjustmentSidebar;
