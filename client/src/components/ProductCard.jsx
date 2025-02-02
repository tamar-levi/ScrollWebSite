import React from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

const ProductCard = ({ product, onOpenModal }) => {
  const typographyStyle = {
    fontSize: '0.9rem',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textAlign: 'right' 
  };

  const iconStyle = {
    fontSize: '1rem',
    strokeWidth: 1
  };

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '300px' },
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto', 
        direction: 'rtl' 
      }}
    >
      <Box
        component="img"
        src={`data:image/jpeg;base64,${product.primaryImage}`}
        alt={product.scriptType}
        sx={{
          width: '100%',
          height: { xs: '150px', sm: '200px' },
          objectFit: 'cover'
        }}
      />
      <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography sx={typographyStyle}>
          <ArticleOutlinedIcon sx={iconStyle} />
          <strong>סוג המגילה:</strong> {product.scrollType}
        </Typography>
        <Typography sx={typographyStyle}>
          <DriveFileRenameOutlineIcon sx={iconStyle} />
          <strong>סוג הכתב:</strong> {product.scriptType}
        </Typography>
        <Typography sx={typographyStyle}>
          <StickyNote2OutlinedIcon sx={iconStyle} />
          <strong>הערות:</strong> {product.note || 'אין הערות'}
        </Typography>
        <Typography sx={typographyStyle}>
          <SellOutlinedIcon sx={iconStyle} />
          <strong>מחיר:</strong> {product.price} ₪
        </Typography>
        <Button
          onClick={() => onOpenModal(product)}
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 1 }} 
        >
          פרטים נוספים
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
