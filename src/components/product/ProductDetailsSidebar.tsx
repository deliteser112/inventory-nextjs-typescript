import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Switch,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductHistory from "./ProductHistory";
import ProductGeneralInformation from "./ProductGeneralInformation";
import StockAdjustmentSidebar from "../inventory/StockAdjustmentSidebar";
import { Product, InventoryChange } from "../../types/product";
import { useProductContext } from "../../contexts/ProductContext";

interface ProductDetailsSidebarProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

const ProductDetailsSidebar: React.FC<ProductDetailsSidebarProps> = ({
  product,
  open,
  onClose,
}) => {
  const [selectedTab, setSelectedTab] = useState("general");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <ProductDrawer open={open} onClose={onClose}>
        <DrawerHeader product={product} onClose={onClose} />
        <ProductTabs selectedTab={selectedTab} onChange={handleTabChange} />
        <Divider sx={{ backgroundColor: "#2C2C2E", marginBottom: "16px" }} />
        {selectedTab === "general" ? (
          <ProductGeneralInformation product={product} />
        ) : (
          <ProductHistory product={product} />
        )}
      </ProductDrawer>
    </>
  );
};

const ProductDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, onClose, children }) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: "500px",
        backgroundColor: "#141E22",
        color: "#FFFFFF",
        padding: "24px",
        paddingTop: 12,
      },
    }}
  >
    {children}
  </Drawer>
);

const DrawerHeader: React.FC<{ product: Product; onClose: () => void }> = ({
  product,
  onClose,
}) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <Typography variant="h6">{product.name}</Typography>
    <Box display="flex" alignItems="center">
      <Typography variant="body2" sx={{ marginRight: "8px" }}>
        Active
      </Typography>
      <Switch checked={true} />
      <Button variant="contained" color="primary" sx={{ marginLeft: "8px" }}>
        Edit
      </Button>
      <IconButton onClick={onClose} sx={{ color: "#FFFFFF" }}>
        <CloseIcon />
      </IconButton>
    </Box>
  </Box>
);

const ProductTabs: React.FC<{
  selectedTab: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
}> = ({ selectedTab, onChange }) => (
  <Tabs value={selectedTab} onChange={onChange} sx={{ marginBottom: "16px" }}>
    <Tab
      value="general"
      label="General Information"
      sx={{ color: selectedTab === "general" ? "#39DB7D" : "#FFFFFF" }}
    />
    <Tab
      value="history"
      label="History"
      sx={{ color: selectedTab === "history" ? "#39DB7D" : "#FFFFFF" }}
    />
  </Tabs>
);

export default ProductDetailsSidebar;
