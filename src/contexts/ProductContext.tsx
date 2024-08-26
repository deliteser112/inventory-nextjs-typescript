// src/contexts/ProductContext.tsx
"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Product, InventoryChange } from "../types/product";
// import { getChanges } from "../utils/getChanges";
import { getChanges } from "../utils/getChange";
import { mockProducts } from "../data/mockProducts"; // Import mock data

// Define Actions
type ProductAction =
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "UPDATE_PRODUCT"; product: Product }
  | { type: "DELETE_PRODUCT"; id: string }
  | { type: "INITIALIZE_PRODUCTS"; products: Product[] }
  | {
      type: "LOG_INVENTORY_CHANGE";
      productId: string;
      change: InventoryChange;
    };

// Define State
interface ProductState {
  products: Product[];
}

// Initialize State
const initialState: ProductState = {
  products: [],
};

// Reducer Function
const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "INITIALIZE_PRODUCTS":
      return { ...state, products: action.products };
    case "ADD_PRODUCT":
      const newProductsAfterAdd = [...state.products, action.product];
      console.log("action.product", action.product);
      localStorage.setItem("products", JSON.stringify(newProductsAfterAdd));
      return { ...state, products: newProductsAfterAdd };
    case "UPDATE_PRODUCT":
      const existingProduct = state.products.find(
        (product) => product.id === action.product.id
      );

      if (!existingProduct) {
        return state; // Product not found, no action needed
      }

      // Get descriptions for changes
      const changes = getChanges(existingProduct, action.product);

      // Create change entries
      const changeEntries: InventoryChange[] = changes.map((change) => ({
        date: new Date().toISOString(),
        changeType: "edit",
        changedBy: "Admin", // Replace with dynamic user data if available
        description: change,
        newQuantity: action.product.stock,
      }));

      // Update product with new changes
      const updatedProduct: Product = {
        ...action.product,
        inventoryChanges: [
          ...(action.product.inventoryChanges || []),
          ...changeEntries,
        ],
      };

      const newProductsAfterUpdate = state.products.map((product) =>
        product.id === action.product.id ? updatedProduct : product
      );

      localStorage.setItem("products", JSON.stringify(newProductsAfterUpdate));
      return { ...state, products: newProductsAfterUpdate };
    case "DELETE_PRODUCT":
      const newProductsAfterDelete = state.products.filter(
        (product) => product.id !== action.id
      );
      localStorage.setItem("products", JSON.stringify(newProductsAfterDelete));
      return { ...state, products: newProductsAfterDelete };
    case "LOG_INVENTORY_CHANGE":
      const updatedProductsAfterLog = state.products.map((product) =>
        product.id === action.productId
          ? {
              ...product,
              inventoryChanges: [
                ...(product.inventoryChanges || []),
                action.change,
              ],
              stock: action.change.newQuantity,
            }
          : product
      );
      localStorage.setItem("products", JSON.stringify(updatedProductsAfterLog));
      return { ...state, products: updatedProductsAfterLog };
    default:
      return state;
  }
};

// Context Creation
const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
}>({ state: initialState, dispatch: () => null });

// Provider Component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const localData = localStorage.getItem("products");
    if (localData) {
      dispatch({
        type: "INITIALIZE_PRODUCTS",
        products: JSON.parse(localData),
      });
    } else {
      // If no data in localStorage, initialize with mock data
      localStorage.setItem("products", JSON.stringify(mockProducts));
      dispatch({ type: "INITIALIZE_PRODUCTS", products: mockProducts });
    }
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook for Convenience
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
