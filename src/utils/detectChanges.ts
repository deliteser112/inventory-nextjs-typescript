import { Product, InventoryChange } from "../types/product";

export const detectChanges = (oldProduct: Product, newProduct: Product): InventoryChange[] => {
  const changes: InventoryChange[] = [];

  const createChange = (description: string) => ({
    date: new Date().toISOString(),
    changeType: 'edit',
    changedBy: 'Admin',
    description,
    newQuantity: newProduct.stock,
    quantityChanged: 0,
    location: newProduct.location
  });

  if (oldProduct.name !== newProduct.name) {
    changes.push(createChange(`Changed product name from ${oldProduct.name} to ${newProduct.name}`));
  }

  if (oldProduct.productType !== newProduct.productType) {
    changes.push(createChange(`Changed product type from ${oldProduct.productType} to ${newProduct.productType}`));
  }

  if (oldProduct.category !== newProduct.category) {
    changes.push(createChange(`Changed category from ${oldProduct.category} to ${newProduct.category}`));
  }

  if (oldProduct.sku !== newProduct.sku) {
    changes.push(createChange(`Changed SKU from ${oldProduct.sku} to ${newProduct.sku}`));
  }

  if (oldProduct.description !== newProduct.description) {
    changes.push(createChange(`Updated description`));
  }

  if (oldProduct.retailPrice !== newProduct.retailPrice) {
    changes.push(createChange(`Changed retail price from $${oldProduct.retailPrice} to $${newProduct.retailPrice}`));
  }

  if (oldProduct.wholesalePrice !== newProduct.wholesalePrice) {
    changes.push(createChange(`Changed wholesale price from $${oldProduct.wholesalePrice} to $${newProduct.wholesalePrice}`));
  }

  if (oldProduct.stock !== newProduct.stock) {
    changes.push(createChange(`Changed stock from ${oldProduct.stock} to ${newProduct.stock}`));
  }

  if (oldProduct.location !== newProduct.location) {
    changes.push(createChange(`Changed location from ${oldProduct.location} to ${newProduct.location}`));
  }

  return changes;
};
