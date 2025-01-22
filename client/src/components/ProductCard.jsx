import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import '../styles/products.css';

const ProductCard = ({ product, onOpenModal }) => {
  const typographyStyle = {
    fontSize: '0.9rem',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const iconStyle = {
    fontSize: '1rem',
    strokeWidth: 1
  };

  return (
    <Card className="product-card" style={{ width: '300px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <img
        className="product-image"
        src={`data:image/jpeg;base64,${product.primaryImage}`}
        alt={product.scriptType}
      />
      <CardContent className="product-card-content" style={{ padding: '20px' }}>
        <Typography style={typographyStyle}>
          <ArticleOutlinedIcon sx={iconStyle} />
          <strong>סוג המגילה:</strong> {product.scrollType}
        </Typography>
        <Typography style={typographyStyle}>
          <DriveFileRenameOutlineIcon sx={iconStyle} />
          <strong>סוג הכתב:</strong> {product.scriptType}
        </Typography>
        <Typography style={typographyStyle}>
          <StickyNote2OutlinedIcon sx={iconStyle} />
          <strong>הערות:</strong> {product.note || 'אין הערות'}
        </Typography>
        <Typography style={typographyStyle}>
          <SellOutlinedIcon sx={iconStyle} />
          <strong>מחיר:</strong> {product.price} ₪
        </Typography>
        <Button
          className="details-button"
          onClick={() => onOpenModal(product)}
          variant="outlined"
          color="primary"
        >
          פרטים נוספים
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
