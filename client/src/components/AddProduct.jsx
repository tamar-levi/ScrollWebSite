import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import {
    Container,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Box,
    Typography,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    IconButton,
    Dialog,
} from '@mui/material';

const AddProduct = ({ onClose }) => {
    const [formData, setFormData] = useState({
        scriptType: '',
        scrollType: '',
        price: '',
        primaryImage: null,
        additionalImages: [],
        note: '',
        isPremiumAd: true,
    });

    const [isUploading, setIsUploading] = useState(false);

    const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false,
    };

    const compressImage = async (imageFile) => {
        return await imageCompression(imageFile, compressionOptions);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handlePrimaryImageChange = async (e) => {
        if (e.target.files[0]) {
            const compressedImage = await compressImage(e.target.files[0]);
            setFormData(prev => ({
                ...prev,
                primaryImage: compressedImage,
            }));
        }
    };

    const handleAdditionalImagesChange = async (e) => {
        const files = Array.from(e.target.files);
        const compressedImages = await Promise.all(
            files.map((file) => compressImage(file))
        );
        setFormData((prev) => ({
            ...prev,
            additionalImages: [...prev.additionalImages, ...compressedImages],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        const data = new FormData();
        data.append('scriptType', formData.scriptType);
        data.append('scrollType', formData.scrollType);
        data.append('price', formData.price);
        data.append('note', formData.note);
        data.append('isPremiumAd', formData.isPremiumAd);

        if (formData.primaryImage) {
            data.append('primaryImage', formData.primaryImage);
        }

        formData.additionalImages.forEach(image => {
            data.append('additionalImages', image);
        });

        try {
            const response = await fetch('http://localhost:5000/productsApi/addProduct', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: data,
            });

            if (response.ok) {
                alert('המוצר נוסף בהצלחה!');
                setFormData({
                    scriptType: '',
                    scrollType: '',
                    price: '',
                    primaryImage: null,
                    additionalImages: [],
                    note: '',
                    isPremiumAd: true,
                });
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <Box sx={{ position: 'relative', padding: 4, direction: 'rtl', fontFamily: 'Roboto, sans-serif' }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        color: 'black',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontFamily: "'Poppins', sans-serif",
                        textAlign: 'center',
                        marginBottom: 2,
                        fontWeight: 'bold', // הופך את הטקסט לעבה יותר
                        color: '#2d3436', // צבע בסיסי לטקסט
                        textShadow: `
                        1px 1px 2px rgba(0, 0, 0, 0.2), 
                        2px 2px 4px rgba(0, 0, 0, 0.15)
                        `, // אפקט תלת מימדי עם צללים
                    }}
                >
                    הוספת מוצר חדש
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <FormControl fullWidth>
                                <InputLabel
                                    shrink
                                    sx={{
                                        color: 'black',
                                        fontFamily: 'Roboto, sans-serif',
                                        backgroundColor: 'white',
                                        padding: '0 4px',
                                        marginLeft: '-4px',
                                    }}
                                >
                                    סוג כתב
                                </InputLabel>
                                <Select
                                    name="scriptType"
                                    value={formData.scriptType}
                                    onChange={handleChange}
                                    required
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                    }}
                                >
                                    <MenuItem value="בית יוסף">בית יוסף</MenuItem>
                                    <MenuItem value="ספרדי">ספרדי</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12}>
                        <FormControl fullWidth>
                                <InputLabel
                                    shrink
                                    sx={{
                                        color: 'black',
                                        fontFamily: 'Roboto, sans-serif',
                                        backgroundColor: 'white',
                                        padding: '0 4px',
                                        marginLeft: '-4px',
                                    }}
                                >
                                    סוג ספר תורה 
                                </InputLabel>
                                <Select
                                    name="scriptType"
                                    value={formData.scriptType}
                                    onChange={handleChange}
                                    required
                                    sx={{
                                        fontFamily: 'Roboto, sans-serif',
                                    }}
                                >
                                    <MenuItem value="בית יוסף">שורות 11</MenuItem>
                                    <MenuItem value="ספרדי">ספרדי</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="מחיר"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{
                                    style: { color: 'black' },
                                    shrink: true,
                                }}
                                sx={{ fontFamily: 'Roboto, sans-serif' }}
                                inputProps={{
                                    min: 100,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label htmlFor="primary-image-upload">
                                <input
                                    id="primary-image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePrimaryImageChange}
                                    required
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        borderColor: '#00bcd4',
                                        color: '#00bcd4',
                                        border: 2,
                                        margin: '0 8px',
                                        fontFamily: 'Roboto, sans-serif',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                    startIcon={<CloudUploadIcon />}
                                    component="span"
                                >
                                    הוסף תמונה ראשית
                                </Button>
                            </label>

                            <label htmlFor="additional-images-upload">
                                <input
                                    id="additional-images-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleAdditionalImagesChange}
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'white',
                                        borderColor: '#00bcd4',
                                        color: '#00bcd4',
                                        border: 2,
                                        margin: '0 8px',
                                        fontFamily: 'Roboto, sans-serif',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                    startIcon={<CloudUploadIcon />}
                                    component="span"
                                >
                                    העלה תמונות נוספות
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="הערות"
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                InputLabelProps={{
                                    style: { color: 'black' },
                                    shrink: true,
                                }}
                                sx={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isPremiumAd"
                                        checked={formData.isPremiumAd}
                                        onChange={handleChange}
                                        sx={{ color: 'black' }}
                                    />
                                }
                                label="מודעה פרימיום"
                                sx={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#00bcd4',
                                    color: 'white',
                                    fontFamily: 'Roboto, sans-serif',
                                    boxShadow: 3,
                                    width: '100%',
                                    height: '50px',
                                }}
                                disabled={isUploading}
                            >
                                {isUploading ? <CircularProgress size={24} /> : 'הוסף מוצר'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Dialog>
    );
};

export default AddProduct;
