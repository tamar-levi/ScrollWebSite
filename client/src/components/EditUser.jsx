import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, deleteUserProducts, updateUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Avatar } from '@mui/material';
import axios from 'axios';

export default function EditUser() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState(user?.city || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    console.log('Attempting to save user data');
    const userData = {};

    if (fullName !== user.fullName) userData.fullName = fullName;
    if (email.toLowerCase() !== user.email.toLowerCase()) userData.email = email;
    if (city !== user.city) userData.city = city;

    if (Object.keys(userData).length === 0) {
      alert('לא בוצע שינוי בשדות');
      console.log('No changes detected');
      setLoading(false);
      return;
    }
    try {
      console.log('Sending data:', userData);
      const response = await axios.put('http://localhost:5000/usersApi/updateUserDetails', userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response received:', response.data);
      if (response.data) {
        dispatch(updateUser(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        alert('הפרטים עודכנו בהצלחה');
        navigate('/account');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      if (err.response && err.response.data === 'Email already exists') {
        setError('המייל כבר קיים, אנא השתמש במייל אחר');
      } else {
        setError('לא הצלחנו לעדכן את הפרטים, נסה שנית');
      }
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async () => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש? המוצרים שלך ימחקו גם כן.')) {
      console.log('User canceled deletion');
      return;
    }

    const token = localStorage.getItem('token');
    console.log('Token before delete request--------------------------:', token);

    try {
      await axios.delete('http://localhost:5000/usersApi/deleteUser', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('User deleted successfully');
      dispatch(deleteUserProducts());
      dispatch(deleteUser());
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('שגיאה במחיקת המשתמש, נסה שנית');
    }
  };

  const handleGoBack = () => {
    console.log('Navigating back to account page');
    navigate('/account');
  };

  return (
    <Box sx={{ width: '400px', margin: 'auto', textAlign: 'center', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
      <Avatar sx={{ width: 60, height: 60, margin: 'auto', bgcolor: 'primary.main' }}>
        {user?.fullName ? user.fullName.charAt(0) : 'א'}
      </Avatar>
      <Typography variant="h6" sx={{ mt: 2 }}>עריכת חשבון</Typography>
      <TextField
        fullWidth
        label="שם מלא"
        value={fullName}
        onChange={(e) => { console.log('Full Name changed:', e.target.value); setFullName(e.target.value); }}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="אימייל"
        value={email}
        onChange={(e) => { console.log('Email changed:', e.target.value); setEmail(e.target.value); }}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="כתובת"
        value={city}
        onChange={(e) => { console.log('City changed:', e.target.value); setCity(e.target.value); }}
        sx={{ mt: 2 }}
      />

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={handleGoBack}>חזרה</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'שומר...' : 'שמירה'}
        </Button>
      </Box>

      <Button
        variant="outlined"
        color="error"
        onClick={(e) => {
          e.preventDefault();
          console.log('Button clicked');
          return false;
        }}
        sx={{ mt: 2 }}
      >
        מחיקת משתמש
      </Button>
    </Box>
  );
}
