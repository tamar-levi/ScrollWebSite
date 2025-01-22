import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
    LinearProgress
} from '@mui/material';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        scriptType: '',
        scrollType: '',
        price: '',
        primaryImage: null,
        additionalImages: [],
        note: '',
        isPremiumAd: true,
    });

    const [uploadProgress, setUploadProgress] = useState(0);
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
            setUploadProgress(0);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4, direction: 'rtl', fontFamily: 'Roboto, sans-serif' }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif' }}>
                הוספת מוצר חדש
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'black', textAlign: 'right', fontFamily: 'Roboto, sans-serif' }}>סוג כתב</InputLabel>
                            <Select
                                name="scriptType"
                                value={formData.scriptType}
                                onChange={handleChange}
                                required
                                sx={{ borderColor: 'black', fontFamily: 'Roboto, sans-serif' }}
                            >
                                <MenuItem value="בית יוסף">בית יוסף</MenuItem>
                                <MenuItem value="ספרדי">ספרדי</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'black', textAlign: 'right', fontFamily: 'Roboto, sans-serif' }}>סוג ספר תורה</InputLabel>
                            <Select
                                name="scrollType"
                                value={formData.scrollType}
                                onChange={handleChange}
                                required
                                sx={{ borderColor: 'black', fontFamily: 'Roboto, sans-serif' }}
                            >
                                <MenuItem value="11 שורות">11 שורות</MenuItem>
                                <MenuItem value="המלך">המלך</MenuItem>
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
                                style: { color: 'black', textAlign: 'right' },
                                shrink: true,
                            }}
                            sx={{ borderColor: 'black', fontFamily: 'Roboto, sans-serif' }}
                            inputProps={{
                                min: 100, // הגדרת מינימום 100
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
                                variant="outlined"
                                sx={{ color: 'black', borderColor: 'black', margin: '0 8px', fontFamily: 'Roboto, sans-serif' }}
                                startIcon={<CloudUploadIcon sx={{ marginLeft: '8px' }} />}
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
                                variant="outlined"
                                sx={{ color: 'black', borderColor: 'black', margin: '0 8px', fontFamily: 'Roboto, sans-serif' }}
                                startIcon={<CloudUploadIcon sx={{ marginLeft: '8px' }} />}
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
                                style: { color: 'black', textAlign: 'right' },
                                shrink: true,
                            }}
                            sx={{ borderColor: 'black', fontFamily: 'Roboto, sans-serif' }}
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

                    {uploadProgress > 0 && (
                        <Grid item xs={12}>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                            <Box textAlign="center" marginTop="8px">
                                <Typography>{uploadProgress}%</Typography>
                            </Box>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: 'black', color: 'white', margin: '0 auto', fontFamily: 'Roboto, sans-serif' }}
                            fullWidth
                            disabled={isUploading}
                        >
                            {isUploading ? <CircularProgress size={24} /> : 'הוסף מוצר'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddProduct;
