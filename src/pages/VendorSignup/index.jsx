const VendorSignup = () => {
  return (
    <div className=" min-h-screen 
      bg-white-300 m-20 focus:outline-none focus:ring-2 focus:ring-blue-600 border-blue-950 ">
      {/* Vendor name, location, email and password */}
      {/* Form Title */}
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8"> Vendor Signup</h2>

      {/* SignUP Form */}
      <form>
        {/* Name Input */}
        <div className='mb-4'>
          <label htmlFor="name" className="block text-blue-700 text-sm font-bold mb-2">First Name</label>
          <input type="name" id="name" placeholder="Enter First name ...." className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
        </div>

        <div className='block text-blue-700 text-sm font-bold mb-2'>
          <label htmlFor="name"> Last name</label>
          <input type="name" id="name" placeholder="Enter Last name...." className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
        </div>

        {/* Email Input */}
        <div className='block text-blue-700 text-sm font-bold mb-2'>
          <label htmlFor="email" className=""> Email</label>
          <input type="email" id="email" placeholder="Enter email....." className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
        </div>

        {/* LOCATION Input */}
        <div className='block text-blue-700 text-sm font-bold mb-2'>
            <label htmlFor="location"> Location</label>
          </div>
        <div className='loc'>
          
          <input type="text" id="fullName" placeholder="Enter Full Name ...." className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
          <input type="tel" id="phone" placeholder="Enter Phone Number...." className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
          <input type="text" id="address" placeholder="Enter Address...." className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
          <input type="text" id="additionalInfo" placeholder="Enter Additional information" className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
          <input type="text" id="region" placeholder="Enter Region, city....." className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
        </div>

        {/* Password Input */}
        <div className='block text-blue-700 text-sm font-bold mb-2'>
          <label htmlFor="password" className=""> Password</label>
          <input type="password" id="password" placeholder="Enter Password here" className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' required />
        </div>

        {/* Confirm Password Input */}
        <div className="block text-blue-700 text-sm font-bold mb-2">
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <input type="password" id="confirmPassword" className='w-full p-2 rounded bg-white-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300' placeholder="Confirm Password" />
        </div>

        {/* Remember Me Checkbox */}
        <div className='block text-blue-700 text-sm font-bolder mb-2 ml-72 mt-6'>
          <label className=''>
            <input type="checkbox" className='mt-6 ml-72 mb-2' />
            <span> Remember me</span>
          </label>
          <a href="#" className='block text-blue-700 text-sm font-bold ml-72 mb-2'> Forgot Password?</a>
        </div>

        <div>
          <button type='submit' className=' text-blue-700 text-2xl font-bold mt-6 ml-64 mb-2 border-blue-700  focus:outline-none focus:ring-4 focus:ring-blue-300'>
            SIGNUP
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className=''>
        <span className=''></span>
        <span className='block text-blue-700 text-xl font-bold mb-2 mt-6 ml-72'>OR</span>
        <span className=''></span>
      </div>

      {/* Social Login Buttons */}
      <div>
        <button type='button' className='block text-blue-700 text-sm font-bold mb-2 mt-10 ml-64'> Sign up with Google</button>
      </div>

      {/* SIGN-UP link */}
      <p className='block text-blue-700 text-sm font-bold mb-2 ml-64'>Already have an account?{""}
      {/* <a href="#" className=''>
        <link to="./form"> login</link>/
      </a> */}
      </p>
    </div>
  );
};

export default VendorSignup;