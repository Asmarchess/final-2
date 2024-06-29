import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MainComponent from '../components/MainComponent';
function Layout() {
  return (
    <div>
      <Navbar />
      <MainComponent />
      <Footer />
    </div>
  );
}

export default Layout;