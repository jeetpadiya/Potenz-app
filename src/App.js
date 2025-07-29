// src/App.js
import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Profile from './components/Profile';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [currentPage, setCurrentPage] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile />;
      case 'products':
        return (
          <ProductsList
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
          />
        );
      case 'product-detail':
        return (
          <ProductDetail
            product={selectedProduct}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return (
          <ProductsList
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <ProtectedRoute>
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {renderPage()}
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
};

export default App;