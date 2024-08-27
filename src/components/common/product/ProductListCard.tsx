import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Product } from "../../../types/product";
import { useRouter } from "next/navigation";

const mockImagePath = "/images/mock-product.png";

interface ProductCardProps {
  product: Product;
  onDeleteProduct: (id?: string) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDeleteProduct,
  onProductClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(
    product.image || mockImagePath
  );

  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    router.push(`/inventory/edit-product/${product.id}`);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    onDeleteProduct(product.id);
    handleMenuClose();
  };

  const handleImageError = () => {
    if (imageSrc !== mockImagePath) {
      setImageSrc(mockImagePath);
    }
  };

  const handleCardClick = () => {
    if (!anchorEl) {
      onProductClick(product);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "16px",
        backgroundColor: "#141E22",
        color: "#ffffff",
        transition: "border 0.3s ease",
        border: "1px solid transparent",
        "&:hover": {
          border: "1px solid #39DB7D",
          cursor: "pointer",
        },
        minWidth: 300,
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: 200,
          }}
          image={imageSrc}
          alt={product.name}
          onError={handleImageError}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            backgroundColor: "#000000",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#5d5d5d",
            },
          }}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "16px",
        }}
      >
        <Typography component="div" variant="h6" sx={{ marginBottom: 1 }}>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: "8px" }}
        >
          {product.productType} • {product.status} • {product.stock} in stock
        </Typography>
        <Box sx={{ marginTop: "8px", textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Retail Price: ${Number(product.retailPrice).toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 2 }}
          >
            Wholesale Price: ${Number(product.wholesalePrice).toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
