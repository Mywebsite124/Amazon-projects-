
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { products, categories, config, loading } = useAppContext();

  if (loading) {
    return (
      <div className="flex flex-col w-full h-96 items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading Amazon...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
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
        
        {/* Dynamic Category Cards from Database */}
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-5 flex flex-col h-[420px] shadow-sm">
            <h2 className="text-xl font-bold mb-4">{cat.name}</h2>
            <div className="flex-grow overflow-hidden">
              <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-orange-700 hover:underline mt-4">Shop now</a>
          </div>
        ))}

        {/* Product Grid Items */}
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Middle Banner Section */}
      <div className="px-4 md:px-8 max-w-[1500px] mx-auto w-full my-6">
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800">More items to explore</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {products.map(product => (
              <div key={product.id} className="min-w-[150px] max-w-[200px] flex flex-col gap-2 p-2 border border-transparent hover:border-gray-200 transition-all rounded">
                <Link to={`/product/${product.id}`} className="h-32 flex items-center justify-center">
                  <img src={product.imageUrl} alt={product.title} className="max-h-full object-contain" />
                </Link>
                <Link to={`/product/${product.id}`} className="text-sm text-blue-600 line-clamp-1 hover:underline hover:text-orange-700 font-medium">
                  {product.title}
                </Link>
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
