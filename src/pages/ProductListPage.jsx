import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Skeleton, // Import Skeleton from Material-UI
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { IconButton, Zoom } from "@mui/material";

// Filter Component
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

// LazyImage Component (for lazy loading images)
const LazyImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy" // Native lazy loading for images
    style={{ width: "100%", height: "200px" }}
  />
);

// Product List Page
const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartClicked, setCartClicked] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(["men", "women"]); // Example categories

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      fetch("/products.json")
        .then((response) => response.text()) // Get raw text response
        .then((text) => {
          console.log(text); // Log raw response
          try {
            const data = JSON.parse(text); // Manually parse if it's valid JSON
            setProducts(data);
            setLoading(false);
            setFilteredProducts(data); // Set all products initially
          } catch (error) {
            console.error("Failed to parse JSON:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }, 1500); // Simulated delay of 1.5 seconds
  }, []);

  const handleFilterChange = ({ category, priceRange, sortBy }) => {
    let filtered = products;

    console.log('filtered', filtered);
    console.log('category', category);
    // Filter by category
    if (category) {
      console.log('category', category);
      filtered = filtered.filter((product) => product.category == category);
      setFilteredProducts(filtered);
    }




  };

  const handleAddToCart = () => {
    setCartClicked(true);
    setTimeout(() => setCartClicked(false), 500); // Reset animation after 0.5s
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "16px" }}>
      {/* Header */}
      <Typography variant="h4" component="h1" textAlign="center" sx={{ mb: 4 }}>
        Shop Now
      </Typography>

      {/* Filter Section */}
      <Filter categories={categories} onFilterChange={handleFilterChange} />

      {/* Product Grid */}
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {/* Custom Skeleton for Product Card */}
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton height={30} width="80%" />
                  <Skeleton height={20} width="60%" style={{ marginTop: "8px" }} />
                  <Skeleton height={40} width="100%" style={{ marginTop: "16px" }} />
                </CardContent>
              </Card>
            </Grid>
          ))
          : filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <LazyImage src={product.image} alt={product.name} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary">{product.price}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, position: "relative", overflow: "hidden" }}
                    onClick={handleAddToCart}
                  >
                    <AddShoppingCart />
                    Add to Cart
                    {cartClicked && (
                      <Zoom in={cartClicked} timeout={500}>
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </Zoom>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductListPage;
