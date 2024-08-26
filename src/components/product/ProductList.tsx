// src/components/product/ProductList.tsx

import React from "react";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../types/product";

interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onProductClick,
}) => {
  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
          onProductClick={onProductClick}
        />
      ))}
    </Box>
  );
};

export default ProductList;
