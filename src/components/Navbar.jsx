import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <>
            <div className='navbar'>
            <div className="row">
                <div className="container">
                        <div className='links'>
                            <Link to='/'className='navbar-link'>Search</Link>
                            <Link to='/'className='navbar-link'>HELP</Link>
                            <Link to='/'className='navbar-link'>FTD PLUS</Link>
                            <Link to='/'className='navbar-link'>SIGN IN</Link>
                            <Link to='/'className='navbar-link'>CART</Link>
                        </div>
                        <div className="card">
                        <img className='image' src="https://images.ctfassets.net/h1eh3mhnbyvi/18rm4XE1mphBwOL2TwP8Jp/9f422e3de476b1e7179fadeb585cb929/ftd-logo.svg?w=256&fm=webp&q=70" alt="" />
                        <ul className='navbar__elements'>
                            <li>FATHER'S DAY</li>
                            <li>BIRTHDAY</li>
                            <li>SYMPATHY</li>
                            <li>OCCASIONS</li>
                            <li>FLOWERS</li>
                            <li>GIFTS</li>
                            <li>PLANTS</li>
                            <li>SAME DAY</li>
                        </ul>
                        </div>
                       
                    </div>
                </div>

            </div>

        </>
    )
}

export default Navbar