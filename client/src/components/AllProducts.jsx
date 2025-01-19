import React, { useState, useEffect } from 'react';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/productsApi/getAllProducts');
      const data = await response.json();
      setProducts(data);
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <img 
            src={`data:image/jpeg;base64,${product.primaryImage}`}
            alt="Primary product"
          />
          
          <div className="additional-images">
            {product.additionalImages.map((image, index) => (
              <img 
                key={index}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Additional image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
