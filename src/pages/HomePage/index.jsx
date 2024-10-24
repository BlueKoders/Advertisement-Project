import React, { useState, useEffect, useRef } from 'react';
import { FaBook, FaPencilAlt, FaLaptop, FaPalette, FaFootballBall, FaChalkboardTeacher, FaBars, FaTimes, FaThList, FaTh, FaChevronLeft, FaChevronRight, FaTshirt, FaCouch } from 'react-icons/fa';
import { PiBackpackFill } from "react-icons/pi";
import SidebarContent from '../SidebarContent';
import PostedAds from '../PostedAds';

const categories = [
  {
    name: 'Writing Instruments',
    icon: FaPencilAlt,
    image: './src/assets/images/writing2.jpg'
  },
  {
    name: 'Paper Products',
    icon: FaBook,
    image: './src/assets/images/paper1.jpg'
  },
  {
    name: 'Organization',
    icon: PiBackpackFill,
    image: './src/assets/images/organizer4.jpg'
  },
  {
    name: 'Art Supplies',
    icon: FaPalette,
    image: './src/assets/images/arts3.jpg'
  },
  {
    name: 'Technology',
    icon: FaLaptop,
    image: './src/assets/images/tech2.jpg'
  },
  {
    name: 'Classroom Essentials',
    icon: FaChalkboardTeacher,
    image: './src/assets/images/class.jpg'
  },
  {
    name: 'Sports & PE',
    icon: FaFootballBall,
    image: './src/assets/images/sports2.jpg'
  },
  {
    name: 'School Uniforms',
    icon: FaTshirt,
    image: './src/assets/images/uniform4.jpg'
  },
  {
    name: 'Furniture',
    icon: FaCouch,
    image: './src/assets/images/furniture4.jpg'
  }
];

const slideshowItems = [
  { type: 'video', content: './public/videos/back2sch2.mp4', name: 'School Supplies Overview' },
  ...categories.map(category => ({ type: 'image', content: category.image, name: category.name }))
];

const sampleAds = [
  { id: 1, title: 'Premium Ballpoint Pens (Pack of 12)', category: 'Writing Instruments', price: '₵50', image: './src/assets/images/ballpoint.jpg' },
  { id: 2, title: 'Hardcover Spiral Notebook', category: 'Paper Products', price: '₵30', image: './src/assets/images/spiral-bk2.jpg' },
  { id: 3, title: 'Ergonomic Student Backpack', category: 'Organization', price: '₵180', image: './src/assets/images/backpack.jpg' },
  { id: 4, title: 'Watercolor Paint Set', category: 'Art Supplies', price: '₵100', image: './src/assets/images/paint.jpg' },
  { id: 5, title: 'Scientific Calculator', category: 'Technology', price: '₵120', image: './src/assets/images/calculator.jpg' },
  { id: 6, title: 'Magnetic Whiteboard', category: 'Classroom Essentials', price: '₵150', image: './src/assets/images/whiteboard.jpg' },
  { id: 7, title: 'Adjustable Basketball Hoop', category: 'Sports & PE', price: '₵550', image: './src/assets/images/basketball-hoop.jpg' },
  { id: 8, title: 'School Uniform Fabric (Per Yard)', category: 'School Uniforms', price: '₵40', image: './src/assets/images/fabric4sch.jpg' },
  { id: 9, title: 'Student Desk', category: 'Furniture', price: '₵200', image: './src/assets/images/furniture.jpg' },
];

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
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

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slideshowItems.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slideshowItems.length) % slideshowItems.length);
  };

  const handleAdClick = (ad) => {
    setSelectedAd(ad);
  };

  const closeAdView = () => {
    setSelectedAd(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredAds = activeCategory
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
                  onClick={() => setActiveCategory(category)}
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
        <div className="w-full md:w-3/4">
          {/* Slideshow */}
          <div className="relative mb-4 h-96 bg-gray-200 overflow-hidden">
            {slideshowItems.map((item, index) => (
              <div
                key={item.name}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlideIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.content}
                    className="w-full h-full object-cover"
                    autoPlay={currentSlideIndex === index}
                    muted
                    onEnded={nextSlide}
                  />
                ) : (
                  <img src={item.content} alt={item.name} className="w-full h-full object-cover" />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                </div>
              </div>
            ))}
            <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
              <FaChevronRight />
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex justify-end mb-4">
            <button onClick={toggleView} className="text-2xl focus:outline-none">
              {isGridView ? <FaTh /> : <FaThList />}
            </button>
          </div>

          {/* Posted Ads */}
          <PostedAds
            selectedCategory={activeCategory?.name}
            onHoverAds={(ads) => {
              // Update your slideshow items with these ads
              const newSlideItems = ads.map(ad => ({
                type: 'image',
                content: `https://savefiles.org/${ad.image}?shareable_link=445`,
                name: ad.title
              }));
              // Merge with your existing slideshow items or handle as needed
            }}
            isGridView={isGridView}
            onAdClick={handleAdClick}
          />
          {/* Ad Details Modal */}
          {selectedAd && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <button onClick={closeAdView} className="text-red-500 mb-4">
                  <FaTimes />
                </button>
                <div className="flex flex-col md:flex-row">
                  <img src={`https://savefiles.org/${selectedAd.image}?shareable_link=445`} alt={selectedAd.title} className="w-full md:w-1/2 h-auto" />
                  <div className="md:ml-4">
                    <h2 className="text-xl font-bold">{selectedAd.title}</h2>
                    <p className="text-lg text-gray-700">Category: {selectedAd.category}</p>
                    <p className="text-lg text-gray-700">Price: {`GHS ${selectedAd.price}`}</p>
                    <p className="text-lg text-gray-700">Location: {selectedAd.location}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
