// src/store/slices/productSlice.ts
"use client"

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, InventoryChange } from '../../types/product';
import { getChanges } from '../../utils/getChange';
import { mockProducts } from '../../data/mockProducts'; // Import mock data

// Helper function to sync products with localStorage
const syncWithLocalStorage = (products: Product[]) => {
    localStorage.setItem('products', JSON.stringify(products));
};

// Helper function to load products from localStorage or initialize with mock data
const loadFromLocalStorage = (): Product[] => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        return JSON.parse(storedProducts);
    } else {
        syncWithLocalStorage(mockProducts); // Initial sync if localStorage is empty
        return mockProducts;
    }
};

// Initialize products from localStorage or mock data
let products = loadFromLocalStorage();

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
});

// Add a new product
export const addProductAsync = createAsyncThunk('products/addProduct', async (product: Product) => {
    product.inventoryChanges = []; // Initialize inventoryChanges array
    products.push(product);
    syncWithLocalStorage(products); // Sync with localStorage after adding
    return product;
});

// Update a product
export const updateProductAsync = createAsyncThunk('products/updateProduct', async (updatedProduct: Product) => {
    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
        const previousProduct = products[index];
        const changeDescriptions = getChanges(previousProduct, updatedProduct); // This is an array of strings

        if (changeDescriptions.length > 0) {
            const changeEntry: InventoryChange = {
                date: new Date().toISOString(),
                changeType: 'edit',
                changedBy: 'Admin', // Replace with actual user data if available
                description: changeDescriptions.join('; '), // Join array into a single string
                newQuantity: updatedProduct.stock,
                quantityChanged: updatedProduct.stock - previousProduct.stock,
                location: updatedProduct.location
            };

            const { inventoryChanges } = updatedProduct;

            console.log('updatedProduct.inventoryChanges', inventoryChanges, JSON.stringify(updatedProduct));
            updatedProduct.inventoryChanges = [...(inventoryChanges || []), changeEntry];
        }

        products[index] = updatedProduct;
        syncWithLocalStorage(products); // Sync with localStorage after updating
    }
    return updatedProduct;
});

// Delete a product
export const deleteProductAsync = createAsyncThunk('products/deleteProduct', async (productId: string) => {
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        syncWithLocalStorage(products); // Sync with localStorage after deleting
    }
    return productId;
});

// Log an inventory change
export const logInventoryChangeAsync = createAsyncThunk(
    'products/logInventoryChange',
    async ({ productId, change }: { productId: string; change: InventoryChange }, { getState }) => {
        const state = getState() as { product: ProductState }; // Cast the state to the correct type
        const product = state.product.products.find((p) => p.id === productId); // Find the product in the current state

        if (product) {
            const updatedProduct = {
                ...product,
                inventoryChanges: [...(product.inventoryChanges || []), change],
                stock: change.newQuantity,
            };

            // Update the local `products` array
            const updatedProducts = state.product.products.map(p =>
                p.id === productId ? updatedProduct : p
            );
            syncWithLocalStorage(updatedProducts); // Sync with localStorage after logging inventory change

            return { productId, change }; // Return the change to update the Redux state
        }

        return { productId, change };
    }
);

// Define the initial state using that type
interface ProductState {
    products: Product[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

// Initial state
const initialState: ProductState = {
    products: [],
    status: 'idle',
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                const index = state.products.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.products = state.products.filter((p) => p.id !== action.payload);
            })
            .addCase(logInventoryChangeAsync.fulfilled, (state, action) => {
                const { productId, change } = action.payload;
                const productIndex = state.products.findIndex((p) => p.id === productId);
                if (productIndex !== -1) {
                    const product = state.products[productIndex];
                    state.products[productIndex] = {
                        ...product,
                        inventoryChanges: [...(product.inventoryChanges || []), change],
                        stock: change.newQuantity,
                    };
                }
            });
    },
});

export default productSlice.reducer;
