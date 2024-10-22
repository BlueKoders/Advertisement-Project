import React, { useState } from 'react';
import { Search, User, ShoppingBasket, LogIn, UserCircle, Package, Heart, ChevronDown } from 'lucide-react';
// import Categories from '../pages/Categories';

import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-indigo-600">EduExpress</span>
          </div>

          {isLoggedIn && !isHomePage && (
            <div className="mr-2">
              <button onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Search Area */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search category, price or keyword"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-r-md">
                Search
              </button>
            </div>
          </div>

          {/* Account, Basket, and Post Ad Button */}
          <div className="flex items-center">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User className="h-6 w-6 text-gray-600" />
                  <span className="ml-1 text-gray-700">Account</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                </button>
              </div>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  {/* Dropdown links */}
                  <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogIn className="mr-3 h-5 w-5 text-gray-400" /> Sign In
                  </a>
                  <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <UserCircle className="mr-3 h-5 w-5 text-gray-400" /> My Account
                  </a>
                  <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Package className="mr-3 h-5 w-5 text-gray-400" /> Orders
                  </a>
                  <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Heart className="mr-3 h-5 w-5 text-gray-400" /> Saved Items
                  </a>
                </div>
              )}

            </div>

            {/* Basket */}
            <div className="ml-4 flow-root lg:ml-6">
              <a href="#" className="group -m-2 p-2 flex items-center">
                <ShoppingBasket className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">Basket</span>
              </a>
            </div>

            {/* Post Ad Button */}
            <div className="ml-4">
              <Link to="/vendor-signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Post Ad</Link>
            </div>
          </div>
        </div>
        {isLoggedIn && !isHomePage && isCategoriesOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Categories />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;