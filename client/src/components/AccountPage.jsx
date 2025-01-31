import React, { useState, useEffect } from 'react';
import EditUserCard from './EditUserCard';
import { Box, Typography, Button, TextField } from '@mui/material';

const AccountPage = () => {
  const [user, setUser] = useState(null); // מאחסן את פרטי המשתמש
  const [isEditing, setIsEditing] = useState(false); // מצב עריכה

  // קריאה ל-API כדי לקבל את פרטי המשתמש
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/usersApi/currentUser', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // כאן תוכל להוסיף קריאה ל-API כדי לשמור את השינויים ב-DB
    setIsEditing(false);
  };

  if (!user) return <div>Loading...</div>; // אם הנתונים עדיין לא התקבלו

  return (
    <Box sx={{ padding: 2, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        חשבון שלי
      </Typography>
      {isEditing ? (
        <div>
          <TextField
            label="שם מלא"
            defaultValue={user.fullName}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="מייל"
            defaultValue={user.email}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="כתובת"
            defaultValue={user.address}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button onClick={handleSaveClick} variant="contained" color="primary">
            שמור שינויים
          </Button>
        </div>
      ) : (
        <EditUserCard user={user} onOpenEditModal={handleEditClick} />
      )}
    </Box>
  );
};

export default AccountPage;
