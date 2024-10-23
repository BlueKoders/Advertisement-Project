import React, { useState } from 'react';
import { Search, User, ShoppingBasket, LogIn, UserCircle, Package, Heart, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import logo from '../assets/images/edulogo.jpg'
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    keyword: '',
    sortBy: 'newest'
  });

  const categories = [
    'All Categories',
    'Writing Instruments',
    'Paper Products',
    'Organization',
    'Art Supplies',
    'Technology',
    'Classroom Essentials',
    'Sports & PE',
    'School Uniforms',
    'Furniture'
  ];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // TODO: Implement search functionality with filters
    console.log('Search with filters:', filters);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      keyword: ''
    });
  };


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="EduExpress Logo" className="h-[91.5pt]" />
            </Link>
          </div>

          {isLoggedIn && !isHomePage && (
            <div className="mr-2">
              <button onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Search Area */}

          <div className="relative flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch}>
              {/* Main Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  className="block w-full pl-10 pr-20 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search category, price or keyword"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="px-3 py-2 text-gray-500 hover:text-gray-600 focus:outline-none"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                  </button>
                  <button
                    type="submit"
                    className="px-4 h-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-r-md"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Filters Panel */}
              {isFiltersOpen && (
                <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 z-20">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Filters</h3>
                      <button
                        type="button"
                        onClick={() => setIsFiltersOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Category Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          name="category"
                          value={filters.category}
                          onChange={handleFilterChange}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Price Range */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Min Price (₵)
                          </label>
                          <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Price (₵)
                          </label>
                          <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="1000"
                          />
                        </div>
                      </div>

                      {/* Sort By */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sort By
                        </label>
                        <select
                          name="sortBy"
                          value={filters.sortBy}
                          onChange={handleFilterChange}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="newest">Newest First</option>
                          <option value="priceLow">Price: Low to High</option>
                          <option value="priceHigh">Price: High to Low</option>
                          <option value="popular">Most Popular</option>
                        </select>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none"
                        >
                          Clear All
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
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
