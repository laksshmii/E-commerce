import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Slider, Typography, Grid } from "@mui/material";

const Filter = ({ categories, onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    onFilterChange({ category: event.target.value, priceRange, sortBy });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange({ category, priceRange: newValue, sortBy });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    onFilterChange({ category, priceRange, sortBy: event.target.value });
  };

  return (
    <Box sx={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filters
      </Typography>

      <Grid container spacing={2}>
        {/* Category Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategoryChange}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Price Range Filter */}
        <Grid item xs={12} sm={6} md={4}>
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
        </Grid>

        {/* Sort Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filter;
