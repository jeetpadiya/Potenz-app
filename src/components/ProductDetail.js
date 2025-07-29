// src/components/ProductDetail.js
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const ProductDetail = ({ product, setCurrentPage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => setCurrentPage('products')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.images[currentImageIndex] || product.thumbnail}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      currentImageIndex === index
                        ? 'border-blue-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Brand:</span>
                <span className="ml-2 text-gray-600">{product.brand || 'N/A'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Category:</span>
                <span className="ml-2 text-gray-600">{product.category}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Rating:</span>
                <span className="ml-2 text-gray-600">⭐ {product.rating}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Stock:</span>
                <span className="ml-2 text-gray-600">{product.stock} units</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Product Information
              </h3>
              <div className="space-y-2 text-sm">
                {product.warrantyInformation && (
                  <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                )}
                {product.shippingInformation && (
                  <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                )}
                {product.returnPolicy && (
                  <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                )}
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;