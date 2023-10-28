import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offer from './components/Offer';

const App = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/offers')
            .then(response => setOffers(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="App">
            <h1>ToGood2Go</h1>
            <div className="food-items">
                {offers.map(offer => (
                    <Offer key={offer._id} {...offer} />
                ))}
            </div>
        </div>
    );
};

export default App;
