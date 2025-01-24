import React, { useState } from 'react';
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
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import CreateUser from './CreateUser';


const LoginDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showGoogleAuth, setShowGoogleAuth] = useState(false);
    const [showCreateUser, setShowCreateUser] = useState(false);

    const handleClose = () => {
        setUsername('');
        setPassword('');
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const handleCreateUserOpen = () => {
        console.log('Opening create user dialog');
        setShowCreateUser(true);
        console.log('showCreateUser state:', showCreateUser);
        handleClose();
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
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            אין לך חשבון?{' '}
                            <Link
                                component="button"
                                variant="body2"
                                onClick={handleCreateUserOpen}
                                sx={{ cursor: 'pointer' }}
                            >
                                הירשם עכשיו
                            </Link>
                        </Typography>
                        <Divider sx={{ my: 2 }}>או</Divider>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                        >
                        Google  התחבר עם 
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
