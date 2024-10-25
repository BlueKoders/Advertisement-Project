import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPostAdverts } from "../../../services/products";
import Swal from "sweetalert2";

const VenAdForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const response = await apiPostAdverts(formData);
      
      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Advertisement Posted!',
        text: 'Your advertisement has been successfully posted.',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#3085d6',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

      // Reset form and navigate to dashboard
      event.target.reset();
      navigate('/vendor/dashboard');

    } catch (error) {
      console.log(error);
      
      // Show error message
      await Swal.fire({
        icon: 'error',
        title: 'Posting Failed',
        text: error.response?.data?.message || 'There was an error posting your advertisement. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[900px]">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('./src/assets/images/notebook2.jpg')" }} 
      />

      <div className="relative z-10 p-14">
        <div className="w-full max-w-md mx-auto bg-white bg-opacity-90 rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            Post a New Advertisement
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                required
                name="title"
                type="text"
                id="title"
                placeholder="Advert title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label 
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                placeholder="Brief description of the advert"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
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
              <label className="text-sm font-medium text-gray-700">
                Price (GH₵)
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                type="number"
                name="price"
                required
                placeholder="Price in Ghana cedis"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label 
                htmlFor="location"
                className="text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                required
                name="location"
                type="text"
                id="location"
                placeholder="Location"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Product Image
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                type="file"
                name="image"
                accept="image/*"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } px-6 py-2 text-white rounded-lg transition-colors duration-200 font-medium`}
                disabled={isLoading}
              >
                {isLoading ? 'Posting...' : 'Post Advertisement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VenAdForm;