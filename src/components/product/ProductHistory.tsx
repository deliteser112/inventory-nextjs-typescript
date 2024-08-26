import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Product, InventoryChange } from "../../types/product";
import { styled } from "@mui/material/styles";

// Define a type for the change history
type ProductChange = InventoryChange & {
  changeType: string;
  description?: string;
};

// Styled components for history items
const HistoryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#7A7A7A",
  },
  "&:last-child:before": {
    bottom: "50%",
  },
}));

const Dot = styled(Box)(({ theme }) => ({
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  position: "absolute",
  left: -8,
  top: 16,
}));

const ProductHistory: React.FC<{ product: Product }> = ({ product }) => {
  const historyItems: ProductChange[] = product.inventoryChanges || [];

  return (
    <Box>
      {historyItems.map((item, index) => (
        <HistoryItem key={index}>
          <Dot />
          <Avatar
            src="/path/to/user.jpg" // Replace with actual avatar path or user data
            alt={item.changedBy}
            sx={{ width: 40, height: 40, marginRight: "16px" }}
          />
          <Box>
            <Typography variant="body2" sx={{ color: "#7A7A7A" }}>
              {new Date(item.date).toLocaleString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              {item.changeType === "adjustment"
                ? `Adjusted stock to ${item.newQuantity}`
                : item.description || "Product edited"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#7A7A7A" }}>
              {item.changedBy}
            </Typography>
          </Box>
        </HistoryItem>
      ))}
    </Box>
  );
};

export default ProductHistory;
