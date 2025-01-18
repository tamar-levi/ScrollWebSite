import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

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
        useWebWorker: false  
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
            files.map(file => compressImage(file))
        );
        setFormData(prev => ({
            ...prev,
            additionalImages: compressedImages,
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
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGJmNDBkYzg5MTUxNzVhZDQxYjFhOCIsImVtYWlsIjoiVDA1MjcxNDQ2MzZAZ21haWwuY29tIiwiaWF0IjoxNzM3MjM1NTI0LCJleHAiOjE3MzcyMzkxMjR9.PistAZGxeKZd_PiCyTU-kYe3ZMr8xE9yUwpqQU5haUM`
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
        <div className="add-product-container">
            <h2>הוספת מוצר חדש</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label>סוג כתב:</label>
                    <select name="scriptType" value={formData.scriptType} onChange={handleChange} required>
                        <option value="">בחר סוג כתב</option>
                        <option value="בית יוסף">בית יוסף</option>
                        <option value="ספרדי">ספרדי</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>סוג ספר תורה:</label>
                    <select name="scrollType" value={formData.scrollType} onChange={handleChange} required>
                        <option value="">בחר סוג ספר תורה</option>
                        <option value="11 שורות">11 שורות</option>
                        <option value="המלך">המלך</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>מחיר:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>תמונה ראשית:</label>
                    <input type="file" accept="image/*" onChange={handlePrimaryImageChange} required />
                </div>

                <div className="form-group">
                    <label>תמונות נוספות:</label>
                    <input type="file" accept="image/*" multiple onChange={handleAdditionalImagesChange} />
                </div>

                <div className="form-group">
                    <label>הערות:</label>
                    <textarea name="note" value={formData.note} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isPremiumAd"
                            checked={formData.isPremiumAd}
                            onChange={handleChange}
                        />
                        מודעה מקודמת
                    </label>
                </div>

                {uploadProgress > 0 && (
                    <div className="progress-bar">
                        <div style={{ width: `${uploadProgress}%` }}></div>
                        <span>{uploadProgress}%</span>
                    </div>
                )}

                <button type="submit" disabled={isUploading}>
                    {isUploading ? 'מעלה...' : 'הוסף מוצר'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
