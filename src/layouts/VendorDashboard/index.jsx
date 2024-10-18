import React, { useState, useEffect } from 'react';

const VendorDashboard = () => {
  const [adverts, setAdverts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch adverts (replace with your API logic)
  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        // Simulating API call
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve([
            { id: 1, title: 'Advert 1', description: 'Description 1', price: 100, category: 'electronics' },
            { id: 2, title: 'Advert 2', description: 'Description 2', price: 200, category: 'fashion' },
          ]), 1000)
        );
        setAdverts(response);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load adverts');
        setIsLoading(false);
      }
    };

    fetchAdverts();
  }, []);

  // Handle delete advert
  const handleDelete = (id) => {
    // Replace with actual delete logic (e.g., API call)
    setAdverts(adverts.filter(advert => advert.id !== id));
  };

  if (isLoading) return <p>Loading adverts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Manage Your Adverts</h2>

      {/* Adverts Listing */}
      {adverts.length > 0 ? (
        <div className="space-y-4">
          {adverts.map((advert) => (
            <div key={advert.id} className="p-4 bg-white shadow-md rounded-md">
              <h3 className="text-xl font-bold">{advert.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Category: {advert.category}</p>
              <p className="text-gray-800">{advert.description}</p>
              <p className="text-lg font-semibold mt-2">Price: ${advert.price}</p>

              {/* Action Buttons */}
              <div className="mt-4 space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  onClick={() => handleEdit(advert.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(advert.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No adverts to display. Post your first advert!</p>
      )}
    </div>
  );
};

const handleEdit = (id) => {
  // Add logic to navigate to the edit form with advert ID (use React Router or another method)
  console.log(`Editing advert with ID: ${id}`);
};


export default VendorDashboard;
