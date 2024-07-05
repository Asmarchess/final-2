import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi'; 
import CategoryComponent from './CategoryComponent';
import BannerComponent from './BannerComponent';
import { Container } from 'react-bootstrap';

const MainComponent = () => {
    const [data, setData] = useState({ Father: [], Birthday: [], '8March': [], '14February': [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [filteredData, setFilteredData] = useState({ Father: [], Birthday: [], '8March': [], '14February': [] });
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/data');
                setData(separateByCategory(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:3000/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchData();
        fetchFavorites();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const newFilteredData = {};

            Object.keys(data).forEach(category => {
                let categoryItems = data[category];

                if (searchTerm.trim()) {
                    categoryItems = categoryItems.filter(item =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                newFilteredData[category] = sortData(categoryItems, sortOrder);
            });

            setFilteredData(newFilteredData);
        };

        applyFilters();
    }, [searchTerm, sortOrder, data]);

    const separateByCategory = (data) => {
        const separatedData = {
            'Father': [],
            'Birthday': [],
            '8March': [],
            '14February': []
        };

        data.forEach(item => {
            if (item.category in separatedData) {
                separatedData[item.category].push(item);
            } else {
                console.warn(`Unexpected category: ${item.category}`);
            }
        });

        return separatedData;
    };

    const sortData = (data, sortOrder) => {
        if (sortOrder === 'asc') {
            return data.slice().sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            return data.slice().sort((a, b) => b.price - a.price);
        }
        return data;
    };

    const toggleFavorite = async (id) => {
        const isFavorite = favorites.find(item => item.id === id);
        if (isFavorite) {
            try {
                await axios.delete(`http://localhost:3000/favorites/${id}`);
                setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error removing from favorites:', error);
            }
        } else {
            const itemToAdd = data.Father.concat(data.Birthday, data['8March'], data['14February']).find(item => item.id === id);
            try {
                await axios.post('http://localhost:3000/favorites', itemToAdd);
                setFavorites(prevFavorites => [...prevFavorites, itemToAdd]);
            } catch (error) {
                console.error('Error adding to favorites:', error);
            }
        }
    };

    const isFavorite = (id) => {
        return favorites.some(item => item.id === id);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const addToBasket = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/data/${id}`);
            // Implement your basket functionality here
            console.log('Added to basket:', response.data);
        } catch (error) {
            console.error('Error adding to basket:', error);
        }
    };

    return (
        <Container className="mt-5">
            <div className="row mb-4">
                <div className="col">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-outline-secondary" type="button">
                            <FiSearch />
                        </button>
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-select" value={sortOrder} onChange={handleSortOrderChange}>
                            <option value="default">Sort by: Default</option>
                            <option value="asc">Sort by: Price Low to High</option>
                            <option value="desc">Sort by: Price High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            <section className='mb-5'>
                <h2 className="mb-4">Father's Day Gifts</h2>
                <CategoryComponent
                    categoryData={filteredData["Father"]}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                    addToBasket={addToBasket}
                />
                {searchTerm && filteredData["Father"].length === 0 && (
                    <p>No items found matching "{searchTerm}"</p>
                )}
            </section>

            <section className='mb-5'>
                <h2 className="mb-4">Birthday Gifts</h2>
                <CategoryComponent
                    categoryData={filteredData["Birthday"]}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                    addToBasket={addToBasket}
                />
                {searchTerm && filteredData["Birthday"].length === 0 && (
                    <p>No items found matching "{searchTerm}"</p>
                )}
            </section>

            <BannerComponent
                title="8th March Gifts Accepted"
                text="Get Comfort Gifts"
                linkText="BUY 8TH MARCH FLOWERS"
                imgSrc="https://images.ctfassets.net/h1eh3mhnbyvi/XP2awX8HdPGS7UjLy7akq/1bcda13f96df655156b32e8e4da116d8/FTD-Merx-HPorCLP-FullBanner-Desktop-Evergreen-Bday_BDB_01-4385.jpg?w=1920&fm=webp&q=70"
                imgFirst={false}
            />

            <section className='mb-5'>
                <h2 className="mb-4">8th March Gifts</h2>
                <CategoryComponent
                    categoryData={filteredData["8March"]}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                    addToBasket={addToBasket}
                />
                {searchTerm && filteredData["8March"].length === 0 && (
                    <p>No items found matching "{searchTerm}"</p>
                )}
            </section>

            <section className='mb-5'>
                <h2 className="mb-4">14th February Gifts</h2>
                <CategoryComponent
                    categoryData={filteredData["14February"]}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                    addToBasket={addToBasket}
                />
                {searchTerm && filteredData["14February"].length === 0 && (
                    <p>No items found matching "{searchTerm}"</p>
                )}
            </section>

            <div className="text-center">
                <button className="btn btn-outline-primary">Load More</button>
            </div>
        </Container>
    );
};

export default MainComponent;
