import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/comp.css';

function MyNavbar() {
    const [user, setUser] = useState(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).name : null);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        window.location.href = '/login'; // Redirect to login page after logout
    };

    return (
        <Navbar expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand href="/">
                    <img className='image' src="https://images.ctfassets.net/h1eh3mhnbyvi/18rm4XE1mphBwOL2TwP8Jp/9f422e3de476b1e7179fadeb585cb929/ftd-logo.svg?w=256&fm=webp&q=70" alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/Admin" className="nav-link" href="/">Admin</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">BIRTHDAY</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">SYMPATHY</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">OCCASIONS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">FLOWERS</a>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">{user}</span>
                                </li>
                                <li className="nav-item">
                                    <Button variant="link" onClick={handleLogout}>Logout</Button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link to="/Basket" className="nav-link">Basket</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Favorit" className="nav-link">Favorites</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add" className="nav-link">Add</Link>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
