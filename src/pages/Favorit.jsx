import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:3000/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorites = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/data/${id}`);
            await axios.post('http://localhost:3000/favorites', response.data);
            fetchFavorites(); // Refresh favorites after adding
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFavorites = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/favorites/${id}`);
            fetchFavorites(); // Refresh favorites after removing
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Favorites</h2>
            <Row xs={1} md={3} className="g-4">
                {favorites.map(item => (
                    <Col key={item.id}>
                        <Card>
                            <Card.Img variant="top" src={item.image} alt={item.name} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>${item.price}</Card.Text>
                                <Button variant="danger" className="me-2" onClick={() => removeFromFavorites(item.id)}>
                                    Remove from Favorites
                                </Button>
                                <Button variant="primary" onClick={() => addToFavorites(item.id)}>
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {favorites.length === 0 && <p className="mt-3">No favorites added yet.</p>}
        </Container>
    );
};

export default FavoritesPage;
