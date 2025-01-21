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
        const files = Array.from(e.target.files); // המרת הקבצים למערך
        const compressedImages = await Promise.all(
          files.map((file) => compressImage(file)) // כיווץ התמונות
        );
        setFormData((prev) => ({
          ...prev,
          additionalImages: [...prev.additionalImages, ...compressedImages], // הוספת התמונות החדשות למערך
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
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
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
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                הוספת מוצר חדש
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>סוג כתב</InputLabel>
                            <Select
                                name="scriptType"
                                value={formData.scriptType}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="בית יוסף">בית יוסף</MenuItem>
                                <MenuItem value="ספרדי">ספרדי</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>סוג ספר תורה</InputLabel>
                            <Select
                                name="scrollType"
                                value={formData.scrollType}
                                onChange={handleChange}
                                required
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
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <label htmlFor="primary-image-upload">
                            <input
                                id="primary-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handlePrimaryImageChange}
                                required
                                style={{ display: 'none' }} // מחביא את שדה הקובץ
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<CloudUploadIcon />}
                                component="span"
                            >
                                הוסף תמונה ראשית
                            </Button>
                        </label>
                    </Grid>


                    <Grid item xs={12}>
                        <label htmlFor="additional-images-upload">
                            <input
                                id="additional-images-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleAdditionalImagesChange}
                                style={{ display: 'none' }} // הסתרת השדה
                            />
                            <Button
                                variant="outlined"
                                color="secondary"
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
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="isPremiumAd"
                                    checked={formData.isPremiumAd}
                                    onChange={handleChange}
                                />
                            }
                            label="מודעה מקודמת"
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
                            color="primary"
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
