import React, { useState, useEffect } from 'react';
import { FaTh, FaThList } from 'react-icons/fa';
import { apiGetAdverts } from '../services/auth';

const PostedAds = ({ selectedCategory, onHoverAds, isGridView, onAdClick }) => {
  const [apiAds, setApiAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const getAds = async () => {
    try {
      const response = await apiGetAdverts();
      setApiAds(response.data);
    } catch (error) {
      console.error("Failed to fetch adverts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  // Filter ads based on selected category
  const filteredAds = selectedCategory
    ? apiAds.filter(ad => ad.category === selectedCategory)
    : apiAds;

  // Handle category hover effects
  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    if (category) {
      const categoryAds = apiAds.filter(ad => ad.category === category);
      // Send the first 3 ads of the category to display in the slideshow
      onHoverAds(categoryAds.slice(0, 3));
    } else {
      onHoverAds([]); // Clear hover preview when mouse leaves
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
      <h2 className="text-2xl font-bold mb-4">Currently In Stock</h2>
      
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
              <p className="text-gray-600 mb-1">{ad.location}</p>  
              <p className="text-green-600 font-bold text-xl">
                {typeof ad.price === 'number' ? `GHS₵${ ad.price.toFixed(2)}` : ad.price}
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
          No items found in this category.
        </div>
      )}
    </div>
  );
};

export default PostedAds;