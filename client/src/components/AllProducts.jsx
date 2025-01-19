import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // המוצר שנבחר להרחבה

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

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // לא מציג חצים (אם תרצי חצים, תוכלי לשנות ל-true)
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
      {products.map((product) => (
        <Card key={product._id} style={{ width: '300px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          {/* תמונה ראשית */}
          <img
            src={`data:image/jpeg;base64,${product.primaryImage}`}
            alt={product.scriptType}
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
          />

          {/* פרטים בסיסיים */}
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {product.scrollType} - {product.scriptType}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '8px' }}>
              {product.note ? product.note : 'אין הערות'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              מחיר: {product.price} ₪
            </Typography>
            <Button onClick={() => handleOpenModal(product)} variant="outlined" color="primary" fullWidth>
              פרטים נוספים
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* מודל להצגת פרטים נוספים */}
      {selectedProduct && (
        <Dialog open={true} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>{selectedProduct.scrollType} - {selectedProduct.scriptType}</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* קרוסלה להצגת תמונות נוספות */}
              {selectedProduct.additionalImages?.length > 0 ? (
                <Slider {...sliderSettings}>
                  {selectedProduct.additionalImages.map((image, index) => (
                    <div key={index}>
                      <img
                        src={`data:image/jpeg;base64,${image}`}
                        alt={`${selectedProduct.title} - Image ${index + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '4px',
                          marginBottom: '10px',
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  אין תמונות נוספות
                </Typography>
              )}

              {/* תיאור מורחב */}
              <Typography variant="body1" paragraph>
                {selectedProduct.note}
              </Typography>

              {/* פרטים נוספים */}
              <Typography variant="body2" color="textSecondary">
                <strong>מחיר:</strong> {selectedProduct.price} ₪
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>סוג המגילה:</strong> {selectedProduct.scriptType}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>סוג הקטגוריה:</strong> {selectedProduct.scrollType}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} variant="contained" color="secondary">
              סגור
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ProductDisplay;
