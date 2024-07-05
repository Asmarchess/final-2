import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import '../assets/css/AddItem.css';

const AddItem = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Father');
    const [imageFile, setImageFile] = useState(null);
    const [price, setPrice] = useState('');  // Yeni price state

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newItem = {
                name,
                category,
                image: imageFile,
                price: parseFloat(price),  // Price'i sayı olarak gönder
            };

            const response = await axios.post('http://localhost:3000/data', newItem);
            console.log('Added item:', response.data);

            // Formu temizle
            setName('');
            setCategory('Father');
            setImageFile(null);
            setPrice('');  // Price'i temizle
            alert('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item.');
        }
    };

    return (
        <Container className="add-item-container">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit} className="add-item-form p-4 rounded shadow">
                        <h2 className="text-center mb-4">Add New Item</h2>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter item name"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Father">Father's Day</option>
                                <option value="Birthday">Birthday</option>
                                <option value="8March">8th March</option>
                                <option value="14February">14th February</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price"> {/* Yeni fiyat girişi */}
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter item price"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".jpg,.png,.jpeg"
                                onChange={handleImageChange}
                                required
                            />
                        </Form.Group>
                        {imageFile && (
                            <div className="preview-container mb-3">
                                <img src={imageFile} alt="Preview" className="preview-image" />
                            </div>
                        )}
                        <Button variant="primary" type="submit" className="w-100 mb-2">
                            Add Item
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddItem;
