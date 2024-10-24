import { FaTag, FaPhone } from 'react-icons/fa';


const SidebarContent = () => (
    <div className="bg-inherit shadow-md p-4 space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-3">Special Offers</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-sm">
            <FaTag className="text-red-500 mr-2" />
            <span>20% off on all Notebooks</span>
          </li>
          <li className="flex items-center text-sm">
            <FaTag className="text-red-500 mr-2" />
            <span>Buy 2 Get 1 Free on Pens</span>
          </li>
          <li className="flex items-center text-sm">
            <FaTag className="text-red-500 mr-2" />
            <span>Free Delivery above ₵500</span>
          </li>
        </ul>
      </div>
  
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-3">Popular Categories</h3>
        <ul className="space-y-2">
          <li className="text-sm hover:text-blue-500 cursor-pointer">Writing Instruments</li>
          <li className="text-sm hover:text-blue-500 cursor-pointer">School Uniforms</li>
          <li className="text-sm hover:text-blue-500 cursor-pointer">Backpacks</li>
          <li className="text-sm hover:text-blue-500 cursor-pointer">Art Supplies</li>
        </ul>
      </div>
  
      <div>
        <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm mb-2">Contact our support team:</p>
          <div className="flex items-center text-sm">
            <FaPhone className="mr-2" />
            <span>+233 55 789 1234</span>
          </div>
        </div>
      </div>
    </div>
  );

export default SidebarContent;