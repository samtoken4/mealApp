const mongoose = require('mongoose');

const mealOfferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for the restaurant
        required: true
    }
});

const MealOffer = mongoose.model('MealOffer', mealOfferSchema);

module.exports = MealOffer;
