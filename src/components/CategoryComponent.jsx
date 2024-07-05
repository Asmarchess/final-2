import React from 'react';
import axios from 'axios';
import { BsHeart, BsHeartFill, BsBasket } from 'react-icons/bs'; // Import Bootstrap icons

const CategoryComponent = ({ categoryData, toggleFavorite, isFavorite, addToBasket }) => {
    const handleAddToBasket = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/data/${id}`);
            await axios.post('http://localhost:3000/basket', { ...response.data, count: 1 });
            addToBasket(); // Refresh basket after adding
        } catch (error) {
            console.error('Error adding to basket:', error);
        }
    };

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {categoryData.map(item => (
                <div key={item.id} className="col">
                    <div className="card h-100">
                        <img src={item.image} className="card-img-top" alt={item.name} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">${item.price}</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-outline-danger me-2" onClick={() => toggleFavorite(item.id)}>
                                {isFavorite(item.id) ? <BsHeartFill /> : <BsHeart />}
                            </button>
                            <button className="btn btn-primary me-2" onClick={() => handleAddToBasket(item.id)}>
                                <BsBasket /> Add to Basket
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryComponent;
