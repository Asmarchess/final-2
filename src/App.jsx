import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MainComponent from './components/MainComponent';
import Add from './pages/Add';
import Favorit from './pages/Favorit';
import Basket from './pages/basket';
import Login from "./pages/login";
import Admin from "./pages/Admin";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainComponent />} /> {/* Home kimi */}
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Admin' element={<Admin/>}/>
          <Route path="/add" element={<Add />} />
          <Route path="/Favorit" element={<Favorit />} />
          <Route path="/Basket" element={<Basket />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
