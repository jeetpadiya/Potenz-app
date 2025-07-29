// src/components/Header.js
import React from 'react';
import { User, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">E-Shop</span>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('products')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'products'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setCurrentPage('profile')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'profile'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-700">{user?.firstName} {user?.lastName}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;