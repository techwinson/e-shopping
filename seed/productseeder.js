const mongoose = require('mongoose');
const Product = require('../models/product');

// Connection function
async function connectToDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cart', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Optional: Adjust timeout settings
            socketTimeoutMS: 45000 // Optional: Adjust socket timeout
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit if the DB connection fails
    }
}

// Seeding function
async function seedProducts() {
    const products = [
        new Product({
            imagePath: "https://img.freepik.com/premium-photo/fresh-red-apple-fruit-with-sliced-green-leaves-isolated-white-background_252965-9.jpg",
            price: 200,
            title: "Apple",
            quantity: 2
        }),
        new Product({
            imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLMOtPEHhkindeBx3IcRA7lqRhWBduSQRL6c5AgXpUq4bc_SMJIF6HOO1GBH_6UY5Xaos&usqp=CAU",
            price: 100,
            title: "Banana",
            quantity: 5
        }),
        new Product({
            imagePath: "https://t4.ftcdn.net/jpg/03/01/98/69/240_F_301986993_SYvMrcYECPje0HK6qRQQcm6uC7d3tpVC.jpg",
            price: 200,
            title: "Grapes",
            quantity: 3
        })
    ];

    try {
        for (let i = 0; i < products.length; i++) {
            await products[i].save();
            console.log(`Product saved: ${products[i].title}`);
        }
        console.log('All products saved!');
        exit(); // Disconnect after successful seeding
    } catch (err) {
        console.error('Error saving products:', err);
        exit(); // Ensure disconnect even if error occurs
    }
}

// Exit function
function exit() {
    mongoose.disconnect();
}

// Run the connection and seeding
connectToDB().then(() => seedProducts());
