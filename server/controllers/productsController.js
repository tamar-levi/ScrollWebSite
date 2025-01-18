const Product = require('../models/productModel'); 
require('dotenv').config();
const mongoose = require('mongoose');


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.json(products);
    } catch (err) {
        console.error('Error fetching products', err);
        res.status(500).send('Database error');
    }
};

const addProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const { scriptType, scrollType, price, note, isPremiumAd } = req.body;
        
        if (!req.files || !req.files.primaryImage) {
            return res.status(400).json({ message: 'Primary image is required' });
        }

        const primaryImage = req.files.primaryImage[0];
        const additionalImages = req.files.additionalImages || [];

        const newProduct = new Product({
            scriptType,
            scrollType,
            price,
            primaryImage: primaryImage.buffer.toString('base64'),
            additionalImages: additionalImages.map(img => img.buffer.toString('base64')),
            note,
            isPremiumAd,
            userId,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (err) {
        console.error('Error adding product', err);
        res.status(500).send('Database error');
    }
};



const getAllProductsByUser = async (req, res) => {
    try {
        const userId = req.user.id; 
        const products = await Product.find({ userId });
        res.json(products);
    } catch (err) {
        console.error('Error fetching products', err);
        res.status(500).send('Database error');
    }
};

const updateProductsDetails = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    console.log('Update request received');
    console.log('ID:', id);
    console.log('Updates:', updates);

    try {
        if (!id) {
            console.error('ID is missing');
            return res.status(400).send('ID is required');
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error('Invalid ID format:', id);
            return res.status(400).send('Invalid ID format');
        }

        console.log('ID is valid');

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProduct) {
            console.error('Product not found for ID:', id);
            return res.status(404).send('Product not found');
        }

        console.log('Product updated successfully:', updatedProduct);

        res.json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (err) {
        console.error('Error updating product:', err.message);
        console.error('Stack trace:', err.stack);
        res.status(500).send('Server error');
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.params; 
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); 
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        console.error('Error deleting product', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllProducts, addProduct, updateProductsDetails, getAllProductsByUser, deleteProduct};