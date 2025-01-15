const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    scriptType: {
        type: String,
        required: true,
        enum: ['בית יוסף', 'האר"י', 'ספרדי'] 
    },
    scrollType: {
        type: String,
        required: true,
        enum: ['11 שורות', 'המלך'] 
    },
    price: {
        type: Number,
        required: true
    },
    primaryImage: {
        type: String, // URL או נתיב לתמונה
        required: true
    },
    additionalImages: {
        type: [String], 
        required: false
    },
    note: {
        type: String,
        maxlength: 300 
    },
    isPremiumAd: {
        type: Boolean,
        default: false 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 