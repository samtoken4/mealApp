import React from 'react';

const Offer = ({ name, price, description, imageUrl, expiryDate }) => {
    return (
        <div className="offer">
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>Expires on: {new Date(expiryDate).toDateString()}</p>
        </div>
    );
};

export default Offer;