import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FilterComponent from './FilterComponent';
import { Alert } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/productsApi/getAllProducts');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); 
      } catch (error) {
        console.error('Failed to fetch products:', error);
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
      const isFontTypeMatch = fontType ? product.scriptType == fontType : true;
      const isScrollTypeMatch = scrollType ? product.scrollType == scrollType : true;
      return isPriceInRange && isFontTypeMatch && isScrollTypeMatch;
    });

    setFilteredProducts(filtered);
    setNoProducts(filtered.length === 0); 
  };

  return (
    <>
      <Stack spacing={2} direction="row" marginTop={8}>
        <Button variant="outlined" onClick={() => navigate('/add-product')} startIcon={<AddBoxIcon />}>
          להוספת מוצר
        </Button>
      </Stack>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            maxWidth: '80%',
            justifyContent: 'center',
          }}
        >
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
                        width: '100%',
                      }}
                    >
                      לא נמצאו מוצרים מתאימים
                    </Alert>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                style={{
                  width: 'calc(33.33% - 22px)',
                  marginBottom: '32px',
                }}
              >
                <ProductCard product={product} onOpenModal={handleOpenModal} />
              </div>
            ))
          )}
          {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
        </div>
        <FilterComponent onFilter={handleFilter} />
      </div>
    </>
  );
};

export default ProductList;