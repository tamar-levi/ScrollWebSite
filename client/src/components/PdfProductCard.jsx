import { Card, CardContent, Button, Typography, Box, Divider } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const PdfProductCard = ({ product , sellerId }) => {

    const [seller, setSeller] = useState(null);
    console.log('User ID:', product.userId);
    const fetchSellerDetails = useCallback(async () => {
        if (!sellerId) return;

        try {
            const response = await fetch(`http://localhost:5000/usersApi/getUserById/${sellerId}`);
            if (!response.ok) throw new Error('Failed to fetch seller details');
            const data = await response.json();
            setSeller(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [sellerId]);

    useEffect(() => {
        if (sellerId) {
            fetchSellerDetails();
        }
        return () => {
            setSeller(null);
        };
    }, [sellerId, fetchSellerDetails]);


    const typographyStyle = {
        fontSize: '1rem',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textAlign: 'right'
    };

    const iconStyle = {
        fontSize: '1.2rem',
        strokeWidth: 1
    };

    const fallbackImage = 'https://via.placeholder.com/400x250?text=No+Image';

    return (
        <Card
            sx={{
                width: { xs: '100%', sm: '400px' },
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                mx: 'auto',
                direction: 'rtl'
            }}
        >
            <Box
                component="img"
                src={product.primaryImage ? `data:image/jpeg;base64,${product.primaryImage}` : fallbackImage}
                alt={product.scriptType || 'מוצר ללא תיאור'}
                sx={{
                    width: '100%',
                    height: { xs: '200px', sm: '250px' },
                    objectFit: 'cover'
                }}
            />

            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography sx={typographyStyle}>
                    <ArticleOutlinedIcon sx={iconStyle} />
                    <strong>סוג המגילה:</strong> {product.scrollType || 'לא צויין'}
                </Typography>

                <Typography sx={typographyStyle}>
                    <DriveFileRenameOutlineIcon sx={iconStyle} />
                    <strong>סוג הכתב:</strong> {product.scriptType || 'לא צויין'}
                </Typography>

                <Typography sx={typographyStyle}>
                    <StickyNote2OutlinedIcon sx={iconStyle} />
                    <strong>הערות:</strong> {product.note || 'אין הערות'}
                </Typography>

                <Typography sx={typographyStyle}>
                    <SellOutlinedIcon sx={iconStyle} />
                    <strong>מחיר:</strong> {product.price ? `${product.price} ₪` : 'לא צויין'}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Typography sx={typographyStyle}>
                    <PersonOutlineIcon sx={iconStyle} />
                    <strong>בעל המוצר:</strong> {seller?.fullName || 'לא צויין'}
                </Typography>

                <Typography sx={typographyStyle}>
                    <PhoneOutlinedIcon sx={iconStyle} />
                    <strong>טלפון:</strong> {seller?.phoneNumber || 'לא צויין'}
                </Typography>

                <Typography sx={typographyStyle}>
                    <EmailOutlinedIcon sx={iconStyle} />
                    <strong>אימייל:</strong> {seller?.email || 'לא צויין'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PdfProductCard;
