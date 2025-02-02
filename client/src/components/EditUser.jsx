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
    const userData = { fullName, email, city };
    try {
      const response = await axios.put('http://localhost:5000/usersApi/updateUserDetails', userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        dispatch(updateUser(response.data));
        alert('הפרטים עודכנו בהצלחה');
        navigate('/account');
      }
    } catch (err) {
      setError('לא הצלחנו לעדכן את הפרטים, נסה שנית');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש?')) {
      try {
        const response = await axios.delete('http://localhost:5000/usersApi/deleteUser', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status === 200) {
          dispatch(deleteUserProducts());
          dispatch(deleteUser());
          localStorage.removeItem('token'); // מחיקת הטוקן מהזיכרון
          alert('מחיקת המשתמש בוצעה בהצלחה');
          navigate('/');
        } else {
          alert('שגיאה במחיקת המשתמש');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('שגיאה במחיקת המשתמש, נסה שוב מאוחר יותר');
      }
    }
  };

  const handleGoBack = () => {
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
        onChange={(e) => setFullName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="כתובת"
        value={city}
        onChange={(e) => setCity(e.target.value)}
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

      <Button variant="outlined" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
        מחיקת משתמש
      </Button>
    </Box>
  );
}
