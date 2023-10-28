const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for the customer
        required: true
    },
    mealOffers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MealOffer'
    }],
    totalPrice: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;