// src/components/product/ProductClientWrapper.tsx
"use client";

import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductListToolbar from "./ProductListToolbar";
import ProductForm from "./ProductForm";
import ProductDetailsSidebar from "./ProductDetailsSidebar";
import InventoryManagement from "../inventory/InventoryManagement";
import { useProductContext } from "../../contexts/ProductContext"; // Use context hook
import productService from '../../services/productService';

import { Product, InventoryChange } from "../../types/product";;

const ProductClientWrapper: React.FC = () => {

  const { state, dispatch } = useProductContext(); // Access state and dispatch from context
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  console.log('state', state);

  useEffect(() => {
    setFilteredProducts([...state.products]);
  }, [state])

  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setOpenForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (product.id) {
      dispatch({ type: "UPDATE_PRODUCT", product });
    } else {
      const newProduct = { ...product, id: Date.now().toString() };
      dispatch({ type: "ADD_PRODUCT", product: newProduct });
    }
    setOpenForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", id });
    setSidebarOpen(false);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = state.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAdjustInventory = (productId: string, newStock: number) => {
    const change: InventoryChange = {
      date: new Date().toISOString(),
      changeType: "adjustment",
      quantityChanged:
        newStock - (state.products.find((p) => p.id === productId)?.stock ?? 0),
      newQuantity: newStock,
      changedBy: "Admin",
    };
    dispatch({ type: "LOG_INVENTORY_CHANGE", productId, change });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      <ProductListToolbar
        onSearch={handleSearch}
        onAddProduct={handleAddProduct}
      />
      <ProductList
        products={filteredProducts}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onProductClick={handleProductClick}
      />
      {/* <InventoryManagement
        products={state.products}
        onAdjustInventory={handleAdjustInventory}
      /> */}
      {openForm && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={() => setOpenForm(false)}
        />
      )}
      {selectedProduct && (
        <ProductDetailsSidebar
          product={selectedProduct}
          open={sidebarOpen}
          onClose={handleSidebarClose}
        />
      )}
    </div>
  );
};

export default ProductClientWrapper;
