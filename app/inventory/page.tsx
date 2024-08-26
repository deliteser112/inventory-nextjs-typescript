// app/inventory/page.tsx

import React from 'react';
import ProductClientWrapper from '../../src/components/product/ProductClientWrapper';

export default async function InventoryPage() {
  // Fetch data on the server

  // Pass data to the client-side component
  return <ProductClientWrapper />;
}
