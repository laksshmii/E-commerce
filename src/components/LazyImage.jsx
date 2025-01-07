import React from "react";

const LazyImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy" 
    style={{ width: "100%", height: "200px" }}
  />
);

export default LazyImage;
