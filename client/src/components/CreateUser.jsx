import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();

  // State variables
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalPhone, setAdditionalPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Handlers for creating a user
  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/usersApi/addUser', {
        fullName,
        displayName,
        phone,
        additionalPhone,
        email,
        city,
        password,
      });
      const token = response.data.token;
      document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;
      alert('משתמש נוצר בהצלחה!');
      handleCloseCreateUserDialog();
      navigate('/products'); 
    } catch (error) {
      console.error('Error creating user:', error);
      alert('שגיאה ביצירת המשתמש');
    }
  };

  // Handlers for login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/usersApi/loginUser', {
        username: loginUsername,
        password: loginPassword,
      });
      alert('התחברות הצליחה!');
      handleCloseLoginDialog();
      navigate('/products'); 
    } catch (error) {
      console.error('Error logging in:', error);
      alert('שגיאה בהתחברות');
    }
  };

  // Handlers for dialogs
  const handleOpenCreateUserDialog = () => setOpenCreateUserDialog(true);
  const handleCloseCreateUserDialog = () => setOpenCreateUserDialog(false);
  const handleOpenLoginDialog = () => setOpenLoginDialog(true);
  const handleCloseLoginDialog = () => setOpenLoginDialog(false);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Buttons to open dialogs */}
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateUserDialog}
          sx={{ fontWeight: 'bold', boxShadow: 3 }}
        >
          יצירת משתמש
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenLoginDialog}
          sx={{ fontWeight: 'bold', boxShadow: 3 }}
        >
          התחברות
        </Button>
      </Box>

      {/* Dialog for creating a user */}
      <Dialog open={openCreateUserDialog} onClose={handleCloseCreateUserDialog}>
        <DialogTitle>יצירת משתמש</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleCreateUserSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField label="שם מלא" fullWidth value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <TextField
              label="שם תצוגה"
              fullWidth
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <TextField
              label="מספר פלאפון"
              fullWidth
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <TextField
              label="מספר נוסף (אופציונלי)"
              fullWidth
              type="tel"
              value={additionalPhone}
              onChange={(e) => setAdditionalPhone(e.target.value)}
            />
            <TextField
              label="כתובת אימייל"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="עיר"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              autoComplete="off"
            />

            <TextField
              label="סיסמא"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <DialogActions>
              <Button onClick={handleCloseCreateUserDialog}>סגור</Button>
              <Button type="submit" variant="contained" color="primary">
                צור משתמש
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog for login */}
      <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog}>
        <DialogTitle>התחברות</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="שם משתמש"
              fullWidth
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              required
            />
            <TextField
              label="סיסמא"
              fullWidth
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <DialogActions>
              <Button onClick={handleCloseLoginDialog}>סגור</Button>
              <Button type="submit" variant="contained" color="secondary">
                התחבר
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CreateUser;
