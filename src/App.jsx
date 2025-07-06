import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import ItemsListPage from './pages/ItemsListPage';
import Header from './components/header/Header';
import './App.css'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/items/:categoryId" element={<ItemsListPage />} />
      </Routes>
    </>
  );
}

export default App;
