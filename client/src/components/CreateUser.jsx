import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ open, onClose }) => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/usersApi/addUser', formData);
      const token = response.data.token;
      document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;
      alert('משתמש נוצר בהצלחה!');
      onClose();
      navigate('/products');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('שגיאה ביצירת המשתמש');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        יצירת משתמש חדש
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleCreateUserSubmit}
          sx={{ mt: 2 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              name="fullName"
              label="שם מלא"
              value={formData.fullName}
              onChange={handleChange}
              required
              sx={{ width: '48%' }}
            />
            <TextField
              name="displayName"
              label="שם תצוגה"
              value={formData.displayName}
              onChange={handleChange}
              required
              sx={{ width: '48%' }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              name="phoneNumber"
              label="מספר טלפון"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              sx={{ width: '48%' }}
            />
            <TextField
              name="additionalPhone"
              label="טלפון נוסף (אופציונלי)"
              type="tel"
              value={formData.additionalPhone}
              onChange={handleChange}
              sx={{ width: '48%' }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              name="email"
              label="דואר אלקטרוני"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ width: '48%' }}
            />
            <TextField
              name="city"
              label="עיר"
              value={formData.city}
              onChange={handleChange}
              required
              sx={{ width: '48%' }}
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
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          ביטול
        </Button>
        <Button onClick={handleCreateUserSubmit} variant="contained" color="primary">
          צור משתמש
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUser;
