import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';

const EditProductModal = ({ open, onClose, product }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/productsApi/updateProductsDetails/${editedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedProduct)
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update product');
      }
  
      console.log('Product updated successfully:', responseData);
      window.location.reload();
      onClose();
  
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`שגיאה בעדכון המוצר`);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>עריכת מוצר</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            name="scrollType"
            label="סוג המגילה"
            value={editedProduct.scrollType}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="scriptType"
            label="סוג הכתב"
            value={editedProduct.scriptType}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="note"
            label="הערות"
            value={editedProduct.note}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            name="price"
            label="מחיר"
            value={editedProduct.price}
            onChange={handleChange}
            fullWidth
            type="number"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          שמור שינויים
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
