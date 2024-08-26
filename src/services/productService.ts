import { Product, InventoryChange } from "../types/product";
import { mockProducts } from "../data/mockProducts";
import { getChangeDescription } from "../utils/getChange";

// Helper function to sync products with localStorage
const syncWithLocalStorage = (products: Product[]) => {
    localStorage.setItem("products", JSON.stringify(products));
};

// Helper function to load products from localStorage or initialize with mock data
const loadFromLocalStorage = (): Product[] => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
        return JSON.parse(storedProducts);
    } else {
        syncWithLocalStorage(mockProducts); // Initial sync if localStorage is empty
        return mockProducts;
    }
};

// Initialize products from localStorage or mock data
let products = loadFromLocalStorage();

const productService = {
    getProducts: async (): Promise<Product[]> => {
        // Fetch products from localStorage
        return new Promise((resolve) => setTimeout(() => resolve(products), 1000));
    },

    getProductById: async (id: string): Promise<Product | null> => {
        // Simulate an API call to fetch a product by ID
        return new Promise((resolve) =>
            setTimeout(() => resolve(products.find((product) => product.id === id) || null), 1000)
        );
    },

    addProduct: async (product: Product): Promise<Product> => {
        // Simulate an API call to add a product
        product.inventoryChanges = []; // Initialize inventoryChanges array
        products.push(product);
        syncWithLocalStorage(products); // Sync with localStorage after adding
        return product;
    },

    updateProduct: async (product: Product): Promise<Product> => {
        // Simulate an API call to update a product
        const index = products.findIndex((p) => p.id === product.id);

        console.log('index', index);
        
        if (index !== -1) {
            // Capture the previous state of the product for change tracking
            const previousProduct = products[index];
    
            // Generate a description of what changed
            const changeDescription = getChangeDescription(previousProduct, product);
            
            // Add a new history entry if there are any changes
            if (changeDescription) {
                const changeEntry: InventoryChange = {
                    date: new Date().toISOString(),
                    changeType: "edit", // You can specify more granular types if needed
                    changedBy: "Admin", // Replace with the actual user performing the change
                    description: changeDescription,
                    newQuantity: product.stock // Assume stock could be one of the changes
                    ,
                    quantityChanged: 0,
                    location: ""
                };
                product.inventoryChanges = [...(product.inventoryChanges || []), changeEntry];
            }
    
            // Update the product in the list
            products[index] = product;
    
            // Sync with localStorage after updating
            syncWithLocalStorage(products); 
    
            return product;
        }
        return null as any;
    },

    deleteProduct: async (id: string): Promise<void> => {
        // Simulate an API call to delete a product
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            syncWithLocalStorage(products); // Sync with localStorage after deleting
        }
    },

    logInventoryChange: async (productId: string, change: InventoryChange): Promise<void> => {
        // Find the product by ID
        const product = products.find((p) => p.id === productId);
        if (product) {
            // Add the new inventory change to the product's inventoryChanges array
            product.inventoryChanges = product.inventoryChanges || [];
            product.inventoryChanges.push(change);

            // Update the product stock based on the change
            product.stock = change.newQuantity;

            syncWithLocalStorage(products); // Sync with localStorage after logging inventory change

            // Simulate an API response delay
            return new Promise((resolve) => setTimeout(resolve, 1000));
        }
    },
};

export default productService;
