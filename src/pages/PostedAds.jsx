import React, { useEffect, useState } from 'react';
import { apiGetAdverts } from '../services/auth';
import { FaTh, FaThList } from 'react-icons/fa'; 



const PostedAds = () => {
    const [apiAds, setApiAds] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading to true
    const [isGridView, setIsGridView] = useState(true); // State to toggle between grid and list views

    const getAds = async () => {
        
        try {
            const response = await apiGetAdverts();
            setApiAds(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch adverts:", error);
        } finally {
            setLoading(false); // Stop loading after fetching data
        }
    };

    useEffect(() => {
        getAds();
    }, []);

    const toggleView = () => {
        setIsGridView(prev => !prev); // Toggle between grid and list views
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    return (
        <div>
            <div className="bg-gray-100 p-4">
                <h2 className="text-2xl font-bold mb-4">Currently In Stock</h2>
                <div className="mb-4 flex justify-end">
                    <button onClick={toggleView} className="bg-blue-500 text-white px-4 py-2 rounded">
                        {isGridView ? <FaThList /> : <FaTh />}
                    </button>
                </div>
                <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
                    {apiAds.map(ad => (
                        <div key={ad.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${isGridView ? '' : 'flex'}`}>
                            <img src={`https://savefiles.org/${ad.image}?shareable_link=445`} alt={ad.title} className={`${isGridView ? 'w-full h-48' : 'w-1/3 h-auto'} object-cover`} />

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
    );
};

export default PostedAds;
