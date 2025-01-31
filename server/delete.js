require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/productModel');

const MONGODB_URI = process.env.CONECTION_URL || 'mongodb://127.0.0.1:27017/scrolls';

async function main() {
    await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
    });
    
    console.log('Connected to MongoDB successfully');
    
    const result = await Product.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} products`);
    
    await mongoose.connection.close();
    process.exit(0);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
