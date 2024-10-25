// SampleAds.js
import React from 'react';

const SampleAds = ({ ads, onAdClick, isGridView }) => {
    return (
        <div className="bg-gray-100 p-10">
            <h2 className="text-2xl font-bold mb-4">Fast Selling</h2>
            <div className={isGridView ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "list"}>
                {ads.map(ad => (
                    <div
                        key={ad.id}
                        className="p-4 border rounded hover:shadow-lg cursor-pointer"
                        onClick={() => onAdClick(ad)}
                    >
                        <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover mb-2" />
                        <h2 className="text-xl font-bold">{ad.title}</h2>
                        <h4 className="text-lg font-bold">{ad.category}</h4>
                        <p className="text-gray-700">{ad.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SampleAds;
