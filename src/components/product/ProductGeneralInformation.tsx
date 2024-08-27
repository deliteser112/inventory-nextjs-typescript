// src/components/product/ProductGeneralInformation.tsx
import React, { useState } from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import { Product, InventoryChange } from "../../types/product";
import StockAdjustmentSidebar from "../inventory/StockAdjustmentSidebar";
import { useProductContext } from "../../contexts/ProductContext"; // Import the context hook

interface ProductGeneralInformationProps {
  product: Product;
}

const ProductGeneralInformation: React.FC<ProductGeneralInformationProps> = ({
  product,
}) => {
  const [adjustmentSidebarOpen, setAdjustmentSidebarOpen] = useState(false);
  const { dispatch } = useProductContext();

  const handleAdjustmentOpen = () => {
    setAdjustmentSidebarOpen(true);
  };

  const handleAdjustmentClose = () => {
    setAdjustmentSidebarOpen(false);
  };

  const handleSaveAdjustment = (productId: string, change: InventoryChange) => {
    dispatch({ type: "LOG_INVENTORY_CHANGE", productId, change });

    setAdjustmentSidebarOpen(false);
  };

  return (
    <Box>
      <Divider sx={{ backgroundColor: "#2C2C2E", marginBottom: "16px" }} />

      <Grid container spacing={2}>
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
            src={product.image || "/images/mock-product.png"}
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
            onClick={handleAdjustmentOpen}
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
