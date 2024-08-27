# Inventory Management System

The Inventory Management System is a web application designed to help businesses manage their inventory effectively. It allows users to add, edit, delete, and track products, adjust stock levels, and view a comprehensive history of inventory changes.

## Features

- **Add, Edit, Delete Products**: Easily manage your product list with CRUD operations.
- **Stock Adjustment**: Adjust product stock levels with detailed logging of changes.
- **Product Filtering and Sorting**: Filter products by type, category, stock levels, and more.
- **Inventory History**: Track changes over time with a detailed history log.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Next.js, Material-UI
- **State Management**: Context API with React Hooks
- **Backend**: Mock server with JSON data (can be replaced with any backend server)
- **Local Storage**: For data persistence in the browser
- **TypeScript**: For type-safe JavaScript development

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/deliteser112/inventory-nextjs-typescript.git
   cd inventory-nextjs-typescript
   ```

2. **Install Dependencies**: Use `npm` to install the project dependencies.
   ```bash
   npm install
   ```

3. **Run the Development Server**: Start the application in development mode.
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

- **Add a New Product**: Click the 'Add Product' button in the toolbar, fill in the product details, and save.
- **Edit or Delete a Product**: Use the 'Edit' or 'Delete' options in the product card menu.
- **Adjust Stock Levels**: Click on a product to open the Stock Adjustment Sidebar, adjust the quantity, and save changes.
- **View Product History**: Click on a product to view its detailed history of changes.

## Components Overview

### Product Management Components
- **ProductCard.tsx**: Displays product details in a card format with options to edit or delete.
- **ProductList.tsx**: Lists all products in either a card or list view based on user selection.
- **ProductListItem.tsx**: Represents a product in list view.
- **ProductForm.tsx**: Form for adding or editing product details.
- **ImageUploader.tsx**: Component for uploading and previewing product images.
- **ProductClientWrapper.tsx**: Wrapper component handling state and logic for product management.
- **ProductHistory.tsx**: Displays the change history of a selected product.
- **StockAdjustmentSidebar.tsx**: Sidebar for adjusting stock levels and adding inventory changes.

### Layout Components
- **Topbar.tsx**: Top navigation bar.
- **Sidebar.tsx**: Sidebar with filtering and sorting options.

### Context and State Management
- **ProductContext.tsx**: Provides global state management for products using React Context API.
