import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const BasketPage = () => {
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const response = await axios.get('http://localhost:3000/basket');
                setBasket(response.data);
            } catch (error) {
                console.error('Error fetching basket:', error);
            }
        };

        fetchBasket();
    }, []);

    const addToBasket = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/data/${id}`);
            await axios.post('http://localhost:3000/basket', { ...response.data, count: 1 });
            fetchBasket(); // Refresh basket after adding
        } catch (error) {
            console.error('Error adding to basket:', error);
        }
    };

    const removeFromBasket = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/basket/${id}`);
            fetchBasket(); // Refresh basket after removing
        } catch (error) {
            console.error('Error removing from basket:', error);
        }
    };

    const increaseCount = async (id) => {
        try {
            const itemToUpdate = basket.find(item => item.id === id);
            const updatedItem = { ...itemToUpdate, count: itemToUpdate.count + 1 };
            await axios.put(`http://localhost:3000/basket/${id}`, updatedItem);
            fetchBasket(); // Refresh basket after updating count
        } catch (error) {
            console.error('Error increasing count:', error);
        }
    };

    const decreaseCount = async (id) => {
        try {
            const itemToUpdate = basket.find(item => item.id === id);
            if (itemToUpdate.count > 1) {
                const updatedItem = { ...itemToUpdate, count: itemToUpdate.count - 1 };
                await axios.put(`http://localhost:3000/basket/${id}`, updatedItem);
            } else {
                await axios.delete(`http://localhost:3000/basket/${id}`);
            }
            fetchBasket(); // Refresh basket after updating or removing
        } catch (error) {
            console.error('Error decreasing count:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Basket</h2>
            <Row xs={1} md={3} className="g-4">
                {basket.map(item => (
                    <Col key={item.id}>
                        <Card>
                            <Card.Img variant="top" src={item.image} alt={item.name} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>${item.price}</Card.Text>
                                <Button variant="danger" className="me-2" onClick={() => removeFromBasket(item.id)}>
                                    Remove from Basket
                                </Button>
                                <div className="d-flex align-items-center">
                                    <Button variant="secondary" className="me-2" onClick={() => decreaseCount(item.id)}>
                                        -
                                    </Button>
                                    <span>{item.count}</span>
                                    <Button variant="secondary" className="ms-2" onClick={() => increaseCount(item.id)}>
                                        +
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {basket.length === 0 && <p className="mt-3">No items added to the basket yet.</p>}
        </Container>
    );
};

export default BasketPage;
