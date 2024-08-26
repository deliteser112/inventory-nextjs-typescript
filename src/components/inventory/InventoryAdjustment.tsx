// src/components/inventory/InventoryAdjustment.tsx

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Product, InventoryChange } from "../../types/product";

interface InventoryAdjustmentProps {
  product: Product;
  onAdjust: (productId: string, newStock: number) => void;
}

const InventoryAdjustment: React.FC<InventoryAdjustmentProps> = ({
  product,
  onAdjust,
}) => {
  const [newStock, setNewStock] = useState<number>(product.stock);

  const handleAdjust = () => {
    if (newStock < 0) {
      alert("Stock cannot be negative.");
      return;
    }
    const change: InventoryChange = {
      date: new Date().toISOString(),
      changeType: "adjustment",
      quantityChanged: newStock - product.stock,
      newQuantity: newStock,
      changedBy: "Admin", // Replace with dynamic user data if available
    };

    // Update product's inventory changes (you would do this in a state or API call in a real app)
    product.inventoryChanges = [...(product.inventoryChanges || []), change];

    onAdjust(product.id, newStock);
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body2" sx={{ marginRight: "16px" }}>
        Current Stock: {product.stock}
      </Typography>
      <TextField
        type="number"
        value={newStock}
        onChange={(e) => setNewStock(Number(e.target.value))}
        variant="outlined"
        sx={{ marginRight: "8px" }}
      />
      <Button onClick={handleAdjust} color="primary" variant="contained">
        Adjust
      </Button>
    </Box>
  );
};

export default InventoryAdjustment;
