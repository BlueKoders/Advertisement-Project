import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { apiUserSignup } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const UserSignup = () => {

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();// prevent the page from reloading
    try {
      // Prepare a data to be sent to the backend
      setLoading(true)
      const formData = new FormData(event.target); // takes data from the form
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
      
      //check if passwords match
      // if (password!== confirmpassword)


      //if key and value are same pick one  eg firstname , if not then state both sepearte with a colon(:)eg firsrname:firstname, 
      const payload = { username: username, email: email, password: password }
      const response = await apiUserSignup(payload);
      console.log(response.data);

      // Show a success notification
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
      });

    navigate("/user-login") // takes user to the login page after a successful registration

    } catch (error) {
      console.log(error);

      // Show an error notification
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'There was an error during registration. Please try again.',
      });

    } finally {
      setLoading(false)
    }

  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className='school'>

      <div className="min-h-screen py-12">
        <div className="bg-white-300 flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl shadow-indigo-600">
            {/* Form Title */}
            <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6">User Signup</h2>

            {/* SignUP Form */}
            <form className="space-y-4"
              onSubmit={handleSubmit}>

              <div className="flex gap-4">
                {/* UserName Input */}
                <div className="flex-1">
                  <label htmlFor="userName" className="block text-blue-700 text-sm font-bold mb-2">First Name</label>
                  <input name="username" type="text" id="userName" placeholder="Enter Username" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-blue-700 text-sm font-bold mb-2">Email</label>
                <input name="email" type="email" id="email" placeholder="Enter email" className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
              </div>

              <div className="flex gap-4">
                {/* Password Input */}
                <div className="flex-1">
                  <label htmlFor="password" className="block text-blue-700 text-sm font-bold mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name='password'
                      id="password"
                      placeholder="Enter Password here"
                      className="w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-blue-700 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-blue-700 text-sm font-bold">Forgot Password?</a>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"> {loading ? "Loading... " : "Register"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center">
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
              Already have an account?{" "}<Link to="/vendor-login" className="font-bold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserSignup;
