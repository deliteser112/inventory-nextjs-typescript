import React from 'react';
import { Drawer, List, ListItem, Typography, FormControl, Button, Select, MenuItem, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 420,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 420,
          boxSizing: 'border-box',
          backgroundColor: '#1c1c1e',
          color: '#ffffff',
          padding: '16px',
          paddingTop: '64px'
        },
      }}
    >
      <List>
        <Typography variant="h6" gutterBottom>Product Status</Typography>
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Button variant="contained" sx={{ backgroundColor: '#39DB7D', width: '48%' }}>All</Button>
          <Button variant="contained" sx={{ backgroundColor: '#39DB7D', width: '48%' }}>Active</Button>
        </Box>
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Button variant="outlined" sx={{ borderColor: '#39DB7D', color: '#ffffff', width: '48%' }}>Inactive</Button>
          <Button variant="outlined" sx={{ borderColor: '#39DB7D', color: '#ffffff', width: '48%' }}>Draft</Button>
        </Box>

        <Typography variant="h6" gutterBottom>Product Type</Typography>
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Button variant="outlined" sx={{ borderColor: '#39DB7D', color: '#ffffff', width: '48%' }}>Retail</Button>
          <Button variant="outlined" sx={{ borderColor: '#39DB7D', color: '#ffffff', width: '48%' }}>Wholesale</Button>
        </Box>

        <Typography variant="h6" gutterBottom>Sort By</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="sort-by-label">Alphabetical</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            label="Alphabetical"
            defaultValue="A-Z"
          >
            <MenuItem value="A-Z">A-Z</MenuItem>
            <MenuItem value="Z-A">Z-A</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>Stock Alert</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="stock-alert-label">All stock</InputLabel>
          <Select
            labelId="stock-alert-label"
            id="stock-alert-select"
            label="All stock"
            defaultValue="All stock"
          >
            <MenuItem value="All stock">All stock</MenuItem>
            <MenuItem value="Low stock">Low stock</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>Category</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">All stock</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            label="All stock"
            defaultValue="All stock"
          >
            <MenuItem value="All stock">All stock</MenuItem>
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>Price</Typography>
        <TextField
          label="Minimum price"
          type="number"
          fullWidth
          margin="normal"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Maximum price"
          type="number"
          fullWidth
        />
      </List>
    </Drawer>
  );
};

export default Sidebar;
