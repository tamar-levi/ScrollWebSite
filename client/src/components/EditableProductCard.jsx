import React from 'react';
import { Card, CardContent, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const EditableProductCard = ({ product, onOpenEditModal, onDelete }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/productsApi/deleteProduct/${product._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        onDelete(product._id);
        setOpenDialog(false);
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`שגיאה במחיקת המוצר`);
    }
};

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
    <>
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
          <Box display="flex" gap={2}>
  <Button
    className="edit-button"
    onClick={() => onOpenEditModal(product)}
    variant="outlined"
    color="primary"
    endIcon={<EditIcon />}
    sx={{ '& .MuiButton-endIcon': { marginRight: '8px', marginLeft: 0 } }}
  >
    עריכת מוצר
  </Button>

  <Button
    className="delete-button"
    onClick={handleDeleteClick}
    variant="outlined"
    color="error"
    endIcon={<DeleteIcon />}
    sx={{ '& .MuiButton-endIcon': { marginRight: '8px', marginLeft: 0 } }}
  >
    מחיקה
  </Button>
</Box>

        </CardContent>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        dir="rtl"
      >
        <DialogTitle>אישור מחיקה</DialogTitle>
        <DialogContent>
          האם אתה בטוח שברצונך למחוק מוצר זה?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            ביטול
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditableProductCard;
