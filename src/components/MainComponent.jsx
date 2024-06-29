import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import "../assets/css/comp.css";

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/data');
        console.log('Fetched data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const separateByCategory = (data) => {
    const separatedData = {
        'Father': [],
        'Birthday': [],
        '8March': [],
        '14February': []
    };

    data.forEach(item => {
        if (item.category === 'Father') {
            separatedData['Father'].push(item);
        } else if (item.category === 'Birthday') {
            separatedData['Birthday'].push(item);
        } else if (item.category === '8March') {
            separatedData['8March'].push(item);
        } else if (item.category === '14February') {
            separatedData['14February'].push(item);
        } else {
            console.warn(`Unexpected category: ${item.category}`);
        }
    });

    return separatedData;
};

const CategoryComponent = ({ categoryData }) => (
    <div className='item'>
        {categoryData.map(item => (
            <div key={item.id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}$</p>
                <BsHeart className="icon" />
            </div>
        ))}
    </div>
);

const MainComponent = () => {
    const [data, setData] = useState({ Father: [], Birthday: [], '8March': [], '14February': [] });

    useEffect(() => {
        const fetchDataAndSeparate = async () => {
            const fetchedData = await fetchData();
            const separatedData = separateByCategory(fetchedData);
            setData(separatedData);
        };

        fetchDataAndSeparate();
    }, []);

    return (
        <div className="container">
            <section className='section1'>
                <h2>Father's Day Gifts</h2>
                <div className="fut">
                    <CategoryComponent categoryData={data["Father"]} />
                </div>
            </section>
            <section className='section2'>
                <h2>Birthday Gifts</h2>
                <CategoryComponent categoryData={data["Birthday"]} />
            </section>
            <section className='section3'>
                <h2>8th March Gifts</h2>
                <CategoryComponent categoryData={data["8March"]} />
            </section>
            <section className='section4'>
                <h2>14th February Gifts</h2>
                <CategoryComponent categoryData={data["14February"]} />
            </section>
            <div className="container">
            <div className='second col-md-2'>
                <img src="https://images.ctfassets.net/h1eh3mhnbyvi/XP2awX8HdPGS7UjLy7akq/1bcda13f96df655156b32e8e4da116d8/FTD-Merx-HPorCLP-FullBanner-Desktop-Evergreen-Bday_BDB_01-4385.jpg?w=1920&fm=webp&q=70" alt="" />
                <div className='secondd'>
                    <h2>Ad günü arzuları qəbul edildi </h2>
                    <p>Təravət hədiyyə edin</p>
                    <a href=''>AD GÜNÜ GÜLLƏRİNİ ALIN</a>
                </div>
            </div>
            </div>
            <div className="container">
            <div className='second col-md-2'>
            <div className='secondd'>
                    <h2>Ad günü arzuları qəbul edildi </h2>
                    <p>Təravət hədiyyə edin</p>
                    <a href=''>AD GÜNÜ GÜLLƏRİNİ ALIN</a>
                </div>
                <img src="https://images.ctfassets.net/h1eh3mhnbyvi/XP2awX8HdPGS7UjLy7akq/1bcda13f96df655156b32e8e4da116d8/FTD-Merx-HPorCLP-FullBanner-Desktop-Evergreen-Bday_BDB_01-4385.jpg?w=1920&fm=webp&q=70" alt="" />
            </div>
            </div>

        </div>
    );
};

export default MainComponent;
