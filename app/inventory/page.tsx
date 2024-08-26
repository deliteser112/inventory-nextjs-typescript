// app/inventory/page.tsx

import React from 'react';
import ProductClientWrapper from '../../src/components/product/ProductClientWrapper';
import productService from '../../src/services/productService';
import { Product } from '../../src/types/product';

export default async function InventoryPage() {
  // Fetch data on the server
  // const products: Product[] = await productService.getProducts();

  // Pass data to the client-side component
  return <ProductClientWrapper />;
}
