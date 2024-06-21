import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MainComponent from './components/MainComponent'; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>

        </Route>
      </Routes>
      <MainComponent></MainComponent>
    </>
  );
}

export default App;
