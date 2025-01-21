import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log('טוקן גוגל התקבל:', response.access_token);
        
        const serverResponse = await axios.post('http://localhost:5000/usersApi/google-login', {
          googleToken: response.access_token
        });
        
        console.log('תשובה מהשרת:', serverResponse.data);
        localStorage.setItem('token', serverResponse.data.token);
        navigate('/products');
        
      } catch (error) {
        console.error('פרטי השגיאה:', error.response?.data);
        console.error('סטטוס השגיאה:', error.response?.status);
      }
    },
  });

  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={() => login()} 
      sx={{ fontWeight: 'bold', textTransform: 'none' }}
    >
      התחבר עם גוגל
    </Button>
  );
};

export default GoogleAuth;
