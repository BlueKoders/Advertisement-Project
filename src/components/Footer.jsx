import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-100  text-blue-700 font-sans mt-7 w-full p-8">
      <div className="flex flex-wrap justify-between">
        <div className="flex-1 min-w-[300px] mb-8 pr-4">
          <h3 className="mb-4">Shop at EduExpress for a seamless and convenient buying experience</h3>
          <h2 className="font-bold mb-4">NEED HELP?</h2>
          <div className="flex items-start mb-4">
            <img src="./src/assets/images/icon_contact.png" alt="Contact" className="w-8 h-8 mr-4" />
            <div>
              <h5 className="font-bold">+233 59 236 1232 (8am - 5pm)</h5>
              <h5 className="font-bold">+233 54 456 9999 (5pm till 8am)</h5>
            </div>
          </div>
          <div className="flex space-x-4">
            <img src="./src/assets/images/insta.png" alt="Instagram" className="w-6 h-6" />
            <img src="./src/assets/images/facebook.png" alt="Facebook" className="w-6 h-6" />
            <img src="./src/assets/images/linked.png" alt="LinkedIn" className="w-6 h-6" />
            <img src="./src/assets/images/twitter.png" alt="Twitter" className="w-6 h-6" />
          </div>
        </div>

        <div className="flex-1 min-w-[200px] mb-8 px-4">
          <h2 className="text-xl font-bold mb-6">Information</h2>
          <ul className="space-y-2">
            <li className="hover:text-black hover:-translate-x-4 transition-all duration-200 ease-in-out">Privacy Policy</li>
            <li className="hover:text-black hover:-translate-x-4 transition-all duration-200 ease-in-out">Return & Warranty Policy</li>
            <li className="hover:text-black hover:-translate-x-4 transition-all duration-200 ease-in-out">Terms and Conditions</li>
          </ul>
        </div>

        <div className="flex-1 min-w-[200px] mb-8 pl-4">
          <h2 className="text-xl font-bold mb-6">Company</h2>
          <ul className="space-y-2 mb-8">
            <Link to="/About" className="hover:text-black hover:-translate-x-4 transition-all duration-200 ease-in-out"> About us</Link >
              <li className="hover:text-black hover:-translate-x-4 transition-all duration-200 ease-in-out">Corporate Website</li>
              <li className="hover:text-black hover:-translate-x-4 transition-all duration-200 ease-in-out">Store Finder</li>
          </ul>
          <img src="/src/assets/images/viisa.png" alt="Visa" className="mt-auto" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} BlueKoders. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;