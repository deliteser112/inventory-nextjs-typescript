"use client";

import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { addProductAsync } from "../../../src/store/slices/productSlice";
import { AppDispatch } from "../../../src/store";

import { Product } from "../../../src/types/product";
import ImageUploader from "../../../src/components/product/ImageUploader";

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#0F171A",
  color: "#ffffff",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: "#141E22",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2E414D",
    },
    "&:hover fieldset": {
      borderColor: "#39DB7D",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#39DB7D",
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#141E22",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2E414D",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#39DB7D",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#39DB7D",
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#39DB7D",
  color: "#ffffff",
  marginTop: theme.spacing(3),
  "&:hover": {
    backgroundColor: "#32C46A",
  },
}));

// Validation schema
const validationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  productType: yup.string().required("Product type is required"),
  category: yup.string().required("Category is required"),
  sku: yup.string().required("SKU is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  retailPrice: yup
    .number()
    .required("Retail price is required")
    .min(0, "Price cannot be negative"),
  wholesalePrice: yup
    .number()
    .required("Wholesale price is required")
    .min(0, "Price cannot be negative"),
  stock: yup
    .number()
    .required("Total quantity is required")
    .min(0, "Quantity cannot be negative"),
});

const AddProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      name: "",
      productType: "",
      category: "",
      sku: "",
      description: "",
      retailPrice: 0,
      wholesalePrice: 0,
      stock: 0,
      image: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const product: Product = {
        ...values,
        id: String(Date.now()),
        status: "active",
        inventoryChanges: [],
        price: 0
      };

      // dispatch({
      //   type: "ADD_PRODUCT",
      //   product,
      // });
      dispatch(addProductAsync(product));
      formik.resetForm();
    },
  });

  return (
    <PageContainer maxWidth="md" margin="auto">
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Add New Product
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {/* General Information Section */}
        <SectionTitle variant="h6">General Information</SectionTitle>
        <Stack sx={{ marginBottom: "20px" }} spacing={4}>
          <StyledTextField
            label="Product Name"
            name="name"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "10px" }}
            >
              <InputLabel>Product Type</InputLabel>
              <StyledSelect
                name="productType"
                value={formik.values.productType}
                onChange={formik.handleChange}
                label="Product Type"
                error={
                  formik.touched.productType &&
                  Boolean(formik.errors.productType)
                }
              >
                <MenuItem value="Stocked product">Stocked product</MenuItem>
                <MenuItem value="Non-stocked product">
                  Non-stocked product
                </MenuItem>
              </StyledSelect>
              {formik.touched.productType && formik.errors.productType && (
                <Typography color="error">
                  {formik.errors.productType}
                </Typography>
              )}
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "10px" }}
            >
              <InputLabel>Product Category</InputLabel>
              <StyledSelect
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                label="Product Category"
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                <MenuItem value="Shoes">Shoes</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
              </StyledSelect>
              {formik.touched.category && formik.errors.category && (
                <Typography color="error">{formik.errors.category}</Typography>
              )}
            </FormControl>
          </Stack>
          <StyledTextField
            label="Product SKU"
            name="sku"
            variant="outlined"
            fullWidth
            value={formik.values.sku}
            onChange={formik.handleChange}
            error={formik.touched.sku && Boolean(formik.errors.sku)}
            helperText={formik.touched.sku && formik.errors.sku}
          />
          <StyledTextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Stack>

        {/* Image Upload Section */}
        <SectionTitle variant="h6">Images</SectionTitle>
        <ImageUploader
          onImageSelect={(image: any) => formik.setFieldValue("image", image)}
        />

        {/* Sales Information Section */}
        <SectionTitle variant="h6">Sales Information</SectionTitle>
        <Stack sx={{ marginBottom: "20px" }} spacing={4}>
          <StyledTextField
            label="Retail Sale Price"
            name="retailPrice"
            type="number"
            variant="outlined"
            fullWidth
            value={formik.values.retailPrice}
            onChange={formik.handleChange}
            error={
              formik.touched.retailPrice && Boolean(formik.errors.retailPrice)
            }
            helperText={formik.touched.retailPrice && formik.errors.retailPrice}
          />
          <StyledTextField
            label="Wholesale Sale Price"
            name="wholesalePrice"
            type="number"
            variant="outlined"
            fullWidth
            value={formik.values.wholesalePrice}
            onChange={formik.handleChange}
            error={
              formik.touched.wholesalePrice &&
              Boolean(formik.errors.wholesalePrice)
            }
            helperText={
              formik.touched.wholesalePrice && formik.errors.wholesalePrice
            }
          />
        </Stack>

        {/* Quantity & Reorder Section */}
        <SectionTitle variant="h6">Quantity</SectionTitle>
        <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          >
            <InputLabel>Location</InputLabel>
            <StyledSelect
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              label="Location"
              error={formik.touched.location && Boolean(formik.errors.location)}
            >
              <MenuItem value="Wharehouse * BDG">Wharehouse * BDG</MenuItem>
              <MenuItem value="Wharehouse * JKT">Wharehouse * JKT</MenuItem>
              <MenuItem value="Wharehouse * MLG">Wharehouse * MLG</MenuItem>
            </StyledSelect>
            {formik.touched.location && formik.errors.location && (
              <Typography color="error">{formik.errors.location}</Typography>
            )}
          </FormControl>
          <StyledTextField
            label="Total Quantity"
            name="stock"
            type="number"
            variant="outlined"
            fullWidth
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />
        </Stack>
        <SaveButton type="submit">Save Product</SaveButton>
      </form>
    </PageContainer>
  );
};

export default AddProductPage;
