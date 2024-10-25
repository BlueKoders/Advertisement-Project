import React, { useState, useEffect } from 'react';
import { FaTh, FaThList } from 'react-icons/fa';
import { apiGetAdverts } from '../services/auth';

const PostedAds = ({ selectedCategory, onHoverAds, isGridView, onAdClick }) => {
  const [apiAds, setApiAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const [filterValues, setFilterValues] = useState({
    search: '',
    category: '',
    price: '',
    stock: ''
  });

  // Define categories
  const categories = [
    "Writing Instruments",
    "Paper Products",
    "Organization",
    "Art Supplies",
    "Technology",
    "Classroom Essentials",
    "Sports & PE",
    "School Uniforms",
    "Furniture"
  ];

  const getAds = async () => {
    try {
      const response = await apiGetAdverts();
      setApiAds(response.data);
      setFilteredAds(response.data);
    } catch (error) {
      console.error("Failed to fetch adverts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  // Apply filters
  const applyFilters = () => {
    let updatedAds = apiAds;

    // Search filter
    if (filterValues.search) {
      updatedAds = updatedAds.filter(ad =>
        ad.title.toLowerCase().includes(filterValues.search.toLowerCase())
      );
    }

    // Category filter (combines with selectedCategory prop)
    const categoryToUse = filterValues.category || selectedCategory;
    if (categoryToUse) {
      updatedAds = updatedAds.filter(ad => ad.category === categoryToUse);
    }

    // Price filter
    if (filterValues.price) {
      updatedAds = updatedAds.filter(ad =>
        ad.price <= parseFloat(filterValues.price)
      );
    }

    // Stock filter
    if (filterValues.stock) {
      updatedAds = updatedAds.filter(ad =>
        ad.stock >= parseInt(filterValues.stock)
      );
    }

    setFilteredAds(updatedAds);
  };

  // Apply filters whenever filterValues or selectedCategory changes
  useEffect(() => {
    applyFilters();
  }, [filterValues, selectedCategory, apiAds]);

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    if (category) {
      const categoryAds = apiAds.filter(ad => ad.category === category);
      onHoverAds(categoryAds.slice(0, 3));
    } else {
      onHoverAds([]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4">
      {/* Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="p-2 border rounded"
            value={filterValues.search}
            onChange={(e) => setFilterValues({ ...filterValues, search: e.target.value })}
          />

          <select
            className="p-2 border rounded"
            value={filterValues.category}
            onChange={(e) => setFilterValues({ ...filterValues, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Max Price"
            className="p-2 border rounded"
            value={filterValues.price}
            onChange={(e) => setFilterValues({ ...filterValues, price: e.target.value })}
          />

          <input
            type="number"
            placeholder="Minimum Stock"
            className="p-2 border rounded"
            value={filterValues.stock}
            onChange={(e) => setFilterValues({ ...filterValues, stock: e.target.value })}
          />
        </div>

        {/* Search Button */}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={applyFilters}
          >
            Search
          </button>
        </div>

      </div>

      <h2 className="text-2xl font-bold mb-4">Fast Selling</h2>

      <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
        {filteredAds.map(ad => (
          <div
            key={ad.id}
            className={`
              bg-white rounded-lg shadow-md overflow-hidden 
              ${isGridView ? '' : 'flex'} 
              transform transition-transform duration-200 hover:scale-105
              cursor-pointer
            `}
            onMouseEnter={() => handleCategoryHover(ad.category)}
            onMouseLeave={() => handleCategoryHover(null)}
            onClick={() => onAdClick(ad)}
          >
            <div className={`relative ${isGridView ? 'w-full h-48' : 'w-1/3'}`}>
              <img
                src={`https://savefiles.org/${ad.image}?shareable_link=445`}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-sm rounded-bl">
                {ad.category}
              </div>
            </div>

            <div className="p-4 flex-1">
              <h3 className="font-bold text-lg mb-2">{ad.title}</h3>
              <p className="text-gray-600 mb-1">{ad.category}</p>
              <p className="text-green-600 font-bold text-xl">
                {typeof ad.price === 'number' ? `₵${ad.price.toFixed(2)}` : ad.price}
              </p>

              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {ad.stock > 0 ? `${ad.stock} in stock` : 'Out of stock'}
                </span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdClick(ad);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAds.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No items found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default PostedAds;