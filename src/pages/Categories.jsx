import React from 'react';
import { FaShoppingCart, FaPencilAlt, FaTshirt, FaLaptop, FaMedkit, FaGamepad } from 'react-icons/fa';

const categories = [
    { name: 'Supermarket', icon: FaShoppingCart },
    { name: 'Stationery', icon: FaPencilAlt },
    { name: 'Fabrics', icon: FaTshirt },
    { name: 'Electronics', icon: FaLaptop },
    { name: 'Healthcare', icon: FaMedkit },
    { name: 'Play Items', icon: FaGamepad }
];

const Categories = () => {
    return (
        <ul>
            {categories.map((category) => (
                <li key={category.name} className="py-2">
                    <a href="#" className="flex items-center text-gray-600 hover:text-gray-900">
                        <category.icon className="mr-3 h-5 w-5" />
                        <span>{category.name}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Categories;