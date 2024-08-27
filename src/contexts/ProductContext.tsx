"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Product, InventoryChange } from "../types/product";
import { detectChanges } from "../utils/detectChanges";
import { mockProducts } from "../data/mockProducts";

// Define the state and action types
interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

type Action =
  | { type: "FETCH_PRODUCTS_START" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; products: Product[] }
  | { type: "FETCH_PRODUCTS_FAILURE"; error: string }
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "UPDATE_PRODUCT"; updatedProduct: Product }
  | { type: "DELETE_PRODUCT"; productId?: string }
  | {
      type: "LOG_INVENTORY_CHANGE";
      productId: string;
      change: InventoryChange;
    };

// Helper function to sync products with localStorage
const syncWithLocalStorage = (products: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products));
  }
};

// Helper function to load products from localStorage or initialize with mock data
const loadFromLocalStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      return JSON.parse(storedProducts);
    } else {
      syncWithLocalStorage(mockProducts);
      return mockProducts;
    }
  }
  return mockProducts;
};

// Initial state
const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

const productReducer = (state: ProductState, action: Action): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS_START":
      return { ...state, status: "loading", error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, status: "idle", products: action.products };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, status: "failed", error: action.error };
    case "ADD_PRODUCT":
      const newProducts = [...state.products, action.product];
      syncWithLocalStorage(newProducts);
      return { ...state, products: newProducts };
    case "UPDATE_PRODUCT": {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.updatedProduct.id
      );
      if (productIndex !== -1) {
        const oldProduct = state.products[productIndex];
        const detectedChanges = detectChanges(
          oldProduct,
          action.updatedProduct
        );

        const updatedProduct: Product = {
          ...action.updatedProduct,
          inventoryChanges: [
            ...(oldProduct.inventoryChanges || []),
            ...detectedChanges,
          ],
        };

        const updatedProducts = state.products.map((product, index) =>
          index === productIndex ? updatedProduct : product
        );

        syncWithLocalStorage(updatedProducts);
        return { ...state, products: updatedProducts };
      }
      return state;
    }
    case "DELETE_PRODUCT":
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.productId
      );
      syncWithLocalStorage(filteredProducts);
      return { ...state, products: filteredProducts };
    case "LOG_INVENTORY_CHANGE": {
      const prodIndex = state.products.findIndex(
        (product) => product.id === action.productId
      );
      if (prodIndex !== -1) {
        const product = state.products[prodIndex];
        const updatedProduct: Product = {
          ...product,
          inventoryChanges: [
            ...(product.inventoryChanges || []),
            action.change,
          ],
          stock: action.change.newQuantity,
        };
        const newProductList = state.products.map((p, index) =>
          index === prodIndex ? { ...updatedProduct } : p
        );
        syncWithLocalStorage(newProductList);
        return { ...state, products: newProductList };
      }
      return state;
    }
    default:
      return state;
  }
};

const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const productsFromLocalStorage = loadFromLocalStorage();
    dispatch({
      type: "FETCH_PRODUCTS_SUCCESS",
      products: productsFromLocalStorage,
    });
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
