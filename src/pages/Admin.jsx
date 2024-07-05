import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        category: '',
        imageType: 'url', // 'url' or 'base64'
        imageUrl: '',
        imageBase64: ''
    });
    const [error, setError] = useState('');
    const categories = ['Father', 'Birthday', '8March', '14February']; // Example categories

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/data');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newItem = {
                name: formData.name,
                price: parseFloat(formData.price),
                category: formData.category
            };

            if (formData.imageType === 'url') {
                newItem.image = formData.imageUrl;
            } else if (formData.imageType === 'base64') {
                newItem.image = formData.imageBase64;
            }

            if (formData.id) {
                // Update existing item
                await axios.put(`http://localhost:3000/data/${formData.id}`, newItem);
            } else {
                // Add new item
                await axios.post('http://localhost:3000/data', newItem);
            }

            fetchItems(); // Refresh items after update or add
            setShowModal(false); // Close modal after successful operation
            clearForm(); // Clear form data
        } catch (error) {
            setError('Failed to save item. Please try again.');
            console.error('Error saving item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/data/${id}`);
            fetchItems(); // Refresh items after deletion
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const clearForm = () => {
        setFormData({
            id: '',
            name: '',
            price: '',
            category: '',
            imageType: 'url',
            imageUrl: '',
            imageBase64: ''
        });
    };

    const handleEdit = (item) => {
        setFormData({
            id: item.id,
            name: item.name,
            price: item.price.toString(),
            category: item.category,
            imageType: 'url', // Default to URL, adjust if base64 image is available
            imageUrl: item.image,
            imageBase64: ''
        });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        clearForm();
    };

    const handleImageTypeChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            imageType: value
        });
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData({
                ...formData,
                imageBase64: reader.result
            });
        };
    };

    return (
        <Container className="mt-5">
            <h2>Manage Items</h2>
            <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
                Add New Item
            </Button>

            {error && <Alert variant="danger">{error}</Alert>}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? 'Edit Item' : 'Add New Item'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicImageType">
                            <Form.Label>Image Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="imageType"
                                value={formData.imageType}
                                onChange={handleImageTypeChange}
                                required
                            >
                                <option value="url">URL</option>
                                <option value="base64">Base64</option>
                            </Form.Control>
                        </Form.Group>

                        {formData.imageType === 'url' && (
                            <Form.Group className="mb-3" controlId="formBasicImageUrl">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image URL"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        )}

                        {formData.imageType === 'base64' && (
                            <Form.Group className="mb-3" controlId="formBasicImageFile">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleImageFileChange}
                                    required
                                />
                            </Form.Group>
                        )}

                        {formData.imageType === 'base64' && formData.imageBase64 && (
                            <div className="mb-3">
                                <img
                                    src={formData.imageBase64}
                                    alt="Preview"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            </div>
                        )}

                        <Button variant="primary" type="submit">
                            {formData.id ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>
                                <Button variant="info" className="me-2" onClick={() => handleEdit(item)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => deleteItem(item.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminPanel;
