
import React from 'react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12">
      <div 
        onClick={scrollToTop}
        className="bg-gray-700 text-white text-center py-4 cursor-pointer hover:bg-gray-600 text-sm transition-colors"
      >
        Back to top
      </div>
      
      <div className="amazon-blue-light text-white py-12 px-4 md:px-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Get to Know Us</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Blog</li>
              <li className="hover:underline cursor-pointer">About Amazon</li>
              <li className="hover:underline cursor-pointer">Investor Relations</li>
              <li className="hover:underline cursor-pointer">Amazon Devices</li>
              <li className="hover:underline cursor-pointer">Amazon Science</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Make Money with Us</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Sell products on Amazon</li>
              <li className="hover:underline cursor-pointer">Sell on Amazon Business</li>
              <li className="hover:underline cursor-pointer">Sell apps on Amazon</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Host an Amazon Hub</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Amazon Payment Products</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Amazon Business Card</li>
              <li className="hover:underline cursor-pointer">Shop with Points</li>
              <li className="hover:underline cursor-pointer">Reload Your Balance</li>
              <li className="hover:underline cursor-pointer">Amazon Currency Converter</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Let Us Help You</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Amazon and COVID-19</li>
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Your Orders</li>
              <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
              <li className="hover:underline cursor-pointer">Returns & Replacements</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="amazon-blue-dark border-t border-gray-700 py-10 flex flex-col items-center">
        <img 
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
          alt="Amazon Logo" 
          className="h-8 mb-8"
        />
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300">
          <span className="hover:underline cursor-pointer">Conditions of Use</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
          <span className="hover:underline cursor-pointer">© 1996-2024, Amazon.com, Inc. or its affiliates</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
