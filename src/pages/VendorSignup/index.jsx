import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const VendorSignup = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-white-300 flex items-center justify-center p-4 mt-28 mb-24 ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl shadow-indigo-600">
        {/* Form Title */}
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">Vendor Signup</h2>

        {/* SignUP Form */}
        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="firstName" className="block text-blue-700 text-sm font-bold mb-2">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="Enter First name" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-blue-700 text-sm font-bold mb-2">Last name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Enter Last name" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-blue-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter email" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
          </div>

          {/* LOCATION Input */}
          <div>
            <label htmlFor="location" className="block text-blue-700 text-sm font-bold mb-2">Location</label>
            <input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2" required />
            <input type="text" id="address" name="address" placeholder="Enter Address" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2" required />
            <input type="text" id="additionalInfo" name="additionalInfo" placeholder="Enter Additional information" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2" required />
            <input type="text" id="region" name="region" placeholder="Enter Region, city" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-blue-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter Password here" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-blue-700 text-sm font-bold mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Confirm Password" required />
          </div>

          {/* Remember Me Checkbox and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-blue-700 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-blue-700 text-sm font-bold hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            SIGNUP
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-blue-700 text-xl font-bold">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <button type="button" className="w-full bg-white text-blue-700 text-sm font-bold py-2 px-4 border border-blue-700 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Sign up with Google
        </button>

        {/* SIGN-UP link */}
        <p className="text-center mt-4 text-blue-700 text-sm">
          Already have an account?{" "}
          <a href="#" className="font-bold hover:underline">Login</a>
        </p>
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default VendorSignup;