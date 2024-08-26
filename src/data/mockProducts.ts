import { Product } from "../types/product";
export const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Adidas NEO Light Green',
      description: 'Man Shoes',
      price: 280,
      stock: 12,
      image: '/images/adidas-neo-light-green.png',
      productType: 'Stocked product',
      retailPrice: 280,
      wholesalePrice: 300,
      status: 'Low Stock',
      sku: 'AD-NEO-LG-01',
      category: 'Shoes',
      location: 'Warehouse • BDG',
      inventoryChanges: [
        {
          date: '2024-08-01T10:00:00Z',
          changeType: 'adjustment',
          quantityChanged: 5,
          newQuantity: 17,
          changedBy: 'Admin',
          location: 'Warehouse • BDG',
          description: 'Restocked due to high demand'
        },
        {
          date: '2024-08-10T14:30:00Z',
          changeType: 'edit',
          quantityChanged: 0,
          newQuantity: 17,
          changedBy: 'Admin',
          location: 'Warehouse • JKT',
          description: 'Updated product description and price'
        }
      ]
    },
    {
      id: '2',
      name: 'Nike Air Max 270',
      description: 'Comfortable sports shoes for all-day wear',
      price: 320,
      stock: 50,
      image: '/images/adidas-samba-salsa.png',
      productType: 'Non-stocked product',
      retailPrice: 320,
      wholesalePrice: 350,
      status: 'In Stock',
      sku: 'NIKE-AM-270-02',
      category: 'Shoes',
      location: 'Warehouse • JKT',
      inventoryChanges: [
        {
          date: '2024-07-20T11:00:00Z',
          changeType: 'adjustment',
          quantityChanged: -10,
          newQuantity: 40,
          changedBy: 'Manager',
          location: 'Warehouse • JKT',
          description: 'Removed due to damage'
        },
        {
          date: '2024-08-05T15:45:00Z',
          changeType: 'edit',
          quantityChanged: 0,
          newQuantity: 40,
          location: 'Warehouse • BDG',
          changedBy: 'Admin',
          description: 'Changed product category to Shoes'
        }
      ]
    },
    {
      id: '3',
      name: 'Puma Running Shoes',
      description: 'Lightweight shoes for fast running',
      price: 150,
      stock: 30,
      image: '/images/mock-product.png',
      productType: 'Stocked product',
      retailPrice: 150,
      wholesalePrice: 180,
      status: 'In Stock',
      sku: 'PUMA-RS-03',
      category: 'Shoes',
      location: 'Warehouse • MLG',
      inventoryChanges: [
        {
          date: '2024-08-02T09:15:00Z',
          changeType: 'adjustment',
          quantityChanged: -5,
          newQuantity: 25,
          changedBy: 'Warehouse Staff',
          location: 'Warehouse • MLG',
          description: 'Adjusted due to inventory count mismatch'
        },
        {
          date: '2024-08-12T08:30:00Z',
          changeType: 'edit',
          quantityChanged: 0,
          newQuantity: 25,
          location: 'Warehouse • BDG',
          changedBy: 'Admin',
          description: 'Updated product name and description'
        }
      ]
    },
    // Add more products as needed
  ];