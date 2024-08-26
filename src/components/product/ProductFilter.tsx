import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface ProductFilterProps {
  onFilter: (filter: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleFilterSubmit = () => {
    onFilter(filter);
  };

  return (
    <div style={{ display: "flex", marginBottom: "16px" }}>
      <TextField
        label="Filter by Name"
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        sx={{ marginRight: "16px" }}
      />
      <Button variant="contained" color="primary" onClick={handleFilterSubmit}>
        Apply Filter
      </Button>
    </div>
  );
};

export default ProductFilter;
