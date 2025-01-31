import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import ImageSlider from './ImageSlider';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DrawIcon from '@mui/icons-material/Draw';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SellerDetailsModal from './SellerDetailsModal';

const ProductModal = ({ product, onClose }) => {
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  const buttonStyle = {
    border: '1px solid #1976d2',
    color: '#1976d2',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
      border: '1px solid #1976d2',
    },
    marginLeft: '16px',
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 500,
    '& .MuiButton-endIcon': {
      marginRight: '4px',
      marginLeft: '-4px',
    },
  };

  const handleSellerDetailsClick = () => {
    setIsSellerModalOpen(true);
  };

  const handleSellerModalClose = () => {
    setIsSellerModalOpen(false);
  };

  return (
    <>
      <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
        <DialogTitle sx={{ textAlign: 'right' }}>
          {product.title}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} sx={{ textAlign: 'right' }}>
            <ImageSlider images={[product.primaryImage, ...product.additionalImages]} />
            <Typography variant="body1" paragraph>
              {product.note}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PriceCheckIcon /> מחיר: {product.price} ₪
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DrawIcon /> סוג הכתב: {product.scriptType}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoStoriesIcon /> סוג המגילה: {product.scrollType}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2, gap: 2 }}>
          <Button variant="outlined" sx={{ ...buttonStyle }} endIcon={<PersonIcon />} onClick={handleSellerDetailsClick}>
            פרטי המוכר
          </Button>
          <Button onClick={onClose} variant="outlined" sx={{ ...buttonStyle }} endIcon={<CloseIcon />}>
            סגור
          </Button>
        </DialogActions>
      </Dialog>
      <SellerDetailsModal sellerId={product.userId} isOpen={isSellerModalOpen} onClose={handleSellerModalClose} />
    </>
  );
};

export default ProductModal;
