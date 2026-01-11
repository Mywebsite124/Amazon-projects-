
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { config } = useAppContext();

  return (
    <header className="flex flex-col">
      {/* Top Header */}
      <div className="amazon-blue-dark text-white px-4 py-2 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="border border-transparent hover:border-white p-1 flex items-center h-12">
          <img 
            src={config.logoUrl} 
            alt="Amazon Logo" 
            className="h-8 object-contain mt-2"
          />
          <span className="text-xs font-bold pt-2">.us</span>
        </Link>

        {/* Deliver To */}
        <div className="hidden md:flex border border-transparent hover:border-white p-1 cursor-pointer flex-col justify-center">
          <span className="text-xs text-gray-300 ml-5">Deliver to</span>
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt text-lg mr-1"></i>
            <span className="text-sm font-bold">United States</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow flex h-10">
          <div className="flex bg-gray-100 rounded-l-md items-center px-3 border-r border-gray-300 cursor-pointer text-gray-700 text-xs hover:bg-gray-200">
            All <i className="fas fa-caret-down ml-2"></i>
          </div>
          <input 
            type="text" 
            className="flex-grow px-3 outline-none text-black" 
            placeholder="Search Amazon"
          />
          <div className="amazon-yellow amazon-yellow-hover rounded-r-md w-12 flex items-center justify-center cursor-pointer">
            <i className="fas fa-search text-gray-800 text-xl"></i>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <div className="hidden lg:flex border border-transparent hover:border-white p-2 cursor-pointer items-center">
            <span className="text-sm font-bold">EN</span>
            <i className="fas fa-caret-down ml-1 text-gray-400"></i>
          </div>

          {/* Accounts & Lists */}
          <div className="border border-transparent hover:border-white p-2 cursor-pointer flex flex-col justify-center">
            <span className="text-xs">Hello, sign in</span>
            <div className="flex items-center">
              <span className="text-sm font-bold">Account & Lists</span>
              <i className="fas fa-caret-down ml-1 text-gray-400"></i>
            </div>
          </div>

          {/* Orders -> Linked to Login for Admin Access */}
          <Link to="/login" className="hidden sm:flex border border-transparent hover:border-white p-2 cursor-pointer flex flex-col justify-center">
            <span className="text-xs">Returns</span>
            <span className="text-sm font-bold">& Orders</span>
          </Link>

          {/* Cart */}
          <div className="border border-transparent hover:border-white p-2 cursor-pointer flex items-end">
            <div className="relative">
              <span className="absolute -top-2 left-3 text-orange-500 font-bold text-lg">0</span>
              <i className="fas fa-shopping-cart text-3xl"></i>
            </div>
            <span className="text-sm font-bold ml-1 hidden sm:block">Cart</span>
          </div>
        </div>
      </div>

      {/* Sub Header (Nav) */}
      <div className="amazon-blue-light text-white px-4 py-2 flex items-center text-sm">
        <div className="flex items-center mr-4 border border-transparent hover:border-white p-1 cursor-pointer">
          <i className="fas fa-bars mr-1"></i>
          <span className="font-bold">All</span>
        </div>
        <ul className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          {['Medical Care', 'Today\'s Deals', 'Amazon Basics', 'Registry', 'Customer Service', 'Best Sellers', 'Books', 'Music', 'New Releases', 'Amazon Home'].map((item) => (
            <li key={item} className="border border-transparent hover:border-white p-1 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
