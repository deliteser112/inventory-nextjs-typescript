// src/components/product/ProductForm.tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Product } from "../../types/product";

interface ProductFormProps {
  product?: Product; // Optional for edit mode
  onSave: (product: Product) => void;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      productType: "Retail",
      retailPrice: 0,
      wholesalePrice: 0,
      status: "In Stock",
    }
  );

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (validateProductData(formData)) {
      onSave(formData);
    }
  };

  const validateProductData = (data: Product) => {
    if (!data.name || !data.price || data.price < 0 || data.stock < 0) {
      alert("Please fill in all required fields correctly.");
      return false;
    }
    return true;
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Product Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="stock"
          label="Stock"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.stock}
          onChange={handleChange}
        />
        {/* Include other necessary fields */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {product ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
