// src/components/ProductsList.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductsList = ({ setCurrentPage, setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, [currentPageNum]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const skip = (currentPageNum - 1) * productsPerPage;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600 mt-2">Discover our amazing collection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500">
                  ⭐ {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {(currentPageNum - 1) * productsPerPage + 1} to{' '}
          {Math.min(currentPageNum * productsPerPage, totalProducts)} of {totalProducts} products
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
            disabled={currentPageNum === 1}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>
          <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-700">
            {currentPageNum} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))}
            disabled={currentPageNum === totalPages}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;