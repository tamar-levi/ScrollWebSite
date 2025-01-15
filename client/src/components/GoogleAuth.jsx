import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log('טוקן גוגל התקבל:', response.access_token);
        
        const serverResponse = await axios.post('http://localhost:5000/usersApi/google-login', {
          googleToken: response.access_token
        });
        
        console.log('תשובה מהשרת:', serverResponse.data);
        localStorage.setItem('token', serverResponse.data.token);
        
      } catch (error) {
        console.log('פרטי השגיאה:', error.response?.data);
        console.log('סטטוס השגיאה:', error.response?.status);
      }
    }
  });

  return (
    <button onClick={() => login()}>
      התחבר עם גוגל
    </button>
  );
};

export default GoogleAuth;
