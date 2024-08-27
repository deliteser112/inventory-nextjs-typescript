"use client";

import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductListToolbar from "./ProductListToolbar";
import ProductDetailsSidebar from "./ProductDetailsSidebar";
import Sidebar from "../../components/layout/Sidebar";
import { useProductContext } from "../../contexts/ProductContext";
import { Product } from "../../types/product";

const ProductClientWrapper: React.FC = () => {
  const { state, dispatch } = useProductContext();
  const { products } = state;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [viewType, setViewType] = useState<"list" | "card">("list");
  const [filters, setFilters] = useState({
    productType: "",
    sortBy: "A-Z",
    stockAlert: "All stock",
    category: "All stock",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCTS_START" });
    try {
      const storedProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      dispatch({ type: "FETCH_PRODUCTS_SUCCESS", products: storedProducts });
    } catch (error) {
      dispatch({
        type: "FETCH_PRODUCTS_FAILURE",
        error: "Failed to fetch products",
      });
    }
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.productType) {
      filtered = filtered.filter(
        (product) => product.productType === filters.productType
      );
    }

    if (filters.category && filters.category !== "All stock") {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.stockAlert === "Low stock") {
      filtered = filtered.filter((product) => product.stock < 10);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.retailPrice >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => product.retailPrice <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.sortBy === "A-Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleDeleteProduct = (id?: string) => {
    dispatch({ type: "DELETE_PRODUCT", productId: id });
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

  const handleToggleView = (type: "list" | "card") => {
    setViewType(type);
  };

  return (
    <div>
      <ProductListToolbar
        onSearch={handleSearch}
        onToggleView={handleToggleView}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <ProductList
        products={filteredProducts}
        onDeleteProduct={handleDeleteProduct}
        onProductClick={handleProductClick}
        viewType={viewType}
      />
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
