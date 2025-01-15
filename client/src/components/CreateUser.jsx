import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// קומפוננטת כפתורים לפתיחה של חלוניות
const ActionButtons = ({ onOpenCreateUser, onOpenLogin }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
      <Button variant="contained" color="primary" onClick={onOpenCreateUser}>
        יצירת משתמש
      </Button>
      <Button variant="contained" color="primary" onClick={onOpenLogin}>
        התחברות
      </Button>
    </Box>
  );
};

const CreateUser = () => {
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

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        fullName,
        displayName,
        phone,
        additionalPhone,
        email,
        city,
        password
      });
      const token = response.data.token;
      console.log('Received token:', token);
      document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;
      console.log('User created:', response.data);
      handleCloseCreateUserDialog();
      setFullName('');
      setDisplayName('');
      setPhone('');
      setAdditionalPhone('');
      setEmail('');
      setCity('');
      setPassword('');

    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: loginUsername,
        password: loginPassword
      });
      console.log('Login successful:', response.data);
      handleCloseLoginDialog();
      setLoginUsername('');
      setLoginPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleOpenCreateUserDialog = () => {
    setOpenCreateUserDialog(true);
  };

  const handleCloseCreateUserDialog = () => {
    setOpenCreateUserDialog(false);
  };

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <ActionButtons onOpenCreateUser={handleOpenCreateUserDialog} onOpenLogin={handleOpenLoginDialog} />

      {/* חלונית יצירת משתמש */}
      <Dialog open={openCreateUserDialog} onClose={handleCloseCreateUserDialog}>
        <DialogTitle>יצירת משתמש</DialogTitle>
        <DialogContent sx={{ direction: 'rtl' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3,
              padding: 2,
              width: '300px'
            }}
          >
            <form onSubmit={handleCreateUserSubmit} style={{ width: '100%' }}>
              <TextField
                label="שם מלא"
                variant="outlined"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                sx={{ mb: 1, fontSize: '0.875rem' }}
              />
              <TextField
                label="שם תצוגה"
                variant="outlined"
                fullWidth
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                sx={{ mb: 1, fontSize: '0.875rem' }}
              />
              <TextField
                label="מספר פלאפון"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                type="tel"
                sx={{ mb: 1, fontSize: '0.875rem' }}
              />
              <TextField
                label="מספר נוסף (אופציונלי)"
                variant="outlined"
                fullWidth
                value={additionalPhone}
                onChange={(e) => setAdditionalPhone(e.target.value)}
                type="tel"
                sx={{ mb: 1, fontSize: '0.875rem' }}
              />
              <TextField
                label="כתובת אימייל"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                sx={{ mb: 1, fontSize: '0.875rem' }}
              />
              <TextField
                label="עיר"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                sx={{ mb: 1, fontSize: '0.875rem' }}
              />
              <TextField
                label="סיסמא"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                sx={{ mb: 2, fontSize: '0.875rem' }}
              />
              <DialogActions>
                <Button onClick={handleCloseCreateUserDialog} color="primary">
                  סגור
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  צור משתמש
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* חלונית התחברות */}
      <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog}>
        <DialogTitle>התחברות</DialogTitle>
        <DialogContent sx={{ direction: 'rtl' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3,
              padding: 2,
              width: '300px'
            }}
          >
            <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
              <TextField
                label="שם משתמש"
                variant="outlined"
                fullWidth
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                sx={{ mb: 1, fontSize: '0.875rem' }}
              />
              <TextField
                label="סיסמא"
                variant="outlined"
                fullWidth
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                type="password"
                sx={{ mb: 1, fontSize: '0.875rem' }}
              />
              <DialogActions>
                <Button onClick={handleCloseLoginDialog} color="primary">
                  סגור
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  התחבר
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CreateUser;
