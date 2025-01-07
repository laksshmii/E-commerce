import React, { useState } from "react";
import { Box, Grid, Typography, FormControl, Select, MenuItem, Slider, Button } from "@mui/material";

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

  const handleReset = () => {
    const defaultCategory = "";
    const defaultPriceRange = [0, 500];
    const defaultSortBy = "";

    setCategory(defaultCategory);
    setPriceRange(defaultPriceRange);
    setSortBy(defaultSortBy);

    onFilterChange({
      category: defaultCategory,
      priceRange: defaultPriceRange,
      sortBy: defaultSortBy,
    });
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Category
          </Typography>
          <FormControl fullWidth>
            <Select value={category} onChange={handleCategoryChange} displayEmpty>
              <MenuItem value="">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
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

        <Grid item xs={12}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Sort By
          </Typography>
          <FormControl fullWidth>
            <Select value={sortBy} onChange={handleSortChange} displayEmpty>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            color="primary"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filter;
