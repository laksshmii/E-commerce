import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartClicked, setCartClicked] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(["shoes", "slipper", "laptops", "watches"]); // Example categories

  useEffect(() => {
    setTimeout(() => {
      fetch("/products.json")
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            setProducts(data);
            setLoading(false);
            setFilteredProducts(data);
          } catch (error) {
            console.error("Failed to parse JSON:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }, 1500);
  }, []);

  const handleFilterChange = ({ category, priceRange, sortBy }) => {
    let filtered = products;

    // Apply category filter if provided
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Apply price range filter if provided
    if (priceRange) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price.replace("$", ""));
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    // Apply sorting if specified
    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceA - priceB;
      });
    } else if (sortBy === "highToLow") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceB - priceA;
      });
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = () => {
    setCartClicked(true);
    setTimeout(() => setCartClicked(false), 500);
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "16px" }}>
      {/* Banner Section */}
      <Box
        sx={{
          width: "100%",
          height: "200px",
          backgroundImage: "url('/path/to/banner-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            textAlign: "center",
            lineHeight: "200px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            backgroundImage:"url('https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-126800.jpg?ga=GA1.1.781516593.1732700331&semt=ais_hybrid')",
            backgroundSize: "cover", // Ensures the image covers the entire container
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat",
          }}
        >
          Shop Now!
        </Typography>
      </Box>

    
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Filter categories={categories} onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={3}>
            {loading
              ? Array.from(new Array(8)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton height={30} width="80%" />
                    <Skeleton height={20} width="60%" style={{ marginTop: "8px" }} />
                    <Skeleton height={40} width="100%" style={{ marginTop: "16px" }} />
                  </Grid>
                ))
              : filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} onAddToCart={handleAddToCart} cartClicked={cartClicked} />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductListPage;
