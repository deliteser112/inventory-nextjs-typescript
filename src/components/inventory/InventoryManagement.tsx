// src/components/inventory/InventoryManagement.tsx

import React from "react";
import InventoryAdjustment from "./InventoryAdjustment";
import { Product } from "../../types/product";

interface InventoryManagementProps {
  products: Product[];
  onAdjustInventory: (productId: string, newStock: number) => void;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({
  products,
  onAdjustInventory,
}) => {
  return (
    <div>
      {products.map((product) => (
        <InventoryAdjustment
          key={product.id}
          product={product}
          onAdjust={onAdjustInventory}
        />
      ))}
    </div>
  );
};

export default InventoryManagement;
