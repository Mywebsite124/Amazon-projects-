
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, config } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      window.scrollTo(0, 0);
    }
  }, [id, products]);

  const handleBuyNow = () => {
    const targetUrl = product?.buyNowUrl || config.globalBuyNowUrl;
    window.location.href = targetUrl;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found. <Link to="/" className="text-blue-600 hover:underline">Go back home</Link></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <nav className="px-4 py-3 text-xs text-gray-500 max-w-[1500px] mx-auto flex gap-2">
        <span className="hover:underline cursor-pointer">Products</span>
        <span>›</span>
        <span className="hover:underline cursor-pointer">{product.category}</span>
        <span>›</span>
        <span className="hover:underline cursor-pointer">{product.brand}</span>
      </nav>

      <div className="max-w-[1500px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Images */}
        <div className="md:col-span-5 flex gap-4">
          <div className="hidden md:flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-12 h-12 border border-gray-300 rounded cursor-pointer hover:border-orange-500 overflow-hidden">
                <img src={product.imageUrl} alt="thumbnail" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
          <div className="flex-grow flex items-center justify-center p-4">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="max-h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Center: Details */}
        <div className="md:col-span-4">
          <h1 className="text-2xl font-semibold text-gray-800 leading-tight mb-2">
            {product.title}
          </h1>
          <Link to="#" className="text-sm text-blue-600 hover:text-orange-700 hover:underline">
            Visit the {product.brand} Store
          </Link>
          
          <div className="flex items-center gap-2 mt-2 pb-4 border-b border-gray-200">
            <div className="flex text-yellow-500 text-sm">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}></i>
              ))}
            </div>
            <span className="text-sm text-blue-600 hover:text-orange-700 hover:underline">
              {product.reviewCount.toLocaleString()} ratings
            </span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-blue-600 hover:text-orange-700 hover:underline">
              1000+ answered questions
            </span>
          </div>

          <div className="py-4 space-y-2">
            <div className="flex items-start">
              <span className="text-sm text-red-600 mt-2 font-light">-15%</span>
              <div className="flex flex-col ml-3">
                <div className="flex items-start">
                  <span className="text-sm mt-1">$</span>
                  <span className="text-3xl font-medium">{Math.floor(product.price)}</span>
                  <span className="text-sm mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                </div>
                <span className="text-xs text-gray-500 line-through">List Price: ${(product.price * 1.15).toFixed(2)}</span>
              </div>
            </div>
            <p className="text-sm">
              Available at a lower price from other sellers that may not offer free Prime shipping.
            </p>
            {product.isPrime && (
              <div className="flex items-center">
                <img src="https://m.media-amazon.com/images/I/31S1S1IuGXL._AC_SR160,160_.png" alt="Prime" className="h-4 mr-1" />
                <span className="text-sm font-bold">One-Day</span>
                <span className="text-sm ml-1 text-gray-600">& FREE Returns</span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 py-4">
            <h3 className="font-bold text-sm mb-2">About this item</h3>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-800">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
              <li>{product.description}</li>
            </ul>
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="md:col-span-3">
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-3">
            <div className="flex items-start">
              <span className="text-sm mt-1">$</span>
              <span className="text-2xl font-semibold">{Math.floor(product.price)}</span>
              <span className="text-sm mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              {product.isPrime && <p className="text-blue-600 font-bold">FREE Returns</p>}
              <p className="text-gray-800 font-bold mt-1">FREE delivery Tomorrow</p>
              <p className="text-gray-600">Order within <span className="text-green-600">5 hrs 2 mins</span></p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-800">
              <i className="fas fa-map-marker-alt text-gray-600"></i>
              <span className="text-blue-600 hover:underline">Deliver to United States</span>
            </div>

            <div className="text-lg font-medium text-green-700 my-2">
              {product.stockStatus}
            </div>

            <div className="flex flex-col gap-2">
              <select className="bg-gray-100 border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Qty: 1</option>
                <option>Qty: 2</option>
                <option>Qty: 3</option>
              </select>

              <button className="amazon-yellow amazon-yellow-hover py-2 px-4 rounded-full text-sm font-medium shadow-sm transition-colors">
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="bg-orange-400 hover:bg-orange-500 py-2 px-4 rounded-full text-sm font-medium shadow-sm transition-colors"
              >
                Buy Now
              </button>
            </div>

            <div className="text-xs text-gray-600 mt-2 space-y-1">
              <div className="flex justify-between">
                <span>Ships from</span>
                <span className="text-gray-800">Amazon.com</span>
              </div>
              <div className="flex justify-between">
                <span>Sold by</span>
                <span className="text-gray-800">Amazon.com</span>
              </div>
              <div className="flex justify-between">
                <span>Returns</span>
                <span className="text-blue-600">Eligible for Return, Refund or Replacement within 30 days of receipt</span>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-2 pt-2">
              <button className="w-full py-1 text-sm border border-gray-300 rounded shadow-sm hover:bg-gray-50 bg-gray-100">
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
