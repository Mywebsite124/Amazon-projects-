
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full"
    >
      <div className="h-48 w-full flex items-center justify-center mb-4">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="text-sm font-medium line-clamp-2 mb-2 hover:text-orange-700">
        {product.title}
      </h3>
      <div className="flex items-center mb-1">
        <div className="flex text-yellow-500 text-xs">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}></i>
          ))}
        </div>
        <span className="text-xs text-blue-600 ml-2">{product.reviewCount.toLocaleString()}</span>
      </div>
      <div className="mt-auto">
        <div className="flex items-start">
          <span className="text-xs mt-1">$</span>
          <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
          <span className="text-xs mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
        </div>
        {product.isPrime && (
          <div className="flex items-center mt-1">
            <img src="https://m.media-amazon.com/images/I/31S1S1IuGXL._AC_SR160,160_.png" alt="Prime" className="h-4 mr-1" />
            <span className="text-xs text-gray-500">FREE Delivery by Tomorrow</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
