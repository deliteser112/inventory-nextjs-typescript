import { Product } from "../types/product";

export const getChanges = (oldProduct: Product, newProduct: Product): string[] => {
    const changes: string[] = [];

    if (oldProduct.name !== newProduct.name) {
        changes.push(`Changed product name from ${oldProduct.name} to ${newProduct.name}`);
    }
    if (oldProduct.productType !== newProduct.productType) {
        changes.push(`Changed product type from ${oldProduct.productType} to ${newProduct.productType}`);
    }
    if (oldProduct.category !== newProduct.category) {
        changes.push(`Changed category from ${oldProduct.category} to ${newProduct.category}`);
    }
    if (oldProduct.sku !== newProduct.sku) {
        changes.push(`Changed SKU from ${oldProduct.sku} to ${newProduct.sku}`);
    }
    if (oldProduct.description !== newProduct.description) {
        changes.push(`Updated description`);
    }
    if (oldProduct.retailPrice !== newProduct.retailPrice) {
        changes.push(`Changed retail price from $${oldProduct.retailPrice} to $${newProduct.retailPrice}`);
    }
    if (oldProduct.wholesalePrice !== newProduct.wholesalePrice) {
        changes.push(`Changed wholesale price from $${oldProduct.wholesalePrice} to $${newProduct.wholesalePrice}`);
    }
    if (oldProduct.stock !== newProduct.stock) {
        changes.push(`Changed stock from ${oldProduct.stock} to ${newProduct.stock}`);
    }
    if (oldProduct.location !== newProduct.location) {
        changes.push(`Changed location from ${oldProduct.location} to ${newProduct.location}`);
    }

    return changes;
}
