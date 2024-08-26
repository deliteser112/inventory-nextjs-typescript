import React, { useState } from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import { Product, InventoryChange } from "../../types/product";
import StockAdjustmentSidebar from "../inventory/StockAdjustmentSidebar";
import { useAppDispatch } from "../../store"; // Import the typed useDispatch
import { logInventoryChangeAsync } from "../../store/slices/productSlice"; // Import the async thunk action

interface ProductGeneralInformationProps {
  product: Product;
}

const ProductGeneralInformation: React.FC<ProductGeneralInformationProps> = ({
  product,
}) => {
  const [adjustmentSidebarOpen, setAdjustmentSidebarOpen] = useState(false);
  const dispatch = useAppDispatch(); // Use the typed dispatch

  // Function to open the StockAdjustmentSidebar
  const handleAdjustmentOpen = () => {
    setAdjustmentSidebarOpen(true);
  };

  // Function to close the StockAdjustmentSidebar
  const handleAdjustmentClose = () => {
    setAdjustmentSidebarOpen(false);
  };

  // Function to handle saving an inventory adjustment
  const handleSaveAdjustment = (productId: string, change: InventoryChange) => {
    // Dispatch a Redux action to log the inventory change
    dispatch(logInventoryChangeAsync({ productId, change }));

    setAdjustmentSidebarOpen(false);
  };

  return (
    <Box>
      {/* Divider for styling */}
      <Divider sx={{ backgroundColor: "#2C2C2E", marginBottom: "16px" }} />

      {/* Product Images and Stock Information */}
      <Grid container spacing={2}>
        {/* Product Image Section */}
        <Grid item xs={12} sm={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
            alt={product.name}
            src={product.image || "/images/mock-product.png"} // Use a default image if none exists
          />
        </Grid>

        {/* Stock and Warehouse Information Section */}
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            sx={{ color: "#39DB7D", marginBottom: "16px" }}
          >
            Stock
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "8px" }}>
            Quantity at hand: {product.stock}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: "16px" }}
            onClick={handleAdjustmentOpen} // Open the sidebar on click
          >
            Adjust Stock
          </Button>

          {/* Warehouse details - Adjust based on actual data */}
          <Box>
            {product.inventoryChanges?.map((change, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{ marginBottom: "8px" }}
              >
                {change.location}: {change.newQuantity}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Basic Product Information Section */}
      <Typography variant="h6" sx={{ marginTop: "24px" }}>
        Basic Information
      </Typography>
      <Box sx={{ marginTop: "16px" }}>
        <Typography variant="body2" sx={{ marginBottom: "8px" }}>
          TO BE PACKED: {product.productType}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "8px" }}>
          CATEGORY: {product.category}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "8px" }}>
          BARCODE: {product.sku}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "8px" }}>
          UNIT: Each
        </Typography>
      </Box>

      {/* StockAdjustmentSidebar Component */}
      <StockAdjustmentSidebar
        product={product}
        open={adjustmentSidebarOpen}
        onClose={handleAdjustmentClose}
        onSave={handleSaveAdjustment}
      />
    </Box>
  );
};

export default ProductGeneralInformation;
