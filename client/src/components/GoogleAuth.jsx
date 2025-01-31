import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const GoogleAuth = ({ onSuccess }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const serverResponse = await axios.post('http://localhost:5000/usersApi/google-login', {
                    googleToken: response.access_token
                });
                localStorage.setItem('token', serverResponse.data.token);
                dispatch(setUser(serverResponse.data.user));
                navigate('/products');
            } catch (error) {
                console.error('Login error:', error);
            }
        },
    });
    React.useEffect(() => {
        onSuccess();
        login();
    }, []);

    return null;
};

export default GoogleAuth;
