const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user');
const MealOffer = require('./models/MealOffer');
const Order = require('./models/Order');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sam:mQNQtdMD5fbZxXDv@cluster0.fwqlwaj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Offer = mongoose.model('Offer', {
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    expiryDate: Date
});

// app.post('/api/offers', async (req, res) => {
//     const { name, price, description, imageUrl, expiryDate } = req.body;
//     const offer = new Offer({ name, price, description, imageUrl, expiryDate });
//     await offer.save();
//     res.json(offer);
// });

// app.get('/api/offers', async (req, res) => {
//     const offers = await Offer.find();
//     res.json(offers);
// });

//Users
app.post('/api/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(req.params.id, { username, email, password: hashedPassword }, { new: true });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Meal Offers
app.post('/api/mealOffers', async (req, res) => {
    try {
        const { name, description, price, restaurantId } = req.body;
        const mealOffer = new MealOffer({ name, description, price, restaurantId });
        await mealOffer.save();
        res.status(201).json(mealOffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/mealOffers', async (req, res) => {
    try {
        const mealOffers = await MealOffer.find();
        res.json(mealOffers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/mealOffers/:id', async (req, res) => {
    try {
        const mealOffer = await MealOffer.findById(req.params.id);
        if (mealOffer) {
            res.json(mealOffer);
        } else {
            res.status(404).json({ message: 'MealOffer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/mealOffers/:id', async (req, res) => {
    try {
        const { name, description, price, restaurantId } = req.body;
        const mealOffer = await MealOffer.findByIdAndUpdate(req.params.id, { name, description, price, restaurantId }, { new: true });
        if (mealOffer) {
            res.json(mealOffer);
        } else {
            res.status(404).json({ message: 'MealOffer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/mealOffers/:id', async (req, res) => {
    try {
        const mealOffer = await MealOffer.findByIdAndDelete(req.params.id);
        if (mealOffer) {
            res.json({ message: 'MealOffer deleted' });
        } else {
            res.status(404).json({ message: 'MealOffer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Orders
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, mealOffers, totalPrice } = req.body;
        const order = new Order({ userId, mealOffers, totalPrice });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const { userId, mealOffers, totalPrice } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { userId, mealOffers, totalPrice }, { new: true });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (order) {
            res.json({ message: 'Order deleted' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
