import React, { useState} from "react";
import { apiPostAdverts } from "../../../services/auth";
import Swal from "sweetalert2";

const categories = [
    { value: 'writing instruments', label: 'Writing Instruments' },
    { value: 'paper products', label: 'Paper Products' },
    { value: 'organization', label: 'Organization' },
    { value: 'art supplies', label: 'Art Supplies' },
    { value: 'technology', label: 'Technology' },
    { value: 'classroom essentials', label: 'Classroom Essentials' },
    { value: 'sports & pe', label: 'Sports & PE' },
    { value: 'school uniforms', label: 'School Uniforms' },
];

const VenAdForm = () => {
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const formData = new FormData(event.target);

            const response = await apiPostAdverts(formData);
            console.log(response.data);

        } catch (error) {
            console.log(error)

        }
    };

    const [adId, setAdId] = useState(null);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="relative min-h-[900px]">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('./src/assets/images/notebook2.jpg')" }}
            />

            <div className="relative z-10 p-14">
                <div className="w-full max-w-md mx-auto bg-inherit rounded-lg shadow-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
                        {adId ? "Edit Advert" : "Post a New Advert"}
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
                                defaultValue={title}
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
                            <input
                                name="description"
                                type="text"
                                defaultValue={description}
                                id="description"
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
                                defaultValue={category}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
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
                                defaultValue={price}
                                required
                                placeholder="Price in Ghana cedis"
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
                                defaultValue={location}
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
                                className={`${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    } px-4 py-2 text-white rounded-lg transition-colors duration-200`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : adId ? 'Update Advert' : 'Post Advert'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VenAdForm;