import { useState } from 'react';
import { apiSignin } from '../services/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await apiSignin({ email, password });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);

        //get user profile
        //const profileResponse = await apiGetProfile();
        //console.log(profileResponse.data);//

        // Show success message with SweetAlert2
        await Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: 'Login successful. Redirecting to dashboard...',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        });

        navigate("/");
      }
    } catch (error) {
      console.error(error);

      // Show error message with SweetAlert2
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Login failed. Please check your credentials and try again.',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3B82F6',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Forgot Password?',
      text: 'Enter your email address to reset your password',
      input: 'email',
      inputPlaceholder: 'Enter your email address',
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
      confirmButtonColor: '#3B82F6',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        // Handle password reset logic here
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            Swal.fire({
              icon: 'success',
              title: 'Password Reset Email Sent',
              text: 'Please check your email for further instructions',
              timer: 2000,
              timerProgressBar: true
            });
          }, 1000);
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen login">
      <div className="bg-blue-100 p-8 rounded-lg shadow-md w-full max-w-md shadow-green-500 ">
        <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-500 hover:text-blue-600 text-center"
          >
            Forgot Password?
          </button>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;