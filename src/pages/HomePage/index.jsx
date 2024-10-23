import React, { useState, useEffect, useRef } from 'react';
import { FaBook, FaPencilAlt, FaRuler, FaLaptop, FaPalette, FaFootballBall, FaChalkboardTeacher, FaBars, FaTimes, FaThList, FaTh, FaChevronLeft, FaChevronRight, FaTshirt, FaCouch } from 'react-icons/fa';
import { PiBackpackFill } from "react-icons/pi";
import SidebarContent from '../SidebarContent';
import PostedAds from '../PostedAds';


const categories = [
  {
    name: 'Writing Instruments',
    icon: FaPencilAlt,
    subcategories: ['Pens', 'Pencils', 'Markers', 'Highlighters', 'Erasers'],
    image: './src/assets/images/writing2.jpg'
  },
  {
    name: 'Paper Products',
    icon: FaBook,
    subcategories: ['Notebooks', 'Binders', 'Loose Leaf Paper', 'Index Cards', 'Sticky Notes'],
    image: './src/assets/images/paper1.jpg'
  },
  {
    name: 'Organization',
    icon: PiBackpackFill,
    subcategories: ['Backpacks', 'Pencil Cases', 'Folders', 'Organizers', 'Lockers'],
    image: './src/assets/images/organizer4.jpg'
  },
  {
    name: 'Art Supplies',
    icon: FaPalette,
    subcategories: ['Paints', 'Brushes', 'Colored Pencils', 'Sketchbooks', 'Clay'],
    image: './src/assets/images/arts3.jpg'
  },
  {
    name: 'Technology',
    icon: FaLaptop,
    subcategories: ['Calculators', 'Laptops', 'Tablets', 'Headphones', 'USB Drives'],
    image: './src/assets/images/tech2.jpg'
  },
  {
    name: 'Classroom Essentials',
    icon: FaChalkboardTeacher,
    subcategories: ['Whiteboards', 'Bulletin Boards', 'Desk Organizers', 'Calendars', 'Staplers'],
    image: './src/assets/images/class.jpg'
  },
  {
    name: 'Sports & PE',
    icon: FaFootballBall,
    subcategories: ['Gym Uniforms', 'Sports Equipment', 'Water Bottles', 'First Aid Kits', 'Stopwatches'],
    image: './src/assets/images/sports2.jpg'
  },
  {
    name: 'School Uniforms',
    icon: FaTshirt,
    subcategories: ['Shirts', 'Trousers', 'Skirts', 'Blazers', 'Ties', 'Fabrics'],
    image: './src/assets/images/uniform4.jpg'
  },
  {
    name: 'Furniture',
    icon: FaCouch,
    subcategories: ['Desks', 'Chairs', 'Bookcases', 'Filing Cabinets', 'Whiteboards'],
    image: './src/assets/images/furniture4.jpg'
  }
];

const slideshowItems = [
  { type: 'video', content: './public/videos/back2sch2.mp4', name: 'School Supplies Overview' },
  ...categories.map(category => ({ type: 'image', content: category.image, name: category.name }))
];

const sampleAds = [
  { id: 1, title: 'Premium Ballpoint Pens (Pack of 12)', category: 'Writing Instruments', subcategory: 'Pens', price: '₵50', image: './src/assets/images/ballpoint.jpg' },
  { id: 2, title: 'Hardcover Spiral Notebook', category: 'Paper Products', subcategory: 'Notebooks', price: '₵30', image: './src/assets/images/spiral-bk2.jpg' },
  { id: 3, title: 'Ergonomic Student Backpack', category: 'Organization', subcategory: 'Backpacks', price: '₵180', image: './src/assets/images/backpack.jpg' },
  { id: 4, title: 'Watercolor Paint Set', category: 'Art Supplies', subcategory: 'Paints', price: '₵100', image: './src/assets/images/paint.jpg' },
  { id: 5, title: 'Scientific Calculator', category: 'Technology', subcategory: 'Calculators', price: '₵120', image: './src/assets/images/calculator.jpg' },
  { id: 6, title: 'Magnetic Whiteboard', category: 'Classroom Essentials', subcategory: 'Whiteboards', price: '₵150', image: './src/assets/images/whiteboard.jpg' },
  { id: 7, title: 'Adjustable Basketball Hoop', category: 'Sports & PE', subcategory: 'Sports Equipment', price: '₵550', image: './src/assets/images/basketball-hoop.jpg' },
  { id: 8, title: 'School Uniform Fabric (Per Yard)', category: 'School Uniforms', subcategory: 'Fabrics', price: '₵40', image: './src/assets/images/fabric4sch.jpg' },
  { id: 9, title: 'Student Desk', category: 'Furniture', subcategory: 'Desks', price: '₵200', image: './src/assets/images/furniture.jpg' },
];

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarTop, setSidebarTop] = useState(0);
  const [selectedAd, setSelectedAd] = useState(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current) {
        const categoriesBottom = categoriesRef.current.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        const sidebarHeight = 400; // Approximate height of sidebar

        // If categories section is above viewport
        if (categoriesBottom < 0) {
          setSidebarTop(0); // Fix sidebar at top
        } else {
          setSidebarTop(Math.max(categoriesBottom, 0)); // Position below categories
        }

        // Prevent sidebar from going below viewport
        if (sidebarTop + sidebarHeight > windowHeight) {
          setSidebarTop(windowHeight - sidebarHeight);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
    setIsHovering(true);
    setSelectedItem(null);
  };

  const handleContentLeave = () => {
    setActiveCategory(null);
    setIsHovering(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsHovering(false);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slideshowItems.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slideshowItems.length) % slideshowItems.length);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    nextSlide();
  };

  const handleAdClick = (ad) => {
    setSelectedAd(ad);
  };

  const closeAdView = () => {
    setSelectedAd(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const filteredAds = selectedItem
    ? sampleAds.filter(ad => ad.subcategory === selectedItem)
    : activeCategory
      ? sampleAds.filter(ad => ad.category === activeCategory.name)
      : sampleAds;


  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column */}
        <div className="w-full md:w-1/4">
          {/* Categories Section */}
          <div ref={categoriesRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-2xl mb-4 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <ul className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full shadow-md bg-slate-50 mb-4`}>
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                  onMouseEnter={() => handleCategoryHover(category)}
                >
                  <div className="flex items-center">
                    <category.icon className="mr-2" />
                    {category.name}
                  </div>
                  <FaChevronRight />
                </li>
              ))}
            </ul>
          </div>

          {/* Fixed Sidebar */}
          <div
            className="hidden md:block"
            style={{
              position: 'fixed',
              top: `${sidebarTop}px`,
              width: 'inherit',
              maxWidth: 'inherit',
              transition: 'top 0.3s ease',
              zIndex: 10
            }}
          >
            <SidebarContent />
          </div>
        </div>


        {/* Main Content Section */}
        <div className="w-full md:w-3/4" onMouseLeave={handleContentLeave}>
          {/* Slideshow / Category Items / Selected Item */}
          <div className="relative mb-4 h-96 bg-gray-200 overflow-hidden">
            {selectedItem || (isHovering && activeCategory) ? (
              <div className="absolute top-0 left-0 w-full h-full bg-white p-4 overflow-y-auto">
                <h3 className="text-2xl mb-4">{selectedItem || activeCategory.name}</h3>
                {selectedItem ? (
                  <p>Showing items for {selectedItem}.</p>
                ) : (
                  <ul className="grid grid-cols-2 gap-4">
                    {activeCategory.subcategories.map((subcat, index) => (
                      <li
                        key={index}
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() => handleItemClick(subcat)}
                      >
                        {subcat}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setActiveCategory(null);
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Back to Categories
                </button>
              </div>
            ) : (
              slideshowItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.content}
                      className="w-full h-full object-cover"
                      autoPlay={currentSlideIndex === index}
                      muted
                      onEnded={handleVideoEnd}
                      onPlay={() => setIsPlaying(true)}
                    />
                  ) : (
                    <img src={item.content} alt={item.name} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                  </div>
                </div>
              ))
            )}
            {!isHovering && !selectedItem && (
              <>
                <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                  <FaChevronLeft />
                </button>
                <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          <PostedAds />

          {/* Featured Ads Section */}
          <div className="bg-gray-100 mt-4">
            <h2 className="text-2xl font-bold mb-4">Featured School Supplies</h2>
            <div className="mb-4 flex justify-end">
              <button onClick={toggleView} className="bg-blue-500 text-white px-4 py-2 rounded">
                {isGridView ? <FaThList /> : <FaTh />}
              </button>
            </div>
            <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
              {filteredAds.map(ad => (
                <div key={ad.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${isGridView ? '' : 'flex'} cursor-pointer hover:shadow-lg transition-shadow`} onClick={() => handleAdClick(ad)}>
                  <img src={ad.image} alt={ad.title} className={`${isGridView ? 'w-full h-48' : 'w-1/3 h-auto'} object-cover`} />
                  <div className="p-4">
                    <h3 className="font-bold">{ad.title}</h3>
                    <p className="text-gray-600">{ad.category}</p>
                    <p className="text-gray-600">{ad.subcategory}</p>
                    <p className="text-green-600 font-bold mt-2">{ad.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Single Ad Modal */}
        {selectedAd && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
              <div className="relative">
                <button
                  onClick={closeAdView}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10"
                >
                  <FaTimes className="text-2xl" />
                </button>

                <img
                  src={selectedAd.image}
                  alt={selectedAd.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedAd.title}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600">Category:</p>
                    <p className="font-semibold">{selectedAd.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Subcategory:</p>
                    <p className="font-semibold">{selectedAd.subcategory}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-4">
                  {selectedAd.price}
                </div>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      </div>
      );
};

      export default HomePage;