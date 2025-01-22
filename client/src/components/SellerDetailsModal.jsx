import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CallIcon from '@mui/icons-material/Call';

const SellerDetailsModal = ({ sellerId, isOpen, onClose }) => {
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        const fetchSellerDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/usersApi/getUserById/${sellerId}`);
                const data = await response.json();
                setSeller(data);
            } catch (error) {
                console.error('Error fetching seller details:', error);
            }
        };

        if (sellerId && isOpen) {
            fetchSellerDetails();
        }
    }, [sellerId, isOpen]);

    const handleCallClick = () => {
        if (seller?.phoneNumber) {
            window.location.href = `tel:${seller.phoneNumber}`;
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            dir="rtl"
            PaperProps={{
                style: {
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                }
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: 'right',
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '24px',
                    color: '#2c3e50',
                    borderBottom: '1px solid #e0e0e0',
                    padding: '20px'
                }}
            >
                פרטי המוכר
            </DialogTitle>
            <DialogContent>
                {seller && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        p: 3,
                        fontFamily: 'Rubik, sans-serif'
                    }}>
                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            fontSize: '16px',
                            color: '#34495e'
                        }}>
                            <PersonIcon color="primary" /> שם: {seller.fullName}
                        </Typography>
                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            fontSize: '16px',
                            color: '#34495e'
                        }}>
                            <EmailIcon color="primary" /> אימייל: {seller.email}
                        </Typography>
                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            fontSize: '16px',
                            color: '#34495e'
                        }}>
                            <PhoneIcon color="primary" /> טלפון: {seller.phoneNumber}
                        </Typography>
                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            fontSize: '16px',
                            color: '#34495e'
                        }}>
                            <LocationCityIcon color="primary" /> עיר: {seller.city}
                        </Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: '16px', gap: '10px' }}>
                <Button
                    onClick={handleCallClick}
                    variant="contained"
                    endIcon={<CallIcon />}
                    sx={{
                        fontFamily: 'Rubik, sans-serif',
                        backgroundColor: '#1976d2',
                        '& .MuiButton-endIcon': {
                            marginRight: '8px',
                            marginLeft: '-4px'
                        },
                        '&:hover': {
                            backgroundColor: '#1565c0'
                        }
                    }}
                >
                    התקשר
                </Button>

                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        fontFamily: 'Rubik, sans-serif',
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0'
                        }
                    }}
                >
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SellerDetailsModal;
