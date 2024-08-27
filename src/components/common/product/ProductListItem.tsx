import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Divider,
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
  const theme = useTheme();
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
        flexDirection: { xs: "column", sm: "row" },
        marginBottom: "16px",
        backgroundColor: "#141E22",
        color: "#ffffff",
        transition: "border 0.3s ease",
        border: "1px solid transparent",
        "&:hover": {
          border: "1px solid #39DB7D",
          cursor: "pointer",
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", sm: 80 },
          height: 80,
          borderRadius: "12px",
        }}
        image={imageSrc}
        alt={product.name}
        onError={handleImageError}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          marginLeft: { xs: 0, sm: "16px" },
          justifyContent: "center",
          alignItems: { xs: "center", sm: "flex-start" },
          textAlign: { xs: "center", sm: "left" },
          padding: { xs: "16px", sm: "0" },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            padding: 0,
            "&.MuiCardContent-root": {
              paddingBottom: "0px !important",
            },
            [theme.breakpoints.down("md")]: {
              display: "block",
            },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: 520 } }}>
            <Typography component="div" variant="h6" sx={{ marginBottom: 1 }}>
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginBottom: "8px" }}
            >
              {product.productType} • {product.status} • {product.stock} in
              stock
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ margin: "0 40px", display: { xs: "none", sm: "block" } }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
            }}
          >
            <Box
              sx={{
                marginRight: { sm: 3, xs: 0 },
                marginBottom: { xs: 2, sm: 0 },
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Retail Price:
              </Typography>
              <Typography variant="h6">
                ${Number(product.retailPrice).toFixed(2)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Wholesale Price:
              </Typography>
              <Typography variant="h6">
                ${Number(product.wholesalePrice).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
      <Box>
        <IconButton
          sx={{ color: "#ffffff" }}
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
    </Card>
  );
};

export default ProductCard;
