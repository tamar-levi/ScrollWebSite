import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    DialogActions,
    Divider,
    Typography,
    Link
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import CreateUser from './CreateUser';
import GoogleLogo from '../assets/google-logo.png';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice'

const LoginDialog = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showGoogleAuth, setShowGoogleAuth] = useState(false);
    const [showCreateUser, setShowCreateUser] = useState(false);

    useEffect(() => {
        console.log('showCreateUser state:', showCreateUser);
    }, [showCreateUser]);

    const handleClose = () => {
        setUsername('');
        setPassword('');
        onClose();
    };

    const handleSubmit = async (e) => {
        console.log('Form submitted!');
        e.preventDefault();
        console.log('Login attempt with:', { username, password });

        try {
            console.log('Sending request to server...');
            const response = await axios.post('http://localhost:5000/usersApi/loginUser', {
                username: username,
                password: password,
            });
            console.log('Login response:', response.data);
            localStorage.setItem('token', response.data.token);
            console.log('User:', response.data.user);
            dispatch(setUser(response.data.user));
            alert('התחברת בהצלחה!');
            handleClose();
            navigate('/products');
        } catch (error) {
            console.log('Login error details:', error.response?.data);
            console.error('Error logging in:', error);
            alert('שם משתמש או סיסמה שגויים');
        }
    };

    const handleGoogleAuthClose = () => {
        setShowGoogleAuth(false);
    };

    const handleGoogleLogin = () => {
        setShowGoogleAuth(true);
    };

    const handleGoogleSuccess = () => {
        handleClose();
        setShowGoogleAuth(false);
    };

    const handleCreateUserOpen = (e) => {
        e.preventDefault();
        console.log('Opening create user dialog');
        setShowCreateUser(true);
        setTimeout(() => {
            handleClose();
        }, 0);
    };

    const handleCreateUserClose = () => {
        setShowCreateUser(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ textAlign: 'center' }}>התחבר</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            minWidth: '300px',
                            mt: 1
                        }}
                    >
                        <TextField
                            label="שם משתמש"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="סיסמא"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            התחבר
                        </Button>
                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'right', paddingRight: 1 }}>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={handleCreateUserOpen}
                                sx={{ cursor: 'pointer' }}
                            >
                                הירשם עכשיו
                            </Link>
                            {' '}?אין לך חשבון
                        </Typography>
                        <Divider sx={{ my: 2 }}>או</Divider>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                                gap: '4px',
                                fontFamily: 'Assistant, sans-serif',
                                fontSize: '16px',
                                textTransform: 'none',
                                '& .MuiButton-startIcon': {
                                    marginLeft: '-4px',
                                    marginRight: '-4px'
                                },
                                height: '40px'
                            }}
                            startIcon={
                                <img
                                    src={GoogleLogo}
                                    alt="Google logo"
                                    style={{ width: '45px', height: '35px' }}
                                />
                            }
                            onClick={handleGoogleLogin}
                        >
                            Google התחבר עם
                        </Button>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>סגור</Button>
                </DialogActions>
            </Dialog>
            {showGoogleAuth && <GoogleAuth onSuccess={handleGoogleSuccess} />}
            {showCreateUser && (
                <CreateUser
                    open={showCreateUser}
                    onClose={handleCreateUserClose}
                />
            )}
        </>
    );
};
export default LoginDialog;
