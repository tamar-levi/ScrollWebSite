import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FilterComponent from './FilterComponent';
import { Alert, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [noProducts, setNoProducts] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/productsApi/getAllProducts');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleFilter = ({ priceRange, fontType, scrollType }) => {
    const filtered = products.filter((product) => {
      const isPriceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const normalizedProductFont = product.scriptType?.replace(/['"]/g, '');
      const normalizedFilterFont = fontType?.replace(/['"]/g, '');
      const isFontTypeMatch = fontType ? normalizedProductFont === normalizedFilterFont : true;
      const isScrollTypeMatch = scrollType ? product.scrollType === scrollType : true;
      return isPriceInRange && isFontTypeMatch && isScrollTypeMatch;
    });

    setFilteredProducts(filtered);
    setNoProducts(filtered.length === 0);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filteredProducts]);

  return (
    <>
      <Box sx={{ marginTop: 8, marginRight: '20%' }}>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={() => navigate('/add-product')} startIcon={<AddIcon />}>
            פרסם את המגילה שלך
          </Button>
        </Stack>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Box sx={{ padding: '20px', marginRight: '20%' }}>
        {noProducts ? (
          <Alert
            severity="warning"
            sx={{
              marginBottom: 2,
              width: '100%',
              maxWidth: '600px',
              direction: 'rtl',
              '& .MuiAlert-icon': {
                marginRight: 2,
                marginLeft: 2
              },
            }}
          >
            לא נמצאו מוצרים מתאימים
          </Alert>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              maxWidth: '100%',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'start',
              '@media (max-width: 1200px)': {
                gridTemplateColumns: 'repeat(2, 1fr)',
              },
              '@media (max-width: 600px)': {
                gridTemplateColumns: '1fr',
              },
            }}
          >
            {filteredProducts.map((product) => (
              <Box key={product._id} sx={{ marginBottom: 2 }}>
                <ProductCard product={product} onOpenModal={handleOpenModal} />
              </Box>
            ))}
          </Box>
        )}
        {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
      </Box>
      <FilterComponent onFilter={handleFilter} products={products} />
    </>
  );
};

export default ProductList;
