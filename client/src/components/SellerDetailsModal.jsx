import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Typography, 
    Box, 
    CircularProgress,
    Fade,
    Alert,
    useTheme
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CallIcon from '@mui/icons-material/Call';

const SellerInfo = React.memo(({ icon: Icon, label, value }) => (
    <Fade in={true} timeout={300}>
        <Typography sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontSize: '16px',
            color: '#34495e',
            padding: '8px 0',
            transition: 'all 0.2s ease',
        }}>
            <Icon color="primary" /> {label}: {value}
        </Typography>
    </Fade>
));

const SellerDetailsModal = ({ sellerId, isOpen, onClose }) => {
    const theme = useTheme();
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSellerDetails = useCallback(async () => {
        if (!sellerId) return;
        
        try {
            const response = await fetch(`http://localhost:5000/usersApi/getUserById/${sellerId}`);
            if (!response.ok) throw new Error('Failed to fetch seller details');
            const data = await response.json();
            setSeller(data);
            console.log(data);
        } catch (error) {
            setError('שגיאה בטעינת פרטי המוכר');
            console.error('Error:', error);
        }
    }, [sellerId]);

    useEffect(() => {
        if (sellerId) {
            fetchSellerDetails();
        }
        return () => {
            setSeller(null);
            setError(null);
        };
    }, [sellerId, fetchSellerDetails]);

    const handleCallClick = () => {
        if (seller?.phoneNumber) {
            window.location.href = `tel:${seller.phoneNumber}`;
        }
    };

    const dialogStyles = useMemo(() => ({
        '& .MuiDialog-paper': {
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            overflow: 'hidden'
        }
    }), []);

    const sellerDetails = useMemo(() => (
        seller && (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                paddingTop: '24px',
                paddingBottom: '8px'
            }}>
                <SellerInfo icon={PersonIcon} label="שם" value={seller.fullName} />
                <SellerInfo icon={EmailIcon} label="אימייל" value={seller.email} />
                <SellerInfo icon={PhoneIcon} label="טלפון" value={seller.phoneNumber!= '0' ? seller.phoneNumber : 'לא צוין'} />
                <SellerInfo icon={LocationCityIcon} label="עיר" value={seller.city} />
            </Box>
        )
    ), [seller]);

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            dir="rtl"
            TransitionComponent={Fade}
            sx={dialogStyles}
        >
            <DialogTitle sx={{
                textAlign: 'right',
                fontFamily: 'Rubik, sans-serif',
                fontSize: '24px',
                color: theme.palette.primary.main,
                borderBottom: '1px solid #e0e0e0',
                padding: '20px',
                backgroundColor: '#fff'
            }}>
                פרטי המוכר
            </DialogTitle>

            <DialogContent sx={{ 
                minHeight: '250px',
                padding: '24px',
                backgroundColor: '#fff'
            }}>
                {isLoading && (
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        height: '200px'
                    }}>
                        <CircularProgress size={40} />
                    </Box>
                )}

                {error && (
                    <Alert 
                        severity="error" 
                        sx={{ marginTop: 2 }}
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Alert>
                )}

                {!isLoading && !error && sellerDetails}
            </DialogContent>

            <DialogActions sx={{ 
                padding: '16px 24px',
                backgroundColor: '#fff',
                borderTop: '1px solid #e0e0e0',
                gap: '16px'
            }}>
                <Button
                    onClick={handleCallClick}
                    variant="contained"
                    disabled={isLoading || !seller}
                    endIcon={<CallIcon />}
                    sx={{
                        fontFamily: 'Rubik, sans-serif',
                        minWidth: '120px',
                        transition: 'all 0.2s ease',
                        '& .MuiButton-endIcon': {
                            marginRight: '12px',
                            marginLeft: '-4px'
                        }
                    }}
                >
                    התקשר
                </Button>

                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        fontFamily: 'Rubik, sans-serif',
                        minWidth: '120px'
                    }}
                >
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(SellerDetailsModal);
