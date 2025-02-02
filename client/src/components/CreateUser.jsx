import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CloseIcon from '@mui/icons-material/Close';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import BadgeIcon from '@mui/icons-material/Badge';

const CreateUser = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    phoneNumber: '',
    additionalPhone: '',
    email: '',
    city: '',
    password: '',
    isSeller: false,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUserSubmit = async (e) => {
    if (!formData.fullName || !formData.password || !formData.email || !formData.city || !formData.phoneNumber || !formData.displayName) {
      setSnackbar({ open: true, message: 'נא למלא את כל השדות', severity: 'error' });
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/usersApi/addUser', formData);
      const token = response.data.token;
      document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;
      dispatch(setUser(response.data.user));
      setSnackbar({ open: true, message: 'משתמש נוצר בהצלחה!', severity: 'success' });
      onClose();
      navigate('/products');
    } catch (error) {
      console.error('Error creating user:', error);
      setSnackbar({ open: true, message: 'שגיאה ביצירת המשתמש', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 2 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            יצירת משתמש חדש
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box component="form" onSubmit={handleCreateUserSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                name="fullName"
                label="שם מלא"
                value={formData.fullName}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1, fontSize: '20px' }}/> }}
              />
              <TextField
                name="displayName"
                label="שם תצוגה"
                value={formData.displayName}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{ startAdornment: <BadgeIcon sx={{ mr: 1, fontSize: '20px' }} />
              }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                name="phoneNumber"
                label="מספר טלפון"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{ startAdornment: <PhoneIcon sx={{ mr: 1, fontSize: '20px' }} /> }}
              />
              <TextField
                name="additionalPhone"
                label="טלפון נוסף (אופציונלי)"
                type="tel"
                value={formData.additionalPhone}
                onChange={handleChange}
                fullWidth
                InputProps={{ startAdornment: <ContactPhoneIcon sx={{ mr: 1, fontSize: '20px' }} /> }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                name="email"
                label="דואר אלקטרוני"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1, fontSize: '20px' }} /> }}
              />
              <TextField
                name="city"
                label="עיר"
                value={formData.city}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{ startAdornment: <LocationCityIcon sx={{ mr: 1, fontSize: '20px' }} /> }}
              />
            </Box>

            <TextField
              name="password"
              label="סיסמא"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{ startAdornment: <LockIcon sx={{ mr: 1, fontSize: '20px' }} /> }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'flex-start', p: 2 }}>
          <Button onClick={onClose} variant="outlined">
            ביטול
          </Button>
          <Button onClick={handleCreateUserSubmit} variant="contained" color="primary">
            צור משתמש
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateUser;
