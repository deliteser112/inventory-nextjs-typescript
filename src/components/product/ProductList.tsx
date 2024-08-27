import React from "react";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProductListCard from "../common/product/ProductListCard";
import ProductListItem from "../common/product/ProductListItem";
import { Product } from "../../types/product";

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id?: string) => void;
  onProductClick: (product: Product) => void;
  viewType: "list" | "card";
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onDeleteProduct,
  onProductClick,
  viewType,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      {viewType === "card" ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ [theme.breakpoints.down("md")]: { justifyContent: "center" } }}
        >
          {products.map((product) => (
            <Grid item sm={12} md={6} lg={6} xl={3} key={product.id}>
              <ProductListCard
                product={product}
                onDeleteProduct={onDeleteProduct}
                onProductClick={onProductClick}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            onDeleteProduct={onDeleteProduct}
            onProductClick={onProductClick}
          />
        ))
      )}
    </Box>
  );
};

export default ProductList;
