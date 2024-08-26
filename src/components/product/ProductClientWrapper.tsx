// src/components/product/ProductClientWrapper.tsx
"use client";

import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductListToolbar from "./ProductListToolbar";
import ProductForm from "./ProductForm";
import ProductDetailsSidebar from "./ProductDetailsSidebar";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector and useDispatch from react-redux
import { RootState, AppDispatch } from "../../store"; // Import RootState and AppDispatch types
import {
  fetchProducts,
  addProductAsync,
  updateProductAsync,
  deleteProductAsync,
} from "../../store/slices/productSlice"; // Import async thunks

import { Product } from "../../types/product";

const ProductClientWrapper: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product); // Use useSelector to access products from Redux store

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products on component mount
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products); // Update filtered products whenever products change
  }, [products]);

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
      dispatch(updateProductAsync(product)); // Dispatch async thunk for updating product
    } else {
      const newProduct = { ...product, id: Date.now().toString() };
      dispatch(addProductAsync(newProduct)); // Dispatch async thunk for adding new product
    }
    setOpenForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProductAsync(id)); // Dispatch async thunk for deleting product
    setSidebarOpen(false);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
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
