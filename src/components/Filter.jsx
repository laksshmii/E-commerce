import React, { useState } from "react";
import { Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Slider } from "@mui/material";

const Filter = ({ categories, onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("");

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, priceRange, sortBy });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange({ category, priceRange: newValue, sortBy });
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    onFilterChange({ category, priceRange, sortBy: newSortBy });
  };

  return (
    <Box sx={{ padding: "16px",  }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
      <Grid  >
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategoryChange}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            max={1000}
            step={10}
          />

          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
      </Grid>
    </Box>
  );
};

export default Filter;
