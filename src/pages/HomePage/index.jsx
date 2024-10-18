import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaPencilAlt, FaTshirt, FaLaptop, FaMedkit, FaGamepad, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import SchVideo from '/public/videos/back2sch2.mp4';
import Navbar from '../../components/Navbar';

const categories = [
  { name: 'Supermarket', icon: FaShoppingCart },
  { name: 'Books & Stationery', icon: FaPencilAlt },
  { name: 'Fabrics', icon: FaTshirt },
  { name: 'Electronics', icon: FaLaptop },
  { name: 'Healthcare', icon: FaMedkit },
  { name: 'Play Items', icon: FaGamepad }
];

const supermarketContent = [
  {
    title: 'Cupboard Foods',
    items: ['Grains & Rice', 'Canned & Jarred Foods', 'Cooking Ingredients', 'Cereals', 'Candy & Chocolate', 'Pasta, Noodles & Spaghetti']
  },
  {
    title: 'Cleaning Supplies',
    items: ['Laundry', 'Air Fresheners', 'Cleaning Items']
  },
  {
    title: 'Toiletries',
    items: ['Toilet Paper', 'Wipes']
  }
];

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  // Slideshow images
  const images = [
    './src/assets/images/slide1.png',
    './src/assets/images/slide2.jpg',
    './src/assets/images/slide3.jpg',
    './src/assets/images/slide2.jpg',
    './src/assets/images/slide3.jpg'
  ];

  // Cycle through slideshow images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignUp = () => {
    setIsSignedUp(true);
    setIsMenuOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const handleContentLeave = () => {
    setActiveCategory(null);
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4">
        {/* Categories Section */}
        <div className={`w-1/4 ${isSignedUp ? 'relative' : ''}`}>
          {isSignedUp ? (
            <button
              onClick={toggleMenu}
              className="text-2xl mb-4 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          ) : (
            <h2 className="text-xl font-bold mb-4">Categories</h2>
          )}
          {(!isSignedUp || isMenuOpen) && (
            <ul className={`${isSignedUp ? 'absolute top-10 left-0 bg-white shadow-md z-10' : ''} w-full`}>
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                  onMouseEnter={() => handleCategoryHover(category.name)}
                >
                  <div className="flex items-center">
                    <category.icon className="mr-2" />
                    {category.name}
                  </div>
                  <FaChevronRight />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Main Content Section */}
        <div
          className="w-1/2"
          onMouseLeave={handleContentLeave}
        >
          {activeCategory === 'Supermarket' ? (
            <div className="bg-gray-100 p-4 h-full">
              <h3 className="text-2xl mb-4">Supermarket Content</h3>
              {supermarketContent.map((section, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-xl font-bold underline">{section.title}</h4>
                  <ul className="list-disc pl-5">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() => handleItemClick(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : selectedItem ? (
            <div className="bg-gray-100 p-4 h-full">
              <h3 className="text-2xl mb-4">{selectedItem}</h3>
              <p>This is the content for {selectedItem}. Add more details here.</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setSelectedItem(null)}
              >
                Back to Supermarket
              </button>
            </div>
          ) : activeCategory ? (
            <div className="bg-gray-100 p-4 h-full flex items-center justify-center">
              <h3 className="text-2xl">{activeCategory} Content</h3>
            </div>
          ) : (
            <div className="bg-gray-200 p-4 h-full">
              {/* Video */}
              <div className="mb-4">
                <video width="100%" controls src={SchVideo} autoPlay loop playsInline />
              </div>

              {/* Slideshow */}
              <div className="flex justify-center items-center">
                <img
                  src={images[currentImageIndex]}
                  alt={`Slideshow ${currentImageIndex + 1}`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>

        {/* Ads Section */}
        <div className="w-1/4 space-y-4">
          <div className="p-4 h-1/2 flex items-center justify-center">
            <img src="./src/assets/images/sales-ad.jpg" alt="Ad 1" className="w-full h-auto" />
          </div>
          <div className="p-4 h-1/2 flex items-center justify-center">
            <img src="./src/assets/images/sales-ad.jpg" alt="Ad 2" className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Sign Up Button */}
      {!isSignedUp && (
        <button
          onClick={handleSignUp}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      )}
      <div>
        Search area and button, Account(dropdown to display Sign in and sign up options), add to cart.
        Categories(fashion, health, beauty and sport, phones and accessories, supermarker, electronics and appliances)
      </div>
    </div>
  );
};

export default HomePage;

