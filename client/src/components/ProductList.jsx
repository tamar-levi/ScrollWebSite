import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddProduct from './AddProduct'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/productsApi/getAllProducts');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleOpenAddProductModal}>
          להוספת מוצר
        </Button>
      </Stack>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
          justifyContent: 'center',
        }}
      >
        {products.map((product) => (
          <div
            style={{
              width: 'calc(33.33% - 22px)',
              marginBottom: '32px',
            }}
          >
            <ProductCard key={product._id} product={product} onOpenModal={handleOpenModal} />
          </div>
        ))}

        {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}

        {isAddProductModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                minWidth: '300px',
              }}
            >
              <AddProduct onClose={handleCloseAddProductModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
