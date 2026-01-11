
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { products, config, loading } = useAppContext();

  if (loading) {
    return (
      <div className="flex flex-col w-full h-96 items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading Amazon products...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Carousel Placeholder */}
      <div className="relative h-[250px] md:h-[600px] w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#eaeded] to-transparent z-10"></div>
        <img 
          src={config.heroImageUrl} 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative -mt-20 md:-mt-64 z-20 px-4 md:px-8 max-w-[1500px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
        {/* Simple Category Cards */}
        {[
          { title: 'Deals on Gaming', image: 'https://picsum.photos/id/101/400/400' },
          { title: 'Electronics', image: 'https://picsum.photos/id/102/400/400' },
          { title: 'Laptops for Work', image: 'https://picsum.photos/id/103/400/400' },
          { title: 'Home & Kitchen', image: 'https://picsum.photos/id/104/400/400' }
        ].map((cat, idx) => (
          <div key={idx} className="bg-white p-5 flex flex-col h-[420px] shadow-sm">
            <h2 className="text-xl font-bold mb-4">{cat.title}</h2>
            <div className="flex-grow overflow-hidden">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-orange-700 hover:underline mt-4">Shop now</a>
          </div>
        ))}

        {/* Product Grid Items */}
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Multi-item card example */}
        <div className="bg-white p-5 flex flex-col h-auto shadow-sm sm:col-span-1 lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Refresh your space</h2>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col">
                <img src={`https://picsum.photos/id/${i + 50}/200/200`} alt="sub-cat" className="h-24 w-full object-cover" />
                <span className="text-xs mt-1">Category {i}</span>
              </div>
            ))}
          </div>
          <a href="#" className="text-sm text-blue-600 hover:text-orange-700 hover:underline mt-4">See more</a>
        </div>
      </div>
      
      {/* Middle Banner Section */}
      <div className="px-4 md:px-8 max-w-[1500px] mx-auto w-full my-6">
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Inspired by your shopping trend</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {products.slice(0, 10).map(product => (
              <div key={product.id} className="min-w-[150px] max-w-[200px] flex flex-col gap-2 p-2 border border-transparent hover:border-gray-200 transition-all rounded">
                <Link to={`/product/${product.id}`} className="h-32 flex items-center justify-center">
                  <img src={product.imageUrl} alt={product.title} className="max-h-full object-contain" />
                </Link>
                <Link to={`/product/${product.id}`} className="text-sm text-blue-600 line-clamp-1 hover:underline hover:text-orange-700 font-medium">
                  {product.title}
                </Link>
                <div className="flex text-yellow-500 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}></i>
                  ))}
                </div>
                <span className="font-bold text-lg text-gray-900">${product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
