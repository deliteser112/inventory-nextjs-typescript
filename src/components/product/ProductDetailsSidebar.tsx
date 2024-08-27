import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ProductHistory from "./ProductHistory";
import ProductGeneralInformation from "./ProductGeneralInformation";
import { Product } from "../../types/product";

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
}> = ({ open, onClose, children }) => {
  const theme = useTheme();

  return (
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
          [theme.breakpoints.down("md")]: {
            width: 320,
          },
        },
      }}
    >
      {children}
    </Drawer>
  );
};

const DrawerHeader: React.FC<{ product: Product; onClose: () => void }> = ({
  product,
  onClose,
}) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <Typography variant="h6">{product.name}</Typography>
    <Box display="flex" alignItems="center">
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
      disableRipple
    />
    <Tab
      value="history"
      label="History"
      sx={{ color: selectedTab === "history" ? "#39DB7D" : "#FFFFFF" }}
      disableRipple
    />
  </Tabs>
);

export default ProductDetailsSidebar;
