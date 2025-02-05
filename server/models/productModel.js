const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    scriptType: {
        type: String,
        required: true,
        enum: [
            "בית יוסף",
            "האר''י",
            "ספרדי (וועליש)",
            "חב''ד",
            "תימני",
            "אחר"
        ]
    },
    scrollType: {
        type: String,
        required: true,
        enum: [
            "המלך 28 שורות",
            "המלך 21 שורות",
            "11 שורות",
            "42 שורות",
            "11 שורות גליון ס''ת",
            "אחר"
        ]
    },
    price: {
        type: Number,
        required: true
    },
    primaryImage: {
        type: String, 
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