import React from "react";
import { Card, CardContent, Button, Typography, IconButton, Zoom } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import LazyImage from "./LazyImage";

const ProductCard = ({ product, onAddToCart, cartClicked }) => (
  <Card sx={{
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }
  }}>
    <LazyImage src={product.image} alt={product.name} />
    <CardContent>
      <Typography variant="h6">{product.name}</Typography>
      <Typography color="text.secondary">{product.price}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, position: "relative", overflow: "hidden" }}
        onClick={onAddToCart}
      >
        <AddShoppingCart />
        Add to Cart
        {cartClicked && (
          <Zoom in={cartClicked} timeout={500}>
            <IconButton sx={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)"
            }} />
          </Zoom>
        )}
      </Button>
    </CardContent>
  </Card>
);

export default ProductCard;
