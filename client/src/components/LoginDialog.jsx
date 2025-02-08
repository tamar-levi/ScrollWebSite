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
    Link,
    useTheme,
    useMediaQuery,
    CircularProgress,
    Fade,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import CreateUser from './CreateUser';
import GoogleLogo from '../assets/google-logo.png';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const LoginDialog = ({ open, onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showGoogleAuth, setShowGoogleAuth] = useState(false);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/usersApi/loginUser', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);
            dispatch(setUser(response.data.user));

            const successMessage = document.createElement('div');
            successMessage.innerHTML = '✓ התחברת בהצלחה';
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 16px;
                border-radius: 8px;
                z-index: 9999;
            `;
            document.body.appendChild(successMessage);

            setTimeout(() => {
                successMessage.remove();
                handleClose();
                navigate('/products');
            }, 1500);

        } catch (error) {
            console.log('Login Error:', error.response);

            if (error.response?.status === 401) {
                if (error.response?.data?.includes('User not found')) {
                    setShowCreateUser(true);
                    onClose();
                } else {
                    setError('שם משתמש או סיסמה שגויים');
                }
            } else {
                setError('שם משתמש או סיסמה שגויים');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setError('');
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: motion.div,
                initial: { y: -50, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 0.3 },
                sx: {
                    borderRadius: '16px',
                    overflow: 'hidden',
                    width: isMobile ? '95%' : '450px',
                    maxWidth: '95vw',
                    bgcolor: 'background.paper',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }
            }}
        >
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>

            <DialogTitle sx={{
                textAlign: 'center',
                pt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
            }}>
                <Box sx={{
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <LockOutlinedIcon sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h5" component="div" fontWeight="bold">
                    התחברות
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                        p: 2
                    }}
                >
                    <TextField
                        label="שם משתמש"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        error={!!error}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                    <TextField
                        label="סיסמא"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={!!error}
                        helperText={error}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        sx={{
                            py: 1,
                            mt: 1,
                            position: 'relative',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            borderRadius: '8px',
                            textTransform: 'none',
                            backgroundColor: theme.palette.primary.main,
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                backgroundColor: theme.palette.primary.dark,
                            },
                            transition: 'all 0.15s ease-in-out',
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            'התחבר'
                        )}
                    </Button>
                    <Typography variant="body2" sx={{ mt: 1, textAlign: 'right', paddingRight: 1 }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => setShowCreateUser(true)}
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
                        onClick={() => setShowGoogleAuth(true)}                        >
                        Google התחבר עם
                    </Button>
                </Box>
            </DialogContent>

            {showGoogleAuth && (
                <GoogleAuth
                    onSuccess={() => {
                        setShowGoogleAuth(false);
                        handleClose();
                    }}
                />
            )}

            {showCreateUser && (
                <CreateUser
                    open={showCreateUser}
                    onClose={() => setShowCreateUser(false)}
                />
            )}
        </Dialog>
    );
};

export default LoginDialog;
