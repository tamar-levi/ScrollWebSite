import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '349794465929-mt1fv2121fasu9fpp2irvt36me6e5n5u.apps.googleusercontent.com';  
const API_KEY = 'AIzaSyCdlh6xx-By7syY6o6At4HZLQD65MmCEmc';  
const SCOPES = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

const GoogleAuth = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      }).then(() => {
        console.log('Google API client initialized');
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleLogin = () => {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Full Name: ' + profile.getName());
      console.log('Email: ' + profile.getEmail());
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleAuth;
