import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Alert,
} from '@mui/material';


const AddProduct = ({ onNext, onFormSubmit, productData }) => {
    const [formData, setFormData] = useState({
        scriptType: productData ? productData.scriptType : '',
        scrollType: productData ? productData.scrollType : '',
        price: productData ? productData.price : '',
        primaryImage: productData ? productData.primaryImage : null,
        additionalImages: productData ? productData.additionalImages : [],
        note: productData ? productData.note : '',
        isPremiumAd: productData ? productData.isPremiumAd : false,
    });
    const [showAlert, setShowAlert] = useState(false);
    const scriptTypes = [
        "בית יוסף",
        "האר''י",
        "ספרדי (וועליש)",
        "חב''ד",
        "תימני",
        "אחר"
    ];
    const scrollTypes = [
        "המלך 28 שורות",
        "המלך 21 שורות",
        "11 שורות",
        "42 שורות",
        "11 שורות הרב עובדיה",
        "אחר"
    ];
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
            [name]: type === 'checkbox' || type === 'radio' ? checked : value,
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
        if (!formData.primaryImage || !formData.scriptType || !formData.scrollType || !formData.price) {
            setShowAlert(true);
            return;
        }
        onNext();
        console.log("Form data before sending:", formData);
        onFormSubmit(formData);
    };

    return (
        <Box sx={{ padding: 3, direction: 'rtl', fontFamily: 'Roboto, sans-serif', width: '100%', maxWidth: 600 }}>
            {showAlert && (
                <Alert
                    severity="error"
                    sx={{
                        marginBottom: 2,
                        '& .MuiAlert-icon': {
                            marginLeft: 2
                        }
                    }}
                >
                    יש למלא את כל פרטי המוצר
                </Alert>
            )}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel
                            shrink
                            sx={{
                                color: 'black',
                                backgroundColor: 'white',
                                padding: '0 4px',
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
                                fontSize: '1rem',
                                height: '45px',
                            }}
                        >
                             {scriptTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel
                            shrink
                            sx={{
                                color: 'black',
                                backgroundColor: 'white',
                                padding: '0 4px',
                            }}
                        >
                            סוג המגילה
                        </InputLabel>
                        <Select
                            name="scrollType"
                            value={formData.scrollType}
                            onChange={handleChange}
                            required
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '1rem',
                                height: '45px',
                            }}
                        >
                            {scrollTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
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
                        sx={{
                            fontSize: '1rem',
                            height: '45px',
                        }}
                        inputProps={{
                            min: 100,
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="הערות"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={1.2}
                        InputLabelProps={{
                            style: { color: 'black' },
                            shrink: true,
                        }}
                        sx={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '1rem',
                            height: '100px',
                        }}
                    />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '-45px' }}>
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
                            sx={{
                                borderColor: '#1976d2',
                                color: '#1976d2',
                                border: 1,
                                margin: '0 8px',
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '0.9rem',
                                padding: '6px 12px',
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
                            variant="outlined"
                            sx={{
                                borderColor: '#1976d2',
                                color: '#1976d2',
                                border: 1,
                                margin: '0 8px',
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '0.9rem',
                                padding: '6px 12px',
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

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', fontSize: '0.9rem' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isPremiumAd"
                                checked={formData.isPremiumAd}
                                onChange={handleChange}
                                size="small"
                                sx={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                        }
                        label="מודעת פרימיום"
                        sx={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '0.9rem',
                            margin: '0',
                            marginTop: '-15px',
                        }}
                    />
                </Grid>
            </Grid>
            <Box
                sx={[
                    {
                        position: 'absolute',
                        bottom: '10%',
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', sm: 'row' },
                        alignItems: 'end',
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 0, sm: 0 },
                        width: '100%',
                        maxWidth: 600,
                        justifyContent: 'flex-end',
                    },
                ]}
            >
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                >
                    הבא
                </Button>
            </Box>
        </Box>

    );
};

export default AddProduct;
