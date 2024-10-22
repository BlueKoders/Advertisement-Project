import React, { useState } from 'react';

const VendorAdForm = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Form values:', Object.fromEntries(new FormData(e.target)));
      alert('Advert posted successfully!');
      e.target.reset();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen"> 
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('./src/assets/images/colored-pencils.png')" }}>
      </div>
      <div className="relative z-10 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl shadow-indigo-600" >
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Post a New Advert</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-blue-700">Title</label>
            <input type="text" id="title" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-blue-700">Location</label>
            <input type="text" id="location" name="location" required className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-blue-700">Description</label>
            <textarea id="description" name="description" rows="4" required className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-blue-700">Images</label>
            <input type="file" id="images" name="images" multiple accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 shadow-md file:text-sm file:bg-gray-50 file:text-gray-500 hover:file:bg-indigo-100" />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-blue-700">Price (GH₵)</label>
            <input type="number" id="price" name="price" required min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-blue-700">Category</label>
            <select id="category" name="category" required className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-500">
              <option value="">Select a category</option>
              <option value="writing instruments">Writing Instruments</option>
              <option value="paper products">Paper Products</option>
              <option value="organization">Organization</option>
              <option value="art supplies">Art Supplies</option>
              <option value="technology">Technology</option>
              <option value="classroom essentials">Classroom Essentials</option>
              <option value="sports & pe">Sports & PE</option>
              <option value="school uniforms">School Uniforms</option>
            </select>
          </div>

          <div>
            <button type="submit" disabled={loading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {loading ? 'Posting...' : 'Post Advert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorAdForm;