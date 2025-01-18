const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authenticateToken = require('../middlewares/authenticateToken');
const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit
        files: 6 // Maximum 6 files
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

const processImage = async (file) => {
    return await sharp(file.buffer)
        .resize(800, 800, {
            fit: 'inside',
            withoutEnlargement: true
        })
        .jpeg({ quality: 80 })
        .toBuffer();
};

router.get('/getAllProducts', productsController.getAllProducts);
router.get('/getAllProductsByUser', authenticateToken, productsController.getAllProductsByUser);
router.post('/addProduct', authenticateToken, upload.fields([
    { name: 'primaryImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 }
]), async (req, res, next) => {
    if (req.files) {
        if (req.files.primaryImage) {
            req.files.primaryImage[0].buffer = await processImage(req.files.primaryImage[0]);
        }
        if (req.files.additionalImages) {
            for (let image of req.files.additionalImages) {
                image.buffer = await processImage(image);
            }
        }
    }
    next();
}, productsController.addProduct);
router.put('/updateProductsDetails/:id', authenticateToken, productsController.updateProductsDetails);
router.delete('/deleteProduct/:id', productsController.deleteProduct);

module.exports = router;
